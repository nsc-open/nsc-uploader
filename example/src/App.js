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
const defaultFiles =[{
  cloudDir: null,
  comment: null,
  createdAt: "2020-06-12 09:13:55",
  createdBy: null,
  encodedFileName: "a81b88e1d05964f450d9e0c3b98ea084_1591923471032",
  fileExt: "doc",
  fileName: "360-photo-2",
  fileSize: 34250,
  fileType: "application/doc",
  id: "fc1fbd30-ac49-11ea-96d1-7dc79c40ecd3",
  isDeleted: null,
  setId: "c0660b70-ac47-11ea-b571-cd04ff54552a",
  sortNo: null,
  title: null,
  updatedAt: "2020-06-12 09:13:54",
  updatedBy: "74",
  uploadedFrom: null,
  uri:'http://corridorcleaningphoto.oss-cn-beijing.aliyuncs.com/cc941191cb8eb3a190a9243c070f1cb5_1599531912024'
},{
  cloudDir: null,
  comment: null,
  createdAt: "2020-06-12 09:13:50",
  createdBy: null,
  encodedFileName: "a81b88e1d059640d9e0c3b98ea084_159192341032",
  fileExt: "pdf",
  fileName: "2",
  fileSize: 34250,
  fileType: "application/pdf",
  id: "fc1fbd30-ac49-11ea-96-7dc79c40ecd3",
  isDeleted: null,
  setId: "c0660b70-ac47-11ea-b571-cd0sf54s52a",
  sortNo: null,
  title: null,
  updatedAt: "2020-06-12 09:13:50",
  updatedBy: "74",
  uploadedFrom: null,
  uri:'http://corridorcleaningphoto.oss-cn-beijing.aliyuncs.com/cc941191cb8eb3a190a9243c070f1cb5_1599531912024'
}
]
const ossParams={
  region:OSS_ENDPOINT,
  bucket:OSS_BUCKET,
  accessKeyId: "STS.NUNzcFFm1UzeK512WDgPJPU7V",
  accessKeySecret: "ECfswkWN4FFoTN3bh2s7eXg6sW55icsjjme1P1ZxhRjc",
  Expiration: "2020-09-08T04:03:36Z",
  stsToken: "CAISjgJ1q6Ft5B2yfSjIr5b7Mdnyq7IQ4riOSROA1lcRa99mv5CctDz2IHpEf3NhAO8Yt/swn2pY5vwclq19UZpOHaxqjXzeqMY5yxioRqackf7XhOV2tf/IMGyXDAGBq622Su7lTdTbV+6wYlTf7EFayqf7cjPQMD7INoaS29wdLbZxZASjaidcD9p7PxZrrNRgVUHcLvGwKBXn8A2yaUNjoVh7kngtq/b9kI++kkOP0gagl75P/NisfMn+NJJWUc0hA4vv7otfbbHc1SNc0R9O+ZptgbZMkTW95YvNWAMAukrYarWLqYc/fFUnfNszH69Vsf77juZkve/ekYv6zRtXNP1SST7YQI2wOTsxuiVz4L0agAFpRiynzV+BNEqQ4E1NvxQNh4NSLFLfVXj9UbPxXdp1x0gd3gINce2NgcdZfnHZx+DszMpuqh7DjTeYppC32b4dYLoIybmhciSAW0gu8sKmhlUMG2yyzDD5+3VNy51AuNKvdEuCqbWi0fil2rIbg78raRkyMPxAGBPUuiQita+Z9g=="
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
		  getOssParams:this.getOssParams,
      multiple: true,
      dragSortable:true,
		  onFileChange:this.onFileChange,
		  maxFileSize:2,
      accept,
      onSortEnd:this.onSortEnd,
      onDownload:this.onDownload,
      defaultFiles:fileList,
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
