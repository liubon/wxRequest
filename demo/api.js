import Http from './http';
const request = new Http();

export default {
  get: (query) => {
    return request.get('/getApi', query);
  },
  put(params) {
    return request.put('/putApi', params);
  },
  post(params) {
    return request.post('/postApi', params);
  },
  delete() {
    return request.delete('/postApi', params);
  },
};
