import axios from 'axios';
const Axios = axios.create({
  // baseURL: 'xxxx',
  timeout: 60000,
  headers: {
    // "Content-Type": "application/json", //请求头设置，具体根据后端的要求，
    //express中间件 app.use(express.json()); 格式化前端传的json格式，后端可以直接 . 操作出属性
    // "content-Type": "application/x-www-form-urlencoded",
  },
});
Axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么，可以判断请求的路由，判断是否添加token
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

// 添加响应拦截器
Axios.interceptors.response.use(
  function (response) {
    // 响应码2xx的会进入这里
    return response.data;
  },
  function (error) {
    // 响应码不是2xx的会进这里
    return Promise.reject(error);
  },
);

//封装函数

export default Axios;
