import * as React from 'react'
import RcUpload from 'rc-upload'
import classNames from 'classnames'
import uniqBy from 'lodash/uniqBy'
import findIndex from 'lodash/findIndex'
import { T, fileToObject, getFileItem, removeFileItem } from './utils';
import UploadList from './UploadList'
const prefixCls = 'ant-upload'

class Upload extends React.Component {

  static getDerivedStateFromProps(nextProps) {
    if ('fileList' in nextProps) {
      return {
        fileList: nextProps.fileList || [],
      };
    }
    return null;
  }


  progressTimer = null

  upload = null

  constructor(props) {
    super(props);

    this.state = {
      fileList: props.fileList || props.defaultFileList || [],
      dragState: 'drop',
    };

  }

  componentWillUnmount() {
    this.clearProgressTimer();
  }

  saveUpload = (node) => {
    this.upload = node;
  };

  onStart = (file) => {
    const { fileList } = this.state;
    const targetItem = fileToObject(file);
    targetItem.status = 'uploading';
    const nextFileList = fileList.concat();

    const fileIndex = findIndex(nextFileList, ({ uid }) => uid === targetItem.uid);
    if (fileIndex === -1) {
      nextFileList.push(targetItem);
    } else {
      nextFileList[fileIndex] = targetItem;
    }

    this.onChange({
      file: targetItem,
      fileList: nextFileList,
    });
    // fix ie progress
    if (!(window).File || process.env.TEST_IE) {
      this.autoUpdateProgress(0, targetItem);
    }
  };

  onSuccess = (response, file, xhr) => {
    this.clearProgressTimer();
    try {
      if (typeof response === 'string') {
        response = JSON.parse(response);
      }
    } catch (e) {
      /* do nothing */
    }
    const { fileList } = this.state;
    const targetItem = getFileItem(file, fileList);
    // removed
    if (!targetItem) {
      return;
    }
    targetItem.status = 'done';
    targetItem.response = response;
    targetItem.xhr = xhr;
    this.onChange({
      file: { ...targetItem },
      fileList,
    });
  };

  onProgress = (e, file) => {
    const { fileList } = this.state;
    const targetItem = getFileItem(file, fileList);
    // removed
    if (!targetItem) {
      return;
    }
    targetItem.percent = e.percent;
    this.onChange({
      event: e,
      file: { ...targetItem },
      fileList,
    });
  };

  onError = (error, response, file) => {
    this.clearProgressTimer();
    const { fileList } = this.state;
    const targetItem = getFileItem(file, fileList);
    // removed
    if (!targetItem) {
      return;
    }
    targetItem.error = error;
    targetItem.response = response;
    targetItem.status = 'error';
    this.onChange({
      file: { ...targetItem },
      fileList,
    });
  };

  handleRemove = (file) => {
    const { onRemove } = this.props;
    const { fileList } = this.state;

    Promise.resolve(typeof onRemove === 'function' ? onRemove(file) : onRemove).then((ret) => {
      // Prevent removing file
      if (ret === false) {
        return;
      }

      const removedFileList = removeFileItem(file, fileList);

      if (removedFileList) {
        file.status = 'removed'; // eslint-disable-line

        if (this.upload) {
          this.upload.abort(file);
        }

        this.onChange({
          file,
          fileList: removedFileList,
        });
      }
    });
  };

  onChange = (info) => {
    if (!('fileList' in this.props)) {
      this.setState({ fileList: info.fileList });
    }

    const { onChange } = this.props;
    if (onChange) {
      onChange(info);
    }
  };

  onFileDrop = (e) => {
    this.setState({
      dragState: e.type,
    });
  };

  beforeUpload = (file, fileList) => {
    const { beforeUpload } = this.props;
    const { fileList: stateFileList } = this.state;
    if (!beforeUpload) {
      return true;
    }
    const result = beforeUpload(file, fileList);
    if (result === false) {
      this.onChange({
        file,
        fileList: uniqBy(
          stateFileList.concat(fileList.map(fileToObject)),
          (item) => item.uid,
        ),
      });
      return false;
    }
    if (result && (result).then) {
      return result;
    }
    return true;
  };

