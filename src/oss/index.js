import MinIO from './MinIO';
import AliOss from './AliOss';
import LocalAliOss from './LocalAliOss';
import ObvOss from './ObvOss';

export const createInstance = (params) => {
  if (params.source === 'minio') {
    return new MinIO(params)
  } else if (params.source === 'alioss') {
    return new AliOss(params)
  } else if (params.source === 'local') {
    return new LocalAliOss(params)
  } else if (params.source === 'obv') {
    return new ObvOss(params)
  }
}
