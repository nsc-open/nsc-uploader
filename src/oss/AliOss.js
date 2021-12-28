import InterfaceOss from './InterfaceOss';
import Url from 'url-parse';
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
      const requestUrl = (res && res.res && res.res.requestUrls) ? res.res.requestUrls[0] : ''
      const { origin } = new Url(decodeURIComponent(requestUrl))
      return this.signatureUrl(origin + "/" + res.name);
    } else {
      return this.signatureUrl(res.url);
    }
  }
}

export default AliOss
