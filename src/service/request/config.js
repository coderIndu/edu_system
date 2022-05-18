let BASE_URL = ""
const TIME_OUT = 1000 * 60
const PRIVIEW_URL = 'http://114.132.229.173:5000/api'

if (process.env.NODE_ENV === "development") {
  BASE_URL = "/api"
} else if (process.env.NODE_ENV === "production") {   // 正式环境
  BASE_URL = "http://114.132.229.173:5000/api"
} else {
  BASE_URL = "http://114.132.229.173:5000/api"        // 测试环境
}

export { BASE_URL, TIME_OUT, PRIVIEW_URL }
