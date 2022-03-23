let BASE_URL = ""
const TIME_OUT = 10000

if (process.env.NODE_ENV === "development") {
  BASE_URL = "http://127.0.0.1:5000/api"
} else if (process.env.NODE_ENV === "production") {
  BASE_URL = "http://envtest.com/pro"
} else {
  BASE_URL = "http://envtest.com/test"
}

export { BASE_URL, TIME_OUT }
