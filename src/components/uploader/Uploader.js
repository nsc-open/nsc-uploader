import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Icon, Button, message, Radio, Checkbox } from 'antd'
import Upload from './Upload'
import Dragger from './Dragger'
import { getUploadClient, encodeFileName, arrayMove, toFile, toAttachment, isDoc, imgSize } from './utils'
import maxBy from 'lodash/maxBy'
import { Lightbox } from 'nsc-lightbox'
import co from './Co'
import Url from 'url-parse'
import './style/index.css'
import './style/antd.css'

const sorter = (a, b) => a.sortNo - b.sortNo

const Uploader = (props) => {
  const {
    defaultFiles,
    getOssParams,
    ossParams,
    dragSortable,
    type,
    maxFileNum,
    disabled,
    children,
    className = '',
    showUploadButton,
    customRadioButton,
    showBatchButton,
    ...restProps
  } = props

  // const RNDContext = createDndContext(HTML5Backend)
  // const manager = useRef(RNDContext)

  const [listType, setListType] = useState('picture-card')
  const [fileList, setFileList] = useState([])
  const [isBatch, setIsBatch] = useState(false)
  const [selectedIds, setSelectedIds] = useState([])
  const [indeterminate, setIndeterminate] = useState(true)
  const [checkAll, setCheckAll] = useState(false)
  const [previewVisible, setPreviewVisible] = useState(false)
  const [lightboxFiles, setLightboxFiles] = useState([])
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [uploadClient, setUploadClient] = useState(null)

  useEffect(() => {
    if (getOssParams || (getOssParams && ossParams && (new Date(ossParams.Expiration) < Date.now()))) {
      getOssParams().then(r => {
        const uploadClient = getUploadClient(r)
        setUploadClient(uploadClient)
        setFileList(defaultFiles.map(toFile).sort(sorter))
      })
    } else if (ossParams) {
      const uploadClient = getUploadClient(ossParams)
      setUploadClient(uploadClient)
      setFileList(defaultFiles.map(toFile).sort(sorter))
    }
  }, [])
  useEffect(() => {
    setFileList(defaultFiles.map(toFile).sort(sorter))
  }, [props.defaultFiles])

  const toFile = attachment => ({
    uid: attachment.id,
    id: attachment.id,
    name: attachment.fileName,
    encodedFileName: attachment.encodedFileName,
    url: signatureUrl(attachment.uri),
    size: attachment.fileSize,
    ext: attachment.fileExt,
    type: attachment.fileType,
    sortNo: attachment.sortNo,
    status: attachment.status,
    percent: attachment.percent,
  })

  const handlePreview = (file) => {
    const files = fileList.map(toAttachment)
    const lightboxFiles = files.map((a) => {
      return { ...a, alt: a.name, uri: isDoc(a) ? `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(signatureUrl(a.uri))}` : signatureUrl(a.uri) }
    }
    )
    const lightboxIndex = (files.map(a => a.id).indexOf(file.id) || 0)
    setPreviewVisible(true)
    setLightboxFiles(lightboxFiles)
    setLightboxIndex(lightboxIndex)

  }

  const signatureUrl = (uri) => {
    let url = decodeURIComponent(uri)
    const { pathname } = new Url(decodeURIComponent(uri))
    const fileName = pathname.substr(1)
    if (uploadClient) {
      url = uploadClient.signatureUrl(fileName)
    }
    return url
  }

  const onLightboxClose = () => {
    setPreviewVisible(false)
  }


  const handleChange = (file, fileList) => {
    const { onFileChange } = props
    onFileChange && onFileChange(toAttachment(file), fileList.map(toAttachment))
  }

  const handleDownload = (file) => {
    const { onDownload } = props
    file.url = signatureUrl(file.url)
    onDownload && onDownload(toAttachment(file))
  }

  const handleRemove = (file) => {
    const { autoSave, onRemove } = props
    const newFileList = fileList.filter(f => f.id !== file.id)
    setFileList(newFileList)
    handleChange(file, newFileList)

    if (onRemove) {
      onRemove(toAttachment(file))
    }
  }

  const save = (file) => {
    const { onSave } = props
    return onSave(toAttachment(file)).then(r => {
      message.success('上传成功')
      return toFile(r)
    }).catch(e => {
      console.error(e)
      message.error('上传失败')
    })
  }

  const hasExtension = (fileName) => {
    const { fileExtension } = props
    const extensions = fileExtension ? fileExtension : []
    const pattern = '(' + extensions.join('|').replace(/\./g, '\\.') + ')$';
    return new RegExp(pattern, 'i').test(fileName);
  }

  //文件先上传至阿里云
  const beforeUpload = async (file, files) => {
    const { autoSave, maxFileSize, maxFileNum, fileExtension, uploadType, fileErrorMsg, onProgress, fileScales } = props
    //Check for file extension
    if (fileExtension && !hasExtension(file.name)) {
      message.error(fileErrorMsg && fileErrorMsg.fileExtensionErrorMsg ? fileErrorMsg.fileExtensionErrorMsg : `不支持的文件格式，请上传格式为${fileExtension.join(',')}的文件`)
      return false
    }
    // Check for file size
    if (file.size / 1024 / 1024 > maxFileSize) {
      message.error(fileErrorMsg && fileErrorMsg.fileSizeErrorMsg ? fileErrorMsg.fileSizeErrorMsg : `文件过大，最大可上传${maxFileNum}`)
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
  }

  const uploadFile = ({ file }) => {

    const { autoSave, uploadType, onProgress } = props
    let encodedFileName = encodeFileName(file.name)
    const maxItem = maxBy(fileList, i => i.sortNo)
    const maxSortNo = maxItem ? maxItem.sortNo : 0
    // const indexNo = fileList.findIndex(i => i.uid === file.uid)
    const newItem = {
      uid: file.uid,
      id: file.uid,
      encodedFileName,
      name: file.name,
      percent: 0,
      url: '',
      status: 'uploading',
      size: file.size,
      ext: file.name.split('.').pop(),
      type: file.type,
      sortNo: maxSortNo + 1
    }
    if (uploadType !== 'multiple') {
      const newFileList = fileList.concat([newItem])
      newFileList.sort(sorter)
      setFileList(newFileList)
    }

    // start：进度条相关
    if (uploadClient) {
      const _ = this
      const progress = function* generatorProgress(p, cpt, aliRes) {
        // const indexNo = files.findIndex(i => i.uid === file.uid)
        const requestUrl = aliRes && aliRes.res && aliRes.res.requestUrls ? aliRes.res.requestUrls[0] : ''
        const { origin } = new Url(decodeURIComponent(requestUrl))
        const url = cpt ? origin + "/" + aliRes.name : ''
        const newItem = {
          uid: file.uid,
          id: file.uid,
          encodedFileName,
          name: file.name,
          percent: p * 100,
          url,
          status: p === 1 ? 'done' : 'uploading',
          size: file.size,
          ext: file.name.split('.').pop(),
          type: file.type,
          sortNo: maxSortNo + 1
        }
        // console.log('newItem', newItem)

        const newFileList = fileList.filter(i => i.uid !== file.uid).concat([newItem])
        newFileList.sort(sorter)
        setFileList(newFileList)
        onProgress && onProgress(p, cpt, aliRes)
      }

      const options = {
        progress,
        partSize: 1000 * 1024,//设置分片大小
        timeout: 120000000,//设置超时时间
      }

      co(function* () {
        return yield uploadClient.multipartUpload(encodedFileName, file, options)
      }).then(aliRes => {
        const requestUrl = aliRes && aliRes.res && aliRes.res.requestUrls ? aliRes.res.requestUrls[0] : ''
        const { origin } = new Url(decodeURIComponent(requestUrl))
        const url = origin + "/" + aliRes.name
        // const indexNo = files.findIndex(i => i.uid === file.uid)
        onProgress && onProgress(aliRes)
        const newFile = {
          uid: file.uid,
          id: file.uid,
          encodedFileName,
          name: file.name,
          url,
          percent: 100,
          status: 'done',
          size: file.size,
          ext: file.name.split('.').pop(),
          type: file.type,
          sortNo: maxSortNo + 1
        }

        const newFileList = fileList.filter(i => i.uid !== file.uid).concat([newFile])
        newFileList.sort(sorter)
        setFileList(newFileList)
        handleChange(newFile, newFileList)
        if (autoSave) {
          save(newFile)
        } else {
          return newFile
        }
      }).catch(e => {
        console.error('Uploader error', e)
        message.error(`${file.name} 预处理失败`)
      })
      // not do the upload after image added
      return false
    }
  }

  const onSortEnd = (sourceIndex, destinationIndex) => {
    const { onSortEnd } = props
    if (sourceIndex) {
      const newFileList = arrayMove(fileList, sourceIndex, destinationIndex)
      setFileList(newFileList)
      onSortEnd && onSortEnd(fileList.map(toAttachment), newFileList.map(toAttachment))
    }

  }

  const onListTypeChange = (e) => {
    setListType(e.target.value)
  }

  const renderRadio = (showRadioButton) => {
    const defaultRadioItems = [
      { key: 'picture-card', value: '网格' },
      { key: 'text', value: '列表' },
      { key: 'picture', value: '图片列表' },
    ]
    const { placement = 'right', showRadioTitle = true, radioItems = defaultRadioItems } = showRadioButton
    return <div className={`nsc-uploader-radio nsc-uploader-radio-${placement}`}>
      {showRadioTitle && <span>文件展示样式：</span>}
      <Radio.Group onChange={onListTypeChange} value={listType}>
        {radioItems && radioItems.map(item => <Radio key={item.key} value={item.key}>{item.value}</Radio>)}
      </Radio.Group>
    </div>
  }

  const onBatchClicked = () => {
    setIsBatch(!isBatch)
    setSelectedIds([])
    setCheckAll(false)
    setIndeterminate(true)
  }

  const onBatchDelete = () => {
    if (selectedIds.length > 0) {
      const { autoSave, onRemove } = props
      const newFileList = fileList.filter(f => !selectedIds.includes(f.uid))
      setFileList(newFileList)

      if (onRemove) {
        onRemove(newFileList.map(toAttachment))
      }
    }

  }

  const onSelected = selectedIds => {
    const plainOptions = fileList.map(i => i.uid)
    setSelectedIds(selectedIds)
    setIndeterminate(!!selectedIds.length && selectedIds.length < plainOptions.length)
    setCheckAll(selectedIds.length === plainOptions.length)
  }

  const onCheckAllChange = e => {
    const plainOptions = fileList.map(i => i.uid)
    setSelectedIds(e.target.checked ? plainOptions : [])
    setIndeterminate(false)
    setCheckAll(e.target.checked)
  }

  const newListType = props.listType ? props.listType : listType

  const showRadioButton = props.listType ? false : props.showRadioButton
  //文件列表按上传顺序排序
  fileList.sort(sorter)
  const newProps = {/*  */
    ...restProps,
    fileList: fileList,
    listType: newListType,
    beforeUpload: beforeUpload,
    customRequest: uploadFile,
    dragSortable: dragSortable,
    disabled: disabled,
    onSortEnd: onSortEnd,
    className: showUploadButton ? `${className}` : type === 'dragger' ? `${className} nsc-uploader-dragger-hide` : `${className}`,
    onPreview: 'onPreview' in props ? props.onPreview : handlePreview,
    onRemove: handleRemove,
    onDownload: handleDownload,
    signatureUrl: signatureUrl,
    onSelected: onSelected,
    selectedIds,
    isBatch,
  }

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

  const uploader = type === 'dragger' ?
    <Dragger {...newProps} >
      {showUploadButton ? children ? children : maxFileNum in newProps && fileList.length >= maxFileNum ? null : draggerBtn : null}
    </Dragger>
    : <Upload {...newProps}>
      {showUploadButton ? children ? children : maxFileNum in newProps && fileList.length >= maxFileNum ? null : listType === 'picture-card' ? cardButton : textButton : null}
    </Upload>
  return (
    <div className='nsc-upload-container'>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {customRadioButton ? customRadioButton : showRadioButton ? renderRadio(showRadioButton) : null}
        {showBatchButton &&
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {isBatch && <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}> 全选</Checkbox >}
            <Button type="primary" onClick={onBatchClicked} style={{ marginRight: '10px' }}>
              {isBatch
                ? `取消选择(${selectedIds.length})`
                : '批量选择'}
            </Button>
            {isBatch && <Button type="danger" onClick={onBatchDelete}>批量删除</Button>}
          </div>
        }
      </div>
      {uploader}
      {previewVisible && lightboxFiles.length > 0 && <Lightbox
        visible={previewVisible}
        imgvImages={lightboxFiles}
        activeIndex={lightboxIndex}
        onCancel={onLightboxClose}
      />
      }
    </div>
  )
}

Uploader.propTypes = {
  getOssParams: PropTypes.func,
}

Uploader.defaultProps = {
  dragSortable: false,
  defaultFiles: [],
  multiple: false,
  type: 'select',
  uploadType: 'multiple',
  showUploadButton: true,
  showRadioButton: true,
  showBatchButton: true,
}

export default Uploader
