import React, { Component } from 'react'
import { Icon ,message,Modal } from 'antd'
import { Uploader } from 'nsc-uploader'
import 'antd/dist/antd.css'

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
  uri:'http://47.92.150.213:7040/api/workReports/93770d30-af0d-11ea-a637-236812180fd0'
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
  uri:'http://47.92.150.213:7040/api/workReports/93770d30-af0d-11ea-a637-236812180fd0'
}
]
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
    const ossParams={
      region:OSS_ENDPOINT,
      bucket:OSS_BUCKET,
      accessKeyId: "STS.NUmxYzugX7UKmmUhGDJ6NtqzR",
      accessKeySecret: "57UtphQ5rGUDnbgVhP5YbKNkFmzPSYNeEctEvgTuTBoz",
      stsToken: "CAISjgJ1q6Ft5B2yfSjIr5bYM+POmLh5gJegb0vkjEcRRrlim7TRsDz2IHpEf3NhAO8Yt/swn2pY5vwclq19UZpOHdtFsHmzqMY5yxioRqackf7XhOV2tf/IMGyXDAGBq622Su7lTdTbV+6wYlTf7EFayqf7cjPQMD7INoaS29wdLbZxZASjaidcD9p7PxZrrNRgVUHcLvGwKBXn8A2yaUNjoVh7kngtq/b9kI++kkOP0gagl75P/NisfMn+NJJWUc0hA4vv7otfbbHc1SNc0R9O+ZptgbZMkTW95YvNWAMAukrYarWLqYc/fFUnfNszH69Vsf77juZkve/ekYv6zRtXNP1SST7YQI2wOTsxuiVz4L0agAFYyiOKtyfIdzgwciNR47g/+kXfdPpW7eicNEa+CQmvWEdyZFQMw3wlAI7+eZ+9VoT6YiPPN1y+kNxMbVwHh0k9adNfJrNQJoIiTAC3NmDOeyyUjW6u1kfz4E+JINsIfgb3BRpM94aZt6crhIvbcZ68GfljDYaTILUJbUwRL8zyog=="
    }
    resolve(ossParams)
  })


	onFileChange = (file,fileList) => {
		console.log(file)
		this.setState({fileList:fileList})
  }
  handleCancel=()=>{
		this.setState({ previewVisible: false })
	}
	handlePdfViewCancel=()=>{
		this.setState({ previewFileVisible: false })
	}
	  
	onPreview = (file) => {
    const fileType = file.fileType
    console.log(file)
		if(fileType){
			if (fileType.indexOf('image') !== -1) {
			  this.setState({ previewVisible: true, previewImage:file.uri })
			} else if (fileType.indexOf('pdf') !== -1) {
			   this.setState({ previewFileVisible: true, previewFile:file.uri })
			  //window.open(file.uri)
			} else if (fileType.indexOf('word') !== -1) {
				this.setState({ previewFileVisible: true, previewFile:`https://view.officeapps.live.com/op/view.aspx?src=${file.uri}`})
			} else {
			  message.info('该文件类型不支持预览')
			}
		}else{
			message.info('该文件不支持预览')
		}
	}
  onSortEnd = (oldList,newList)=>{
    console.log(oldList,newList)
  }

  render() {
    const { previewVisible ,previewImage,previewFileVisible,previewFile,fileList } = this.state
		let accept = "image/*, .pdf, .doc, .docx, .xlsx, .xls, .csv"

		const uploadProps = {
		  getOssParams:this.getOssParams,
      multiple: true,
      dragSortable:true,
      listType:'picture-card',
		  onFileChange:this.onFileChange,
		  maxFileSize:2,
		  accept,
      onPreview:this.onPreview,
      onSortEnd:this.onSortEnd,
      onDownload:this.onDownload,
      defaultFiles:fileList,
      showRadioButton:{
        showRadioTitle:false , 
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
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel} width='60%'>
          <img alt="example" style={{ width: '100%', height : '100%' }} src={previewImage} />
        </Modal>
        <Modal visible={previewFileVisible} footer={null} onCancel={this.handlePdfViewCancel} width='60%' >
          <iframe key={`iframe`} width='100%' height='80%' style={{overflowX:'hidden'}} src={ previewFile } ></iframe>
        </Modal>
      </div>
      
    )
  }
}


export default App
