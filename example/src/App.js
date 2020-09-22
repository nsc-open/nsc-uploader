import React, { Component } from 'react'
import { Icon ,message,Modal } from 'antd'
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
const OSS_BUCKET ='corridorcleaningphoto'
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
  fileExt: "jpg",
  fileName: "微信图片_20200616152747.jpg",
  fileSize: "41219",
  fileType: "image/jpeg",
  id: "24137692-f0df-11ea-8146-f9a5d6b3bf59",
  isDeleted: null,
  sortNo: "2",
  updatedAt: "2020-09-07 15:52:55",
  updatedBy: "1732",
  uri: "http://corridorcleaningphoto.oss-cn-beijing.aliyuncs.com/647d57d9d156b144b276c0fcae9fd761_1599459834788",
  volCode: null,
  volId: "ef31a5d3-eb54-11ea-abe5-735dc8c1a294",
  volRevision: "7",
}
]
const ossParams = {
  region: OSS_ENDPOINT,
  bucket: OSS_BUCKET,
  accessKeyId: "STS.NTuP5wWprTpUCXNidKvVZRdgW",
  accessKeySecret: "Gnd4ggSmSe9LSYPjeM8ZTrCYQj9T9p278UXaHPnXWbn8",
  Expiration: "2020-09-09T08:25:28Z",
  stsToken: "CAISjgJ1q6Ft5B2yfSjIr5fAG4/Duq9T47K+QX7/jWQeetl2vaHMtTz2IHpEf3NhAO8Yt/swn2pY5vwclq19UZpOHaIs5CzfqMY5yxioRqackf7XhOV2tf/IMGyXDAGBq622Su7lTdTbV+6wYlTf7EFayqf7cjPQMD7INoaS29wdLbZxZASjaidcD9p7PxZrrNRgVUHcLvGwKBXn8A2yaUNjoVh7kngtq/b9kI++kkOP0gagl75P/NisfMn+NJJWUc0hA4vv7otfbbHc1SNc0R9O+ZptgbZMkTW95YvNWAMAukrYarWLqYc/fFUnfNszH69Vsf77juZkve/ekYv6zRtXNP1SST7YQI2wOTsxuiVz4L0agAF4tSdtT3kTS4ZYrosR6QYS2qDWI9I6UGCLITTphI8GN73isRVeF94mzuOIDU4GY4opV1I+x00WprKfmvHAf3zeV26TTYl1Fn9D7gg1ogYRfR5hRII10Tv2KySG97p0z1pTTSCTGwFGZQmTMFPAnnc58bznOuq1liIW/seqp1y0HQ=="
}


class App extends Component {
  constructor (props) {
    super(props)
      this.state={
        fileList:defaultFiles,
        previewVisible:false,
        previewImage:null,
        previewFileVisible:false,
        previewFile:null
      }
    }

  getOssParams = () => new Promise((resolve,reject)=>{
    resolve(ossParams)
  })

  signatureUrl = (url) => {
    const client = new OSS(ossParams)
    const index = url.lastIndexOf('/') + 1
    return client.signatureUrl(url.substring(index))
  }


	onFileChange = (file,fileList) => {
		this.setState({fileList:fileList})
  }
  handleCancel=()=>{
		this.setState({ previewVisible: false })
	}
	handlePdfViewCancel=()=>{
		this.setState({ previewFileVisible: false })
	}
	  

  onSortEnd = (oldList,newList)=>{
    console.log(oldList,newList)
  }

  onChange=({file})=>{
    console.log(file)
  }

  beforeUpload=({file})=>{
    console.log(file)
  }
  
  render() {
    const { previewVisible ,previewImage,previewFileVisible,previewFile,fileList } = this.state
		let accept = "*"

		const uploadProps = {
      multiple: true,
      dragSortable:true,
		  onFileChange:this.onFileChange,
		  maxFileSize:2,
      accept,
      onSortEnd:this.onSortEnd,
      onDownload:this.onDownload,
      defaultFiles:fileList,
      fileScales:[1,2],
      showRadioButton:  {
        placement:'left' , 
        radioItems:[ 
          {key:'picture-card',value:'网格'},
          {key:'text',value:'列表'}
        ]
      }
    }
    
    return (
      <div style={{margin:'50px',width:'50%'}}>
        <Uploader 
          {...uploadProps}
          showUploadList={{showDownloadIcon : true}}
        />
      </div>
      
    )
  }
}


export default App
