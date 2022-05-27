import InterfaceOss from './InterfaceOss';
import co from 'co';
import ajax from '@/utils/ajax'

class LocalAliOss extends InterfaceOss {

  constructor(args) {
    super(args);
    this.params = args
    this.url = args.url
  }

  signatureUrl(name) {
    return ajax.get(this.url, {
      params: {
        name
      }
    })
  }

  async upload(encodedFileName, file) {
    const _this = this
    const res = await co(function* () {
      const formData = new FormData()
      formData.append('file', file)
      return yield ajax.post(_this.url, formData, { headers: { 'X-Ignore-Req-Sign': true } })
    })
    return res.data
  }

  async multipartUpload(encodedFileName, file, options) {
    const _this = this
    const res = await co(function* () {
      const formData = new FormData()
      formData.append('file', file)
      return yield ajax.post(_this.url, formData, { headers: { 'X-Ignore-Req-Sign': true } })
    })
    return res.data
  }

  getUploadedUrl(res, uploadType) {
    if (uploadType === 'multipart') {
      return this.signatureUrl(res.filename);
    } else {
      return this.signatureUrl(res.filename);
    }
  }
}

export default LocalAliOss
