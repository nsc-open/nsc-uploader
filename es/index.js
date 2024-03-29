'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var PropTypes = require('prop-types');
var antd = require('antd');
var icons = require('@ant-design/icons');
var RcUpload = require('rc-upload');
var classNames = require('classnames');
var crypto = require('crypto');
var moment = require('moment');
var Animate = require('rc-animate');
var reactBeautifulDnd = require('react-beautiful-dnd');
var nscLightbox = require('nsc-lightbox');
var Url = require('url-parse');
var co = require('co');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);
var RcUpload__default = /*#__PURE__*/_interopDefaultLegacy(RcUpload);
var classNames__default = /*#__PURE__*/_interopDefaultLegacy(classNames);
var moment__default = /*#__PURE__*/_interopDefaultLegacy(moment);
var Animate__default = /*#__PURE__*/_interopDefaultLegacy(Animate);
var Url__default = /*#__PURE__*/_interopDefaultLegacy(Url);
var co__default = /*#__PURE__*/_interopDefaultLegacy(co);

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

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

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

var _listCacheClear = listCacheClear;

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

var eq_1 = eq;

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq_1(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

var _assocIndexOf = assocIndexOf;

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

var _listCacheDelete = listCacheDelete;

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

var _listCacheGet = listCacheGet;

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return _assocIndexOf(this.__data__, key) > -1;
}

var _listCacheHas = listCacheHas;

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

var _listCacheSet = listCacheSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = _listCacheClear;
ListCache.prototype['delete'] = _listCacheDelete;
ListCache.prototype.get = _listCacheGet;
ListCache.prototype.has = _listCacheHas;
ListCache.prototype.set = _listCacheSet;

var _ListCache = ListCache;

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new _ListCache;
  this.size = 0;
}

var _stackClear = stackClear;

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

var _stackDelete = stackDelete;

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

var _stackGet = stackGet;

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

var _stackHas = stackHas;

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

var _freeGlobal = freeGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = _freeGlobal || freeSelf || Function('return this')();

var _root = root;

/** Built-in value references. */
var Symbol$1 = _root.Symbol;

var _Symbol = Symbol$1;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

var _getRawTag = getRawTag;

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$1.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString$1.call(value);
}

var _objectToString = objectToString;

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag$1 && symToStringTag$1 in Object(value))
    ? _getRawTag(value)
    : _objectToString(value);
}

var _baseGetTag = baseGetTag;

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

var isObject_1 = isObject;

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject_1(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = _baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

var isFunction_1 = isFunction;

/** Used to detect overreaching core-js shims. */
var coreJsData = _root['__core-js_shared__'];

var _coreJsData = coreJsData;

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(_coreJsData && _coreJsData.keys && _coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

var _isMasked = isMasked;

/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

var _toSource = toSource;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto$1 = Function.prototype,
    objectProto$2 = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString$1 = funcProto$1.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto$2.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString$1.call(hasOwnProperty$1).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject_1(value) || _isMasked(value)) {
    return false;
  }
  var pattern = isFunction_1(value) ? reIsNative : reIsHostCtor;
  return pattern.test(_toSource(value));
}

var _baseIsNative = baseIsNative;

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

var _getValue = getValue;

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = _getValue(object, key);
  return _baseIsNative(value) ? value : undefined;
}

var _getNative = getNative;

/* Built-in method references that are verified to be native. */
var Map = _getNative(_root, 'Map');

var _Map = Map;

/* Built-in method references that are verified to be native. */
var nativeCreate = _getNative(Object, 'create');

var _nativeCreate = nativeCreate;

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = _nativeCreate ? _nativeCreate(null) : {};
  this.size = 0;
}

var _hashClear = hashClear;

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

var _hashDelete = hashDelete;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto$3 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$2 = objectProto$3.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (_nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty$2.call(data, key) ? data[key] : undefined;
}

var _hashGet = hashGet;

/** Used for built-in method references. */
var objectProto$4 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$3 = objectProto$4.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return _nativeCreate ? (data[key] !== undefined) : hasOwnProperty$3.call(data, key);
}

var _hashHas = hashHas;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (_nativeCreate && value === undefined) ? HASH_UNDEFINED$1 : value;
  return this;
}

var _hashSet = hashSet;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = _hashClear;
Hash.prototype['delete'] = _hashDelete;
Hash.prototype.get = _hashGet;
Hash.prototype.has = _hashHas;
Hash.prototype.set = _hashSet;

var _Hash = Hash;

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new _Hash,
    'map': new (_Map || _ListCache),
    'string': new _Hash
  };
}

var _mapCacheClear = mapCacheClear;

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

var _isKeyable = isKeyable;

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return _isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

var _getMapData = getMapData;

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = _getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

var _mapCacheDelete = mapCacheDelete;

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return _getMapData(this, key).get(key);
}

var _mapCacheGet = mapCacheGet;

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return _getMapData(this, key).has(key);
}

var _mapCacheHas = mapCacheHas;

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = _getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

var _mapCacheSet = mapCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = _mapCacheClear;
MapCache.prototype['delete'] = _mapCacheDelete;
MapCache.prototype.get = _mapCacheGet;
MapCache.prototype.has = _mapCacheHas;
MapCache.prototype.set = _mapCacheSet;

var _MapCache = MapCache;

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof _ListCache) {
    var pairs = data.__data__;
    if (!_Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new _MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

var _stackSet = stackSet;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new _ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = _stackClear;
Stack.prototype['delete'] = _stackDelete;
Stack.prototype.get = _stackGet;
Stack.prototype.has = _stackHas;
Stack.prototype.set = _stackSet;

var _Stack = Stack;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$2 = '__lodash_hash_undefined__';

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED$2);
  return this;
}

var _setCacheAdd = setCacheAdd;

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

var _setCacheHas = setCacheHas;

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new _MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = _setCacheAdd;
SetCache.prototype.has = _setCacheHas;

var _SetCache = SetCache;

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

var _arraySome = arraySome;

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

var _cacheHas = cacheHas;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var index = -1,
      result = true,
      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new _SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!_arraySome(other, function(othValue, othIndex) {
            if (!_cacheHas(seen, othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

var _equalArrays = equalArrays;

/** Built-in value references. */
var Uint8Array = _root.Uint8Array;

var _Uint8Array = Uint8Array;

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

var _mapToArray = mapToArray;

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

var _setToArray = setToArray;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$1 = 1,
    COMPARE_UNORDERED_FLAG$1 = 2;

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]';

/** Used to convert symbols to primitives and strings. */
var symbolProto = _Symbol ? _Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new _Uint8Array(object), new _Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq_1(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = _mapToArray;

    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG$1;
      convert || (convert = _setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG$1;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = _equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

var _equalByTag = equalByTag;

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

var _arrayPush = arrayPush;

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

var isArray_1 = isArray;

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray_1(object) ? result : _arrayPush(result, symbolsFunc(object));
}

var _baseGetAllKeys = baseGetAllKeys;

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

var _arrayFilter = arrayFilter;

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

var stubArray_1 = stubArray;

/** Used for built-in method references. */
var objectProto$5 = Object.prototype;

/** Built-in value references. */
var propertyIsEnumerable = objectProto$5.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray_1 : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return _arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

var _getSymbols = getSymbols;

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

var _baseTimes = baseTimes;

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

var isObjectLike_1 = isObjectLike;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike_1(value) && _baseGetTag(value) == argsTag;
}

var _baseIsArguments = baseIsArguments;

/** Used for built-in method references. */
var objectProto$6 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$4 = objectProto$6.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable$1 = objectProto$6.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = _baseIsArguments(function() { return arguments; }()) ? _baseIsArguments : function(value) {
  return isObjectLike_1(value) && hasOwnProperty$4.call(value, 'callee') &&
    !propertyIsEnumerable$1.call(value, 'callee');
};

var isArguments_1 = isArguments;

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

var stubFalse_1 = stubFalse;

var isBuffer_1 = createCommonjsModule(function (module, exports) {
/** Detect free variable `exports`. */
var freeExports =  exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? _root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse_1;

module.exports = isBuffer;
});

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

var _isIndex = isIndex;

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER$1 = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER$1;
}

var isLength_1 = isLength;

/** `Object#toString` result references. */
var argsTag$1 = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag$1 = '[object Boolean]',
    dateTag$1 = '[object Date]',
    errorTag$1 = '[object Error]',
    funcTag$1 = '[object Function]',
    mapTag$1 = '[object Map]',
    numberTag$1 = '[object Number]',
    objectTag = '[object Object]',
    regexpTag$1 = '[object RegExp]',
    setTag$1 = '[object Set]',
    stringTag$1 = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag$1 = '[object ArrayBuffer]',
    dataViewTag$1 = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag$1] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag$1] = typedArrayTags[boolTag$1] =
typedArrayTags[dataViewTag$1] = typedArrayTags[dateTag$1] =
typedArrayTags[errorTag$1] = typedArrayTags[funcTag$1] =
typedArrayTags[mapTag$1] = typedArrayTags[numberTag$1] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag$1] =
typedArrayTags[setTag$1] = typedArrayTags[stringTag$1] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike_1(value) &&
    isLength_1(value.length) && !!typedArrayTags[_baseGetTag(value)];
}

var _baseIsTypedArray = baseIsTypedArray;

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

var _baseUnary = baseUnary;

var _nodeUtil = createCommonjsModule(function (module, exports) {
/** Detect free variable `exports`. */
var freeExports =  exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && _freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule && freeModule.require && freeModule.require('util').types;

    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node.js < 10.
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;
});

/* Node.js helper references. */
var nodeIsTypedArray = _nodeUtil && _nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? _baseUnary(nodeIsTypedArray) : _baseIsTypedArray;

var isTypedArray_1 = isTypedArray;

/** Used for built-in method references. */
var objectProto$7 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$5 = objectProto$7.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray_1(value),
      isArg = !isArr && isArguments_1(value),
      isBuff = !isArr && !isArg && isBuffer_1(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray_1(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? _baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty$5.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           _isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

var _arrayLikeKeys = arrayLikeKeys;

/** Used for built-in method references. */
var objectProto$8 = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$8;

  return value === proto;
}

var _isPrototype = isPrototype;

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

var _overArg = overArg;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = _overArg(Object.keys, Object);

var _nativeKeys = nativeKeys;

/** Used for built-in method references. */
var objectProto$9 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$6 = objectProto$9.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!_isPrototype(object)) {
    return _nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty$6.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

var _baseKeys = baseKeys;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength_1(value.length) && !isFunction_1(value);
}

var isArrayLike_1 = isArrayLike;

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike_1(object) ? _arrayLikeKeys(object) : _baseKeys(object);
}

