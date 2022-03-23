// service 统一出口
import JFRequest from "./request"
import { BASE_URL, TIME_OUT } from "./request/config"
import showMsg from '../utils/showMsg'
const jfRequest = new JFRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  // showLoading: false,
  interceptors: {
    requestInterceptor: (config) => {
      console.log("请求成功的拦截")
      return config
    },
    requestInterceptorCatch: (err) => {
      console.log("请求失败的拦截")
      return err
    },
    responceInterceptor: (config) => {
      console.log("响应成功的拦截")
      return config
    },
    responceInterceptorCatch: (err) => {
      console.log("响应失败的拦截")
      const errMsg = err.response.data.errors[0].msg
      showMsg.err(errMsg)
      return errMsg
    }
  }
})

export default jfRequest
