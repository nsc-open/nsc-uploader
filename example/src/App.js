import React, { Component } from 'react'
import { Uploader } from 'nsc-uploader'
import 'antd/dist/antd.css'

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
  uri: "http://your.url",
  volCode: null,
  volId: "ef31a5d3-eb54-11ea-abe5-735dc8c1a294",
  volRevision: "7",
}
]

const ossParams = {
  region: OSS_ENDPOINT,
  bucket: OSS_BUCKET,
  accessKeyId: "yourkey",
  accessKeySecret: "yoursecret",
  Expiration: "2021-03-15T08:50:41Z",
  stsToken: ""
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
    const { fileList } = this.state
    let accept = "*"

    const uploadProps = {
      multiple: true,
      dragSortable: true,
      onFileChange: this.onFileChange,
      accept,
      ossParams: ossParams,
      uploadType:'multipart',
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
