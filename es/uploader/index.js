import React, { createElement, Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Progress, Tooltip, Radio, message, Button } from 'antd';
import RcUpload from 'rc-upload';
import uniqBy from 'lodash/uniqBy';
import findIndex from 'lodash/findIndex';
import { createHash } from 'crypto';
import moment from 'moment';
import Animate from 'rc-animate';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import isEqual from 'lodash/isEqual';
import maxBy from 'lodash/maxBy';
import { Lightbox } from 'nsc-lightbox';
import Url from 'url-parse';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var classnames = createCommonjsModule(function (module) {
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg) && arg.length) {
				var inner = classNames.apply(null, arg);
				if (inner) {
					classes.push(inner);
				}
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if ( module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else {
		window.classNames = classNames;
	}
}());
});

var OSS = require('ali-oss');

var getUploadClient = function getUploadClient(params) {
  return new OSS(params);
};
var encodeFileName = function encodeFileName(filename) {
  var timeStr = moment().format('YYYYMMDDHHmmss');
  var hash = createHash('md5').update(filename + timeStr).digest('hex');
  return hash;
};

var toAttachment = function toAttachment(file) {
  return {
    id: file.id || file.uid,
    fileName: file.name,
    encodedFileName: file.encodedFileName,
    fileSize: file.size,
    fileType: file.type,
    fileExt: file.ext,
    uri: file.url,
    sortNo: file.sortNo,
    status: file.status
  };
};
var isDoc = function isDoc(img) {
  return img.fileExt.indexOf('doc') !== -1 || img.fileExt.indexOf('xls') !== -1;
};
var imgSize = function imgSize(file, scales) {
  return new Promise(function (resolve, reject) {
    var img = new Image();
    var URL = window.URL || window.webkitURL;

    img.onload = function () {
      // 图片比例校验
      var scale = img.width / img.height;
      var valid = scales.includes(scale);
      valid ? resolve(file) : reject();
    };

    img.src = URL.createObjectURL(file);
  }).then(function () {
    return file;
  }, function () {
    return false;
  });
};

var arrayMoveMutate = function arrayMoveMutate(array, from, to) {
  var startIndex = to < 0 ? array.length + to : to;
  var item = array.splice(from, 1)[0];
  array.splice(startIndex, 0, item);
};

var arrayMove = function arrayMove(array, from, to) {
  array = array.slice();
  var fromItem = array[from];
  arrayMoveMutate(array, from, to);
  array.forEach(function (item, index) {
    item.sortNo = index;
  });
  return array;
};
function T() {
  return true;
}
function fileToObject(file) {
  return _objectSpread2(_objectSpread2({}, file), {}, {
    lastModified: file.lastModified,
    lastModifiedDate: file.lastModifiedDate,
    name: file.name,
    size: file.size,
    type: file.type,
    uid: file.uid,
    percent: 0,
    originFileObj: file
  });
}
function getFileItem(file, fileList) {
  var matchKey = file.uid !== undefined ? 'uid' : 'name';
  return fileList.filter(function (item) {
    return item[matchKey] === file[matchKey];
  })[0];
}
function removeFileItem(file, fileList) {
  var matchKey = file.uid !== undefined ? 'uid' : 'name';
  var removed = fileList.filter(function (item) {
    return item[matchKey] !== file[matchKey];
  });

  if (removed.length === fileList.length) {
    return null;
  }

  return removed;
} // ==================== Default Image Preview ====================

