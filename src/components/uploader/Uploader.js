import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Checkbox, message, Radio } from 'antd';
import { InboxOutlined, PlusOutlined } from '@ant-design/icons';
import Upload from './Upload';
import Dragger from './Dragger';
import {
  arrayMove,
  encodeFileName,
  imgSize,
  isDoc,
  toAttachment,
} from './utils';
import isEqual from 'lodash/isEqual';
import maxBy from 'lodash/maxBy';
import { Lightbox } from 'nsc-lightbox';
import { createInstance } from '../../oss';
import './style/index.css';
import uniq from 'lodash/uniq'

const sorter = (a, b) => a.sortNo - b.sortNo;

class Uploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listType: 'picture-card',
      fileList: [], // [{ id, name, encodeFileName, size, type, ext, uid, url }]
      isBatch: false,
      selectedIds: [],
      currentFiles: [],
      checkedAll: false,
      indeterminate: true
    };
    this.uploadClient = null;
  }

  componentDidMount() {
    const { defaultFiles, ossParams } = this.props;
    this.createOssInstance(ossParams);
    this.setState({ fileList: defaultFiles.map(this.toFile).sort(sorter) });
  }

  componentDidUpdate(prevprops) {
    if (!isEqual(prevprops.defaultFiles, this.props.defaultFiles)) {
      this.setState(
        { fileList: this.props.defaultFiles.map(this.toFile).sort(sorter) });
    }
  }
  componentWillUnmount() {
    this.setState({
      fileList: [],
      isBatch: false,
      selectedIds: [],
      checkedAll: false,
      indeterminate: true
    })
  }

  async createOssInstance(ossParams) {
    let params = {};
    if (typeof ossParams === 'object') {
      params = ossParams;
    } else {
      params = await ossParams();
    }
    this.params = params
    this.uploadClient = createInstance(params);
  }

  toFile = attachment => ({
    uid: attachment.id,
    id: attachment.id,
    name: attachment.fileName,
    encodedFileName: attachment.encodedFileName,
    url: attachment.uri ? attachment.uri : attachment.url,
    size: attachment.fileSize,
    ext: attachment.fileExt,
    type: attachment.fileType,
    sortNo: attachment.sortNo,
    status: 'done',
  })

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    const { fileList } = this.state;
    const files = fileList.map(toAttachment);
    const lightboxIndex = (files.map(a => a.id).indexOf(file.id) || 0);
    const lightboxFiles = files.map((a) => {
      return {
        ...a,
        alt: a.name,
        uri: isDoc(a)
          ? `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(
            a.uri)}`
          : a.uri,
      };
    });
    this.setState({
      lightboxFiles,
      previewVisible: true,
      lightboxIndex
    })
  }

  onCheckAllChange = e => {
    const { fileList } = this.state
    const plainOptions = fileList.map(i => i.uid)
    this.setState({ selectedIds: e.target.checked ? plainOptions : [], indeterminate: false, checkedAll: e.target.checked })
  }

  onBatchClicked = () => {
    const { isBatch } = this.state
    this.setState({ isBatch: !isBatch, selectedIds: [], checkedAll: false, indeterminate: true })
  }

  onBatchDelete = () => {
    const { selectedIds, fileList } = this.state
    if (selectedIds.length > 0) {
      const { onRemove } = this.props
      const newFileList = fileList.filter(f => !selectedIds.includes(f.uid))
      this.setState({ fileList: newFileList })
      this.handleChange && this.handleChange({}, newFileList)
      if (onRemove) {
        onRemove(newFileList.map(toAttachment))
      }
    }
  }

  getFiles = () => {
    return this.state.fileList;
  };

  signatureUrl = (url) => {
    return this.uploadClient.signatureUrl(url)
  }

  onLightboxClose = () => {
    this.setState({ previewVisible: false })
  }

  handleChange = (file, fileList) => {
    const { onFileChange } = this.props
    onFileChange && onFileChange(toAttachment(file), fileList.map(toAttachment))
  }

  handleDownload = (file) => {
    const { onDownload } = this.props;
    onDownload && onDownload(toAttachment(file))
  }

  handleRemove = (file) => {
    const { autoSave, onRemove } = this.props
    const { fileList } = this.state
    const newFileList = fileList.filter(f => f.uid !== file.uid)
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
    const { fileExtension } = this.props;
    const extensions = fileExtension ? fileExtension : [];
    const pattern = '(' + extensions.join('|').replace(/\./g, '\\.') + ')$';
    return new RegExp(pattern, 'i').test(fileName);
  };

  afterUploaded = async (files, file, uploadRes, uploadType, encodedFileName) => {
    const { autoSave } = this.props;
    const url = await this.uploadClient.getUploadedUrl(uploadRes, uploadType, file);
    const indexNo = files.findIndex(i => i.uid === file.uid);
    const newFile = { ...files[indexNo] }
    newFile.percent = 1
    newFile.status = 'done'
    newFile.url = url
    if (autoSave) {
      return this.save(newFile)
    } else {
      return newFile
    }
  }

  //文件先上传至阿里云活minio
  beforeUpload = async (file, files) => {
    const { maxFileSize, maxFileNum, fileExtension, uploadType, fileErrorMsg, onProgress, fileScales } = this.props
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
      imgSize(file, fileScales).then(r => {
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
    const maxSortNo = maxItem ? maxItem.sortNo : 0;
    const indexNo = files.findIndex(i => i.uid === file.uid);
    let encodedFileName = encodeFileName(file.name)
    const newFile = {
      uid: file.uid,
      id: file.uid,
      name: file.name,
      encodedFileName,
      url: '',
      status: 'uploading',
      percent: 0,
      size: file.size,
      ext: file.name.split('.').pop(),
      type: file.type,
      sortNo: maxSortNo + 1 + indexNo,
    }
    fileList.push(newFile)
    fileList.sort(sorter)
    this.setState({ fileList: fileList })
  }

  uploadFile = async ({ file }) => {
    const { fileList, currentFiles } = this.state
    // const hideLoading = message.loading('文件正在预处理', 0)
    const uploadType = file.size > (100 * 1024) ? 'multipart' : ''
    if (this.uploadClient) {
      let uploadRes = null;
      let encodedFileName = encodeFileName(file.name)
      try {
        if (uploadType === 'multipart') {
          const _this = this
          const progress = function* generatorProgress(p, cpt, res) {
            if (cpt) {
              const index = fileList.findIndex(i => i.uid === cpt.file.uid)
              const targetFile = { ..._this.state.fileList[index] }
              targetFile.percent = p * 100
              fileList.splice(index, 1, targetFile)
              _this.setState({ fileList: fileList })
            }
          }
          const options = {
            progress,
            partSize: 100 * 1024,//设置分片大小
            timeout: 120000000,//设置超时时间
          }
          uploadRes = await this.uploadClient.multipartUpload(encodedFileName, file, options);
        } else {
          uploadRes = await this.uploadClient.upload(encodedFileName, file);
        }
        const newFile = await this.afterUploaded(fileList, file, uploadRes, uploadType, encodedFileName);
        const index = fileList.findIndex(i => i.uid === newFile.uid)
        fileList.splice(index, 1, newFile)
        this.setState({ fileList: fileList })
        this.handleChange(newFile, fileList);
        // hideLoading();
        // message.success('上传成功');
      } catch (err) {
        const index = fileList.findIndex(i => i.uid === file.uid)
        const newFile = fileList[index]
        newFile.status = 'error'
        fileList.splice(index, 1, newFile)
        this.setState({ fileList: fileList });
        message.error(`${file.name}`)
        // hideLoading()
      }
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

  onChecked = (e, file) => {
    const { selectedIds } = this.state
    let newSelectedIds = []
    if (e.target.checked) {
      newSelectedIds = uniq(selectedIds.concat([file.uid]))
    } else {
      newSelectedIds = selectedIds.filter(i => i !== file.uid)
    }
    this.setState({ selectedIds: newSelectedIds })
  }

  render() {
    const { fileList, previewVisible, lightboxFiles, lightboxIndex, isBatch, selectedIds } = this.state
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
      showBatchButton,
      ...restProps
    } = this.props

    const listType = this.props.listType ? this.props.listType : this.state.listType

    const showRadioButton = this.props.listType ? false : this.props.showRadioButton
    const props = {/*  */
      ...restProps,
      isBatch: this.state.isBatch,
      fileList: fileList,
      listType: listType,
      beforeUpload: beforeUpload ? beforeUpload : this.beforeUpload,
      dragSortable: dragSortable && fileList.every(i => i.status === 'done'),
      disabled: disabled,
      onSortEnd: this.onSortEnd,
      className: showUploadButton ? `${className}` : type === 'dragger' ? `${className} nsc-uploader-dragger-hide` : `${className}`,
      onPreview: 'onPreview' in this.props ? this.props.onPreview : this.handlePreview,
      onRemove: this.handleRemove,
      onChecked: this.onChecked,
      onDownload: this.handleDownload,
      selectedIds: selectedIds,
      onchange: this.handleChange,
      customRequest: this.uploadFile,
    }
    //文件列表按上传顺序排序
    fileList.sort(sorter)

    //listType === "picture-card"时 默认上传按钮
    const cardButton = (
      <div>
        <PlusOutlined />
        <div className="uploadText">上传文件</div>
      </div>
    );

    //listType === "text' 或 'picture"时默认上传按钮
    const textButton = (
      <Button>
        <PlusOutlined /> 上传文件
      </Button>
    );

    //拖动上传时默认上传按钮
    const draggerBtn = (
      <div>
        <p className="ant-upload-drag-icon">
          <InboxOutlined style={{ color: '#3db389' }} />
        </p>
        <p className="ant-upload-text">点击获取拖动 图片或文档 到这块区域完成文件上传</p>
      </div>
    )
    return (
      <div className='nsc-uploader-container'>
        {this.props.showUploadList && <div style={{ marginBottom: (customRadioButton || showRadioButton || showBatchButton) ? '10px' : '0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>{customRadioButton ? customRadioButton : showRadioButton ? this.renderRadio(showRadioButton) : null}</div>
          {showBatchButton &&
            <div>
              {isBatch && <Checkbox indeterminate={this.state.indeterminate} onChange={this.onCheckAllChange} checked={this.state.checkedAll}> 全选</Checkbox >}
              <Button type="primary" onClick={this.onBatchClicked} style={{ marginRight: '10px' }}>
                {isBatch
                  ? `取消选择(${this.state.selectedIds.length})`
                  : '批量选择'}
              </Button>
              {isBatch && <Button type="danger" onClick={this.onBatchDelete}>批量删除</Button>}
            </div>
          }
        </div>}
        {
          type === 'dragger' ?
            <Dragger {...props} >
              {showUploadButton ? children ? children : maxFileNum in this.props && fileList.length >= maxFileNum ? null : draggerBtn : null}
            </Dragger>
            : <Upload {...props}>
              {showUploadButton ? children ? children : maxFileNum in this.props && fileList.length >= maxFileNum ? null : listType === 'picture-card' ? cardButton : textButton : null}
            </Upload>
        }
        {
          previewVisible && lightboxFiles.length > 0 && <Lightbox
            visible={previewVisible}
            imgvImages={lightboxFiles}
            activeIndex={lightboxIndex}
            displayTools={displayTools}
            onCancel={this.onLightboxClose}
          />
        }
      </div >
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
  showBatchButton: false,
  uploadType: 'multipart',
  displayTools: ['zoomIn', 'zoomOut', 'prev', 'next', 'download', 'close']
}

export default Uploader
