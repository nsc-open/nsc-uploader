import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Icon, Button, message, Radio } from 'antd'
import Upload from './Upload'
import Dragger from './Dragger'
import { getUploadClient, encodeFileName, arrayMove, toAttachment, isDoc, imgSize } from './utils'
import isEqual from 'lodash/isEqual'
import maxBy from 'lodash/maxBy'
import { Lightbox } from 'nsc-lightbox'
import co from './Co'
import Url from 'url-parse'

import './style/index.css'

const sorter = (a, b) => a.sortNo - b.sortNo

class Uploader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listType: 'picture-card',
      fileList: [], // [{ id, name, encodeFileName, size, type, ext, uid, url }]
    }
    this.uploadClient = null
  }

  componentDidMount() {
    const { defaultFiles, getOssParams, ossParams } = this.props
    if (getOssParams || (getOssParams && ossParams && (new Date(ossParams.Expiration) < Date.now()))) {
      getOssParams().then(r => {
        this.uploadClient = getUploadClient(r)
        this.setState({ fileList: defaultFiles.map(this.toFile).sort(sorter) })
      })
    } else if (ossParams) {
      this.uploadClient = getUploadClient(ossParams)
      this.setState({ fileList: defaultFiles.map(this.toFile).sort(sorter) })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.defaultFiles, this.props.defaultFiles)) {
      this.setState({ fileList: nextProps.defaultFiles.map(this.toFile).sort(sorter) })
    }
  }

  toFile = attachment => ({
    uid: attachment.id,
    id: attachment.id,
    name: attachment.fileName,
    encodedFileName: attachment.encodedFileName,
    url: this.signatureUrl(attachment.uri),
    size: attachment.fileSize,
    ext: attachment.fileExt,
    type: attachment.fileType,
    sortNo: attachment.sortNo,
    status: 'done',
  })

  handleCancel = () => this.setState({ previewVisible: false })

  onPreview = (file) => {
    const { onPreview } = this.props
    onPreview && onPreview(toAttachment(file))
  }

  handlePreview = (file) => {
    const { fileList } = this.state
    const files = fileList.map(toAttachment)
    const lightboxFiles = files.map((a) => {
      return { ...a, alt: a.name, uri: isDoc(a) ? `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(this.signatureUrl(a.uri))}` : this.signatureUrl(a.uri) }
    }
    )
    const lightboxIndex = (files.map(a => a.id).indexOf(file.id) || 0)
    this.setState({
      lightboxFiles,
      previewVisible: true,
      lightboxIndex
    })
  }

  signatureUrl = (url) => {
    url = decodeURIComponent(url)
    const { pathname } = new Url(decodeURIComponent(url))
    const fileName = pathname.substr(1)
    if (this.uploadClient) {
      return this.uploadClient.signatureUrl(fileName)
    }
    return url
  }

  onLightboxClose = () => {
    this.setState({ previewVisible: false })
  }


  handleChange = (file, fileList) => {
    const { onFileChange } = this.props
    onFileChange && onFileChange(toAttachment(file), fileList.map(toAttachment))
  }

  handleDownload = (file) => {
    const { onDownload } = this.props
    file.url = this.signatureUrl(file.url)
    onDownload && onDownload(toAttachment(file))
  }

  handleRemove = (file) => {
    const { autoSave, onRemove } = this.props
    const { fileList } = this.state
    const newFileList = fileList.filter(f => f.id !== file.id)

    this.setState({ fileList: newFileList })
    this.handleChange(file, newFileList)

    if (onRemove) {
      onRemove(toAttachment(file))
    }
  }

  save(file) {
    const { onSave } = this.props
    return onSave(toAttachment(file)).then(r => {
      message.success('上传成功')
      return this.toFile(r)
    }).catch(e => {
      console.error(e)
      message.error('上传失败')
    })
  }

  hasExtension = (fileName) => {
    const { fileExtension } = this.props
    const extensions = fileExtension ? fileExtension : []
    const pattern = '(' + extensions.join('|').replace(/\./g, '\\.') + ')$';
    return new RegExp(pattern, 'i').test(fileName);
  }

  //文件先上传至阿里云
  beforeUpload = async (file, files) => {
    const { autoSave, maxFileSize, maxFileNum, fileExtension, uploadType, fileErrorMsg, onProgress, fileScales } = this.props
    const { fileList } = this.state
    //Check for file extension
    if (fileExtension && !this.hasExtension(file.name)) {
      message.error(fileErrorMsg && fileErrorMsg.fileExtensionErrorMsg ? fileErrorMsg.fileExtensionErrorMsg : `不支持的文件格式，请上传格式为${fileExtension.join(',')}的文件`)
      return false
    }
    // Check for file size
    if (file.size / 1024 / 1024 > maxFileSize) {
      message.error(fileErrorMsg && fileErrorMsg.fileSizeErrorMsg ? fileErrorMsg.fileSizeErrorMsg : `文件过大，最大可上传${maxFileSize}M`)
      return false
    }
    // Check for file number
    if (files.length + fileList.length > maxFileNum) {
      message.error(fileErrorMsg && fileErrorMsg.fileNumerErrorMsg ? fileErrorMsg.fileNumerErrorMsg : `文件数量过多，最多可上传${maxFileNum}份`)
      return false
    }
    // Check for file scale
    if (fileScales) {
      let isScale = true
      await imgSize(file, fileScales).then(r => {
        if (!r) {
          message.error(fileErrorMsg && fileErrorMsg.fileNumerErrorMsg ? fileErrorMsg.fileScaleErrorMsg : `添加失败: ${file.name} - 错误的图片尺寸 (请使用${fileScales.join(':1 或')}:1的图片)`)
          isScale = false
        }
      })
      if (!isScale) {
        return false
      }
    }

    const maxItem = maxBy(fileList, i => i.sortNo)
    const maxSortNo = maxItem ? maxItem.sortNo : 0

    const hideLoading = message.loading('文件正在预处理', 0)
    let encodedFileName = encodeFileName(file.name)

    const progress = function* generatorProgress(p, cpt, res) {
      onProgress && onProgress(p, cpt, res)
    }

    const options = {
      progress,
      partSize: 1000 * 1024,//设置分片大小
      timeout: 120000000,//设置超时时间
    }

    if (this.uploadClient) {
      const _this = this
      co(function* () {
        return uploadType === 'multipart' ?
          yield _this.uploadClient.multipartUpload(encodedFileName, file, options)
          : yield _this.uploadClient.put(encodedFileName, file)
      }).then(aliRes => {
        let url = ''
        if (uploadType === 'multipart') {
          const requestUrl = aliRes && aliRes.res && aliRes.res.requestUrls ? aliRes.res.requestUrls[0] : ''
          const { origin } = new Url(decodeURIComponent(requestUrl))
          url = origin + "/" + aliRes.name
        } else {
          url = aliRes.url
          onProgress && onProgress(aliRes)
        }
        const indexNo = files.findIndex(i => i.uid === file.uid)
        const newFile = {
          uid: file.uid,
          id: file.uid,
          encodedFileName,
          name: file.name,
          url: this.signatureUrl(url),
          status: 'done',
          size: file.size,
          ext: file.name.split('.').pop(),
          type: file.type,
          sortNo: maxSortNo + 1 + indexNo
        }
        if (autoSave) {
          return this.save(newFile)
        } else {
          return newFile
        }
      }).then(newFile => {
        fileList.push(newFile)
        fileList.sort(sorter)
        this.setState({ fileList })
        this.handleChange(newFile, fileList)
        hideLoading()
      }).catch(e => {
        console.error('Uploader error', e)
        message.error(`${file.name} 预处理失败`)
        hideLoading()
      })
      // not do the upload after image added
      return false
    }
  }


  onSortEnd = (result) => {
    const { onSortEnd } = this.props
    if (result && result.source && result.destination) {
      const newFileList = arrayMove(this.state.fileList, result.source.index, result.destination.index)
      this.setState({ fileList: newFileList });
      onSortEnd && onSortEnd(this.state.fileList.map(toAttachment), newFileList.map(toAttachment))
    }

  }

  onListTypeChange = (e) => {
    this.setState({ listType: e.target.value })
  }

  renderRadio = (showRadioButton) => {
    const defaultRadioItems = [
      { key: 'picture-card', value: '网格' },
      { key: 'text', value: '列表' },
      { key: 'picture', value: '图片列表' },
    ]
    const { placement = 'right', showRadioTitle = true, radioItems = defaultRadioItems } = showRadioButton
    return <div className={`nsc-uploader-radio nsc-uploader-radio-${placement}`}>
      {showRadioTitle && <span>文件展示样式：</span>}
      <Radio.Group onChange={this.onListTypeChange} value={this.state.listType}>
        {radioItems && radioItems.map(item => <Radio key={item.key} value={item.key}>{item.value}</Radio>)}
      </Radio.Group>
    </div>
  }

  render() {
    const { fileList, previewVisible, lightboxFiles, lightboxIndex } = this.state
    const {
      dragSortable,
      beforeUpload,
      type,
      maxFileNum,
      disabled,
      children,
      className = '',
      showUploadButton,
      customRadioButton,
      displayTools,
      ...restProps
    } = this.props

    const listType = this.props.listType ? this.props.listType : this.state.listType

    const showRadioButton = this.props.listType ? false : this.props.showRadioButton
    const props = {/*  */
      ...restProps,
      fileList: fileList,
      listType: listType,
      beforeUpload: beforeUpload ? beforeUpload : this.beforeUpload,
      dragSortable: dragSortable,
      disabled: disabled,
      onSortEnd: this.onSortEnd,
      className: showUploadButton ? `${className}` : type === 'dragger' ? `${className} nsc-uploader-dragger-hide` : `${className}`,
      onPreview: 'onPreview' in this.props ? this.props.onPreview : this.handlePreview,
      onRemove: this.handleRemove,
      onDownload: this.handleDownload,
    }
    //文件列表按上传顺序排序
    fileList.sort(sorter)

    //listType === "picture-card"时 默认上传按钮
    const cardButton = (
      <div>
        <Icon type="plus" />
        <div className="uploadText">上传文件</div>
      </div>
    );

    //listType === "text' 或 'picture"时默认上传按钮
    const textButton = (
      <Button>
        <Icon type="upload" /> 上传文件
      </Button>
    );

    //拖动上传时默认上传按钮
    const draggerBtn = (
      <div>
        <p className="ant-upload-drag-icon">
          <Icon type="inbox" style={{ color: '#3db389' }} />
        </p>
        <p className="ant-upload-text">点击获取拖动 图片或文档 到这块区域完成文件上传</p>
      </div>
    )
    return (
      <div className='nsc-upload-container'>
        {customRadioButton ? customRadioButton : showRadioButton ? this.renderRadio(showRadioButton) : null}
        {type === 'dragger' ?
          <Dragger {...props} >
            {showUploadButton ? children ? children : maxFileNum in this.props && fileList.length >= maxFileNum ? null : draggerBtn : null}
          </Dragger>
          : <Upload {...props}>
            {showUploadButton ? children ? children : maxFileNum in this.props && fileList.length >= maxFileNum ? null : listType === 'picture-card' ? cardButton : textButton : null}
          </Upload>}
        {previewVisible && lightboxFiles.length > 0 && <Lightbox
          visible={previewVisible}
          imgvImages={lightboxFiles}
          activeIndex={lightboxIndex}
          displayTools={displayTools}
          onCancel={this.onLightboxClose}
        />
        }
      </div>
    );
  }
}

Uploader.propTypes = {
  getOssParams: PropTypes.func,
}

Uploader.defaultProps = {
  dragSortable: false,
  defaultFiles: [],
  multiple: false,
  type: 'select',
  showUploadButton: true,
  showRadioButton: true,
  displayTools: ['zoomIn', 'zoomOut', 'prev', 'next', 'download', 'close']
}

export default Uploader
