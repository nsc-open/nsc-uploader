import stream from 'stream'
import Through2 from 'through2'
import Crypto from 'crypto'
const Crypto2 = require('crypto-browserify')
// A through stream that calculates md5sum and sha256sum
export function getHashSummer(enableSHA256) {
  var md5 = Crypto2.createHash('md5')
  var sha256 = Crypto2.createHash('sha256')

  return Through2.obj(function (chunk, enc, cb) {

    if (enableSHA256) {
      sha256.update(chunk)
    } else {
      md5.update(chunk)
    }
    cb()
  }, function (cb) {
    var md5sum = ''
    var sha256sum = ''
    if (enableSHA256) {
      sha256sum = sha256.digest('hex')
    } else {
      md5sum = md5.digest('base64')
    }
    var hashData = { md5sum, sha256sum }
    this.push(hashData)
    this.push(null)
    cb()
  })
}

export function promisify(fn) {
  return function () {
    // If the last argument is a function, assume its the callback.
    let callback = arguments[arguments.length - 1]

    // If the callback is given, don't promisify, just pass straight in.
    if (typeof callback === 'function') return fn.apply(this, arguments)

    // Otherwise, create a new set of arguments, and wrap
    // it in a promise.
    let args = [...arguments]

    return new Promise((resolve, reject) => {
      // Add the callback function.
      args.push((err, value) => {
        if (err) return reject(err)

        resolve(value)
      })

      // Call the function with our special adaptor callback added.
      fn.apply(this, args)
    })
  }
}

// All characters in string which are NOT unreserved should be percent encoded.
// Unreserved characers are : ALPHA / DIGIT / "-" / "." / "_" / "~"
// Reference https://tools.ietf.org/html/rfc3986#section-2.2
export function uriEscape(string) {
  return string.split('').reduce((acc, elem) => {
    let buf = Buffer.from(elem)
    if (buf.length === 1) {
      // length 1 indicates that elem is not a unicode character.
      // Check if it is an unreserved characer.
      if ('A' <= elem && elem <= 'Z' ||
        'a' <= elem && elem <= 'z' ||
        '0' <= elem && elem <= '9' ||
        elem === '_' ||
        elem === '.' ||
        elem === '~' ||
        elem === '-') {
        // Unreserved characer should not be encoded.
        acc = acc + elem
        return acc
      }
    }
    // elem needs encoding - i.e elem should be encoded if it's not unreserved
    // character or if it's a unicode character.
    for (var i = 0; i < buf.length; i++) {
      acc = acc + "%" + buf[i].toString(16).toUpperCase()
    }
    return acc
  }, '')
}

export function uriResourceEscape(string) {
  return uriEscape(string).replace(/%2F/g, '/')
}

export function getScope(region, date) {
  return `${makeDateShort(date)}/${region}/s3/aws4_request`
}

// isAmazonEndpoint - true if endpoint is 's3.amazonaws.com' or 's3.cn-north-1.amazonaws.com.cn'
export function isAmazonEndpoint(endpoint) {
  return endpoint === 's3.amazonaws.com' || endpoint === 's3.cn-north-1.amazonaws.com.cn'
}

// isVirtualHostStyle - verify if bucket name is support with virtual
// hosts. bucketNames with periods should be always treated as path
// style if the protocol is 'https:', this is due to SSL wildcard
// limitation. For all other buckets and Amazon S3 endpoint we will
// default to virtual host style.
export function isVirtualHostStyle(endpoint, protocol, bucket, pathStyle) {
  if (protocol === 'https:' && bucket.indexOf('.') > -1) {
    return false
  }
  return isAmazonEndpoint(endpoint) || !pathStyle
}


// isValidPort - is input port valid.
export function isValidPort(port) {
  // verify if port is a number.
  if (!isNumber(port)) return false
  // port cannot be negative.
  if (port < 0) return false
  // port '0' is valid and special case return true.
  if (port === 0) return true
  var min_port = 1
  var max_port = 65535
  // Verify if port is in range.
  return port >= min_port && port <= max_port
}

export function isValidBucketName(bucket) {
  if (!isString(bucket)) return false

  // bucket length should be less than and no more than 63
  // characters long.
  if (bucket.length < 3 || bucket.length > 63) {
    return false
  }
  // bucket with successive periods is invalid.
  if (bucket.indexOf('..') > -1) {
    return false
  }
  // bucket cannot have ip address style.
  if (bucket.match(/[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+/)) {
    return false
  }
  // bucket should begin with alphabet/number and end with alphabet/number,
  // with alphabet/number/.- in the middle.
  if (bucket.match(/^[a-z0-9][a-z0-9.-]+[a-z0-9]$/)) {
    return true
  }
  return false
}

// check if objectName is a valid object name
export function isValidObjectName(objectName) {
  if (!isValidPrefix(objectName)) return false
  if (objectName.length === 0) return false
  return true
}

// check if prefix is valid
export function isValidPrefix(prefix) {
  if (!isString(prefix)) return false
  if (prefix.length > 1024) return false
  return true
}

// check if typeof arg number
export function isNumber(arg) {
  return typeof (arg) === 'number'
}

// check if typeof arg function
export function isFunction(arg) {
  return typeof (arg) === 'function'
}

// check if typeof arg string
export function isString(arg) {
  return typeof (arg) === 'string'
}

// check if typeof arg object
export function isObject(arg) {
  return typeof (arg) === 'object' && arg !== null
}
export function readableStream(data) {
  var s = new stream.Readable()
  s._read = () => { }
  s.push(data)
  s.push(null)
  return s
}
export function pipesetup(...streams) {
  return streams.reduce((src, dst) => {
    src.on('error', err => dst.emit('error', err))
    return src.pipe(dst)
  })
}

export function insertContentType(metaData, file) {
  // check if content-type attribute present in metaData
  for (var key in metaData) {
    if (key.toLowerCase() === 'content-type') {
      return metaData
    }
  }
  // if `content-type` attribute is not present in metadata,
  // then infer it from the extension in filePath
  var newMetadata = Object.assign({}, metaData)
  newMetadata['content-type'] = file.type
  return newMetadata
}


export const toSha256 = (payload) => {
  return Crypto.createHash('sha256').update(payload).digest('hex')
}
// check if object is readable stream
export function isReadableStream(arg) {
  return isObject(arg) && isFunction(arg._read)
}
export function getBuffer(file) {
  // Some browsers do not support Blob.prototype.arrayBuffer, such as IE
  if (file.arrayBuffer) return file.arrayBuffer();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = function (e) {
      resolve(e.target.result);
    };
    reader.onerror = function (e) {
      console.log(e)
      reject(e);
    };
  });
}
export function divideParts(fileSize, partSize) {
  const numParts = Math.ceil(fileSize / partSize);

  const partOffs = [];
  for (let i = 0; i < numParts; i++) {
    const start = partSize * i;
    const end = Math.min(start + partSize, fileSize);

    partOffs.push({
      start,
      end
    });
  }

  return partOffs;
};
// check if arg is boolean
export function isBoolean(arg) {
  return typeof (arg) === 'boolean'
}
export const isBlob = (blob) => {
  return typeof (Blob) !== 'undefined' && blob instanceof Blob;
}