var keys_1 = keys;

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return _baseGetAllKeys(object, keys_1, _getSymbols);
}

var _getAllKeys = getAllKeys;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$2 = 1;

/** Used for built-in method references. */
var objectProto$a = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$7 = objectProto$a.hasOwnProperty;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$2,
      objProps = _getAllKeys(object),
      objLength = objProps.length,
      othProps = _getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty$7.call(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

var _equalObjects = equalObjects;

/* Built-in method references that are verified to be native. */
var DataView = _getNative(_root, 'DataView');

var _DataView = DataView;

/* Built-in method references that are verified to be native. */
var Promise$1 = _getNative(_root, 'Promise');

var _Promise = Promise$1;

/* Built-in method references that are verified to be native. */
var Set = _getNative(_root, 'Set');

var _Set = Set;

/* Built-in method references that are verified to be native. */
var WeakMap = _getNative(_root, 'WeakMap');

var _WeakMap = WeakMap;

/** `Object#toString` result references. */
var mapTag$2 = '[object Map]',
    objectTag$1 = '[object Object]',
    promiseTag = '[object Promise]',
    setTag$2 = '[object Set]',
    weakMapTag$1 = '[object WeakMap]';

var dataViewTag$2 = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = _toSource(_DataView),
    mapCtorString = _toSource(_Map),
    promiseCtorString = _toSource(_Promise),
    setCtorString = _toSource(_Set),
    weakMapCtorString = _toSource(_WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = _baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((_DataView && getTag(new _DataView(new ArrayBuffer(1))) != dataViewTag$2) ||
    (_Map && getTag(new _Map) != mapTag$2) ||
    (_Promise && getTag(_Promise.resolve()) != promiseTag) ||
    (_Set && getTag(new _Set) != setTag$2) ||
    (_WeakMap && getTag(new _WeakMap) != weakMapTag$1)) {
  getTag = function(value) {
    var result = _baseGetTag(value),
        Ctor = result == objectTag$1 ? value.constructor : undefined,
        ctorString = Ctor ? _toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag$2;
        case mapCtorString: return mapTag$2;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag$2;
        case weakMapCtorString: return weakMapTag$1;
      }
    }
    return result;
  };
}

var _getTag = getTag;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$3 = 1;

/** `Object#toString` result references. */
var argsTag$2 = '[object Arguments]',
    arrayTag$1 = '[object Array]',
    objectTag$2 = '[object Object]';

/** Used for built-in method references. */
var objectProto$b = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$8 = objectProto$b.hasOwnProperty;

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray_1(object),
      othIsArr = isArray_1(other),
      objTag = objIsArr ? arrayTag$1 : _getTag(object),
      othTag = othIsArr ? arrayTag$1 : _getTag(other);

  objTag = objTag == argsTag$2 ? objectTag$2 : objTag;
  othTag = othTag == argsTag$2 ? objectTag$2 : othTag;

  var objIsObj = objTag == objectTag$2,
      othIsObj = othTag == objectTag$2,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer_1(object)) {
    if (!isBuffer_1(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new _Stack);
    return (objIsArr || isTypedArray_1(object))
      ? _equalArrays(object, other, bitmask, customizer, equalFunc, stack)
      : _equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG$3)) {
    var objIsWrapped = objIsObj && hasOwnProperty$8.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty$8.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new _Stack);
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new _Stack);
  return _equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

var _baseIsEqualDeep = baseIsEqualDeep;

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObjectLike_1(value) && !isObjectLike_1(other))) {
    return value !== value && other !== other;
  }
  return _baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

var _baseIsEqual = baseIsEqual;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$4 = 1,
    COMPARE_UNORDERED_FLAG$2 = 2;

/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if ((noCustomizer && data[2])
          ? data[1] !== object[data[0]]
          : !(data[0] in object)
        ) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var stack = new _Stack;
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }
      if (!(result === undefined
            ? _baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG$4 | COMPARE_UNORDERED_FLAG$2, customizer, stack)
            : result
          )) {
        return false;
      }
    }
  }
  return true;
}

var _baseIsMatch = baseIsMatch;

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && !isObject_1(value);
}

var _isStrictComparable = isStrictComparable;

/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData(object) {
  var result = keys_1(object),
      length = result.length;

  while (length--) {
    var key = result[length],
        value = object[key];

    result[length] = [key, value, _isStrictComparable(value)];
  }
  return result;
}

var _getMatchData = getMatchData;

/**
 * A specialized version of `matchesProperty` for source values suitable
 * for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function matchesStrictComparable(key, srcValue) {
  return function(object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue &&
      (srcValue !== undefined || (key in Object(object)));
  };
}

var _matchesStrictComparable = matchesStrictComparable;

/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatches(source) {
  var matchData = _getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return _matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }
  return function(object) {
    return object === source || _baseIsMatch(object, source, matchData);
  };
}

var _baseMatches = baseMatches;

/** `Object#toString` result references. */
var symbolTag$1 = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike_1(value) && _baseGetTag(value) == symbolTag$1);
}

var isSymbol_1 = isSymbol;

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray_1(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol_1(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

var _isKey = isKey;

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || _MapCache);
  return memoized;
}

// Expose `MapCache`.
memoize.Cache = _MapCache;

var memoize_1 = memoize;

/** Used as the maximum memoize cache size. */
var MAX_MEMOIZE_SIZE = 500;

/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
function memoizeCapped(func) {
  var result = memoize_1(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  var cache = result.cache;
  return result;
}

var _memoizeCapped = memoizeCapped;

/** Used to match property names within property paths. */
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = _memoizeCapped(function(string) {
  var result = [];
  if (string.charCodeAt(0) === 46 /* . */) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

var _stringToPath = stringToPath;

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

var _arrayMap = arrayMap;

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto$1 = _Symbol ? _Symbol.prototype : undefined,
    symbolToString = symbolProto$1 ? symbolProto$1.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray_1(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return _arrayMap(value, baseToString) + '';
  }
  if (isSymbol_1(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

var _baseToString = baseToString;

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : _baseToString(value);
}

var toString_1 = toString;

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value, object) {
  if (isArray_1(value)) {
    return value;
  }
  return _isKey(value, object) ? [value] : _stringToPath(toString_1(value));
}

var _castPath = castPath;

/** Used as references for various `Number` constants. */
var INFINITY$1 = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol_1(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY$1) ? '-0' : result;
}

var _toKey = toKey;

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = _castPath(path, object);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[_toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

var _baseGet = baseGet;

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : _baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

var get_1 = get;

/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}

var _baseHasIn = baseHasIn;

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath(object, path, hasFunc) {
  path = _castPath(path, object);

  var index = -1,
      length = path.length,
      result = false;

  while (++index < length) {
    var key = _toKey(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && isLength_1(length) && _isIndex(key, length) &&
    (isArray_1(object) || isArguments_1(object));
}

var _hasPath = hasPath;

/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b');
 * // => true
 *
 * _.hasIn(object, ['a', 'b']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */
function hasIn(object, path) {
  return object != null && _hasPath(object, path, _baseHasIn);
}

var hasIn_1 = hasIn;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$5 = 1,
    COMPARE_UNORDERED_FLAG$3 = 2;

/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatchesProperty(path, srcValue) {
  if (_isKey(path) && _isStrictComparable(srcValue)) {
    return _matchesStrictComparable(_toKey(path), srcValue);
  }
  return function(object) {
    var objValue = get_1(object, path);
    return (objValue === undefined && objValue === srcValue)
      ? hasIn_1(object, path)
      : _baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG$5 | COMPARE_UNORDERED_FLAG$3);
  };
}

var _baseMatchesProperty = baseMatchesProperty;

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

var identity_1 = identity;

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

var _baseProperty = baseProperty;

/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyDeep(path) {
  return function(object) {
    return _baseGet(object, path);
  };
}

var _basePropertyDeep = basePropertyDeep;

/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ];
 *
 * _.map(objects, _.property('a.b'));
 * // => [2, 1]
 *
 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
 * // => [1, 2]
 */
function property(path) {
  return _isKey(path) ? _baseProperty(_toKey(path)) : _basePropertyDeep(path);
}

var property_1 = property;

/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */
function baseIteratee(value) {
  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
  if (typeof value == 'function') {
    return value;
  }
  if (value == null) {
    return identity_1;
  }
  if (typeof value == 'object') {
    return isArray_1(value)
      ? _baseMatchesProperty(value[0], value[1])
      : _baseMatches(value);
  }
  return property_1(value);
}

var _baseIteratee = baseIteratee;

/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

var _baseFindIndex = baseFindIndex;

/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */
function baseIsNaN(value) {
  return value !== value;
}

var _baseIsNaN = baseIsNaN;

/**
 * A specialized version of `_.indexOf` which performs strict equality
 * comparisons of values, i.e. `===`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function strictIndexOf(array, value, fromIndex) {
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

var _strictIndexOf = strictIndexOf;

/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  return value === value
    ? _strictIndexOf(array, value, fromIndex)
    : _baseFindIndex(array, _baseIsNaN, fromIndex);
}

var _baseIndexOf = baseIndexOf;

/**
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludes(array, value) {
  var length = array == null ? 0 : array.length;
  return !!length && _baseIndexOf(array, value, 0) > -1;
}

var _arrayIncludes = arrayIncludes;

/**
 * This function is like `arrayIncludes` except that it accepts a comparator.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @param {Function} comparator The comparator invoked per element.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludesWith(array, value, comparator) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (comparator(value, array[index])) {
      return true;
    }
  }
  return false;
}

var _arrayIncludesWith = arrayIncludesWith;

/**
 * This method returns `undefined`.
 *
 * @static
 * @memberOf _
 * @since 2.3.0
 * @category Util
 * @example
 *
 * _.times(2, _.noop);
 * // => [undefined, undefined]
 */
function noop() {
  // No operation performed.
}

var noop_1 = noop;

/** Used as references for various `Number` constants. */
var INFINITY$2 = 1 / 0;

/**
 * Creates a set object of `values`.
 *
 * @private
 * @param {Array} values The values to add to the set.
 * @returns {Object} Returns the new set.
 */
var createSet = !(_Set && (1 / _setToArray(new _Set([,-0]))[1]) == INFINITY$2) ? noop_1 : function(values) {
  return new _Set(values);
};

var _createSet = createSet;

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE$1 = 200;

/**
 * The base implementation of `_.uniqBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new duplicate free array.
 */
function baseUniq(array, iteratee, comparator) {
  var index = -1,
      includes = _arrayIncludes,
      length = array.length,
      isCommon = true,
      result = [],
      seen = result;

  if (comparator) {
    isCommon = false;
    includes = _arrayIncludesWith;
  }
  else if (length >= LARGE_ARRAY_SIZE$1) {
    var set = iteratee ? null : _createSet(array);
    if (set) {
      return _setToArray(set);
    }
    isCommon = false;
    includes = _cacheHas;
    seen = new _SetCache;
  }
  else {
    seen = iteratee ? [] : result;
  }
  outer:
  while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value) : value;

    value = (comparator || value !== 0) ? value : 0;
    if (isCommon && computed === computed) {
      var seenIndex = seen.length;
      while (seenIndex--) {
        if (seen[seenIndex] === computed) {
          continue outer;
        }
      }
      if (iteratee) {
        seen.push(computed);
      }
      result.push(value);
    }
    else if (!includes(seen, computed, comparator)) {
      if (seen !== result) {
        seen.push(computed);
      }
      result.push(value);
    }
  }
  return result;
}

var _baseUniq = baseUniq;

/**
 * This method is like `_.uniq` except that it accepts `iteratee` which is
 * invoked for each element in `array` to generate the criterion by which
 * uniqueness is computed. The order of result values is determined by the
 * order they occur in the array. The iteratee is invoked with one argument:
 * (value).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
 * @returns {Array} Returns the new duplicate free array.
 * @example
 *
 * _.uniqBy([2.1, 1.2, 2.3], Math.floor);
 * // => [2.1, 1.2]
 *
 * // The `_.property` iteratee shorthand.
 * _.uniqBy([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
 * // => [{ 'x': 1 }, { 'x': 2 }]
 */
function uniqBy(array, iteratee) {
  return (array && array.length) ? _baseUniq(array, _baseIteratee(iteratee)) : [];
}

var uniqBy_1 = uniqBy;

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol_1(value)) {
    return NAN;
  }
  if (isObject_1(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject_1(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

var toNumber_1 = toNumber;

/** Used as references for various `Number` constants. */
var INFINITY$3 = 1 / 0,
    MAX_INTEGER = 1.7976931348623157e+308;

/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber_1(value);
  if (value === INFINITY$3 || value === -INFINITY$3) {
    var sign = (value < 0 ? -1 : 1);
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}

var toFinite_1 = toFinite;

/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */
function toInteger(value) {
  var result = toFinite_1(value),
      remainder = result % 1;

  return result === result ? (remainder ? result - remainder : result) : 0;
}

var toInteger_1 = toInteger;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * This method is like `_.find` except that it returns the index of the first
 * element `predicate` returns truthy for instead of the element itself.
 *
 * @static
 * @memberOf _
 * @since 1.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @param {number} [fromIndex=0] The index to search from.
 * @returns {number} Returns the index of the found element, else `-1`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'active': false },
 *   { 'user': 'fred',    'active': false },
 *   { 'user': 'pebbles', 'active': true }
 * ];
 *
 * _.findIndex(users, function(o) { return o.user == 'barney'; });
 * // => 0
 *
 * // The `_.matches` iteratee shorthand.
 * _.findIndex(users, { 'user': 'fred', 'active': false });
 * // => 1
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.findIndex(users, ['active', false]);
 * // => 0
 *
 * // The `_.property` iteratee shorthand.
 * _.findIndex(users, 'active');
 * // => 2
 */
function findIndex(array, predicate, fromIndex) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return -1;
  }
  var index = fromIndex == null ? 0 : toInteger_1(fromIndex);
  if (index < 0) {
    index = nativeMax(length + index, 0);
  }
  return _baseFindIndex(array, _baseIteratee(predicate), index);
}

