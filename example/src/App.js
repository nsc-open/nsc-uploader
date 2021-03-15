import React, { Component } from 'react'
import { Icon, message, Modal } from 'antd'
import { Uploader } from 'nsc-uploader'
import 'antd/dist/antd.css'
const OSS = require('ali-oss')

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
  uri: "http://corridorcleaningphoto.oss-cn-beijing.aliyuncs.com/2a0fd55b26bdbcaccf8178fc6579811d",
  volCode: null,
  volId: "ef31a5d3-eb54-11ea-abe5-735dc8c1a294",
  volRevision: "7",
}
]

const ossParams = {
  region: OSS_ENDPOINT,
  bucket: OSS_BUCKET,
  accessKeyId: "STS.NThU2qDSGUNmZJ4uNUnpK6QJu",
  accessKeySecret: "FGjhWzvR1iNFb5FPLzuAHRnMX9NQu4SwwqbjugikYoTA",
  Expiration: "2021-03-15T07:44:24Z",
  stsToken: "CAISjgJ1q6Ft5B2yfSjIr5fdHojFqYxm4oyGWGyFkU4AYv9n2ZThlzz2IHpEf3NhAO8Yt/swn2pY5vwclq19UZpOHdYd2gWbqcY5yxioRqackf7XhOV2tf/IMGyXDAGBq622Su7lTdTbV+6wYlTf7EFayqf7cjPQMD7INoaS29wdLbZxZASjaidcD9p7PxZrrNRgVUHcLvGwKBXn8A2yaUNjoVh7kngtq/b9kI++kkOP0gagl75P/NisfMn+NJJWUc0hA4vv7otfbbHc1SNc0R9O+ZptgbZMkTW95YvNWAMAukrYarWLqYc/fFUnfNszH69Vsf77juZkve/ekYv6zRtXNP1SST7YQI2wOTsxuiVz4L0agAGllj7UHzVUR8mX1naFdtNWH8LmeZmlE+cgUJ8TJHyCy8rL8W+2ueJztxEuesliFqUa24eYBTLhoGG/uBh64xWxCRu6YrGLuOBk2h3z8Op27TUcHi8Wx0gYg+9Cy32WI5Hq5LmFe4EXo8vcnOe16C3quD3UlmsCqf7DvDRd5+T4KA=="
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
    const { previewVisible, previewImage, previewFileVisible, previewFile, fileList } = this.state
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
