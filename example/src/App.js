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
      accessKeyId: "STS.NUAMYETwYo3yHTLFcRbQ8N5Hd",
      accessKeySecret: "2NxUvM11ju6GLZxbnPM9YRdQdSvMVDZcy9kKqwZAYQeM",
      stsToken: "CAISjgJ1q6Ft5B2yfSjIr5b0BuPxuah42PGSSnL9omMHbt4UofDjhjz2IHpEf3NhAO8Yt/swn2pY5vwclq19UZpOHYdr2zDcqMY5yxioRqackf7XhOV2tf/IMGyXDAGBq622Su7lTdTbV+6wYlTf7EFayqf7cjPQMD7INoaS29wdLbZxZASjaidcD9p7PxZrrNRgVUHcLvGwKBXn8A2yaUNjoVh7kngtq/b9kI++kkOP0gagl75P/NisfMn+NJJWUc0hA4vv7otfbbHc1SNc0R9O+ZptgbZMkTW95YvNWAMAukrYarWLqYc/fFUnfNszH69Vsf77juZkve/ekYv6zRtXNP1SST7YQI2wOTsxuiVz4L0agAFs57d/74mVfTPrhuNUG2P7mLOA0Oc7D5a8MmQCHL+lAwNnpYrbTGzTVquqTeaOyuf/I7qBfcNfGGK0bIiZxFSh5H3raOF7NHSR595g7laH+9n16QlnjBuNSPmZ7nBTqM4xd0viwC4x2uyZ4yxZ+b7oUmGs75ecOGsAtlJ/rvFrcw=="

    }
    resolve(ossParams)
  })


	onFileChange = (file,fileList) => {
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

  onChange=({file})=>{
    console.log(file)
  }

  beforeUpload=({file})=>{
    console.log(file)
  }
  
  render() {
    const { previewVisible ,previewImage,previewFileVisible,previewFile,fileList } = this.state
		let accept = ".xlsx"

		const uploadProps = {
		  getOssParams:this.getOssParams,
      multiple: true,
      dragSortable:false,
		  onFileChange:this.onFileChange,
		  maxFileSize:2,
      accept,
      onPreview:this.onPreview,
      onSortEnd:this.onSortEnd,
      onDownload:this.onDownload,
      defaultFiles:fileList,
			showUploadList: 'showUploadList' in this.props ? this.props.showUploadList: { showDownloadIcon: true },
			showRadioButton: 'showRadioButton' in this.props ? this.props.showRadioButton : {
				placement: 'left',
				radioItems: [
					{ key: 'picture-card', value: '网格' },
					{ key: 'text', value: '列表' }
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