var findIndex_1 = findIndex;

var encodeFileName = function encodeFileName(filename) {
  var timeStr = moment__default['default']().format('YYYYMMDDHHmmss');
  var hash = crypto.createHash('md5').update(filename + timeStr).digest('hex');
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

var pdfPng = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAUjklEQVR4Xu2dC3hV1ZXH177JDeQBCRDICwI0yeV1iDDgozoWcKTUamesj+koOtY6fortZzv1Ne1oobZYBacV1Got1gdirdb6qDO1zozgiLX1QSWACkhAIOH9zpMkd8+3Tl737T3n7pOzz73//X35ktzsvfZa/71+2efss885glCgABSIq4CANlAACsRXAIAgO6BAAgUACNIDCgAQ5AAUsKcAZhB7uqFVhigAQDJkoBGmPQUAiD3d0CpDFAAgGTLQCNOeAgDEnm5olSEKAJAMGWiEaU8BAGJPN7TKEAUASIYMNMK0pwAAsacbWmWIAgBE04Gury2fIMlnBCk41YqLNXWNi6zUR93ECgAQlzNk2+SySsrKMiQFDRLCICJDEhmCyG/ZNUlrqjc0zLHcDg3iKgBABig5Ns8oL/Z1+QwhgwYFhUGCGIYpRFSkzAUAokzKXkMARLGkjTPK89o6fUaX5EMjwTMBgzCJiCoUdxVtDoAolxiA2JRUEon6qaMNEkFDUvehUQ8INTZNpt4MgKSuYYQFAJKEpFuNMVUkugzRc44giCZKogAR5SXRfOCqABDlWgOQEEl3zBhb1tF5ciqRz6AgGUKYEPDXSOXKO2EQgChXNSMB2T5tXFFQthsMQpAPj4Iy0APDWOUKD6RBAKJc7bQGZNOUKTk5WUcMwRAIwStGAQpSQAoZEETZytV02yAAUT4CaQPIFqNskhA+w+eTvGIUkEERoO5DpELlqulqEIAoHxnPAVI/vWyslD5DBntAIMGzAa8clStXx2sGAYjyEdMWkK3TS0eKYJYhJE0MEjEEAZLEs0K1chXSxSAAUT6SrgOyacrIgpysHL6gZq4Y9a4cSYaBKFd5xOlsEIAoH90BA0QS+TYbo40sn+wGgYEQVGPOCkTFyiPLRIMARPmoOwIIX1gTvFIkKBAkc8Wo93pCpfIIYLBfAQCiPBtSAmT7lHGl0tcV6OpeNu2BoHuGIKIs5d7CYGIFAIjyDLEMyNba8kU+8tWYWy14GVXKocq9gkF7CgAQe7olaGULEEFioXJPYDB1BQBI6hpGWAAgyiV10aCkNVLIN1z0wP2updgkKFjvJ3/92A07j6TqEABJVUG011cBQY9Ur2+4LhUHAUgq6qGtJxTwZ3VNGfvXvR/acRaA2FENbTymgNxUXdfIN7RZLgDEsmRo4EkFhLyxen3j/VZ9ByBWFUN9ryrw1+q6hr+x6jwAsaqYxvWHX/9djb0bONcOP/zTqM4EUUtVXUO+VS8AiFXFNK5ftX63xt4NjGut771NjddcGruzbFFTvW73J1Y8ASBW1NK8LgAhSgSIDIo5NRt3r7EyjADEilqa1wUgAETzFHXXPQACQNzNQM17ByAARPMUddc9AAJA3M1AzXsHIABE8xR11z0AAkDczUDNewcgAETzFHXXPQACQNzNQM17ByAARPMUddc9AAJA3M1AzXsHIABE8xR11z0AAkDczUDNewcgAETzFHXXPQACQNzNQM17ByAARPMUddc9AAJA3M1AzXsHIABE8xR11z0AAkDczUDNewcgAETzFHXXPQACQNzNQM17ByAARPMUddc9AAJA3M1AzXsHIABE8xR11z0AAkDczUDNewcgAETzFHXXPQACQNzNQM17ByAARPMUddc9AAJA3M1AzXsHIABE8xR11z0AAkDczUDNe1cNSLC1hY7+cjl17t9LXQf30+BTZtKwBXq/pAevP9A8Sd10TyUgHQ076cAPbjLftxFahl56JY28/SduhpmwbwCi7dC475hKQPbdcj01vfZKX1D+yvHUsXO7+XvZ8scpb9a57gccwwMAouWw6OGUKkBObttCuy46Jyyowsu/Qcee/pX5Wf6sc6l0+eN6BB3hBQDRclj0cEoVIEce+ilFvgiz7MGVtOebV5qB8mxS+fs39QgagGg5Dlo6pQoQfglm6LmHb8hQGr/2Q9p2yui+uFX1pVpIzCCqFU0jeyqStrNxN3163hlhqhSc9w804sbv9X3uHzOOKl9Zq6VyAETLYdHDKRWAHPvNE3Twrn8PC6hk6cPky82lPd+6yvw878zZVPbQU3oEjUMsLcdBS6dUAHLo3jvp6MpHwuIb87vXqfXPb9LBJQvNzwu/dhUVf3+xlhpgBtFyWPRwSgUg++/4Vzrx8nNhAY1/6yM68MNb+pZ9i29ZSIVXXKtH0JhBtBwHLZ1SAcjeG6+m5jf+O3wGef5/aNfF/dc9Spc/Rvmz5mqpAWYQLYdFD6dUANJw9cXUtu4vfQFlFQ2joZdcQUdW3G9+ll1SRmNeWE2+/AI9gvbiDDL8+uT36wTb24hXTjp21lP7Rxvjim7FZteRQ+YyJV/wSqZYsR3LXuQ1g2T6dKKOCkB2X/Zlav+wrs+9nKoAybY24q0n5vnHZVdT8b/9yAn3ldj0xAzCCWd1U5s8edI8OTy8/O6YQtmx2bbuHWp+/dWok87IDsoffY5yZ37e1gAlGhBbBlNopAKQXRfOppPbP+nzIve0s6j1nbf6fi9f8SzlnnpmCl462zRtAemVjff/8D6gyGIHkM+y2ft3ANKv9qdfOp069zT0fZB35ixq+dMb5u+DT5lBFU++5GyGp2g97QFhfY7/dhUd+NFtYVKlAggbOvHiM7R/4c0x5Qcg/bLsmF1LXUcOx9RpxHdvp6Krov95pZjTSpt7FhDe3xNaRG4u5QQmE/+HilUij4VjARJpk+34qwJU8MULYtrc++1vUPOa16L+FgkIi9z2bvg270SjmE7nIPWn15Bsa40KV/j9NOaFNeQfM1ZpQqs25llAIvf39AqTP/uLVHT1Aho87dQwrXjV5PD99/R9FguQ0L1BoY1zzzib+L/doAlTwmy2ffAuNVz11aQAYX+9VlScg8TTtGDe31PJkp9rL0naAcKK58+eS6XLHgsT/8SLv6H9C2+yBUhvo1j3LRz62WI6+vhDYX3FmkEyFZB4h1g63wMSOphpCQgHOG71B5Q1vLgv1pY3/7dv7w9/aGUG6TWSM76axry4JgyGk1s+ol2Xhl/kAiD9EkWuYvFfBk+bSRVPvKj97MEOpi0g4//0cdjFp8hA7QDCgpU98ATlnf13YYNbf0YNydb+42wA0i9P5IVC/kvJT+6ngi9HH5rqSExaAlL4T1+n4u/9OExvVYDwpjreXBdads8/n9o3ru/7CIB0S3H4waV05JFlUXk/8o57aOgl83XkIcqntAOEV5x4O3VkObZqBR1csiilcxBuXPTP19GIm+4IM7/3O9dQ8+o/JgQkmWzgVbTIhxok086pOqmcpDe9+jLtu+2GmK4NOf+rNOqu7q0muhfPAhK6JJtVWkbZJeXkH11p3r4Zq+z+x3nUvnlTyoAUnHchldz9QFgXB+68lY4//3RcQJJNgngrc8m2V13PLiAnt35MexbMp84D+2K6xPuvxr72rmp3HbHnWUCsqHHwnh/0PSCgt53dcxDeQsKHUKGFl497N9/x53YvFKYFIFJS44L51Pr2/yUcotFP/Z4GTZ1uZRhdqZv2gMS6is5K2wUk1gwSCWAmA3Jw6SI69tSKz0zmETcvpKIr9bwHJNT5tAWEd5Aef36Vuc0kVrELSKxzkH233kBNf3w57iFWslfSuZ6Xz0GO/+7X5o1QkYW1jtwdMMiYRqNX9T8n6zOJcqmCZwGJtS2ENeTHWvJXy9rXE0pqF5Di2+4kfqZTaIk8NMrEVay29e+b5x3B5qYwbQrmXmDubNh9+flR4zFq8TIacsHFLqV+ct16FpBUj9ftAlL6sxWUf86XwtTdfrZBweNHE84g6Xwlne+X4QcwtG/8IEyXQZOm0uhn/mB+1nj95VHnJbHO55JL24GrBUBCtI63b6i3SvbIEqr49X8Rf+8tvGKz65Lwx2Zm2gwS+VhR1oZXqngre3ZpuSnVsVWP9j2kITS9S//jF5R/bvTsMnAIJO4JgFgAJNasw/uweD9WaMkkQA7dt5iOPha+F4136pYu+xXlnTWnTxa+y3PnRXPCdhzwH/P+9hwqe/BJXXiI8gOAJAkIHw6MuvuBsNmDm0ZeRefPMgWQ488+SQcWfz8qqfhCKi9mRJZ9t32Tml6NvkFq5MKlNPSiy7SEBICEDEvkeQLfP501bARll1XQkAu/FjWA8e5WzARAWtau7nu2bqgwfAMU3xoQq/Ctto3XRuvoKyyiikd/Szk1E7WDxHVAttWWL5Qk+veAxJAo1qGNEyfpVkYn1hPLe9unOyB8jznv0o0sQ75yCY368X0JZTx031109LHo+0B0PdRyHZCtteWLBInuR+zFKboBEjx2lLZ/wYjrbzoDItvbqf60qqjY886aTSV3P0i+oYUJAeHVPp5F2j/u3/bT22D4DTfTsOu+Y+X/lON1AYhFiZv+8wU68vjPie8DiVfSFZCuwwfp07kzSXZ2hoXOy7kjFy4h/p5M4YuqfHE1Vil7+GnK+/wXkjEzIHU8A8jgU8Mfo5PqzleelSJtRioebDpBnfv2mE/l4Lchtb33NnUd67/ekQiQyL95/TpI+0cbzHOOrkMHw0Lj5Vw+yeYZhIvsOEldB/abGxX553il6ZXn6fgLz0T9mTecjn72NW0eJOcJQAbkXwU6iVKAd/O2/uUtan1nrfk8sJP1W8Pq8HJuTs0k4guF/OSSWA9nsCMrPwOAX4ngrxwX8n08iZwcO+ZSagNAUpIvvRvzLcahD31zO1q+lcGEpnI8DZ5+Wtynzaj0E4CoVBO2BlQBX24e5c2ZR/lz5jkGCwAZ0CFNj8748aEi20/Cn03E382f/d0/+7NJZOeYv/d+JtvbKNh8goJNTSRbmijY3EzBlmZzY6Ps+c6/p1L43GXYtd+Oeb0qFbuuA5LMdZBUAkRbtQqk+kTKeN7w40gP3fvDqAeEM2SyoyPpIHgFjFfCVBXXAUnmOoiqYGEnNQWGXXsjDf/WrakZSdCaVwwZktD3qfdWzy6toMLLvk5dhw8RP8IpcsEg1KzKh0IAEMeGO70MF8z7CpUsCd+U6FSEsV4b3dsX32hVdMW/UE7VBGr585vmq9xa3lod5orK964DEKdGOY3sunHfBs8iPJvwrBKr5M06l4ZePN98M1XTH14yt9O3bVhnVvUVDCF+zZuKAkBUqJjGNgrmnk8l9/7ClQh5vxtD0vu6hFhO8POSeSWLS0f9FvPwjB9gXvZQ7FutrQYCQKwqlkH1+aEK/HAFt8vRlb+kYysfiTubRPqnciEBgLg9+hr3b/e5WE6ExIdaDAnDkqj48vJp/NublbkAQJRJmX6GdAKkV92OHdvMt+aeeOnZqCVhvn9n5KKlNLh2hrLBACDKpEw/QzoCEqpy6COS/BWV5o1tqgsAUa1oGtnTHZCBkBqADITKHu0DgHjk/SAezS/Puw1AAIjnk9jJAAAIAHEyvzxvG4AAEM8nsZMBABAA4mR+ed42AAEgnk9iJwMAIADEyfzyvG0AAkA8n8ROBgBAAIiT+eV52wAEgHg+iZ0MAIAAECfzy/O2AQgA8XwSOxkAAAEgTuaX520DEADi+SR2MgAAAkCczC/P2wYgAMTzSexkAAAEgDiZX563DUAAiOeT2MkAAAgAcTK/PG8bgAAQzyexkwEAEADiZH553jYAASCeT2InAwAgAMTJ/PK8bQACQDyfxE4GAEAAiJP55XnbAASAeD6JnQwAgAAQJ/PL87YBCADxfBI7GQAAASBO5pfnbQMQAOL5JHYyAAACQJzML8/bBiAAxPNJ7GQAAEQDQLbVli+UJBY5OdCwbU8BAKIBIFtryxcJEu6/a9heDqV1KwACQNI6wVMNDoAAkFRzKK3bA5DEgBD5plbX7dpoJQmElcpcF4dYVhUbuPrljz43cJ1p3FPjNZdGeSeJOo75S/Nnvv9+hxXXAYgVtVDXswoIog+q6hqmWw0AgFhVDPW9qsDi6rqG2606D0CsKob6XlSgVQiaVrW+YYtV5y0DgusgViVGfQ0UeLi6rmGBHT8sA4KTdDsyo407Coj3pZDLatY3rLTbPwCxq5yO7SSt0dEtJ30Sgk5IEk0k5AmS/LNsyiJaR0SbP1fXuDnVvgFIqgrq1F7SmuoNDXN0csnrvgAQr49gqP8ARPloWgYEJ+nKx0CdQQCiTsseS5YB6TlJv4KIqpR7A4OpKQBAUtMvRmvLgLANSeTbMbU8IAUFgkQBMr9EgCQFSFCZci9hMDkFAEhyOlmoZQuQePb31pbkN0nfxKAQgSxBNQyODAqGhiEqtOAXqtpRAIDYUS1hG6WAxOupcUZ5cVuHnNRFIiAYlqA509QQ+QJE0q88qkw1CECUj/yAABLP642TyyoH+bMnCZImNJIoIITk2Wac8kgzwSAAUT7KrgISL5qPa8snZAvfZMHnNgxONzT8NUq5AulkEIAoH00tAYkV5erZlF1xtMIQUhi+INWEQMPgFChXxosGAYjyUfMMIHFnmwnFQ7JyBhmChEFCTuDDNB/1LBAQ+ZQrprNBAKJ8dDwPSDxFPqktGUWUbRAJQ5KcaB6udX+NUa6iLgYBiPKRSFtA4ilVP71srJQ+g7qEIYWc1AMNgzNCuboDbRCAKFc84wCJp+D2qeUTO4UwZxyfkJPNazh84ZMoV7nqThkEIMqVBSAJJH1vxgx/YeceExrzHEdKg7rPb/hLvwJAlI8JALEh6dbThw8VzYMNEj6DKGiQ4PMcmiCIym2YU9cEgKjTsscSAFEoab0xqkT6/D0LA0HzOxFNJKIihd3ENwVAlMsMQJRLGm1w+7TScUGZ1QNMNzhSEi8Q5CjtHoAolZONARDlkiZvcIdRNikofIbsvobDsw0fqvHCgL0CQOzplqAVAFEuaWoG5ZQpOZ9mHTGCJIwukp+zaq2mrhFP3rcqGgBRqBhMZZQCmEEyargRrFUFAIhVxVA/oxQAIBk13AjWqgIAxKpiqJ9RCgCQjBpuBGtVAQBiVTHUzygFAEhGDTeCtaoAALGqGOpnlAIAJKOGG8FaVQCAWFUM9TNKAQCSUcONYK0qAECsKob6GaUAAMmo4UawVhX4fygVSn04hT2SAAAAAElFTkSuQmCC";

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
      var _classNames, _classNames2, _classNames3, _classNames4;

      var _this$props = _this.props,
          listType = _this$props.listType,
          showPreviewIcon = _this$props.showPreviewIcon,
          showRemoveIcon = _this$props.showRemoveIcon,
          showDownloadIcon = _this$props.showDownloadIcon,
          progressAttr = _this$props.progressAttr,
          isBatch = _this$props.isBatch,
          selectedIds = _this$props.selectedIds,
          onChecked = _this$props.onChecked;
      var progress;
      var icon = file.status === 'uploading' ? /*#__PURE__*/React.createElement(icons.LoadingOutlined, null) : /*#__PURE__*/React.createElement(icons.PaperClipOutlined, null);

      if (listType === 'picture' || listType === 'picture-card') {
        if (listType === 'picture-card' && file.status === 'uploading') {
          icon = /*#__PURE__*/React.createElement("div", {
            className: "".concat(prefixCls, "-list-item-uploading-text")
          }, locale.uploading);
        } else if (!file.thumbUrl && !file.url) {
          icon = /*#__PURE__*/React.createElement(icons.PictureTwoTone, {
            className: "".concat(prefixCls, "-list-item-thumbnail")
          });
        } else {
          var thumbnail = isImageUrl(file) ? /*#__PURE__*/React.createElement("img", {
            src: getFileTypeImg(file),
            alt: file.name,
            className: "".concat(prefixCls, "-list-item-image")
          }) : /*#__PURE__*/React.createElement(icons.FileTwoTone, {
            className: "".concat(prefixCls, "-list-item-icon")
          });
          icon = /*#__PURE__*/React.createElement("a", {
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
        var loadingProgress = 'percent' in file ? /*#__PURE__*/React.createElement(antd.Progress, _extends({
          type: "line"
        }, progressAttr, {
          percent: file.percent
        })) : null;
        progress = /*#__PURE__*/React.createElement("div", {
          className: "".concat(prefixCls, "-list-item-progress"),
          key: "progress"
        }, loadingProgress);
      }

      var infoUploadingClass = classNames__default['default']((_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-list-item"), true), _defineProperty(_classNames, "".concat(prefixCls, "-list-item-").concat(file.status), true), _defineProperty(_classNames, "".concat(prefixCls, "-list-item-list-type-").concat(listType), true), _classNames));
      var linkProps = typeof file.linkProps === 'string' ? JSON.parse(file.linkProps) : file.linkProps;
      var removeIcon = showRemoveIcon ? /*#__PURE__*/React.createElement(icons.DeleteOutlined, {
        title: locale.removeFile,
        onClick: function onClick() {
          return _this.handleClose(file);
        }
      }) : null;
      var downloadIcon = showDownloadIcon && file.status === 'done' ? /*#__PURE__*/React.createElement(icons.DownloadOutlined, {
        title: locale.downloadFile,
        onClick: function onClick() {
          return _this.handleDownload(file);
        }
      }) : null;
      var downloadOrDelete = listType !== 'picture-card' && /*#__PURE__*/React.createElement("span", {
        key: "download-delete",
        className: "".concat(prefixCls, "-list-item-card-actions ").concat(listType === 'picture' ? 'picture' : '')
      }, downloadIcon && /*#__PURE__*/React.createElement("a", {
        title: locale.downloadFile
      }, downloadIcon), removeIcon && /*#__PURE__*/React.createElement("a", {
        title: locale.removeFile
      }, removeIcon));
      var listItemNameClass = classNames__default['default']((_classNames2 = {}, _defineProperty(_classNames2, "".concat(prefixCls, "-list-item-name"), true), _defineProperty(_classNames2, "".concat(prefixCls, "-list-item-name-icon-count-").concat([downloadIcon, removeIcon].filter(function (x) {
        return x;
      }).length), true), _classNames2));
      var preview = file.url ? [/*#__PURE__*/React.createElement("a", _extends({
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
      }), file.name), downloadOrDelete] : [/*#__PURE__*/React.createElement("span", {
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
      var previewIcon = showPreviewIcon ? /*#__PURE__*/React.createElement("a", {
        href: file.url || file.thumbUrl,
        target: "_blank",
        rel: "noopener noreferrer",
        style: file.url || file.thumbUrl ? undefined : style,
        onClick: function onClick(e) {
          return _this.handlePreview(file, e);
        },
        title: locale.previewFile
      }, /*#__PURE__*/React.createElement(icons.EyeOutlined, null)) : null;
      var actions = listType === 'picture-card' && file.status !== 'uploading' && /*#__PURE__*/React.createElement("span", {
        className: "".concat(prefixCls, "-list-item-actions")
      }, previewIcon, file.status === 'done' && downloadIcon, removeIcon);
      var message;

      if (file.response && typeof file.response === 'string') {
        message = file.response;
      } else {
        message = file.error && file.error.statusText || locale.uploadError;
      }

      var iconAndPreview = /*#__PURE__*/React.createElement("span", null, icon, preview);
      var dom = /*#__PURE__*/React.createElement("div", {
        className: infoUploadingClass
      }, file.status !== 'error' && listType === 'picture-card' ? /*#__PURE__*/React.createElement(antd.Tooltip, {
        title: file.name,
        placement: "top"
      }, /*#__PURE__*/React.createElement("div", {
        className: "".concat(prefixCls, "-list-item-info")
      }, iconAndPreview)) : /*#__PURE__*/React.createElement("div", {
        className: "".concat(prefixCls, "-list-item-info")
      }, iconAndPreview), actions, /*#__PURE__*/React.createElement(Animate__default['default'], {
        transitionName: "fade",
        component: ""
      }, progress));
      var listContainerNameClass = classNames__default['default']((_classNames3 = {}, _defineProperty(_classNames3, "".concat(prefixCls, "-list-picture-card-container"), listType === 'picture-card'), _defineProperty(_classNames3, 'nsc-uploader-list-picture-card-container', true), _classNames3));
      var listCheckboxClass = classNames__default['default']((_classNames4 = {}, _defineProperty(_classNames4, "nsc-uploader-list-picture-card-checkbox", listType === 'picture-card'), _defineProperty(_classNames4, "nsc-uploader-list-picture-checkbox", listType === 'picture'), _defineProperty(_classNames4, 'nsc-uploader-list-text-checkbox', listType === 'text'), _classNames4));
      return /*#__PURE__*/React.createElement("div", {
        key: file.uid,
        className: listContainerNameClass
      }, isBatch && /*#__PURE__*/React.createElement(antd.Checkbox, {
        key: file.uid,
        checked: selectedIds.includes(file.uid),
        value: file.uid,
        className: listCheckboxClass,
        onChange: function onChange(e) {
          return onChecked && onChecked(e, file);
        }
      }), file.status === 'error' ? /*#__PURE__*/React.createElement(antd.Tooltip, {
        title: message
      }, dom) : /*#__PURE__*/React.createElement("span", null, dom));
    });

    _defineProperty(_assertThisInitialized(_this), "onSortEnd", function (result) {
      _this.props.onSortEnd && _this.props.onSortEnd(result);
    });

    _defineProperty(_assertThisInitialized(_this), "renderUploadList", function () {
      var _classNames5;

      var _this$props2 = _this.props,
          _this$props2$items = _this$props2.items,
          items = _this$props2$items === void 0 ? [] : _this$props2$items,
          listType = _this$props2.listType,
          dragSortable = _this$props2.dragSortable;
      var prefixCls = 'ant-upload';
      var list = items.map(function (file) {
        return _this.renderListItem(file);
      });
      var listClassNames = classNames__default['default']((_classNames5 = {}, _defineProperty(_classNames5, "".concat(prefixCls, "-list"), true), _defineProperty(_classNames5, "".concat(prefixCls, "-list-").concat(listType), true), _classNames5));
      var animationDirection = listType === 'picture-card' ? 'animate-inline' : 'animate';

      if (dragSortable) {
        var dragDirection = listType === 'picture-card' ? "horizontal" : "vertical";
        var horizontalStyle = listType === 'picture-card' ? {
          display: 'flex',
          flexWrap: 'wrap'
        } : {};
        return /*#__PURE__*/React.createElement(reactBeautifulDnd.DragDropContext, {
          onDragEnd: _this.onSortEnd
        }, /*#__PURE__*/React.createElement(reactBeautifulDnd.Droppable, {
          droppableId: "droppable",
          direction: dragDirection
        }, function (provided, snapshot) {
          return /*#__PURE__*/React.createElement("div", _extends({
            ref: provided.innerRef,
            className: listClassNames,
            style: horizontalStyle
          }, provided.droppableProps), items.map(function (file, index) {
            return /*#__PURE__*/React.createElement(reactBeautifulDnd.Draggable, {
              key: file.id,
              draggableId: file.id,
              index: index
            }, function (provided, snapshot) {
              return /*#__PURE__*/React.createElement("div", _extends({
                ref: provided.innerRef
              }, provided.draggableProps, provided.dragHandleProps, {
                key: file.id
              }), _this.renderListItem(file));
            });
          }), provided.placeholder);
        }));
      } else {
        return /*#__PURE__*/React.createElement(Animate__default['default'], {
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
      return /*#__PURE__*/React.createElement("div", null, this.renderUploadList());
    }
  }]);

  return UploadList;
}(React.Component);

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
      var fileIndex = findIndex_1(nextFileList, function (_ref) {
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
          fileList: uniqBy_1(stateFileList.concat(fileList.map(fileToObject)), function (item) {
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
          disabled = _this$props.disabled,
          isBatch = _this$props.isBatch,
          restProps = _objectWithoutProperties(_this$props, ["showUploadList", "listType", "onPreview", "onDownload", "previewFile", "dragSortable", "onSortEnd", "disabled", "isBatch"]);

      var showRemoveIcon = showUploadList.showRemoveIcon,
          showPreviewIcon = showUploadList.showPreviewIcon,
          showDownloadIcon = showUploadList.showDownloadIcon;
      var fileList = _this.state.fileList;
      return /*#__PURE__*/React.createElement(UploadList, _extends({
        listType: listType,
        isBatch: isBatch,
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
      }, restProps));
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

        var dragCls = classNames__default['default'](prefixCls$1, (_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls$1, "-drag"), true), _defineProperty(_classNames, "".concat(prefixCls$1, "-drag-uploading"), fileList.some(function (file) {
          return file.status && file.status === 'uploading';
        })), _defineProperty(_classNames, "".concat(prefixCls$1, "-drag-hover"), dragState === 'dragover'), _defineProperty(_classNames, "".concat(prefixCls$1, "-disabled"), disabled), _classNames), className);
        return /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("div", {
          className: dragCls,
          onDrop: _this.onFileDrop,
          onDragOver: _this.onFileDrop,
          onDragLeave: _this.onFileDrop,
          style: style
        }, /*#__PURE__*/React.createElement(RcUpload__default['default'], _extends({}, rcUploadProps, {
          ref: _this.saveUpload,
          className: "".concat(prefixCls$1, "-btn")
        }), /*#__PURE__*/React.createElement("div", {
          className: "".concat(prefixCls$1, "-drag-container")
        }, children))), uploadList);
      }

      var uploadButtonCls = classNames__default['default'](prefixCls$1, (_classNames2 = {}, _defineProperty(_classNames2, "".concat(prefixCls$1, "-select"), true), _defineProperty(_classNames2, "".concat(prefixCls$1, "-select-").concat(listType), true), _defineProperty(_classNames2, "".concat(prefixCls$1, "-disabled"), disabled), _classNames2));
      var uploadButton = /*#__PURE__*/React.createElement("div", {
        className: uploadButtonCls,
        style: children ? undefined : {
          display: 'none'
        }
      }, /*#__PURE__*/React.createElement(RcUpload__default['default'], _extends({}, rcUploadProps, {
        ref: _this.saveUpload
      })));

      if (listType === 'picture-card') {
        var dragSortable = _this.props.dragSortable;

        var _type = dragSortable ? 'nsc' : 'ant';

        return /*#__PURE__*/React.createElement("span", {
          className: classNames__default['default'](className, "".concat(_type, "-upload-picture-card-wrapper"))
        }, uploadList, uploadButton);
      }

      return /*#__PURE__*/React.createElement("span", {
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
      return /*#__PURE__*/React.createElement("div", null, this.renderUpload());
    }
  }]);

  return Upload;
}(React.Component);

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

      return /*#__PURE__*/React.createElement(Upload, _extends({}, restProps, {
        type: "drag",
        style: _objectSpread2(_objectSpread2({}, style), {}, {
          height: height
        })
      }));
    }
  }]);

  return Dragger;
}(React.Component);

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, array buffers, booleans,
 * date objects, error objects, maps, numbers, `Object` objects, regexes,
 * sets, strings, symbols, and typed arrays. `Object` objects are compared
 * by their own, not inherited, enumerable properties. Functions and DOM
 * nodes are compared by strict equality, i.e. `===`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.isEqual(object, other);
 * // => true
 *
 * object === other;
 * // => false
 */
