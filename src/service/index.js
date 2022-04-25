// service 统一出口
import Axios from "./request"
import { BASE_URL, TIME_OUT } from "./request/config"

const http = new Axios({
  baseURL:BASE_URL,
  timeout: TIME_OUT
})


export default http
