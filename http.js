import QS from 'qs'; //需要安装qs

const Token = 'yourToken';
const config = {
  baseUrl: 'http://yourBaseUrl',
  timeout: 1000,
  header: { Authorization: Token },
};

const Toast = (res) => {
  try {
    wx.showToast({
      title: res.errors.message,
      icon: 'none',
      duration: 2000,
    });
  } catch (error) {
    wx.showToast({
      title: '未知错误',
      icon: 'none',
      duration: 2000,
    });
    throw error;
  }
};
class Http {
  constructor({ baseUrl, timeout }) {
    this.baseUrl = baseUrl ? baseUrl : config.baseUrl;
    this.timeout = timeout ? timeout : config.timeout;
    this.interceptors = {};
  }
  qsUrl(url, query) {
    const url = `${this.baseUrl}${url}`;
    if (query) {
      url +=
        '?' +
        QS.stringify(query, {
          arrayFormat: 'brackets',
        });
    }
    return url;
  }
  get(url, query, header) {
    return new Promise((resolve, reject) => {
      wx.request({
        header: { ...config.header, ...header },
        url: qsUrl(url, query),
        method: 'get',
        success(res) {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(res.data);
          } else {
            Toast(res);
            reject(res);
          }
        },
        fail(err) {
          Toast(res);
          reject(err);
        },
      });
    });
  }
  post(url, data, header) {
    return new Promise((resolve, reject) => {
      wx.request({
        header: { ...config.header, ...header },
        url: this.baseUrl + url,
        method: 'post',
        data,
        success(res) {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(res.data);
          } else {
            Toast(res);
            reject(res);
          }
        },
        fail(err) {
          Toast(res);
          reject(err);
        },
      });
    });
  }
  delete(url, data) {
    return new Promise((resolve, reject) => {
      wx.request({
        header: { ...config.header, ...header },
        url: this.baseUrl + url,
        method: 'delete',
        data,
        success(res) {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(res.data);
          } else {
            Toast(res);
            reject(res);
          }
        },
        fail(err) {
          Toast(res);
          reject(err);
        },
      });
    });
  }
  put(url, data) {
    return new Promise((resolve, reject) => {
      wx.request({
        header: { ...config.header, ...header },
        url: this.baseUrl + url,
        method: 'put',
        data,
        success(res) {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(res.data);
          } else if (res.statusCode === 403) {
            reject(res);
          } else {
            Toast(res);

            reject(res);
          }
        },
        fail(err) {
          Toast(res);

          reject(err);
        },
      });
    });
  }
  uploadFile(url, method, data) {
    return new Promise((resolve, reject) => {
      wx.request({
        header: { ...config.header, ...header },
        url: this.baseUrl + url,
        method: method,
        data,
        success(res) {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(res.data);
          } else if (res.statusCode === 403) {
            reject(res);
          } else {
            Toast(res);
            reject(res);
          }
        },
        fail(err) {
          Toast(res);
          reject(err);
        },
      });
    });
  }
}
export default Http;
