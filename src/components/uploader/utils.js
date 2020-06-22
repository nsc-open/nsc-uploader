import { createHash } from 'crypto'

const OSS = require('ali-oss')

export function co(gen) {
  var ctx = this;
  var args = Array.prototype.slice.call(arguments, 1);


  return new Promise(function(resolve, reject) {
    if (typeof gen === 'function') gen = gen.apply(ctx, args);
    if (!gen || typeof gen.next !== 'function') return resolve(gen);

    onFulfilled();

    /**
     * @param {Mixed} res
     * @return {Promise}
     * @api private
     */

    function onFulfilled(res) {
      var ret;
      try {
        ret = gen.next(res);
      } catch (e) {
        return reject(e);
      }
      next(ret);
      return null;
    }

    /**
     * @param {Error} err
     * @return {Promise}
     * @api private
     */

    function onRejected(err) {
      var ret;
      try {
        ret = gen.throw(err);
      } catch (e) {
        return reject(e);
      }
      next(ret);
    }

    /**
     * Get the next value in the generator,
     * return a promise.
     *
     * @param {Object} ret
     * @return {Promise}
     * @api private
     */

    function next(ret) {
      if (ret.done) return resolve(ret.value);
      var value = toPromise.call(ctx, ret.value);
      if (value && isPromise(value)) return value.then(onFulfilled, onRejected);
      return onRejected(new TypeError('You may only yield a function, promise, generator, array, or object, '
        + 'but the following object was passed: "' + String(ret.value) + '"'));
    }
  });
}
    
export const getUploadClient = (params) => {
  return new OSS(params);
}

export const encodeFileName = (filename) => {
  const timeStamp = new Date().valueOf()
  const hash = createHash('md5').update(filename + timeStamp).digest('hex')
  console.log('hash',hash)
  return hash+'_'+timeStamp
}

const arrayMoveMutate = (array, from, to) => {
	const startIndex = to < 0 ? array.length + to : to;
	const item = array.splice(from, 1)[0];
	array.splice(startIndex, 0, item);
};

export const arrayMove = (array, from, to) => {
  array = array.slice();
  const fromItem = array[from]
  arrayMoveMutate(array, from, to);
  array.forEach((item,index)=>{
    item.sortNo = index
  })
	return array;
}

export const deepCopy=(target)=>{ 
  let copyed_objs = [];//此数组解决了循环引用和相同引用的问题，它存放已经递归到的目标对象 
      function _deepCopy(target){ 
          if((typeof target !== 'object')||!target){return target;}
          for(let i= 0 ;i<copyed_objs.length;i++){
              if(copyed_objs[i].target === target){
                  return copyed_objs[i].copyTarget;
              }
          }
          let obj = {};
          if(Array.isArray(target)){
              obj = [];//处理target是数组的情况 
          }
          copyed_objs.push({target:target,copyTarget:obj}) 
          Object.keys(target).forEach(key=>{ 
              if(obj[key]){ return;} 
              obj[key] = _deepCopy(target[key]);
          }); 
          return obj;
      } 
      return _deepCopy(target);
  }

export function T() {
  return true;
}

export function fileToObject(file){
  return {
    ...file,
    lastModified: file.lastModified,
    lastModifiedDate: file.lastModifiedDate,
    name: file.name,
    size: file.size,
    type: file.type,
    uid: file.uid,
    percent: 0,
    originFileObj: file,
  }
}

/**
 * 生成Progress percent: 0.1 -> 0.98
 *   - for ie
 */
export function genPercentAdd() {
  let k = 0.1;
  const i = 0.01;
  const end = 0.98;
  return (s) => {
    let start = s;
    if (start >= end) {
      return start;
    }

    start += k;
    k -= i;
    if (k < 0.001) {
      k = 0.001;
    }
    return start;
  };
}

export function getFileItem(file, fileList) {
  const matchKey = file.uid !== undefined ? 'uid' : 'name';
  return fileList.filter(item => item[matchKey] === file[matchKey])[0];
}

export function removeFileItem(file, fileList) {
  const matchKey = file.uid !== undefined ? 'uid' : 'name';
  const removed = fileList.filter(item => item[matchKey] !== file[matchKey]);
  if (removed.length === fileList.length) {
    return null;
  }
  return removed;
}

// ==================== Default Image Preview ====================
const extname = (url) => {
  const temp = url.split('/');
  const filename = temp[temp.length - 1];
  const filenameWithoutSuffix = filename.split(/#|\?/)[0];
  return (/\.[^./\\]*$/.exec(filenameWithoutSuffix) || [''])[0];
};

const isImageFileType = (type) => !!type && type.indexOf('image/') === 0;

export const isImageUrl = (file) => {
  if (isImageFileType(file.type)) {
    return true;
  }
  const url= (file.thumbUrl || file.url);
  const extension = extname(url);
  if (
    /^data:image\//.test(url) ||
    /(webp|svg|png|gif|jpg|jpeg|jfif|bmp|dpg|ico)$/i.test(extension)
  ) {
    return true;
  }
  if (/^data:/.test(url)) {
    // other file types of base64
    return false;
  }
  if (extension) {
    // other file types which have extension
    return false;
  }
  return true;
};

const MEASURE_SIZE = 200;
export function previewImage(file){
  return new Promise(resolve => {
    if (!isImageFileType(file.type)) {
      resolve('');
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = MEASURE_SIZE;
    canvas.height = MEASURE_SIZE;
    canvas.style.cssText = `position: fixed; left: 0; top: 0; width: ${MEASURE_SIZE}px; height: ${MEASURE_SIZE}px; z-index: 9999; display: none;`;
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      const { width, height } = img;

      let drawWidth = MEASURE_SIZE;
      let drawHeight = MEASURE_SIZE;
      let offsetX = 0;
      let offsetY = 0;

      if (width < height) {
        drawHeight = height * (MEASURE_SIZE / width);
        offsetY = -(drawHeight - drawWidth) / 2;
      } else {
        drawWidth = width * (MEASURE_SIZE / height);
        offsetX = -(drawWidth - drawHeight) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      const dataURL = canvas.toDataURL();
      document.body.removeChild(canvas);

      resolve(dataURL);
    };
    img.src = window.URL.createObjectURL(file);
  });
}