function isEqual(value, other) {
  return _baseIsEqual(value, other);
}

var isEqual_1 = isEqual;

/**
 * The base implementation of methods like `_.max` and `_.min` which accepts a
 * `comparator` to determine the extremum value.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The iteratee invoked per iteration.
 * @param {Function} comparator The comparator used to compare values.
 * @returns {*} Returns the extremum value.
 */
function baseExtremum(array, iteratee, comparator) {
  var index = -1,
      length = array.length;

  while (++index < length) {
    var value = array[index],
        current = iteratee(value);

    if (current != null && (computed === undefined
          ? (current === current && !isSymbol_1(current))
          : comparator(current, computed)
        )) {
      var computed = current,
          result = value;
    }
  }
  return result;
}

var _baseExtremum = baseExtremum;

/**
 * The base implementation of `_.gt` which doesn't coerce arguments.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if `value` is greater than `other`,
 *  else `false`.
 */
function baseGt(value, other) {
  return value > other;
}

var _baseGt = baseGt;

/**
 * This method is like `_.max` except that it accepts `iteratee` which is
 * invoked for each element in `array` to generate the criterion by which
 * the value is ranked. The iteratee is invoked with one argument: (value).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Math
 * @param {Array} array The array to iterate over.
 * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
 * @returns {*} Returns the maximum value.
 * @example
 *
 * var objects = [{ 'n': 1 }, { 'n': 2 }];
 *
 * _.maxBy(objects, function(o) { return o.n; });
 * // => { 'n': 2 }
 *
 * // The `_.property` iteratee shorthand.
 * _.maxBy(objects, 'n');
 * // => { 'n': 2 }
 */