var extname = function extname(url) {
  var temp = url.split('/');
  var filename = temp[temp.length - 1];
  var filenameWithoutSuffix = filename.split(/#|\?/)[0];
  return (/\.[^./\\]*$/.exec(filenameWithoutSuffix) || [''])[0];
};

var isImageFileType = function isImageFileType(type) {
  return !!type && type.indexOf('image/') === 0;
};

var isImageUrl = function isImageUrl(file) {
  if (isImageFileType(file.type)) {
    return true;
  }

  var url = file.thumbUrl || file.url;
  var extension = extname(url);

  if (/^data:image\//.test(url) || /(webp|svg|png|gif|jpg|jpeg|jfif|bmp|dpg|ico)$/i.test(extension)) {
    return true;
  }

  if (/^data:/.test(url)) {
    // other file types of base64
    return false;
  }

  if (extension) {
    // other file types which have extension
    return false;
  }

  return true;
};
var MEASURE_SIZE = 200;
function previewImage(file) {
  return new Promise(function (resolve) {
    if (!isImageFileType(file.type)) {
      resolve('');
      return;
    }

    var canvas = document.createElement('canvas');
    canvas.width = MEASURE_SIZE;
    canvas.height = MEASURE_SIZE;
    canvas.style.cssText = "position: fixed; left: 0; top: 0; width: ".concat(MEASURE_SIZE, "px; height: ").concat(MEASURE_SIZE, "px; z-index: 9999; display: none;");
    document.body.appendChild(canvas);
    var ctx = canvas.getContext('2d');
    var img = new Image();

    img.onload = function () {
      var width = img.width,
          height = img.height;
      var drawWidth = MEASURE_SIZE;
      var drawHeight = MEASURE_SIZE;
      var offsetX = 0;
      var offsetY = 0;

      if (width < height) {
        drawHeight = height * (MEASURE_SIZE / width);
        offsetY = -(drawHeight - drawWidth) / 2;
      } else {
        drawWidth = width * (MEASURE_SIZE / height);
        offsetX = -(drawWidth - drawHeight) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      var dataURL = canvas.toDataURL();
      document.body.removeChild(canvas);
      resolve(dataURL);
    };

    img.src = window.URL.createObjectURL(file);
  });
}

var docPng = "data:image/png;base64,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";

var pdfPng = "data:image/png;base64,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";

var xlsPng = "data:image/png;base64,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";

var prefixCls = 'ant-upload';
var locale = {
  uploading: 'Uploading...',
  removeFile: 'Remove file',
  uploadError: 'Upload error',
  previewFile: 'Preview file',
  downloadFile: 'Download file'
};

var getFileTypeImg = function getFileTypeImg(file) {
  var fileType = file.type;

  if (fileType) {
    if (fileType.indexOf('image') !== -1) {
      return file.thumbnail || file.url;
    }

    if (fileType.indexOf('pdf') !== -1) {
      return pdfPng;
    } else if (fileType.indexOf('word') !== -1) {
      return docPng;
    } else if (fileType.indexOf('xlsx') !== -1) {
      return xlsPng;
    }
  }

  return '';
};

var UploadList = /*#__PURE__*/function (_React$Component) {
  _inherits(UploadList, _React$Component);

  var _super = _createSuper(UploadList);

  function UploadList() {
    var _this;

    _classCallCheck(this, UploadList);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "handlePreview", function (file, e) {
      var onPreview = _this.props.onPreview;

      if (!onPreview) {
        return;
      }

      e.preventDefault();
      return onPreview(file);
    });

    _defineProperty(_assertThisInitialized(_this), "handleDownload", function (file) {
      var onDownload = _this.props.onDownload;

      if (typeof onDownload === 'function') {
        onDownload(file);
      } else if (file.url) {
        window.open(file.url);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleClose", function (file) {
      var onRemove = _this.props.onRemove;

      if (onRemove) {
        onRemove(file);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "renderListItem", function (file) {
      var _classNames, _classNames2;

      var _this$props = _this.props,
          listType = _this$props.listType,
          showPreviewIcon = _this$props.showPreviewIcon,
          showRemoveIcon = _this$props.showRemoveIcon,
          showDownloadIcon = _this$props.showDownloadIcon,
          progressAttr = _this$props.progressAttr;
      var progress;
      var icon = /*#__PURE__*/createElement(Icon, {
        type: file.status === 'uploading' ? 'loading' : 'paper-clip'
      });

      if (listType === 'picture' || listType === 'picture-card') {
        if (listType === 'picture-card' && file.status === 'uploading') {
          icon = /*#__PURE__*/createElement("div", {
            className: "".concat(prefixCls, "-list-item-uploading-text")
          }, locale.uploading);
        } else if (!file.thumbUrl && !file.url) {
          icon = /*#__PURE__*/createElement(Icon, {
            className: "".concat(prefixCls, "-list-item-thumbnail"),
            type: "picture",
            theme: "twoTone"
          });
        } else {
          var thumbnail = isImageUrl(file) ? /*#__PURE__*/createElement("img", {
            src: getFileTypeImg(file),
            alt: file.name,
            className: "".concat(prefixCls, "-list-item-image")
          }) : /*#__PURE__*/createElement(Icon, {
            type: "file",
            className: "".concat(prefixCls, "-list-item-icon"),
            theme: "twoTone"
          });
          icon = /*#__PURE__*/createElement("a", {
            className: "".concat(prefixCls, "-list-item-thumbnail"),
            onClick: function onClick(e) {
              return _this.handlePreview(file, e);
            },
            href: file.url || file.thumbUrl,
            target: "_blank",
            rel: "noopener noreferrer"
          }, thumbnail, name);
        }
      }

      if (file.status === 'uploading') {
        // show loading icon if upload progress listener is disabled
        var loadingProgress = 'percent' in file ? /*#__PURE__*/createElement(Progress, _extends({
          type: "line"
        }, progressAttr, {
          percent: file.percent
        })) : null;
        progress = /*#__PURE__*/createElement("div", {
          className: "".concat(prefixCls, "-list-item-progress"),
          key: "progress"
        }, loadingProgress);
      }

      var infoUploadingClass = classnames((_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-list-item"), true), _defineProperty(_classNames, "".concat(prefixCls, "-list-item-").concat(file.status), true), _defineProperty(_classNames, "".concat(prefixCls, "-list-item-list-type-").concat(listType), true), _classNames));
      var linkProps = typeof file.linkProps === 'string' ? JSON.parse(file.linkProps) : file.linkProps;
      var removeIcon = showRemoveIcon ? /*#__PURE__*/createElement(Icon, {
        type: "delete",
        title: locale.removeFile,
        onClick: function onClick() {
          return _this.handleClose(file);
        }
      }) : null;
      var downloadIcon = showDownloadIcon && file.status === 'done' ? /*#__PURE__*/createElement(Icon, {
        type: "download",
        title: locale.downloadFile,
        onClick: function onClick() {
          return _this.handleDownload(file);
        }
      }) : null;
      var downloadOrDelete = listType !== 'picture-card' && /*#__PURE__*/createElement("span", {
        key: "download-delete",
        className: "".concat(prefixCls, "-list-item-card-actions ").concat(listType === 'picture' ? 'picture' : '')
      }, downloadIcon && /*#__PURE__*/createElement("a", {
        title: locale.downloadFile
      }, downloadIcon), removeIcon && /*#__PURE__*/createElement("a", {
        title: locale.removeFile
      }, removeIcon));
      var listItemNameClass = classnames((_classNames2 = {}, _defineProperty(_classNames2, "".concat(prefixCls, "-list-item-name"), true), _defineProperty(_classNames2, "".concat(prefixCls, "-list-item-name-icon-count-").concat([downloadIcon, removeIcon].filter(function (x) {
        return x;
      }).length), true), _classNames2));
      var preview = file.url ? [/*#__PURE__*/createElement("a", _extends({
        key: "view",
        target: "_blank",
        rel: "noopener noreferrer",
        className: listItemNameClass,
        title: file.name
      }, linkProps, {
        href: file.url,
        onClick: function onClick(e) {
          return _this.handlePreview(file, e);
        }
      }), file.name), downloadOrDelete] : [/*#__PURE__*/createElement("span", {
        key: "view",
        className: listItemNameClass,
        onClick: function onClick(e) {
          return _this.handlePreview(file, e);
        },
        title: file.name
      }, file.name), downloadOrDelete];
      var style = {
        pointerEvents: 'none',
        opacity: 0.5
      };
      var previewIcon = showPreviewIcon ? /*#__PURE__*/createElement("a", {
        href: file.url || file.thumbUrl,
        target: "_blank",
        rel: "noopener noreferrer",
        style: file.url || file.thumbUrl ? undefined : style,
        onClick: function onClick(e) {
          return _this.handlePreview(file, e);
        },
        title: locale.previewFile
      }, /*#__PURE__*/createElement(Icon, {
        type: "eye-o"
      })) : null;
      var actions = listType === 'picture-card' && file.status !== 'uploading' && /*#__PURE__*/createElement("span", {
        className: "".concat(prefixCls, "-list-item-actions")
      }, previewIcon, file.status === 'done' && downloadIcon, removeIcon);
      var message;

      if (file.response && typeof file.response === 'string') {
        message = file.response;
      } else {
        message = file.error && file.error.statusText || locale.uploadError;
      }

      var iconAndPreview = /*#__PURE__*/createElement("span", null, icon, preview);
      var dom = /*#__PURE__*/createElement("div", {
        className: infoUploadingClass
      }, file.status !== 'error' && listType === 'picture-card' ? /*#__PURE__*/createElement(Tooltip, {
        title: file.name,
        placement: "top"
      }, /*#__PURE__*/createElement("div", {
        className: "".concat(prefixCls, "-list-item-info")
      }, iconAndPreview)) : /*#__PURE__*/createElement("div", {
        className: "".concat(prefixCls, "-list-item-info")
      }, iconAndPreview), actions, /*#__PURE__*/createElement(Animate, {
        transitionName: "fade",
        component: ""
      }, progress));
      var listContainerNameClass = classnames(_defineProperty({}, "".concat(prefixCls, "-list-picture-card-container"), listType === 'picture-card'));
      return /*#__PURE__*/createElement("div", {
        key: file.uid,
        className: listContainerNameClass
      }, file.status === 'error' ? /*#__PURE__*/createElement(Tooltip, {
        title: message
      }, dom) : /*#__PURE__*/createElement("span", null, dom));
    });

    _defineProperty(_assertThisInitialized(_this), "onSortEnd", function (result) {
      _this.props.onSortEnd && _this.props.onSortEnd(result);
    });

    _defineProperty(_assertThisInitialized(_this), "renderUploadList", function () {
      var _classNames4;

      var _this$props2 = _this.props,
          _this$props2$items = _this$props2.items,
          items = _this$props2$items === void 0 ? [] : _this$props2$items,
          listType = _this$props2.listType,
          dragSortable = _this$props2.dragSortable;
      var prefixCls = 'ant-upload';
      var list = items.map(function (file) {
        return _this.renderListItem(file);
      });
      var listClassNames = classnames((_classNames4 = {}, _defineProperty(_classNames4, "".concat(prefixCls, "-list"), true), _defineProperty(_classNames4, "".concat(prefixCls, "-list-").concat(listType), true), _classNames4));
      var animationDirection = listType === 'picture-card' ? 'animate-inline' : 'animate';

      if (dragSortable) {
        var dragDirection = listType === 'picture-card' ? "horizontal" : "vertical";
        var horizontalStyle = listType === 'picture-card' ? {
          display: 'flex',
          flexWrap: 'wrap'
        } : {};
        return /*#__PURE__*/createElement(DragDropContext, {
          onDragEnd: _this.onSortEnd
        }, /*#__PURE__*/createElement(Droppable, {
          droppableId: "droppable",
          direction: dragDirection
        }, function (provided, snapshot) {
          return /*#__PURE__*/createElement("div", _extends({
            ref: provided.innerRef,
            className: listClassNames,
            style: horizontalStyle
          }, provided.droppableProps), items.map(function (file, index) {
            return /*#__PURE__*/createElement(Draggable, {
              key: file.id,
              draggableId: file.id,
              index: index
            }, function (provided, snapshot) {
              return /*#__PURE__*/createElement("div", _extends({
                ref: provided.innerRef
              }, provided.draggableProps, provided.dragHandleProps, {
                key: file.id
              }), _this.renderListItem(file));
            });
          }), provided.placeholder);
        }));
      } else {
        return /*#__PURE__*/createElement(Animate, {
          transitionName: "".concat(prefixCls, "-").concat(animationDirection),
          component: "div",
          className: listClassNames
        }, list);
      }
    });

    return _this;
  }

  _createClass(UploadList, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var _this2 = this;

      var _this$props3 = this.props,
          listType = _this$props3.listType,
          items = _this$props3.items,
          previewFile = _this$props3.previewFile;

      if (listType !== 'picture' && listType !== 'picture-card') {
        return;
      }

      (items || []).forEach(function (file) {
        if (typeof document === 'undefined' || typeof window === 'undefined' || !window.FileReader || !window.File || !(file.originFileObj instanceof File || file.originFileObj instanceof Blob) || file.thumbUrl !== undefined) {
          return;
        }

        file.thumbUrl = '';

        if (previewFile) {
          previewFile(file.originFileObj).then(function (previewDataUrl) {
            // Need append '' to avoid dead loop
            file.thumbUrl = previewDataUrl || '';

            _this2.forceUpdate();
          });
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var items = this.props.items;
      return /*#__PURE__*/createElement("div", null, this.renderUploadList());
    }
  }]);

  return UploadList;
}(Component);

_defineProperty(UploadList, "defaultProps", {
  listType: 'text',
  // or picture
  progressAttr: {
    strokeWidth: 2,
    showInfo: false
  },
  showRemoveIcon: true,
  showDownloadIcon: false,
  showPreviewIcon: true,
  previewFile: previewImage
});

var prefixCls$1 = 'ant-upload';

var Upload = /*#__PURE__*/function (_React$Component) {
  _inherits(Upload, _React$Component);

  var _super = _createSuper(Upload);

  _createClass(Upload, null, [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps) {
      if ('fileList' in nextProps) {
        return {
          fileList: nextProps.fileList || []
        };
      }

      return null;
    }
  }]);

  function Upload(props) {
    var _this;

    _classCallCheck(this, Upload);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "progressTimer", null);

    _defineProperty(_assertThisInitialized(_this), "upload", null);

    _defineProperty(_assertThisInitialized(_this), "saveUpload", function (node) {
      _this.upload = node;
    });

    _defineProperty(_assertThisInitialized(_this), "onStart", function (file) {
      var fileList = _this.state.fileList;
      var targetItem = fileToObject(file);
      targetItem.status = 'uploading';
      var nextFileList = fileList.concat();
      var fileIndex = findIndex(nextFileList, function (_ref) {
        var uid = _ref.uid;
        return uid === targetItem.uid;
      });

      if (fileIndex === -1) {
        nextFileList.push(targetItem);
      } else {
        nextFileList[fileIndex] = targetItem;
      }

      _this.onChange({
        file: targetItem,
        fileList: nextFileList
      }); // fix ie progress


      if (!window.File || process.env.TEST_IE) {
        _this.autoUpdateProgress(0, targetItem);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onSuccess", function (response, file, xhr) {
      _this.clearProgressTimer();

      try {
        if (typeof response === 'string') {
          response = JSON.parse(response);
        }
      } catch (e) {
        /* do nothing */
      }

      var fileList = _this.state.fileList;
      var targetItem = getFileItem(file, fileList); // removed

      if (!targetItem) {
        return;
      }

      targetItem.status = 'done';
      targetItem.response = response;
      targetItem.xhr = xhr;

      _this.onChange({
        file: _objectSpread2({}, targetItem),
        fileList: fileList
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onProgress", function (e, file) {
      var fileList = _this.state.fileList;
      var targetItem = getFileItem(file, fileList); // removed

      if (!targetItem) {
        return;
      }

      targetItem.percent = e.percent;

      _this.onChange({
        event: e,
        file: _objectSpread2({}, targetItem),
        fileList: fileList
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onError", function (error, response, file) {
      _this.clearProgressTimer();

      var fileList = _this.state.fileList;
      var targetItem = getFileItem(file, fileList); // removed

      if (!targetItem) {
        return;
      }

      targetItem.error = error;
      targetItem.response = response;
      targetItem.status = 'error';

      _this.onChange({
        file: _objectSpread2({}, targetItem),
        fileList: fileList
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleRemove", function (file) {
      var onRemove = _this.props.onRemove;
      var fileList = _this.state.fileList;
      Promise.resolve(typeof onRemove === 'function' ? onRemove(file) : onRemove).then(function (ret) {
        // Prevent removing file
        if (ret === false) {
          return;
        }

        var removedFileList = removeFileItem(file, fileList);

        if (removedFileList) {
          file.status = 'removed'; // eslint-disable-line

          if (_this.upload) {
            _this.upload.abort(file);
          }

          _this.onChange({
            file: file,
            fileList: removedFileList
          });
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (info) {
      if (!('fileList' in _this.props)) {
        _this.setState({
          fileList: info.fileList
        });
      }

      var onChange = _this.props.onChange;

      if (onChange) {
        onChange(info);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onFileDrop", function (e) {
      _this.setState({
        dragState: e.type
      });
    });

    _defineProperty(_assertThisInitialized(_this), "beforeUpload", function (file, fileList) {
      var beforeUpload = _this.props.beforeUpload;
      var stateFileList = _this.state.fileList;

      if (!beforeUpload) {
        return true;
      }

      var result = beforeUpload(file, fileList);

      if (result === false) {
        _this.onChange({
          file: file,
          fileList: uniqBy(stateFileList.concat(fileList.map(fileToObject)), function (item) {
            return item.uid;
          })
        });

        return false;
      }

      if (result && result.then) {
        return result;
      }

      return true;
    });

    _defineProperty(_assertThisInitialized(_this), "renderUploadList", function () {
      var _this$props = _this.props,
          showUploadList = _this$props.showUploadList,
          listType = _this$props.listType,
          onPreview = _this$props.onPreview,
          onDownload = _this$props.onDownload,
          previewFile = _this$props.previewFile,
          dragSortable = _this$props.dragSortable,
          onSortEnd = _this$props.onSortEnd,
          disabled = _this$props.disabled;
      var showRemoveIcon = showUploadList.showRemoveIcon,
          showPreviewIcon = showUploadList.showPreviewIcon,
          showDownloadIcon = showUploadList.showDownloadIcon;
      var fileList = _this.state.fileList;
      return /*#__PURE__*/createElement(UploadList, {
        listType: listType,
        items: fileList,
        previewFile: previewFile,
        onPreview: onPreview,
        onDownload: onDownload,
        onRemove: _this.handleRemove,
        showRemoveIcon: !disabled && showRemoveIcon,
        showPreviewIcon: showPreviewIcon,
        showDownloadIcon: showDownloadIcon,
        dragSortable: dragSortable,
        onSortEnd: onSortEnd
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderUpload", function () {
      var _classNames2;

      var _this$props2 = _this.props,
          className = _this$props2.className,
          showUploadList = _this$props2.showUploadList,
          listType = _this$props2.listType,
          type = _this$props2.type,
          disabled = _this$props2.disabled,
          children = _this$props2.children,
          style = _this$props2.style;
      var _this$state = _this.state,
          fileList = _this$state.fileList,
          dragState = _this$state.dragState;

      var rcUploadProps = _objectSpread2(_objectSpread2({
        onStart: _this.onStart,
        onError: _this.onError,
        onProgress: _this.onProgress,
        onSuccess: _this.onSuccess
      }, _this.props), {}, {
        prefixCls: prefixCls$1,
        beforeUpload: _this.beforeUpload
      });

      delete rcUploadProps.className;
      delete rcUploadProps.style; // Remove id to avoid open by label when trigger is hidden
      // !children: https://github.com/ant-design/ant-design/issues/14298
      // disabled: https://github.com/ant-design/ant-design/issues/16478
      //           https://github.com/ant-design/ant-design/issues/24197

      if (!children || disabled) {
        delete rcUploadProps.id;
      }

      var uploadList = showUploadList ? _this.renderUploadList() : null;

      if (type === 'drag') {
        var _classNames;

        var dragCls = classnames(prefixCls$1, (_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls$1, "-drag"), true), _defineProperty(_classNames, "".concat(prefixCls$1, "-drag-uploading"), fileList.some(function (file) {
          return file.status && file.status === 'uploading';
        })), _defineProperty(_classNames, "".concat(prefixCls$1, "-drag-hover"), dragState === 'dragover'), _defineProperty(_classNames, "".concat(prefixCls$1, "-disabled"), disabled), _classNames), className);
        return /*#__PURE__*/createElement("span", null, /*#__PURE__*/createElement("div", {
          className: dragCls,
          onDrop: _this.onFileDrop,
          onDragOver: _this.onFileDrop,
          onDragLeave: _this.onFileDrop,
          style: style
        }, /*#__PURE__*/createElement(RcUpload, _extends({}, rcUploadProps, {
          ref: _this.saveUpload,
          className: "".concat(prefixCls$1, "-btn")
        }), /*#__PURE__*/createElement("div", {
          className: "".concat(prefixCls$1, "-drag-container")
        }, children))), uploadList);
      }

      var uploadButtonCls = classnames(prefixCls$1, (_classNames2 = {}, _defineProperty(_classNames2, "".concat(prefixCls$1, "-select"), true), _defineProperty(_classNames2, "".concat(prefixCls$1, "-select-").concat(listType), true), _defineProperty(_classNames2, "".concat(prefixCls$1, "-disabled"), disabled), _classNames2));
      var uploadButton = /*#__PURE__*/createElement("div", {
        className: uploadButtonCls,
        style: children ? undefined : {
          display: 'none'
        }
      }, /*#__PURE__*/createElement(RcUpload, _extends({}, rcUploadProps, {
        ref: _this.saveUpload
      })));

      if (listType === 'picture-card') {
        var dragSortable = _this.props.dragSortable;

        var _type = dragSortable ? 'nsc' : 'ant';

        return /*#__PURE__*/createElement("span", {
          className: classnames(className, "".concat(_type, "-upload-picture-card-wrapper"))
        }, uploadList, uploadButton);
      }

      return /*#__PURE__*/createElement("span", {
        className: className
      }, uploadButton, uploadList);
    });

    _this.state = {
      fileList: props.fileList || props.defaultFileList || [],
      dragState: 'drop'
    };
    return _this;
  }

  _createClass(Upload, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.clearProgressTimer();
    }
  }, {
    key: "clearProgressTimer",
    value: function clearProgressTimer() {
      clearInterval(this.progressTimer);
    }
  }, {
    key: "autoUpdateProgress",
    value: function autoUpdateProgress(_, file) {
      var _this2 = this;

      var getPercent = genPercentAdd();
      var curPercent = 0;
      this.clearProgressTimer();
      this.progressTimer = setInterval(function () {
        curPercent = getPercent(curPercent);

        _this2.onProgress({
          percent: curPercent * 100
        }, file);
      }, 200);
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/createElement("div", null, this.renderUpload());
    }
  }]);

  return Upload;
}(Component);

_defineProperty(Upload, "defaultProps", {
  type: 'select',
  multiple: true,
  action: '',
  data: {},
  accept: '',
  beforeUpload: T,
  showUploadList: true,
  listType: 'text',
  // or picture
  className: '',
  disabled: false,
  supportServerRender: true,
  dragSortable: false
});

// https://github.com/ant-design/ant-design/issues/18707
// eslint-disable-next-line react/prefer-stateless-function

var Dragger = /*#__PURE__*/function (_React$Component) {
  _inherits(Dragger, _React$Component);

  var _super = _createSuper(Dragger);

  function Dragger() {
    _classCallCheck(this, Dragger);

    return _super.apply(this, arguments);
  }

  _createClass(Dragger, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          style = _this$props.style,
          height = _this$props.height,
          restProps = _objectWithoutProperties(_this$props, ["style", "height"]);

      return /*#__PURE__*/createElement(Upload, _extends({}, restProps, {
        type: "drag",
        style: _objectSpread2(_objectSpread2({}, style), {}, {
          height: height
        })
      }));
    }
  }]);

  return Dragger;
}(Component);

/**
 * slice() reference.
 */
var slice = Array.prototype.slice;
/**
 * Expose `co`.
 */

var Co = co['default'] = co.co = co;
/**
 * Wrap the given generator `fn` into a
 * function that returns a promise.
 * This is a separate function so that
 * every `co()` call doesn't create a new,
 * unnecessary closure.
 *
 * @param {GeneratorFunction} fn
 * @return {Function}
 * @api public
 */

co.wrap = function (fn) {
  createPromise.__generatorFunction__ = fn;
  return createPromise;

  function createPromise() {
    return co.call(this, fn.apply(this, arguments));
  }
};
/**
 * Execute the generator function or a generator
 * and return a promise.
 *
 * @param {Function} fn
 * @return {Promise}
 * @api public
 */


function co(gen) {
  var ctx = this;
  var args = slice.call(arguments, 1); // we wrap everything in a promise to avoid promise chaining,
  // which leads to memory leak errors.
  // see https://github.com/tj/co/issues/180

  return new Promise(function (resolve, reject) {
    if (typeof gen === 'function') gen = gen.apply(ctx, args);
    if (!gen || typeof gen.next !== 'function') return resolve(gen);
    onFulfilled();
    /**
     * @param {Mixed} res
     * @return {Promise}
     * @api private
     */

    function onFulfilled(res) {
      var ret;

      try {
        ret = gen.next(res);
      } catch (e) {
        return reject(e);
      }

      next(ret);
      return null;
    }
    /**
     * @param {Error} err
     * @return {Promise}
     * @api private
     */


    function onRejected(err) {
      var ret;

      try {
        ret = gen["throw"](err);
      } catch (e) {
        return reject(e);
      }

      next(ret);
    }
    /**
     * Get the next value in the generator,
     * return a promise.
     *
     * @param {Object} ret
     * @return {Promise}
     * @api private
     */


    function next(ret) {
      if (ret.done) return resolve(ret.value);
      var value = toPromise.call(ctx, ret.value);
      if (value && isPromise(value)) return value.then(onFulfilled, onRejected);
      return onRejected(new TypeError('You may only yield a function, promise, generator, array, or object, ' + 'but the following object was passed: "' + String(ret.value) + '"'));
    }
  });
}
/**
 * Convert a `yield`ed value into a promise.
 *
 * @param {Mixed} obj
 * @return {Promise}
 * @api private
 */


function toPromise(obj) {
  if (!obj) return obj;
  if (isPromise(obj)) return obj;
  if (isGeneratorFunction(obj) || isGenerator(obj)) return co.call(this, obj);
  if ('function' == typeof obj) return thunkToPromise.call(this, obj);
  if (Array.isArray(obj)) return arrayToPromise.call(this, obj);
  if (isObject(obj)) return objectToPromise.call(this, obj);
  return obj;
}
/**
 * Convert a thunk to a promise.
 *
 * @param {Function}
 * @return {Promise}
 * @api private
 */


function thunkToPromise(fn) {
  var ctx = this;
  return new Promise(function (resolve, reject) {
    fn.call(ctx, function (err, res) {
      if (err) return reject(err);
      if (arguments.length > 2) res = slice.call(arguments, 1);
      resolve(res);
    });
  });
}
/**
 * Convert an array of "yieldables" to a promise.
 * Uses `Promise.all()` internally.
 *
 * @param {Array} obj
 * @return {Promise}
 * @api private
 */


function arrayToPromise(obj) {
  return Promise.all(obj.map(toPromise, this));
}
/**
 * Convert an object of "yieldables" to a promise.
 * Uses `Promise.all()` internally.
 *
 * @param {Object} obj
 * @return {Promise}
 * @api private
 */


function objectToPromise(obj) {
  var results = new obj.constructor();
  var keys = Object.keys(obj);
  var promises = [];

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var promise = toPromise.call(this, obj[key]);
    if (promise && isPromise(promise)) defer(promise, key);else results[key] = obj[key];
  }

  return Promise.all(promises).then(function () {
    return results;
  });

  function defer(promise, key) {
    // predefine the key in the result
    results[key] = undefined;
    promises.push(promise.then(function (res) {
      results[key] = res;
    }));
  }
}
/**
 * Check if `obj` is a promise.
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */


function isPromise(obj) {
  return 'function' == typeof obj.then;
}
/**
 * Check if `obj` is a generator.
 *
 * @param {Mixed} obj
 * @return {Boolean}
 * @api private
 */


function isGenerator(obj) {
  return 'function' == typeof obj.next && 'function' == typeof obj["throw"];
}
/**
 * Check if `obj` is a generator function.
 *
 * @param {Mixed} obj
 * @return {Boolean}
 * @api private
 */


function isGeneratorFunction(obj) {
  var constructor = obj.constructor;
  if (!constructor) return false;
  if ('GeneratorFunction' === constructor.name || 'GeneratorFunction' === constructor.displayName) return true;
  return isGenerator(constructor.prototype);
}
/**
 * Check for plain object.
 *
 * @param {Mixed} val
 * @return {Boolean}
 * @api private
 */


function isObject(val) {
  return Object == val.constructor;
}

var sorter = function sorter(a, b) {
  return a.sortNo - b.sortNo;
};

var Uploader = /*#__PURE__*/function (_Component) {
  _inherits(Uploader, _Component);

  var _super = _createSuper(Uploader);

  function Uploader(props) {
    var _this2;

    _classCallCheck(this, Uploader);

    _this2 = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this2), "toFile", function (attachment) {
      return {
        uid: attachment.id,
        id: attachment.id,
        name: attachment.fileName,
        encodedFileName: attachment.encodedFileName,
        url: _this2.signatureUrl(attachment.uri),
        size: attachment.fileSize,
        ext: attachment.fileExt,
        type: attachment.fileType,
        sortNo: attachment.sortNo,
        status: 'done'
      };
    });

    _defineProperty(_assertThisInitialized(_this2), "handleCancel", function () {
      return _this2.setState({
        previewVisible: false
      });
    });

    _defineProperty(_assertThisInitialized(_this2), "onPreview", function (file) {
      var onPreview = _this2.props.onPreview;
      onPreview && onPreview(toAttachment(file));
    });

    _defineProperty(_assertThisInitialized(_this2), "handlePreview", function (file) {
      var fileList = _this2.state.fileList;
      var files = fileList.map(toAttachment);
      var lightboxFiles = files.map(function (a) {
        return _objectSpread2(_objectSpread2({}, a), {}, {
          alt: a.name,
          uri: isDoc(a) ? "https://view.officeapps.live.com/op/view.aspx?src=".concat(encodeURIComponent(_this2.signatureUrl(a.uri))) : _this2.signatureUrl(a.uri)
        });
      });
      var lightboxIndex = files.map(function (a) {
        return a.id;
      }).indexOf(file.id) || 0;

      _this2.setState({
        lightboxFiles: lightboxFiles,
        previewVisible: true,
        lightboxIndex: lightboxIndex
      });
    });

    _defineProperty(_assertThisInitialized(_this2), "signatureUrl", function (url) {
      url = decodeURIComponent(url);

      var _Url = new Url(decodeURIComponent(url)),
          pathname = _Url.pathname;

      var fileName = pathname.substr(1);

      if (_this2.uploadClient) {
        return _this2.uploadClient.signatureUrl(fileName);
      }

      return url;
    });

    _defineProperty(_assertThisInitialized(_this2), "onLightboxClose", function () {
      _this2.setState({
        previewVisible: false
      });
    });

    _defineProperty(_assertThisInitialized(_this2), "handleChange", function (file, fileList) {
      var onFileChange = _this2.props.onFileChange;
      onFileChange && onFileChange(toAttachment(file), fileList.map(toAttachment));
    });

    _defineProperty(_assertThisInitialized(_this2), "handleDownload", function (file) {
      var onDownload = _this2.props.onDownload;
      file.url = _this2.signatureUrl(file.url);
      onDownload && onDownload(toAttachment(file));
    });

    _defineProperty(_assertThisInitialized(_this2), "handleRemove", function (file) {
      var _this2$props = _this2.props,
          autoSave = _this2$props.autoSave,
          onRemove = _this2$props.onRemove;
      var fileList = _this2.state.fileList;
      var newFileList = fileList.filter(function (f) {
        return f.id !== file.id;
      });

      _this2.setState({
        fileList: newFileList
      });

      _this2.handleChange(file, newFileList);

      if (onRemove) {
        onRemove(toAttachment(file));
      }
    });

    _defineProperty(_assertThisInitialized(_this2), "hasExtension", function (fileName) {
      var fileExtension = _this2.props.fileExtension;
      var extensions = fileExtension ? fileExtension : [];
      var pattern = '(' + extensions.join('|').replace(/\./g, '\\.') + ')$';
      return new RegExp(pattern, 'i').test(fileName);
    });

    _defineProperty(_assertThisInitialized(_this2), "beforeUpload", /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(file, files) {
        var _this2$props2, autoSave, maxFileSize, maxFileNum, fileExtension, uploadType, fileErrorMsg, onProgress, fileScales, fileList, isScale, maxItem, maxSortNo, hideLoading, encodedFileName, progress, options, _this;

        return regeneratorRuntime.wrap(function _callee2$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _this2$props2 = _this2.props, autoSave = _this2$props2.autoSave, maxFileSize = _this2$props2.maxFileSize, maxFileNum = _this2$props2.maxFileNum, fileExtension = _this2$props2.fileExtension, uploadType = _this2$props2.uploadType, fileErrorMsg = _this2$props2.fileErrorMsg, onProgress = _this2$props2.onProgress, fileScales = _this2$props2.fileScales;
                fileList = _this2.state.fileList; //Check for file extension

                if (!(fileExtension && !_this2.hasExtension(file.name))) {
                  _context3.next = 5;
                  break;
                }

                message.error(fileErrorMsg && fileErrorMsg.fileExtensionErrorMsg ? fileErrorMsg.fileExtensionErrorMsg : "\u4E0D\u652F\u6301\u7684\u6587\u4EF6\u683C\u5F0F\uFF0C\u8BF7\u4E0A\u4F20\u683C\u5F0F\u4E3A".concat(fileExtension.join(','), "\u7684\u6587\u4EF6"));
                return _context3.abrupt("return", false);

              case 5:
                if (!(file.size / 1024 / 1024 > maxFileSize)) {
                  _context3.next = 8;
                  break;
                }

                message.error(fileErrorMsg && fileErrorMsg.fileSizeErrorMsg ? fileErrorMsg.fileSizeErrorMsg : "\u6587\u4EF6\u8FC7\u5927\uFF0C\u6700\u5927\u53EF\u4E0A\u4F20".concat(maxFileSize, "M"));
                return _context3.abrupt("return", false);

              case 8:
                if (!(files.length + fileList.length > maxFileNum)) {
                  _context3.next = 11;
                  break;
                }

                message.error(fileErrorMsg && fileErrorMsg.fileNumerErrorMsg ? fileErrorMsg.fileNumerErrorMsg : "\u6587\u4EF6\u6570\u91CF\u8FC7\u591A\uFF0C\u6700\u591A\u53EF\u4E0A\u4F20".concat(maxFileNum, "\u4EFD"));
                return _context3.abrupt("return", false);

              case 11:
                if (!fileScales) {
                  _context3.next = 17;
                  break;
                }

                isScale = true;
                _context3.next = 15;
                return imgSize(file, fileScales).then(function (r) {
                  if (!r) {
                    message.error(fileErrorMsg && fileErrorMsg.fileNumerErrorMsg ? fileErrorMsg.fileScaleErrorMsg : "\u6DFB\u52A0\u5931\u8D25: ".concat(file.name, " - \u9519\u8BEF\u7684\u56FE\u7247\u5C3A\u5BF8 (\u8BF7\u4F7F\u7528").concat(fileScales.join(':1 或'), ":1\u7684\u56FE\u7247)"));
                    isScale = false;
                  }
                });

              case 15:
                if (isScale) {
                  _context3.next = 17;
                  break;
                }

                return _context3.abrupt("return", false);

              case 17:
                maxItem = maxBy(fileList, function (i) {
                  return i.sortNo;
                });
                maxSortNo = maxItem ? maxItem.sortNo : 0;
                hideLoading = message.loading('文件正在预处理', 0);
                encodedFileName = encodeFileName(file.name);
                progress = /*#__PURE__*/regeneratorRuntime.mark(function generatorProgress(p, cpt, res) {
                  return regeneratorRuntime.wrap(function generatorProgress$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          onProgress && onProgress(p, cpt, res);

                        case 1:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, generatorProgress);
                });
                options = {
                  progress: progress,
                  partSize: 1000 * 1024,
                  //设置分片大小
                  timeout: 120000000 //设置超时时间

                };

                if (!_this2.uploadClient) {
                  _context3.next = 27;
                  break;
                }

                _this = _assertThisInitialized(_this2);
                Co( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                  return regeneratorRuntime.wrap(function _callee$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          if (!(uploadType === 'multipart')) {
                            _context2.next = 6;
                            break;
                          }

                          _context2.next = 3;
                          return _this.uploadClient.multipartUpload(encodedFileName, file, options);

                        case 3:
                          _context2.t0 = _context2.sent;
                          _context2.next = 9;
                          break;

                        case 6:
                          _context2.next = 8;
                          return _this.uploadClient.put(encodedFileName, file);

                        case 8:
                          _context2.t0 = _context2.sent;

                        case 9:
                          return _context2.abrupt("return", _context2.t0);

                        case 10:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee);
                })).then(function (aliRes) {
                  var url = '';

                  if (uploadType === 'multipart') {
                    var requestUrl = aliRes && aliRes.res && aliRes.res.requestUrls ? aliRes.res.requestUrls[0] : '';

                    var _Url2 = new Url(decodeURIComponent(requestUrl)),
                        origin = _Url2.origin;

                    url = origin + "/" + aliRes.name;
                  } else {
                    url = aliRes.url;
                    onProgress && onProgress(aliRes);
                  }

                  var indexNo = files.findIndex(function (i) {
                    return i.uid === file.uid;
                  });
                  var newFile = {
                    uid: file.uid,
                    id: file.uid,
                    encodedFileName: encodedFileName,
                    name: file.name,
                    url: _this2.signatureUrl(url),
                    status: 'done',
                    size: file.size,
                    ext: file.name.split('.').pop(),
                    type: file.type,
                    sortNo: maxSortNo + 1 + indexNo
                  };

                  if (autoSave) {
                    return _this2.save(newFile);
                  } else {
                    return newFile;
                  }
                }).then(function (newFile) {
                  fileList.push(newFile);
                  fileList.sort(sorter);

                  _this2.setState({
                    fileList: fileList
                  });

                  _this2.handleChange(newFile, fileList);

                  hideLoading();
                })["catch"](function (e) {
                  console.error('Uploader error', e);
                  message.error("".concat(file.name, " \u9884\u5904\u7406\u5931\u8D25"));
                  hideLoading();
                }); // not do the upload after image added

                return _context3.abrupt("return", false);

              case 27:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this2), "onSortEnd", function (result) {
      var onSortEnd = _this2.props.onSortEnd;

      if (result && result.source && result.destination) {
        var newFileList = arrayMove(_this2.state.fileList, result.source.index, result.destination.index);

        _this2.setState({
          fileList: newFileList
        });

        onSortEnd && onSortEnd(_this2.state.fileList.map(toAttachment), newFileList.map(toAttachment));
      }
    });

    _defineProperty(_assertThisInitialized(_this2), "onListTypeChange", function (e) {
      _this2.setState({
        listType: e.target.value
      });
    });

    _defineProperty(_assertThisInitialized(_this2), "renderRadio", function (showRadioButton) {
      var defaultRadioItems = [{
        key: 'picture-card',
        value: '网格'
      }, {
        key: 'text',
        value: '列表'
      }, {
        key: 'picture',
        value: '图片列表'
      }];
      var _showRadioButton$plac = showRadioButton.placement,
          placement = _showRadioButton$plac === void 0 ? 'right' : _showRadioButton$plac,
          _showRadioButton$show = showRadioButton.showRadioTitle,
          showRadioTitle = _showRadioButton$show === void 0 ? true : _showRadioButton$show,
          _showRadioButton$radi = showRadioButton.radioItems,
          radioItems = _showRadioButton$radi === void 0 ? defaultRadioItems : _showRadioButton$radi;
      return /*#__PURE__*/React.createElement("div", {
        className: "nsc-uploader-radio nsc-uploader-radio-".concat(placement)
      }, showRadioTitle && /*#__PURE__*/React.createElement("span", null, "\u6587\u4EF6\u5C55\u793A\u6837\u5F0F\uFF1A"), /*#__PURE__*/React.createElement(Radio.Group, {
        onChange: _this2.onListTypeChange,
        value: _this2.state.listType
      }, radioItems && radioItems.map(function (item) {
        return /*#__PURE__*/React.createElement(Radio, {
          key: item.key,
          value: item.key
        }, item.value);
      })));
    });

    _this2.state = {
      listType: 'picture-card',
      fileList: [] // [{ id, name, encodeFileName, size, type, ext, uid, url }]

    };
    _this2.uploadClient = null;
    return _this2;
  }

  _createClass(Uploader, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this3 = this;

      var _this$props = this.props,
          defaultFiles = _this$props.defaultFiles,
          getOssParams = _this$props.getOssParams,
          ossParams = _this$props.ossParams;

      if (getOssParams || getOssParams && ossParams && new Date(ossParams.Expiration) < Date.now()) {
        getOssParams().then(function (r) {
          _this3.uploadClient = getUploadClient(r);

          _this3.setState({
            fileList: defaultFiles.map(_this3.toFile).sort(sorter)
          });
        });
      } else if (ossParams) {
        this.uploadClient = getUploadClient(ossParams);
        this.setState({
          fileList: defaultFiles.map(this.toFile).sort(sorter)
        });
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (!isEqual(nextProps.defaultFiles, this.props.defaultFiles)) {
        this.setState({
          fileList: nextProps.defaultFiles.map(this.toFile).sort(sorter)
        });
      }
    }
  }, {
    key: "save",
    value: function save(file) {
      var _this4 = this;

      var onSave = this.props.onSave;
      return onSave(toAttachment(file)).then(function (r) {
        message.success('上传成功');
        return _this4.toFile(r);
      })["catch"](function (e) {
        console.error(e);
        message.error('上传失败');
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          fileList = _this$state.fileList,
          previewVisible = _this$state.previewVisible,
          lightboxFiles = _this$state.lightboxFiles,
          lightboxIndex = _this$state.lightboxIndex;

      var _this$props2 = this.props,
          dragSortable = _this$props2.dragSortable,
          beforeUpload = _this$props2.beforeUpload,
          type = _this$props2.type,
          maxFileNum = _this$props2.maxFileNum,
          disabled = _this$props2.disabled,
          children = _this$props2.children,
          _this$props2$classNam = _this$props2.className,
          className = _this$props2$classNam === void 0 ? '' : _this$props2$classNam,
          showUploadButton = _this$props2.showUploadButton,
          customRadioButton = _this$props2.customRadioButton,
          displayTools = _this$props2.displayTools,
          restProps = _objectWithoutProperties(_this$props2, ["dragSortable", "beforeUpload", "type", "maxFileNum", "disabled", "children", "className", "showUploadButton", "customRadioButton", "displayTools"]);

      var listType = this.props.listType ? this.props.listType : this.state.listType;
      var showRadioButton = this.props.listType ? false : this.props.showRadioButton;

      var props = _objectSpread2(_objectSpread2({}, restProps), {}, {
        fileList: fileList,
        listType: listType,
        beforeUpload: beforeUpload ? beforeUpload : this.beforeUpload,
        dragSortable: dragSortable,
        disabled: disabled,
        onSortEnd: this.onSortEnd,
        className: showUploadButton ? "".concat(className) : type === 'dragger' ? "".concat(className, " nsc-uploader-dragger-hide") : "".concat(className),
        onPreview: 'onPreview' in this.props ? this.props.onPreview : this.handlePreview,
        onRemove: this.handleRemove,
        onDownload: this.handleDownload
      }); //文件列表按上传顺序排序


      fileList.sort(sorter); //listType === "picture-card"时 默认上传按钮

      var cardButton = /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Icon, {
        type: "plus"
      }), /*#__PURE__*/React.createElement("div", {
        className: "uploadText"
      }, "\u4E0A\u4F20\u6587\u4EF6")); //listType === "text' 或 'picture"时默认上传按钮

      var textButton = /*#__PURE__*/React.createElement(Button, null, /*#__PURE__*/React.createElement(Icon, {
        type: "upload"
      }), " \u4E0A\u4F20\u6587\u4EF6"); //拖动上传时默认上传按钮

      var draggerBtn = /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
        className: "ant-upload-drag-icon"
      }, /*#__PURE__*/React.createElement(Icon, {
        type: "inbox",
        style: {
          color: '#3db389'
        }
      })), /*#__PURE__*/React.createElement("p", {
        className: "ant-upload-text"
      }, "\u70B9\u51FB\u83B7\u53D6\u62D6\u52A8 \u56FE\u7247\u6216\u6587\u6863 \u5230\u8FD9\u5757\u533A\u57DF\u5B8C\u6210\u6587\u4EF6\u4E0A\u4F20"));
      return /*#__PURE__*/React.createElement("div", {
        className: "nsc-upload-container"
      }, customRadioButton ? customRadioButton : showRadioButton ? this.renderRadio(showRadioButton) : null, type === 'dragger' ? /*#__PURE__*/React.createElement(Dragger, props, showUploadButton ? children ? children : maxFileNum in this.props && fileList.length >= maxFileNum ? null : draggerBtn : null) : /*#__PURE__*/React.createElement(Upload, props, showUploadButton ? children ? children : maxFileNum in this.props && fileList.length >= maxFileNum ? null : listType === 'picture-card' ? cardButton : textButton : null), previewVisible && lightboxFiles.length > 0 && /*#__PURE__*/React.createElement(Lightbox, {
        visible: previewVisible,
        imgvImages: lightboxFiles,
        activeIndex: lightboxIndex,
        displayTools: displayTools,
        onCancel: this.onLightboxClose
      }));
    }
  }]);

  return Uploader;
}(Component);

Uploader.propTypes = {
  getOssParams: PropTypes.func
};
Uploader.defaultProps = {
  dragSortable: false,
  defaultFiles: [],
  multiple: false,
  type: 'select',
  showUploadButton: true,
  showRadioButton: true,
  displayTools: ['zoomIn', 'zoomOut', 'prev', 'next', 'download', 'close']
};

export default Uploader;