  clearProgressTimer() {
    clearInterval(this.progressTimer);
  }

  autoUpdateProgress(_, file) {
    const getPercent = genPercentAdd();
    let curPercent = 0;
    this.clearProgressTimer();
    this.progressTimer = setInterval(() => {
      curPercent = getPercent(curPercent);
      this.onProgress(
        {
          percent: curPercent * 100,
        },
        file,
      );
    }, 200);
  }


  renderUploadList = () => {
    const {
      showUploadList,
      listType,
      onPreview,
      onDownload,
      previewFile,
      dragSortable,
      onSortEnd,
      disabled,
      signatureUrl,
      isBatch,
      onSelected,
      selectedIds
    } = this.props;
    const { showRemoveIcon, showPreviewIcon, showDownloadIcon } = showUploadList;
    const { fileList } = this.state
    return (
      <UploadList
        listType={listType}
        items={fileList}
        previewFile={previewFile}
        onPreview={onPreview}
        onDownload={onDownload}
        onRemove={this.handleRemove}
        showRemoveIcon={!disabled && showRemoveIcon}
        showPreviewIcon={showPreviewIcon}
        showDownloadIcon={showDownloadIcon}
        dragSortable={dragSortable}
        onSortEnd={onSortEnd}
        signatureUrl={signatureUrl}
        isBatch={isBatch}
        selectedIds={selectedIds}
        onSelected={onSelected}
      />
    );
  }

  renderUpload = () => {
    const {
      className,
      showUploadList,
      listType,
      type,
      disabled,
      children,
      style,
    } = this.props;
    const { fileList, dragState } = this.state;
    const rcUploadProps = {
      onStart: this.onStart,
      onError: this.onError,
      onProgress: this.onProgress,
      onSuccess: this.onSuccess,
      ...this.props,
      prefixCls,
      beforeUpload: this.beforeUpload,
    };

    delete rcUploadProps.className;
    delete rcUploadProps.style;

    // Remove id to avoid open by label when trigger is hidden
    // !children: https://github.com/ant-design/ant-design/issues/14298
    // disabled: https://github.com/ant-design/ant-design/issues/16478
    //           https://github.com/ant-design/ant-design/issues/24197
    if (!children || disabled) {
      delete rcUploadProps.id;
    }

    const uploadList = showUploadList ? this.renderUploadList() : null;

    if (type === 'drag') {
      const dragCls = classNames(
        prefixCls,
        {
          [`${prefixCls}-drag`]: true,
          [`${prefixCls}-drag-uploading`]: fileList.some((file) => file.status && file.status === 'uploading'),
          [`${prefixCls}-drag-hover`]: dragState === 'dragover',
          [`${prefixCls}-disabled`]: disabled,
        },
        className,
      );
      return (
        <span>
          <div
            className={dragCls}
            onDrop={this.onFileDrop}
            onDragOver={this.onFileDrop}
            onDragLeave={this.onFileDrop}
            style={style}
          >
            <RcUpload {...rcUploadProps} ref={this.saveUpload} className={`${prefixCls}-btn`}>
              <div className={`${prefixCls}-drag-container`}>{children}</div>
            </RcUpload>
          </div>
          {uploadList}
        </span>
      );
    }

    const uploadButtonCls = classNames(prefixCls, {
      [`${prefixCls}-select`]: true,
      [`${prefixCls}-select-${listType}`]: true,
      [`${prefixCls}-disabled`]: disabled,
    });

    const uploadButton = (
      <div className={uploadButtonCls} style={children ? undefined : { display: 'none' }}>
        <RcUpload {...rcUploadProps} ref={this.saveUpload} />
      </div>
    );

    if (listType === 'picture-card') {
      const { dragSortable } = this.props
      const type = dragSortable ? 'nsc' : 'ant'
      return (
        <span className={classNames(className, `${type}-upload-picture-card-wrapper`)}>
          {uploadList}
          {uploadButton}
        </span>
      );
    }

    return (
      <span className={className}>
        {uploadButton}
        {uploadList}
      </span>
    );
  }

  render() {
    return <div>{this.renderUpload()}</div>;
  }
}

export default Upload