function maxBy(array, iteratee) {
  return (array && array.length)
    ? _baseExtremum(array, _baseIteratee(iteratee), _baseGt)
    : undefined;
}

var maxBy_1 = maxBy;

var InterfaceOss = /*#__PURE__*/function () {
  function InterfaceOss() {
    _classCallCheck(this, InterfaceOss);

    _defineProperty(this, "params", null);

    _defineProperty(this, "client", null);

    _defineProperty(this, "ossType", null);
  }

  _createClass(InterfaceOss, [{
    key: "signatureUrl",
    // alioss minio
    value: function signatureUrl() {// nothing
    }
  }, {
    key: "upload",
    value: function upload() {// nothing
    }
  }, {
    key: "multipartUpload",
    value: function multipartUpload() {// nothing
    }
  }, {
    key: "getUploadedUrl",
    value: function getUploadedUrl() {}
  }, {
    key: "getUploadProgress",
    value: function getUploadProgress() {}
  }]);

  return InterfaceOss;
}();

var ali_Oss = require('ali-oss');

var minio_Oss = require('minio');

var SingletonOss = /*#__PURE__*/function () {
  function SingletonOss(params) {
    _classCallCheck(this, SingletonOss);

    _defineProperty(this, "_instance", null);

    _defineProperty(this, "_params", null);

    _defineProperty(this, "_ossList", [{
      key: 'alioss',
      ossInstance: ali_Oss.prototype.constructor
    }, {
      key: 'minio',
      ossInstance: minio_Oss.Client
    }]);

    this._params = params;
  }

  _createClass(SingletonOss, [{
    key: "getInstance",
    value: function getInstance() {
      if (!this._instance) {
        this._instance = this._getOss();
      }

      return this._instance;
    }
  }, {
    key: "_getOss",
    value: function _getOss() {
      var _this = this;

      var Instance = this._ossList.filter(function (res) {
        return _this._params.source === res.key;
      })[0].ossInstance;

      return new Instance(this._params);
    }
  }]);

  return SingletonOss;
}();

