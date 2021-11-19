import axios from "axios";
import baseUrl from "./config/index";
import RequestForm from "./RequestForm";

const codeMessage = {
  200: "服务器成功返回请求的数据。",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）。",
  204: "删除数据成功。",
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  401: "用户没有权限（令牌、用户名、密码错误）。",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除，且不会再得到的。",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  503: "服务不可用，服务器暂时过载或维护。",
  504: "网关超时。",
};

//设置axios拦截器
axios.interceptors.request.use((config) => {
  //在utils/request里面配置了请求头
  console.log(config, "ddddconfig");
  return config;
});
axios.interceptors.response.use(
  (response) => {
    //处理data
    // response=response.data;
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

function request({ url, method = "POST", data = {}, header, ...param }) {
  const token = sessionStorage.getItem("token") || "";

  let newOptions = {
    baseURL: baseUrl,
    url,
    method: method,
    data,
    headers: {
      Authorization: token,
    },
  };
  if (!(data instanceof FormData) && !(data instanceof RequestForm)) {
    newOptions.headers = {
      Accept: "application/json",
      "Content-Type": "application/json;charset=utf-8",
      ...newOptions.headers,
    };
    console.log("coming0");
    // newOptions.data = JSON.stringify(data);
  } else if (newOptions.data instanceof RequestForm) {
    console.log("coming1");
    newOptions.headers = {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      ...newOptions.headers,
    };
    newOptions.data = newOptions.data.parse();
  } else {
    console.log("coming2");
    newOptions.headers = {
      // Accept: "application/json",
      "Content-Type": "multipart/form-data",
      ...newOptions.headers,
    };
  }

  return new Promise((resolve, reject) => {
    axios({
      mode: "no-cors",
      headers: {
        // "i-manage-token": token,
        // "X-Requested-With": "XMLHttpRequest",
        "content-type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Origin": "*",
        ...newOptions.headers,
      },
      // withCredentials: true,
      // credentials: "include",
      data,
      timeOut: 10000, //配置超时10s
      ...newOptions,
      ...param,
    }).then((res) => {
      resolve(res);
    });
  });
}

export default request;
