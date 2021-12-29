import InterfaceOss from './InterfaceOss';
import SingletonOss from './SingletonOss';
class MinIO extends InterfaceOss {

  constructor(args) {
    super(args);
    this.params = args;
    this.ossType = args.source;
    this.client = new SingletonOss({
      ...args,
      bucket: `${args.image}`,
      endPoint: args.endPoint,
      useSSL: false,
      port: args.port,
      region: args.region,
      secretKey: args.secretKey,
      accessKey: args.accessKey,
      sessionToken: args.SessionToken
    }).getInstance();
    this.exepTime = 24 * 60 * 60;
  }

  signatureUrl = (name) => {
    return new Promise(((resolve, reject) => {
      this.client.presignedUrl('GET', this.params.bucket, name, this.exepTime, (err, presignedUrl) => {
        if (err) return reject(err);
        resolve(presignedUrl);
      });
    }));
  }

  upload = (encodedFileName, file, options) => {
    return new Promise((resolve, rej) => {
      this.client.putObject(this.client, this.params.bucket, encodedFileName, file, options, { 'Content-Type': file.type }, (err, etag) => {
        if (err) {
          return rej(err);
        }
        this.client.presignedUrl('GET', this.params.bucket, encodedFileName, this.exepTime, (err, presignedUrl) => {
          if (err) return rej(err);
          console.log(presignedUrl)
          resolve(presignedUrl);
        });
      });
    })
  }

  async multipartUpload(name, file, options) {
    return this.upload(name, file, options)
  }

  getUploadedUrl = (uploadRes, uploadType, file) => {
    return uploadRes
  }

  getUploadProgress = () => {
    // To be developed
  }
}

export default MinIO
