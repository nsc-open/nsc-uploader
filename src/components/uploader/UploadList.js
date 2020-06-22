import * as React from 'react';
import Animate from 'rc-animate';
import classNames from 'classnames';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { previewImage, isImageUrl } from './utils';
import { Tooltip, Progress , Icon } from 'antd'
import docPng from '../../assets/doc.png'
import pdfPng from '../../assets/pdf.png'
import xlsPng from '../../assets/xls.png'

const prefixCls = 'ant-upload'
const locale = {
    uploading: 'Uploading...',
    removeFile: 'Remove file',
    uploadError: 'Upload error',
    previewFile: 'Preview file',
    downloadFile: 'Download file',
  }

  const getFileTypeImg = (file) =>{
    const fileType = file.type
    if(fileType){
      if(fileType.indexOf('image') !== -1){
        return file.thumbnail || file.url
      }
      if (fileType.indexOf('pdf') !== -1) {
         return pdfPng
      } else if (fileType.indexOf('word') !== -1) {
        return docPng
      } else if (fileType.indexOf('xlsx') !== -1){
        return xlsPng
      }
    }
    return ''
  }

export default class UploadList extends React.Component {
    static defaultProps = {
        listType: 'text', // or picture
        progressAttr: {
          strokeWidth: 2,
          showInfo: false,
        },
        showRemoveIcon: true,
        showDownloadIcon: false,
        showPreviewIcon: true,
        previewFile: previewImage,
      };
    
      componentDidUpdate() {
        const { listType, items, previewFile } = this.props;
        if (listType !== 'picture' && listType !== 'picture-card') {
          return;
        }
        (items || []).forEach(file => {
          if (
            typeof document === 'undefined' ||
            typeof window === 'undefined' ||
            !window.FileReader ||
            !window.File ||
            !(file.originFileObj instanceof File || file.originFileObj instanceof Blob) ||
            file.thumbUrl !== undefined
          ) {
            return;
          }
          file.thumbUrl = '';
          if (previewFile) {
            previewFile(file.originFileObj).then((previewDataUrl) => {
              // Need append '' to avoid dead loop
              file.thumbUrl = previewDataUrl || '';
              this.forceUpdate();
            });
          }
        });
      }
    
      handlePreview = (file, e) => {
        const { onPreview } = this.props;
        if (!onPreview) {
          return;
        }
        e.preventDefault();
        return onPreview(file);
      };
    
      handleDownload = (file) => {
        const { onDownload } = this.props;
        if (typeof onDownload === 'function') {
          onDownload(file);
        } else if (file.url) {
          window.open(file.url);
        }
      };
    
      handleClose = (file) => {
        const { onRemove } = this.props;
        if (onRemove) {
          onRemove(file);
        }
      };
    