var MinIO = /*#__PURE__*/function (_InterfaceOss) {
  _inherits(MinIO, _InterfaceOss);

  var _super = _createSuper(MinIO);

  function MinIO(args) {
    var _this;

    _classCallCheck(this, MinIO);

    _this = _super.call(this, args);
    _this.params = args;
    _this.ossType = args.source;
    _this.client = new SingletonOss(_objectSpread2(_objectSpread2({}, args), {}, {
      bucket: "".concat(args.image),
      endPoint: args.endPoint,
      useSSL: false,
      port: args.port,
      region: args.region,
      secretKey: args.secretKey,
      accessKey: args.accessKey,
      sessionToken: args.SessionToken
    })).getInstance();
    _this.exepTime = 24 * 60 * 60;
    return _this;
  }

  _createClass(MinIO, [{
    key: "signatureUrl",
    value: function signatureUrl(file) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        _this2.client.presignedUrl('GET', _this2.params.bucket, file.name, _this2.exepTime, function (err, presignedUrl) {
          if (err) return reject(err);
          resolve(presignedUrl);
        });
      });
    }
  }, {
    key: "upload",
    value: function upload(encodedFileName, file) {
      var _this3 = this;

      return new Promise(function (resolve, rej) {
        var reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = function (readers) {
          var base64 = readers.target.result.split(',').pop();
          var buffer = Buffer.from(base64, 'base64');

          _this3.client.putObject(_this3.params.bucket, encodedFileName, buffer, {
            'Content-Type': file.type
          }, function (err, etag) {
            if (err) {
              return rej(err);
            }

            _this3.client.presignedUrl('GET', _this3.params.bucket, encodedFileName, _this3.exepTime, function (err, presignedUrl) {
              if (err) return rej(err);
              resolve(presignedUrl);
            });
          });
        };
      });
    }
  }, {
    key: "multipartUpload",
    value: function multipartUpload(encodedFileName, file) {
      return this.upload(encodedFileName, file);
    }
  }, {
    key: "getUploadedUrl",
    value: function getUploadedUrl(uploadRes, uploadType, file) {
      return uploadRes;
    }
  }, {
    key: "getUploadProgress",
    value: function getUploadProgress() {// To be developed
    }
  }]);

  return MinIO;
}(InterfaceOss);

var AliOss = /*#__PURE__*/function (_InterfaceOss) {
  _inherits(AliOss, _InterfaceOss);

  var _super = _createSuper(AliOss);

  /**
   {
    accessKeyId: '',
    accessKeySecret: '',
    stsToken: '',
    region: OSS_ENDPOINT,
    bucket: OSS_BUCKET,
    }
   */
  function AliOss(args) {
    var _this;

    _classCallCheck(this, AliOss);

    _this = _super.call(this, args);
    _this.params = args;
    _this.ossType = args.source;
    _this.client = new SingletonOss(_objectSpread2(_objectSpread2({}, args), {}, {
      accessKeyId: args.AccessKeyId,
      accessKeySecret: args.AccessKeySecret,
      stsToken: args.SecurityToken,
      region: args.region,
      bucket: args.bucket
    })).getInstance();
    return _this;
  }

  _createClass(AliOss, [{
    key: "signatureUrl",
    value: function signatureUrl(url) {
      url = decodeURIComponent(url);

      var _Url = new Url__default['default'](url),
          pathname = _Url.pathname;

      var fileName = pathname.substr(1);
      return this.client.signatureUrl(fileName);
    }
  }, {
    key: "upload",
    value: function () {
      var _upload = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(encodedFileName, file) {
        var client, res;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                client = this.client;
                _context2.next = 3;
                return co__default['default']( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.next = 2;
                          return client.put(encodedFileName, file);

                        case 2:
                          return _context.abrupt("return", _context.sent);

                        case 3:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }));

              case 3:
                res = _context2.sent;
                return _context2.abrupt("return", res);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function upload(_x, _x2) {
        return _upload.apply(this, arguments);
      }

      return upload;
    }()
  }, {
    key: "multipartUpload",
    value: function () {
      var _multipartUpload = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(encodedFileName, file, options) {
        var client, res;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                client = this.client;
                _context4.next = 3;
                return co__default['default']( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                  return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          _context3.next = 2;
                          return client.multipartUpload(encodedFileName, file, options);

                        case 2:
                          return _context3.abrupt("return", _context3.sent);

                        case 3:
                        case "end":
                          return _context3.stop();
                      }
                    }
                  }, _callee3);
                }));

              case 3:
                res = _context4.sent;
                return _context4.abrupt("return", res);

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function multipartUpload(_x3, _x4, _x5) {
        return _multipartUpload.apply(this, arguments);
      }

      return multipartUpload;
    }()
  }, {
    key: "getUploadedUrl",
    value: function getUploadedUrl(res, uploadType) {
      if (uploadType === 'multipart') {
        var requestUrl = res && res.res && res.res.requestUrls ? res.res.requestUrls[0] : '';

        var _Url2 = new Url__default['default'](decodeURIComponent(requestUrl)),
            origin = _Url2.origin;

        return this.signatureUrl(origin + "/" + res.name);
      } else {
        return this.signatureUrl(res.url);
      }
    }
  }]);

  return AliOss;
}(InterfaceOss);

