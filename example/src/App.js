import React, { Component } from 'react'
import { Icon, message, Modal } from 'antd'
import { Uploader } from 'nsc-uploader'
import 'antd/dist/antd.css'
const OSS = require('ali-oss')

const toAttachment = file => ({
  id: file.id || file.uid,
  fileName: file.name,
  encodedFileName: file.encodedFileName,
  fileSize: file.size,
  fileType: file.type,
  fileExt: file.ext,
  uri: file.url
})

const OSS_ENDPOINT = 'oss-cn-beijing'
const OSS_BUCKET = 'corridorcleaningphoto'
const defaultFiles = [{
  category: "print",
  createdAt: "2020-09-07 15:34:13",
  createdBy: "1732",
  encodedFileName: "8e67209cd9a58cdfc9469edfa1484866_1599459834761",
  fileExt: "jpg",
  fileName: "测试图片3.jpg",
  fileSize: "268713",
  fileType: "image/jpeg",
  id: "24137691-f0df-11ea-8146-f9a5d6b3bf59",
  isDeleted: null,
  sortNo: "1",
  updatedAt: "2020-09-07 15:52:55",
  updatedBy: "1732",
  uri: "http://corridorcleaningphoto.oss-cn-beijing.aliyuncs.com/8e67209cd9a58cdfc9469edfa1484866_1599459834761",
  volCode: null,
  volId: "ef31a5d3-eb54-11ea-abe5-735dc8c1a294",
  volRevision: "7",
}, {
  category: "print",
  createdAt: "2020-09-07 15:34:13",
  createdBy: "1732",
  encodedFileName: "647d57d9d156b144b276c0fcae9fd761_1599459834788",
  fileExt: "pdf",
  fileName: "微信图片_20200616152747.jpg",
  fileSize: "41219",
  fileType: "pdf",
  id: "24137692-f0df-11ea-8146-f9a5d6b3bf59",
  isDeleted: null,
  sortNo: "2",
  updatedAt: "2020-09-07 15:52:55",
  updatedBy: "1732",
  uri: "http://corridorcleaningphoto.oss-cn-beijing.aliyuncs.com/72fccc852992f4cedb9ecd72a4347655",
  volCode: null,
  volId: "ef31a5d3-eb54-11ea-abe5-735dc8c1a294",
  volRevision: "7",
}
]
const ossParams = {
  region: OSS_ENDPOINT,
  bucket: OSS_BUCKET,
  accessKeyId: "STS.NUiZpJtYwrcTyFgpt5mGp2knj",
  accessKeySecret: "94b4wZU2wi76CPpUD5B1AbQV2PVr1xCF1VHB9VZG2Xiz",
  Expiration: "2021-02-25T07:36:04Z",
  stsToken: "CAISjgJ1q6Ft5B2yfSjIr5bcEcr+mYZWxaG/e2DWlHRgYchc3a7FiDz2IHpEf3NhAO8Yt/swn2pY5vwclq19UZpOHc1S82PlqMY5yxioRqackf7XhOV2tf/IMGyXDAGBq622Su7lTdTbV+6wYlTf7EFayqf7cjPQMD7INoaS29wdLbZxZASjaidcD9p7PxZrrNRgVUHcLvGwKBXn8A2yaUNjoVh7kngtq/b9kI++kkOP0gagl75P/NisfMn+NJJWUc0hA4vv7otfbbHc1SNc0R9O+ZptgbZMkTW95YvNWAMAukrYarWLqYc/fFUnfNszH69Vsf77juZkve/ekYv6zRtXNP1SST7YQI2wOTsxuiVz4L0agAF30zppDNNxZYUTmh5r/KuljCoCRo5v7TtZx3Q8rQDEPoLcnEbLxnkJMZkqTJPWR2L8gQAsOGoTQ+0PhwnPdO7hpoq+wbWrmfdS0HwhRfMXkqTczrKHwI04O9nZbnEPz4x67rFykqLZrv9Oh04lHjDTJkTzP0dZqkSmH+qB6Bg5aA=="
}


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fileList: defaultFiles,
      previewVisible: false,
      previewImage: null,
      previewFileVisible: false,
      previewFile: null
    }
  }

  getOssParams = () => new Promise((resolve, reject) => {
    resolve(ossParams)
  })

  signatureUrl = (url) => {
    const client = new OSS(ossParams)
    const index = url.lastIndexOf('/') + 1
    return client.signatureUrl(url.substring(index))
  }

  onDownload = (file) => {
    window.open(file.url)
  }

  onFileChange = (file, fileList) => {
    this.setState({ fileList: fileList })
  }
  handleCancel = () => {
    this.setState({ previewVisible: false })
  }
  handlePdfViewCancel = () => {
    this.setState({ previewFileVisible: false })
  }


  onSortEnd = (oldList, newList) => {
    console.log(oldList, newList)
  }

  onChange = ({ file }) => {
    console.log(file)
  }

  beforeUpload = ({ file }) => {
    console.log(file)
  }

  render() {
    const { previewVisible, previewImage, previewFileVisible, previewFile, fileList } = this.state
    let accept = "*"

    const uploadProps = {
      multiple: true,
      dragSortable: true,
      onFileChange: this.onFileChange,
      accept,
      ossParams: ossParams,
      uploadType:'multipart',
      onSortEnd: this.onSortEnd,
      onDownload: this.onDownload,
      defaultFiles: fileList,
    }

    return (
      <div style={{ margin: '50px', width: '50%' }}>
        <Uploader
          {...uploadProps}
          showUploadList={{ showDownloadIcon: true }}
        />
      </div>

    )
  }
}


export default App