      renderListItem = (file) =>{
        const {
            listType,
            showPreviewIcon,
            showRemoveIcon,
            showDownloadIcon,
            progressAttr,
        } = this.props;
        let progress;
        let icon = <Icon type={ file.status === 'uploading' ? 'loading' : 'paper-clip'} />
        if (listType === 'picture' || listType === 'picture-card') {
            if (listType === 'picture-card' && file.status === 'uploading') {
              icon = <div className={`${prefixCls}-list-item-uploading-text`}>{locale.uploading}</div>;
            } else if (!file.thumbUrl && !file.url) {
              icon = (
                <Icon className={`${prefixCls}-list-item-thumbnail`} type="picture" theme="twoTone" />
              );
            } else {
              const thumbnail = isImageUrl(file) ? (
                  <img
                    src={getFileTypeImg(file)}
                    alt={file.name}
                    className={`${prefixCls}-list-item-image`}
                  />
              ) : (
                <Icon type="file" className={`${prefixCls}-list-item-icon`} theme="twoTone" />
              );
              icon = (
                <a
                  className={`${prefixCls}-list-item-thumbnail`}
                  onClick={e => this.handlePreview(file, e)}
                  href={file.url || file.thumbUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {thumbnail}
                  {name}
                </a>
              );
            }
          }
        
          if (file.status === 'uploading') {
            // show loading icon if upload progress listener is disabled
            const loadingProgress =
              'percent' in file ? (
                <Progress type="line" {...progressAttr} percent={file.percent} />
              ) : null;
              
            progress = (
              <div className={`${prefixCls}-list-item-progress`} key="progress">
                {loadingProgress}
              </div>
            );
          }
          const infoUploadingClass = classNames({
            [`${prefixCls}-list-item`]: true,
            [`${prefixCls}-list-item-${file.status}`]: true,
            [`${prefixCls}-list-item-list-type-${listType}`]: true,
          });
          const linkProps =
            typeof file.linkProps === 'string' ? JSON.parse(file.linkProps) : file.linkProps;
          const removeIcon = showRemoveIcon ? (
            <Icon type="delete" title={locale.removeFile} onClick={() => this.handleClose(file)} />
          ) : null;
          const downloadIcon =
            showDownloadIcon && file.status === 'done' ? (
              <Icon
                type="download"
                title={locale.downloadFile}
                onClick={() => this.handleDownload(file)}
              />
            ) : null;
          const downloadOrDelete = listType !== 'picture-card' && (
            <span
              key="download-delete"
              className={`${prefixCls}-list-item-card-actions ${
                listType === 'picture' ? 'picture' : ''
              }`}
            >
              {downloadIcon && <a title={locale.downloadFile}>{downloadIcon}</a>}
              {removeIcon && <a title={locale.removeFile}>{removeIcon}</a>}
            </span>
          );
          const listItemNameClass = classNames({
            [`${prefixCls}-list-item-name`]: true,
            [`${prefixCls}-list-item-name-icon-count-${
              [downloadIcon, removeIcon].filter(x => x).length
            }`]: true,
          });
          const preview = file.url
            ? [
                <a
                  key="view"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={listItemNameClass}
                  title={file.name}
                  {...linkProps}
                  href={file.url}
                  onClick={e => this.handlePreview(file, e)}
                >
                  {file.name}
                </a>,
                downloadOrDelete,
              ]
            : [
                <span
                  key="view"
                  className={listItemNameClass}
                  onClick={e => this.handlePreview(file, e)}
                  title={file.name}
                >
                  {file.name}
                </span>,
                downloadOrDelete,
              ];
          const style = {
            pointerEvents: 'none',
            opacity: 0.5,
          };
          const previewIcon = showPreviewIcon ? (
            <a
              href={file.url || file.thumbUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={file.url || file.thumbUrl ? undefined : style}
              onClick={e => this.handlePreview(file, e)}
              title={locale.previewFile}
            >
              <Icon type="eye-o" />
            </a>
          ) : null;
          
          const actions = listType === 'picture-card' && file.status !== 'uploading' && (
            <span className={`${prefixCls}-list-item-actions`}>
              {previewIcon}
              {file.status === 'done' && downloadIcon}
              {removeIcon}
            </span>
          );
          let message;
          if (file.response && typeof file.response === 'string') {
            message = file.response;
          } else {
            message = (file.error && file.error.statusText) || locale.uploadError;
          }
          const iconAndPreview = (
            <span>
              {icon}
              {preview}
            </span>
          );
          const dom = (
            <div className={infoUploadingClass}>
              { file.status !== 'error' && listType === 'picture-card' ? 
                <Tooltip title={file.name} placement="top" ><div className={`${prefixCls}-list-item-info`}>{iconAndPreview}</div></Tooltip>
                : <div className={`${prefixCls}-list-item-info`}>{iconAndPreview}</div>
              }
              {actions}
              <Animate transitionName="fade" component="">
                {progress}
              </Animate>
            </div>
          );
          const listContainerNameClass = classNames({
            [`${prefixCls}-list-picture-card-container`]: listType === 'picture-card',
          });
          return (
            <div key={file.uid} className={listContainerNameClass}>
              {file.status === 'error' ? <Tooltip title={message}>{dom}</Tooltip> : <span>{dom}</span>}
            </div>
          )
      }   
    
      onSortEnd = (result) => {
        this.props.onSortEnd && this.props.onSortEnd(result)
      };
    
      renderUploadList = () => {
        const {
          items = [],
          listType,
          dragSortable,
        } = this.props;
        const prefixCls = 'ant-upload';
        const list =  items.map(file =>{
            return this.renderListItem(file)
        });    
        const listClassNames = classNames({
          [`${prefixCls}-list`]: true,
          [`${prefixCls}-list-${listType}`]: true,
        });
        const animationDirection = listType === 'picture-card' ? 'animate-inline' : 'animate';
        
        if(dragSortable){
            const dragDirection = listType === 'picture-card' ? "horizontal" : "vertical"
            const horizontalStyle = listType === 'picture-card' ? {display: 'flex',flexWrap:'wrap'} : {}
            return <DragDropContext onDragEnd={this.onSortEnd} >
              <Droppable droppableId="droppable" direction={dragDirection}>
                {(provided, snapshot) =>(
                  <div
                    ref={provided.innerRef}
                    className={listClassNames}
                    style={horizontalStyle}
                    {...provided.droppableProps}
                  >
                    {items.map((file, index) => (
                      <Draggable key={file.id} draggableId={file.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            key={file.id}
                          >
                           { this.renderListItem(file) }
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                    </div>
                  )
                }    
              </Droppable>
            </DragDropContext>
        }else{
            return (
              <Animate
                transitionName={`${prefixCls}-${animationDirection}`}
                component="div"
                className={listClassNames}
              >
                {list}
              </Animate>
            );
        }
      };
    
      render() {
        const { items } = this.props
        return <div>{  this.renderUploadList()}</div>;
      }
}