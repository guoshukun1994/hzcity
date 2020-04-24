import Axios from './index';

// 获取验证码
export const getCode = (data) => {
  return Axios({
    url: 'https://health.hangzhou.gov.cn/health2/user/api/sms/sendCode',
    method: 'post',
    headers: {
      'content-type': 'application/json',
    },
    data,
  });
};

//登录
export const verifyCode = (data) => {
  return Axios({
    url: 'https://health.hangzhou.gov.cn/health2/user/api/sms/verifyCode',
    method: 'post',
    headers: {
      'content-type': 'application/json',
      'user-token': '',
    },
    data,
  });
};

//验证token有效
export const checkToken = (token) => {
  return Axios({
    url:
      'https://health.hangzhou.gov.cn/health2/user//api/v1/oauth2/checkToken',
    method: 'post',
    headers: {
      'content-type': 'application/json',
      'user-token': token,
    },
    // data,
  });
};

export const refresh = (token) => {
  return Axios({
    url:
      'https://health.hangzhou.gov.cn/health2/user/api/v1/oauth2/token/refresh',
    method: 'post',
    headers: {
      'content-type': 'application/json',
      'user-token': token,
    },
    // data,
  });
};

export const getNewsList = () => {
  return Axios({
    url: 'https://minapp-test.hzcitybrain.com/phoneapi/getNewsList',
    method: 'get',
    // data,
  });
};
export const getNewsImageById = (nid) => {
  return Axios({
    url:
      'https://minapp-test.hzcitybrain.com/phoneapi/getNewsImageById?nid=' +
      nid,
    method: 'get',
    // data,
  });
};

export const getUserInfo = (token, data) => {
  return Axios({
    url:
      'https://health.hangzhou.gov.cn/health2/user/api/v1/oauth2/getUserInfo',
    method: 'post',
    headers: {
      'content-type': 'application/json',
      'user-token': token,
    },
    data,
  });
};
