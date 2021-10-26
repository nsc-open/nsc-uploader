import MinIO from './MinIO';
import AliOss from './AliOss';

export const createInstance = (params) => {
  if(params.source === 'minio'){
    return new MinIO(params)
  }else{
    return new AliOss(params)
  }
}
