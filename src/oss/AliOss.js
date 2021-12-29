import InterfaceOss from './InterfaceOss';
import co from 'co';
import SingletonOss from './SingletonOss';

class AliOss extends InterfaceOss {

  /**
   {
    accessKeyId: '',
    accessKeySecret: '',
    stsToken: '',
    region: OSS_ENDPOINT,
    bucket: OSS_BUCKET,
    }
   */
  constructor(args) {
    super(args);
    this.params = args;
    this.ossType = args.source;
    this.client = new SingletonOss({
      ...args,
      accessKeyId: args.AccessKeyId,
      accessKeySecret: args.AccessKeySecret,
      stsToken: args.SecurityToken,
      region: args.region,
      bucket: args.bucket,
    }).getInstance();
  }

  signatureUrl(url) {
    return this.client.signatureUrl(url)
  }

  async upload(encodedFileName, file) {
    const { client } = this
    const res = await co(function* () {
      return yield client.put(encodedFileName, file);
    })
    return res
  }

  async multipartUpload(encodedFileName, file, options) {
    const { client } = this
    const res = await co(function* () {
      return yield client.multipartUpload(encodedFileName, file, options)
    })
    return res;
  }

  getUploadedUrl(res, uploadType) {
    if (uploadType === 'multipart') {
      return this.signatureUrl(res.name);
    } else {
      return this.signatureUrl(res.name);
    }
  }
}

export default AliOss
