import InterfaceOss from './InterfaceOss';
import SingletonOss from './SingletonOss';

class MinIO extends InterfaceOss {

  constructor(args) {
    super(args);
    this.params = args;
    this.ossType = args.source;
    this.client = new SingletonOss({
      ...args,
      bucket:`${args.image}`,
      endPoint: args.endPoint,
      useSSL: false,
      port: args.port,
      region:args.region,
      secretKey:args.secretKey,
      accessKey:args.accessKey,
      sessionToken:args.SessionToken
    }).getInstance();
    this.exepTime = 24 * 60 * 60;
  }

  signatureUrl(file) {
    return new Promise(((resolve, reject) => {
      this.client.presignedUrl('GET', this.params.bucket, file.name, this.exepTime, (err, presignedUrl) => {
            if (err) return reject(err);
            resolve(presignedUrl);
          });
    }));
  }

  upload(encodedFileName, file) {
    return new Promise((resolve, rej) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (readers) => {
        const base64 = readers.target.result.split(',').pop();
        const buffer = Buffer.from(base64, 'base64');
        this.client.putObject(this.params.bucket, encodedFileName, buffer, { 'Content-Type': file.type }, (err, etag) => {
              if (err) {
               return rej(err);
              }
          this.client.presignedUrl('GET', this.params.bucket, encodedFileName, this.exepTime, (err, presignedUrl) => {
            if (err) return rej(err);
            resolve(presignedUrl);
          });
        });
      };
    });
  }

  multipartUpload(encodedFileName, file) {
    return this.upload(encodedFileName, file);
  }

  getUploadedUrl(uploadRes,uploadType,file) {
    return uploadRes
  }

  getUploadProgress() {
    // To be developed
  }
}

export default MinIO
