const ali_Oss = require('ali-oss');
const minio_Oss = require('minio');

class SingletonOss {
  _instance = null;
  _params = null;
  _ossList = [
    { key: 'alioss', ossInstance: ali_Oss.prototype.constructor },
    { key: 'minio', ossInstance: minio_Oss.Client },
  ];

  constructor(params) {
    this._params = params;
  }

  getInstance() {
    if (!this._instance) {
      this._instance = this._getOss();
    }
    return this._instance;
  }

  _getOss() {
    const Instance = this._ossList.filter(res => this._params.source === res.key)[0].ossInstance;
    return new Instance(this._params);
  }

}
export default SingletonOss;
