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

//验证token是否有效
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

//更新token  暂时没用到
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
//获取新闻列表
export const getNewsList = () => {
  return Axios({
    // url: 'https://minapp-test.hzcitybrain.com/phoneapi/getNewsList',
    url: 'https://minapp-test.hzcitybrain.com/phoneapi/getnews',
    method: 'get',
    // data,
  });
};

//根据新闻Id，获取新闻图片
export const getNewsImageById = (nid) => {
  return Axios({
    url:
      'https://minapp-test.hzcitybrain.com/phoneapi/getNewsImageById?nid=' +
      nid,
    method: 'get',
    // data,
  });
};

//获取用户信息
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

//实名认证接口
export const realNmAuth = (token, data) => {
  return Axios({
    url:
      'https://health.hangzhou.gov.cn/health2/user/api/v1/oauth2/authentication/realName',
    method: 'post',
    headers: {
      'content-type': 'application/json',
      'user-token': token,
    },
    data,
  });
};
