import React, { Component } from 'react'
import { Uploader } from 'nsc-uploader'
import 'antd/dist/antd.css'
const defaultFiles = [{
  category: "print",
  createdAt: "2020-09-07 15:34:13",
  createdBy: "1732",
  encodedFileName: "8e67209cd9a58cdfc9469edfa1484866_1599459834761",
  fileExt: "jpg",
  fileName: "测试图片3.png",
  fileSize: "268713",
  fileType: "image/jpeg",
  id: "24137691-f0df-11ea-8146-f9a5d6b3bf59",
  isDeleted: null,
  sortNo: "1",
  updatedAt: "2020-09-07 15:52:55",
  updatedBy: "1732",
  uri: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  volCode: null,
  volId: "ef31a5d3-eb54-11ea-abe5-735dc8c1a294",
  volRevision: "7",
}
]

const ossParams = {
  region:'',
  bucket: '',
  accessKeyId: "",
  accessKeySecret: "",
  Expiration: "2021-06-23T08:21:20Z",
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

  render() {
    const { fileList } = this.state
    let accept = "*"

    const uploadProps = {
      multiple: true,
      dragSortable: true,
      onFileChange: this.onFileChange,
      accept,
      // ossParams: ossParams,
      uploadType:'multipart',
      onDownload: this.onDownload,
      defaultFiles: defaultFiles,
      showUploadList:{
        showPreviewIcon: true,
        showDownloadIcon: true,
        showRemoveIcon: true
      }
    }

    return (
      <div style={{ margin: '50px', width: '50%' }}>
        <Uploader
          {...uploadProps}
        />
      </div>

    )
  }
}


export default App