// check if arg is array
export function isArray(arg) {
  return Array.isArray(arg)
}

export const isBuffer = (obj) => {
  return Buffer.isBuffer(obj);
}

export const isFile = (obj) => {
  return typeof (File) !== 'undefined' && obj instanceof File;
}
// check if arg is a valid date
export function isValidDate(arg) {
  return arg instanceof Date && !isNaN(arg)
}

// Create a Date string with format:
// 'YYYYMMDDTHHmmss' + Z
export function makeDateLong(date) {
  date = date || new Date()

  // Gives format like: '2017-08-07T16:28:59.889Z'
  date = date.toISOString()

  return date.substr(0, 4) +
    date.substr(5, 2) +
    date.substr(8, 5) +
    date.substr(14, 2) +
    date.substr(17, 2) + 'Z'
}

// Create a Date string with format:
// 'YYYYMMDD'
export function makeDateShort(date) {
  date = date || new Date()

  // Gives format like: '2017-08-07T16:28:59.889Z'
  date = date.toISOString()

  return date.substr(0, 4) +
    date.substr(5, 2) +
    date.substr(8, 2)
}

// Function prepends metadata with the appropriate prefix if it is not already on
export function prependXAMZMeta(metaData) {
  var newMetadata = Object.assign({}, metaData)
  for (var key in metaData) {
    if (!isAmzHeader(key) && !isSupportedHeader(key) && !isStorageclassHeader(key)) {
      newMetadata["X-Amz-Meta-" + key] = newMetadata[key]
      delete newMetadata[key]
    }
  }
  return newMetadata
}

// Checks if it is a valid header according to the AmazonS3 API
export function isAmzHeader(key) {
  var temp = key.toLowerCase()
  return temp.startsWith("x-amz-meta-") || temp === "x-amz-acl" || temp.startsWith("x-amz-server-side-encryption-") || temp === "x-amz-server-side-encryption"
}
// Checks if it is a supported Header
export function isSupportedHeader(key) {
  var supported_headers = [
    'content-type',
    'cache-control',
    'content-encoding',
    'content-disposition',
    'content-language',
    'x-amz-website-redirect-location']
  return (supported_headers.indexOf(key.toLowerCase()) > -1)
}
// Checks if it is a storage header
export function isStorageclassHeader(key) {
  return key.toLowerCase() === "x-amz-storage-class"
}

export function extractMetadata(metaData) {
  var newMetadata = {}
  for (var key in metaData) {
    if (isSupportedHeader(key) || isStorageclassHeader(key) || isAmzHeader(key)) {
      if (key.toLowerCase().startsWith("x-amz-meta-")) {
        newMetadata[key.slice(11, key.length)] = metaData[key]
      } else {
        newMetadata[key] = metaData[key]
      }
    }
  }
  return newMetadata
}


export function getVersionId(headers = {}) {
  const versionIdValue = headers["x-amz-version-id"]
  return versionIdValue || null
}

export function sanitizeETag(etag = '') {
  var replaceChars = { '"': '', '&quot;': '', '&#34;': '', '&QUOT;': '', '&#x00022': '' }
  return etag.replace(/^("|&quot;|&#34;)|("|&quot;|&#34;)$/g, m => replaceChars[m])

}

export const RETENTION_MODES = {
  GOVERNANCE: "GOVERNANCE",
  COMPLIANCE: "COMPLIANCE"
}

export const RETENTION_VALIDITY_UNITS = {
  DAYS: "Days",
  YEARS: "Years"
}

export const LEGAL_HOLD_STATUS = {
  ENABLED: "ON",
  DISABLED: "OFF"
}

const objectToBuffer = (payload) => {
  const payloadBuf = Buffer.from(Buffer.from(payload))
  return payloadBuf
}

// toArray returns a single element array with param being the element,
// if param is just a string, and returns 'param' back if it is an array
// So, it makes sure param is always an array
export const toArray = (param) => {
  if (!Array.isArray(param)) {
    return Array(param)
  }
  return param
}

export const sanitizeObjectKey = (objectName) => {
  // + symbol characters are not decoded as spaces in JS. so replace them first and decode to get the correct result.
  let asStrName = (objectName || "").replace(/\+/g, ' ')
  const sanitizedName = decodeURIComponent(asStrName)
  return sanitizedName
}
