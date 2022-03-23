import axios from "axios"
import { ElLoading } from "element-plus"
import { with404, with401 } from '../status/index'

class JFRequest {
  // axios的一个实例
  instance
  interceptors
  showLoading
  loading

  constructor(config) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? true
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )

    this.instance.interceptors.response.use(
      this.interceptors?.responceInterceptor,
      this.interceptors?.responceInterceptorCatch
    )

    this.instance.interceptors.request.use((req) => {
      console.log("所有的请求拦截")
      return req
    })

    this.instance.interceptors.response.use((res) => {
      console.log("所有的响应拦截")
      // console.log(res.status, with404())
      const code = res.status
      switch (code) {
        case 404: { with404(); break }
        case 401: { with401(); break }
        default: { break }
      }
      return res
    })
  }
  // 发送请求
  request(config) {
    // 单个请求对请求config的处理
    if (config.interceptors?.requestInterceptor) {
      config = config.interceptors.requestInterceptor(config)
    }

    // 判断是否需要显示loading
    if (config.showLoading) {
      this.showLoading = config.showLoading
    }

    // 发送请求
    return this.instance.request(config)
  }
}

export default JFRequest
