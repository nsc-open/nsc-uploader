import {
  prependXAMZMeta, isValidBucketName,
  isValidObjectName, isFunction, insertContentType,
  pipesetup, getBuffer, divideParts, readableStream, promisify,
  isBlob, getHashSummer
} from './utils'

import ali_Oss from 'ali-oss'
const minio_Oss = require('minio');

const putObject = async (client, bucketName, objectName, file, options, metaData, callback) => {

  if (!isValidBucketName(bucketName)) {
    throw new Error('Invalid bucket name: ' + bucketName)
  }
  if (!isValidObjectName(objectName)) {
    throw new Error(`Invalid object name: ${objectName}`)
  }
  if (!isBlob(file)) {
    throw new Error('third argument should be of type "file"')
  }

  if (!isFunction(callback)) {
    throw new Error('callback should be of type "function"')
  }
  const maxObjectSize = 5 * 1024 * 1024 * 1024 * 1024
  if (file.size > maxObjectSize) {
    return callback(new Error(` size : ${file.size}, max allowed size : 5TB`))
  }
  // Ensures Metadata has appropriate prefix for A3 API
  metaData = insertContentType(metaData, file)

  // Updates metaData to have the correct prefix if needed
  metaData = prependXAMZMeta(metaData)


  const partSize = options.partSize ? options.partSize : 6 * 1024 * 1024
  if (file.size < partSize) {
    var uploader = client.getUploader(bucketName, objectName, metaData, false)
    var hash = getHashSummer(true)
    const fileContent = await getBuffer(file)
    const buffer = Buffer.from(fileContent)
    const stream = readableStream(buffer)
    pipesetup(stream, hash)
      .on('data', data => {
        var md5sum = data.md5sum
        var sha256sum = data.sha256sum
        var stream = readableStream(buffer)
        uploader(stream, file.size, sha256sum, md5sum, (err, objInfo) => {
          callback(err, objInfo)
        })
      })
      .on('error', e => callback(e))
    return
  }

  var doneParts = []
  let internalDoneParts = [];
  let uploadedSize = 0
  if (doneParts.length > 0) {
    internalDoneParts = [...internalDoneParts, ...doneParts,]
  }
  const partOffs = divideParts(file.size, partSize)
  const numParts = partOffs.length;
  const all = Array.from(new Array(numParts), (x, i) => i + 1);

  let multipartFinish = false;
  const done = internalDoneParts.map(p => p.part);
  const todo = all.filter(p => done.indexOf(p) < 0);
  const defaultParallel = 5// upload in parallel
  const getUploadId = (bucketName, objectName, metaData) => {
    return new Promise((resolve, reject) => {
      client.findUploadId(bucketName, objectName, (err, uploadId) => {
        if (err) throw new Error(err)
        if (uploadId) {
          resolve(uploadId)
        } else {
          client.initiateNewMultipartUpload(bucketName, objectName, metaData, (e, uploadId) => {
            if (e) throw new Error(e)
            resolve(uploadId)
          })
        }
      })
    })
  }

  const uploadId = await getUploadId(bucketName, objectName, metaData)

  const uploadPartJob = async (file, partNo, uploadId) => {
    const pi = partOffs[partNo - 1];
    const _file = file.slice(pi.start, pi.end)
    const fileContent = await getBuffer(_file)
    const buffer = Buffer.from(fileContent)
    const stream = readableStream(buffer)
    const dst = getHashSummer(true)
    var length = partSize
    if (length > (file.size - uploadedSize)) {
      length = file.size - uploadedSize
    }
    return new Promise((resolve, reject) => {
      pipesetup(stream, dst).on('data', data => {
        var uploader = client.getUploader(bucketName, objectName, metaData, true)
        if (!multipartFinish) {
          var stream = readableStream(buffer)
          uploader(uploadId, partNo, stream, partSize,
            data.sha256sum, data.md5sum, (e, objInfo) => {
              if (e) return reject(e)
              resolve({ partNo, objInfo, length })
            })

        }
      })
    })
  }
  const checkpoint = {
    file,
    name: objectName,
    fileSize: file.size,
    partSize,
    uploadId
  }
  if (options && options.progress) {
    await options.progress(0, checkpoint);
  }
  const jobErr = await parallel(
    todo,
    defaultParallel,
    value => new Promise((resolve, reject) => {
      uploadPartJob(file, value, uploadId)
        .then(async (r) => {
          const { partNo, objInfo, length } = r
          uploadedSize += length
          internalDoneParts.push({ part: partNo, etag: objInfo.etag });
          doneParts.push({
            part: partNo,
            etag: objInfo.etag
          });
          if (options.progress) {
            await options.progress(doneParts.length / numParts, checkpoint, objInfo);
          }
          resolve();
        })
        .catch(err => {
          reject(err);
        });
    })
  );

  multipartFinish = true;

  const abortEvent = jobErr.find(err => err.name === 'abort');
  if (abortEvent) throw abortEvent;

  if (jobErr && jobErr.length > 0) {
    jobErr[0].message = `Failed to upload some parts with error: ${jobErr[0].toString()} part_num: ${jobErr[0].partNum
      }`;
    throw jobErr[0];
  }

  internalDoneParts.sort((a, b) => a.part - b.part)
  return await client.completeMultipartUpload(bucketName, objectName, uploadId, internalDoneParts, callback)
}

const parallel = (todo, parallel, jobPromise) => {
  const that = this;
  return new Promise((resolve) => {
    const _jobErr = [];
    if (parallel <= 0 || !todo) {
      resolve(_jobErr);
      return;
    }

    function onlyOnce(fn) {
      return function (...args) {
        if (fn === null) throw new Error('Callback was already called.');
        const callFn = fn;
        fn = null;
        callFn.apply(this, args);
      };
    }

    function createArrayIterator(coll) {
      let i = -1;
      const len = coll.length;
      return function next() {
        return (++i < len) ? { value: coll[i], key: i } : null;
      };
    }

    const nextElem = createArrayIterator(todo);
    let done = false;
    let running = 0;
    let looping = false;

    function iterateeCallback(err, value) {
      running -= 1;
      if (err) {
        done = true;
        _jobErr.push(err);
        resolve(_jobErr);
      } else if (value === {} || (done && running <= 0)) {
        done = true;
        resolve(_jobErr);
      } else if (!looping) {
        /* eslint no-use-before-define: [0] */
        replenish();
      }
    }

    function iteratee(value, callback) {
      jobPromise(value).then((result) => {
        callback(null, result);
      }).catch((err) => {
        callback(err);
      });
    }

    function replenish() {
      looping = true;
      while (running < parallel && !done) {
        const elem = nextElem();
        if (elem === null || _jobErr.length > 0) {
          done = true;
          if (running <= 0) {
            resolve(_jobErr);
          }
          return;
        }
        running += 1;
        iteratee(elem.value, onlyOnce(iterateeCallback));
      }
      looping = false;
    }

    replenish();
  });
}

minio_Oss.Client.prototype.putObject = promisify(putObject)
class SingletonOss {
  _instance = null;
  _params = null;
  _ossList = [
    { key: 'alioss', ossInstance: ali_Oss.prototype.constructor },
    { key: 'minio', ossInstance: minio_Oss.Client },
  ];

  constructor(params) {
    this._params = params;
  }

  getInstance() {
    if (!this._instance) {
      this._instance = this._getOss();
    }
    return this._instance;
  }

  _getOss() {
    const Instance = this._ossList.filter(res => this._params.source === res.key)[0].ossInstance;
    return new Instance(this._params);
  }

}
export default SingletonOss;
