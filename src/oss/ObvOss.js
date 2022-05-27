import InterfaceOss from './InterfaceOss';
import co from 'co';
class ObvOss extends InterfaceOss {

  constructor(args) {
    super(args);
    this.params = args
    this.url = args.url
    this.request = args.request
  }

  signatureUrl(name) {
    const bucket_key = this.params.bucket_key
    return this.request.get(`${this.url}/${bucket_key}/objects/${name}/directpresignedurl?expiration=6000`)
      .then(r => {
        return r.url
      }).catch(e => {
        console.log(e)
      })
  }

  async upload(encodedFileName, file) {
    const bucketsRes = await this.request.get(`${this.url}/buckets`)
    const buckets = bucketsRes ? bucketsRes.buckets : []
    const bucket_key = this.params.bucket_key
    const object_key = encodedFileName
    if (!buckets.find(i => i.bucket_key === bucket_key)) {
      await this.request.post(`${this.url}/buckets/${bucket_key}`)
    }
    const uploadData = await this.request.get(`${this.url}/uploadUrl`, {
      params: {
        type: 7,
        expire: 60000,
        bucketKey: bucket_key,
        objectKey: object_key
      }
    })
    const res = await co(function* () {
      const formData = new FormData()
      formData.append('file', file)
      return yield this.request.post(uploadData.uploadUrl, formData, { headers: { 'x-bimserver-upload-url': uploadData.signature } })
    })
    const data = {
      filename: res.object_key
    }
    return data
  }

  async multipartUpload(encodedFileName, file, options) {
    this.upload(encodedFileName, file)
  }

  getUploadedUrl(res, uploadType) {
    return this.signatureUrl(res.filename);
  }
}

export default ObvOss