var createInstance = function createInstance(params) {
  if (params.source === 'minio') {
    return new MinIO(params);
  } else {
    return new AliOss(params);
  }
};

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".nsc-uploader-picture-card-wrapper{\r\n    display: flex;\r\n    width: 100%;\r\n    z-index: 1;\r\n}\r\n\r\n.nsc-uploader-container .ant-upload.ant-upload-drag{\r\n    margin-bottom: 10px;\r\n}\r\n\r\n.nsc-uploader-dragger-hide{\r\n    display: none;\r\n}\r\n\r\n.nsc-uploader-dragger-show{\r\n    display: flex;\r\n}\r\n\r\n.nsc-uploader-radio{\r\n    margin: 15px 0px;\r\n}\r\n.nsc-uploader-radio-right{\r\n    text-align: right;\r\n    margin: 15px 0px;\r\n}\r\n.nsc-uploader-radio-left{\r\n    text-align: left;\r\n    margin: 15px 0px;\r\n}\r\n.nsc-uploader-radio-center{\r\n    text-align: center;\r\n    margin: 15px 0px;\r\n}\r\n\r\n.nsc-uploader-list-picture-card-container{\r\n    position: relative ;\r\n    display: flex;\r\n    align-items: center;\r\n}\r\n\r\n.nsc-uploader-list-picture-card-checkbox{\r\n    position: absolute !important;\r\n    z-index: 20;\r\n    left: 2px;\r\n    top: 2px;\r\n}\r\n.nsc-uploader-list-picture-checkbox{\r\n    position: absolute !important;\r\n    z-index: 20;\r\n    left: 2px;\r\n    top: 10px;\r\n}\r\n.nsc-uploader-list-text-checkbox{\r\n    margin-top:8px;\r\n}\r\n\r\n";
styleInject(css_248z);

/**
 * Creates a duplicate-free version of an array, using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons, in which only the first occurrence of each element
 * is kept. The order of result values is determined by the order they occur
 * in the array.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @returns {Array} Returns the new duplicate free array.
 * @example
 *
 * _.uniq([2, 1, 2]);
 * // => [2, 1]
 */
function uniq(array) {
  return (array && array.length) ? _baseUniq(array) : [];
}

var uniq_1 = uniq;

var sorter = function sorter(a, b) {
  return a.sortNo - b.sortNo;
};

