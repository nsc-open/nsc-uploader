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
const OSS_ENDPOINT = 'oss-cn-beijing'
const OSS_BUCKET = 'corridorcleaningphoto'
const ossParams = {
  region: OSS_ENDPOINT,
  bucket: OSS_BUCKET,
  accessKeyId: "STS.NSubXf7zv7oZFY1NptwLm1GT2",
  accessKeySecret: "HMe6KsLzLWXxq6p4mcFo7r7dj9JDxDrPpATJgtjwVAgw",
  Expiration: "2021-06-23T03:35:25",
  stsToken: "CAISjAZ1q6Ft5B2yfSjIr5DAKeLS2qVXgK2xRH+AqnAhe8NB3oL/0Dz2IHpEf3NhAO8Yt/swn2pY5vwclq19UZpOHawHuhS7qcY5yxioRqackXPZj9Vd+nXMewW6Dxr8w7WMAYHQR8/cffGAck3NkjQJr5LxaTSlWS7TU/iOkoU1QdkLeQO6YDFaZrJRPRAwkNIGEnHTOP2xSEmI5FDdF011oAFxpHpi4KCkuK2m5wHZkUfxx51exc34KYP2aNJ3btUtEYW+2/Zsd6bGyiVU5hFM9aF5lKxD5TC1VLj/bnBV5xKZSbS2lvRkMA5+YIUjBqdAt4KSvPZku+vV5fKVrhFWJrN6Xjj4ToKty9emfeSyLYQBaKrcMXbA2cz1H/uTiQ4/Zm8BPw5nYscoLmQKaSYhUTbHMKSqih2oKQ6oUPqCy7pkk8g3nV7v58CLK1+VSLGU2CAZPJAkb0Q0MFlUr32DH4YCdwtTCQ0FY5+eUYR0aj1HtKrspne8fyZ8z3ZRzYucAvTNofIwZJnYVJBL2pZ/AZNdqDkSUkjQQbCjgVtuJA4De7tN17T3MpKS8aKMxP7pAdTLEfcaoF5XA0Sz3SOGUiFXNjajpI9hO1yD8IHO0azF9dZsHRMylMM9YCiBddFy1QIEh4K58xWU9sL6T3mu5RBW09LE/o5Jmz0GG/C/mL29syL5tn6darVb/cDMQz9XXAiQcX50y+zo1BBhnR0alHyuMBsy8kmY0X3KHPcWyfuW3HhJcNEx7e3TUGWn5X4yS4DLsbAQUqZ9YeBHVLOw0Bl1gb+VlX/dkonFtggfJ4yQXrA6YolOLgvu6aD2F78/kvNjCDmMAcw6sZdFlTCMxCku0v8Lc9lBcCg+Pos+ZqqOqoOarooGmbUg8PKcJ5ikX7/3jLKdKjHIUz0G1+l6slE0LjyTrraIQFriCvR0+1nXih9dCBS7gtmlqGdYA8ndANtQ3O5dNy3c0ipVNvI3B/U+8oz3bYw/LXcDLJxnVFmuJfJn0+teJTV//aosKKjQBS3C8FjU4f/xlwCGQ8kagAFU4hLgPeyONR/7OwEW+LgQfqNfhjjTLz6HXIdCzdzbJDG24UArMBc3n8D/BPVlg0R0dYYSgYABLTnAdQXgGmWv1xLIwYuVexij9OnRrSGRPATJ7uA7jj9UY5bpri9o26U5p7FusvOxnUYqgINeCAkrktqMwx19SHD9bRKluvlLOg=="
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
      defaultFiles: defaultFiles,
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