var Uploader = /*#__PURE__*/function (_Component) {
  _inherits(Uploader, _Component);

  var _super = _createSuper(Uploader);

  function Uploader(props) {
    var _this;

    _classCallCheck(this, Uploader);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "toFile", function (attachment) {
      return {
        uid: attachment.id,
        id: attachment.id,
        name: attachment.fileName,
        encodedFileName: attachment.encodedFileName,
        url: attachment.uri ? attachment.uri : attachment.url,
        size: attachment.fileSize,
        ext: attachment.fileExt,
        type: attachment.fileType,
        sortNo: attachment.sortNo,
        status: 'done'
      };
    });

    _defineProperty(_assertThisInitialized(_this), "handleCancel", function () {
      return _this.setState({
        previewVisible: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handlePreview", function (file) {
      var fileList = _this.state.fileList;
      var files = fileList.map(toAttachment);
      var lightboxIndex = files.map(function (a) {
        return a.id;
      }).indexOf(file.id) || 0;
      var lightboxFiles = files.map(function (a) {
        return _objectSpread2(_objectSpread2({}, a), {}, {
          alt: a.name,
          uri: isDoc(a) ? "https://view.officeapps.live.com/op/view.aspx?src=".concat(encodeURIComponent(a.uri)) : a.uri
        });
      });

      _this.setState({
        lightboxFiles: lightboxFiles,
        previewVisible: true,
        lightboxIndex: lightboxIndex
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onCheckAllChange", function (e) {
      var fileList = _this.state.fileList;
      var plainOptions = fileList.map(function (i) {
        return i.uid;
      });

      _this.setState({
        selectedIds: e.target.checked ? plainOptions : [],
        indeterminate: false,
        checkedAll: e.target.checked
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onBatchClicked", function () {
      var isBatch = _this.state.isBatch;

      _this.setState({
        isBatch: !isBatch,
        selectedIds: [],
        checkedAll: false,
        indeterminate: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onBatchDelete", function () {
      var _this$state = _this.state,
          selectedIds = _this$state.selectedIds,
          fileList = _this$state.fileList;

      if (selectedIds.length > 0) {
        var onRemove = _this.props.onRemove;
        var newFileList = fileList.filter(function (f) {
          return !selectedIds.includes(f.uid);
        });

        _this.setState({
          fileList: newFileList
        });

        _this.handleChange && _this.handleChange({}, newFileList);

        if (onRemove) {
          onRemove(newFileList.map(toAttachment));
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "signatureUrl", function (url) {
      return _this.uploadClient.signatureUrl(url);
    });

    _defineProperty(_assertThisInitialized(_this), "onLightboxClose", function () {
      _this.setState({
        previewVisible: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleChange", function (file, fileList) {
      var onFileChange = _this.props.onFileChange;
      onFileChange && onFileChange(toAttachment(file), fileList.map(toAttachment));
    });

    _defineProperty(_assertThisInitialized(_this), "handleDownload", function (file) {
      var onDownload = _this.props.onDownload;
      onDownload && onDownload(toAttachment(file));
    });

    _defineProperty(_assertThisInitialized(_this), "handleRemove", function (file) {
      var _this$props = _this.props,
          autoSave = _this$props.autoSave,
          onRemove = _this$props.onRemove;
      var fileList = _this.state.fileList;
      var newFileList = fileList.filter(function (f) {
        return f.id !== file.id;
      });

      _this.setState({
        fileList: newFileList
      });

      _this.handleChange(file, newFileList);

      if (onRemove) {
        onRemove(toAttachment(file));
      }
    });

    _defineProperty(_assertThisInitialized(_this), "hasExtension", function (fileName) {
      var fileExtension = _this.props.fileExtension;
      var extensions = fileExtension ? fileExtension : [];
      var pattern = '(' + extensions.join('|').replace(/\./g, '\\.') + ')$';
      return new RegExp(pattern, 'i').test(fileName);
    });

    _defineProperty(_assertThisInitialized(_this), "afterUploaded", /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(files, file, uploadRes, uploadType, encodedFileName) {
        var _this$props2, onProgress, autoSave, fileList, url, maxItem, maxSortNo, indexNo, newFile;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this$props2 = _this.props, onProgress = _this$props2.onProgress, autoSave = _this$props2.autoSave;
                fileList = _this.state.fileList;
                _context.next = 4;
                return _this.uploadClient.getUploadedUrl(uploadRes, uploadType, file);

              case 4:
                url = _context.sent;
                // const progress = this.uploadClient.getUploadProgress(uploadRes)
                // onProgress && onProgress(progress) // TODO
                maxItem = maxBy_1(fileList, function (i) {
                  return i.sortNo;
                });
                maxSortNo = maxItem ? maxItem.sortNo : 0;
                indexNo = files.findIndex(function (i) {
                  return i.uid === file.uid;
                });
                newFile = {
                  uid: file.uid,
                  id: file.uid,
                  encodedFileName: encodedFileName,
                  name: file.name,
                  url: url,
                  status: 'done',
                  size: file.size,
                  ext: file.name.split('.').pop(),
                  type: file.type,
                  sortNo: maxSortNo + 1 + indexNo
                };

                if (!autoSave) {
                  _context.next = 13;
                  break;
                }

                return _context.abrupt("return", _this.save(newFile));

              case 13:
                return _context.abrupt("return", newFile);

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x, _x2, _x3, _x4, _x5) {
        return _ref.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "beforeUpload", /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(file, files) {
        var _this$props3, maxFileSize, maxFileNum, fileExtension, uploadType, fileErrorMsg, onProgress, fileScales, fileList, isScale, hideLoading, progress, options, uploadRes, encodedFileName, newFile;

        return regeneratorRuntime.wrap(function _callee2$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _this$props3 = _this.props, maxFileSize = _this$props3.maxFileSize, maxFileNum = _this$props3.maxFileNum, fileExtension = _this$props3.fileExtension, uploadType = _this$props3.uploadType, fileErrorMsg = _this$props3.fileErrorMsg, onProgress = _this$props3.onProgress, fileScales = _this$props3.fileScales;
                fileList = _this.state.fileList; //Check for file extension

                if (!(fileExtension && !_this.hasExtension(file.name))) {
                  _context3.next = 5;
                  break;
                }

                antd.message.error(fileErrorMsg && fileErrorMsg.fileExtensionErrorMsg ? fileErrorMsg.fileExtensionErrorMsg : "\u4E0D\u652F\u6301\u7684\u6587\u4EF6\u683C\u5F0F\uFF0C\u8BF7\u4E0A\u4F20\u683C\u5F0F\u4E3A".concat(fileExtension.join(','), "\u7684\u6587\u4EF6"));
                return _context3.abrupt("return", false);

              case 5:
                if (!(file.size / 1024 / 1024 > maxFileSize)) {
                  _context3.next = 8;
                  break;
                }

                antd.message.error(fileErrorMsg && fileErrorMsg.fileSizeErrorMsg ? fileErrorMsg.fileSizeErrorMsg : "\u6587\u4EF6\u8FC7\u5927\uFF0C\u6700\u5927\u53EF\u4E0A\u4F20".concat(maxFileSize, "M"));
                return _context3.abrupt("return", false);

              case 8:
                if (!(files.length + fileList.length > maxFileNum)) {
                  _context3.next = 11;
                  break;
                }

                antd.message.error(fileErrorMsg && fileErrorMsg.fileNumerErrorMsg ? fileErrorMsg.fileNumerErrorMsg : "\u6587\u4EF6\u6570\u91CF\u8FC7\u591A\uFF0C\u6700\u591A\u53EF\u4E0A\u4F20".concat(maxFileNum, "\u4EFD"));
                return _context3.abrupt("return", false);

              case 11:
                if (!fileScales) {
                  _context3.next = 16;
                  break;
                }

                isScale = true;
                imgSize(file, fileScales).then(function (r) {
                  if (!r) {
                    antd.message.error(fileErrorMsg && fileErrorMsg.fileNumerErrorMsg ? fileErrorMsg.fileScaleErrorMsg : "\u6DFB\u52A0\u5931\u8D25: ".concat(file.name, " - \u9519\u8BEF\u7684\u56FE\u7247\u5C3A\u5BF8 (\u8BF7\u4F7F\u7528").concat(fileScales.join(':1 或'), ":1\u7684\u56FE\u7247)"));
                    isScale = false;
                  }
                });

                if (isScale) {
                  _context3.next = 16;
                  break;
                }

                return _context3.abrupt("return", false);

              case 16:
                hideLoading = antd.message.loading('文件正在预处理', 0);
                progress = /*#__PURE__*/regeneratorRuntime.mark(function generatorProgress(p, cpt, res) {
                  return regeneratorRuntime.wrap(function generatorProgress$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          onProgress && onProgress(p, cpt, res);

                        case 1:
                        case "end":
                          return _context2.stop();
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

                if (!_this.uploadClient) {
                  _context3.next = 49;
                  break;
                }

                uploadRes = null;
                encodedFileName = encodeFileName(file.name);
                _context3.prev = 22;

                if (!(uploadType === 'multipart')) {
                  _context3.next = 29;
                  break;
                }

                _context3.next = 26;
                return _this.uploadClient.multipartUpload(encodedFileName, file, options);

              case 26:
                uploadRes = _context3.sent;
                _context3.next = 32;
                break;

              case 29:
                _context3.next = 31;
                return _this.uploadClient.upload(encodedFileName, file);

              case 31:
                uploadRes = _context3.sent;

              case 32:
                _context3.next = 34;
                return _this.afterUploaded(files, file, uploadRes, uploadType, encodedFileName);

              case 34:
                newFile = _context3.sent;
                fileList.push(newFile);
                fileList.sort(sorter);

                _this.setState({
                  fileList: fileList
                });

                _this.handleChange(newFile, fileList);

                hideLoading();
                antd.message.success('上传成功');
                _context3.next = 48;
                break;

              case 43:
                _context3.prev = 43;
                _context3.t0 = _context3["catch"](22);
                console.error('Uploader error', _context3.t0);
                antd.message.error("".concat(file.name, "  "));
                hideLoading();

              case 48:
                return _context3.abrupt("return", false);

              case 49:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee2, null, [[22, 43]]);
      }));

      return function (_x6, _x7) {
        return _ref2.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "onSortEnd", function (result) {
      var onSortEnd = _this.props.onSortEnd;

      if (result && result.source && result.destination) {
        var newFileList = arrayMove(_this.state.fileList, result.source.index, result.destination.index);

        _this.setState({
          fileList: newFileList
        });

        onSortEnd && onSortEnd(_this.state.fileList.map(toAttachment), newFileList.map(toAttachment));
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onListTypeChange", function (e) {
      _this.setState({
        listType: e.target.value
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderRadio", function (showRadioButton) {
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
      return /*#__PURE__*/React__default['default'].createElement("div", {
        className: "nsc-uploader-radio nsc-uploader-radio-".concat(placement)
      }, showRadioTitle && /*#__PURE__*/React__default['default'].createElement("span", null, "\u6587\u4EF6\u5C55\u793A\u6837\u5F0F\uFF1A"), /*#__PURE__*/React__default['default'].createElement(antd.Radio.Group, {
        onChange: _this.onListTypeChange,
        value: _this.state.listType
      }, radioItems && radioItems.map(function (item) {
        return /*#__PURE__*/React__default['default'].createElement(antd.Radio, {
          key: item.key,
          value: item.key
        }, item.value);
      })));
    });

    _defineProperty(_assertThisInitialized(_this), "onChecked", function (e, file) {
      var selectedIds = _this.state.selectedIds;
      var newSelectedIds = [];

      if (e.target.checked) {
        newSelectedIds = uniq_1(selectedIds.concat([file.uid]));
      } else {
        newSelectedIds = selectedIds.filter(function (i) {
          return i !== file.uid;
        });
      }

      _this.setState({
        selectedIds: newSelectedIds
      });
    });

    _this.state = {
      listType: 'picture-card',
      fileList: [],
      // [{ id, name, encodeFileName, size, type, ext, uid, url }]
      isBatch: false,
      selectedIds: [],
      checkedAll: false,
      indeterminate: true
    };
    _this.uploadClient = null;
    return _this;
  }

  _createClass(Uploader, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props4 = this.props,
          defaultFiles = _this$props4.defaultFiles,
          ossParams = _this$props4.ossParams;
      this.createOssInstance(ossParams);
      this.setState({
        fileList: defaultFiles.map(this.toFile).sort(sorter)
      });
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (!isEqual_1(nextProps.defaultFiles, this.props.defaultFiles)) {
        this.setState({
          fileList: nextProps.defaultFiles.map(this.toFile).sort(sorter)
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.setState({
        fileList: [],
        isBatch: false,
        selectedIds: [],
        checkedAll: false,
        indeterminate: true
      });
    }
  }, {
    key: "createOssInstance",
    value: function () {
      var _createOssInstance = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(ossParams) {
        var params;
        return regeneratorRuntime.wrap(function _callee3$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                params = {};

                if (!(_typeof(ossParams) === 'object')) {
                  _context4.next = 5;
                  break;
                }

                params = ossParams;
                _context4.next = 8;
                break;

              case 5:
                _context4.next = 7;
                return ossParams();

              case 7:
                params = _context4.sent;

              case 8:
                this.uploadClient = createInstance(params);

              case 9:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee3, this);
      }));

      function createOssInstance(_x8) {
        return _createOssInstance.apply(this, arguments);
      }

      return createOssInstance;
    }()
  }, {
    key: "save",
    value: function save(file) {
      var _this2 = this;

      var onSave = this.props.onSave;
      return onSave(toAttachment(file)).then(function (r) {
        antd.message.success('上传成功');
        return _this2.toFile(r);
      })["catch"](function (e) {
        console.error(e);
        antd.message.error('上传失败');
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state2 = this.state,
          fileList = _this$state2.fileList,
          previewVisible = _this$state2.previewVisible,
          lightboxFiles = _this$state2.lightboxFiles,
          lightboxIndex = _this$state2.lightboxIndex,
          isBatch = _this$state2.isBatch,
          selectedIds = _this$state2.selectedIds;

      var _this$props5 = this.props,
          dragSortable = _this$props5.dragSortable,
          beforeUpload = _this$props5.beforeUpload,
          type = _this$props5.type,
          maxFileNum = _this$props5.maxFileNum,
          disabled = _this$props5.disabled,
          children = _this$props5.children,
          _this$props5$classNam = _this$props5.className,
          className = _this$props5$classNam === void 0 ? '' : _this$props5$classNam,
          showUploadButton = _this$props5.showUploadButton,
          customRadioButton = _this$props5.customRadioButton,
          displayTools = _this$props5.displayTools,
          showBatchButton = _this$props5.showBatchButton,
          restProps = _objectWithoutProperties(_this$props5, ["dragSortable", "beforeUpload", "type", "maxFileNum", "disabled", "children", "className", "showUploadButton", "customRadioButton", "displayTools", "showBatchButton"]);

      var listType = this.props.listType ? this.props.listType : this.state.listType;
      var showRadioButton = this.props.listType ? false : this.props.showRadioButton;

      var props = _objectSpread2(_objectSpread2({}, restProps), {}, {
        isBatch: this.state.isBatch,
        fileList: fileList,
        listType: listType,
        beforeUpload: beforeUpload ? beforeUpload : this.beforeUpload,
        dragSortable: dragSortable,
        disabled: disabled,
        onSortEnd: this.onSortEnd,
        className: showUploadButton ? "".concat(className) : type === 'dragger' ? "".concat(className, " nsc-uploader-dragger-hide") : "".concat(className),
        onPreview: 'onPreview' in this.props ? this.props.onPreview : this.handlePreview,
        onRemove: this.handleRemove,
        onChecked: this.onChecked,
        onDownload: this.handleDownload,
        selectedIds: selectedIds,
        onchange: this.handleChange
      }); //文件列表按上传顺序排序


      fileList.sort(sorter); //listType === "picture-card"时 默认上传按钮

      var cardButton = /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement(icons.PlusOutlined, null), /*#__PURE__*/React__default['default'].createElement("div", {
        className: "uploadText"
      }, "\u4E0A\u4F20\u6587\u4EF6")); //listType === "text' 或 'picture"时默认上传按钮

      var textButton = /*#__PURE__*/React__default['default'].createElement(antd.Button, null, /*#__PURE__*/React__default['default'].createElement(icons.PlusOutlined, null), " \u4E0A\u4F20\u6587\u4EF6"); //拖动上传时默认上传按钮

      var draggerBtn = /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement("p", {
        className: "ant-upload-drag-icon"
      }, /*#__PURE__*/React__default['default'].createElement(icons.InboxOutlined, {
        style: {
          color: '#3db389'
        }
      })), /*#__PURE__*/React__default['default'].createElement("p", {
        className: "ant-upload-text"
      }, "\u70B9\u51FB\u83B7\u53D6\u62D6\u52A8 \u56FE\u7247\u6216\u6587\u6863 \u5230\u8FD9\u5757\u533A\u57DF\u5B8C\u6210\u6587\u4EF6\u4E0A\u4F20"));
      return /*#__PURE__*/React__default['default'].createElement("div", {
        className: "nsc-uploader-container"
      }, this.props.showUploadList && /*#__PURE__*/React__default['default'].createElement("div", {
        style: {
          marginBottom: customRadioButton || showRadioButton || showBatchButton ? '10px' : '0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }
      }, /*#__PURE__*/React__default['default'].createElement("div", null, customRadioButton ? customRadioButton : showRadioButton ? this.renderRadio(showRadioButton) : null), showBatchButton && /*#__PURE__*/React__default['default'].createElement("div", null, isBatch && /*#__PURE__*/React__default['default'].createElement(antd.Checkbox, {
        indeterminate: this.state.indeterminate,
        onChange: this.onCheckAllChange,
        checked: this.state.checkedAll
      }, " \u5168\u9009"), /*#__PURE__*/React__default['default'].createElement(antd.Button, {
        type: "primary",
        onClick: this.onBatchClicked,
        style: {
          marginRight: '10px'
        }
      }, isBatch ? "\u53D6\u6D88\u9009\u62E9(".concat(this.state.selectedIds.length, ")") : '批量选择'), isBatch && /*#__PURE__*/React__default['default'].createElement(antd.Button, {
        type: "danger",
        onClick: this.onBatchDelete
      }, "\u6279\u91CF\u5220\u9664"))), type === 'dragger' ? /*#__PURE__*/React__default['default'].createElement(Dragger, props, showUploadButton ? children ? children : maxFileNum in this.props && fileList.length >= maxFileNum ? null : draggerBtn : null) : /*#__PURE__*/React__default['default'].createElement(Upload, props, showUploadButton ? children ? children : maxFileNum in this.props && fileList.length >= maxFileNum ? null : listType === 'picture-card' ? cardButton : textButton : null), previewVisible && lightboxFiles.length > 0 && /*#__PURE__*/React__default['default'].createElement(nscLightbox.Lightbox, {
        visible: previewVisible,
        imgvImages: lightboxFiles,
        activeIndex: lightboxIndex,
        displayTools: displayTools,
        onCancel: this.onLightboxClose
      }));
    }
  }]);

  return Uploader;
}(React.Component);

Uploader.propTypes = {
  getOssParams: PropTypes__default['default'].func
};
Uploader.defaultProps = {
  dragSortable: false,
  defaultFiles: [],
  multiple: false,
  type: 'select',
  showUploadButton: true,
  showRadioButton: true,
  showBatchButton: false,
  displayTools: ['zoomIn', 'zoomOut', 'prev', 'next', 'download', 'close']
};

var index = {
  Uploader: Uploader
};

exports.Uploader = Uploader;
exports.createInstance = createInstance;
exports.default = index;
//# sourceMappingURL=index.js.map
