import axios from "axios"
import qs from 'qs'
import { showMsg } from '@/utils/showMsg'
import { localCache } from '@/utils/cache'

class DyAxios {
  constructor(config) {
    // axios
    this.instance = axios.create(config)

    // 请求拦截(添加token等)
    this.instance.interceptors.request.use((config) => {
      console.log('请求发出');
      // console.log(config);
      let contentType = ''
      if (config.type == 'form') {
        contentType = 'application/x-www-form-urlencoded'
        console.info('--------------------------------- 请求拦截 ---------------------------------', config)
      } else if (config.type == 'formData') {
        contentType = 'multipart/form-data'
      } else if (config.type == 'json') {
        contentType = 'application/json; charset=utf-8'
      }

      const token = localCache.getCatch('token') ?? ''
      if (token) {
        config.headers = {
          'authorization': token,
          'Content-Type': contentType
        }
      }
      return config
    }, err=>{})

    // 响应拦截(处理响应)
    this.instance.interceptors.response.use(response => { // 对响应数据做点什么
      return response
    }, err => {    // 对响应错误做点什么
      return Promise.reject(err.response)
    })
  }
  /**
   * 发送请求
   * @param {*} method 请求方式
   * @param {*} api 请求地址
   * @param {*} data 发送的数据
   * @param {*} type 请求方式
   * @returns 
   */
  request(method, api, data, type) {
    // console.log(api);
    return new Promise((resolve, rejeact) => {
      this.instance({
        method,
        url: api,
        data,
        type
      }).then(res => resolve(res)).catch(err => rejeact(err))
    })
  }

  /**
   * GET请求
   * @param {*} api 
   * @param {*} data 
   * @returns 
   */
  get(api, data) {
    return this.request('get', api, data)
  }

  /**
   * POST请求
   * @param {*} api 
   * @param {*} data 
   * @param {*} type 
   * @returns 
   */
  post(api, data, type='json') {
    if (type == 'form') data = qs.stringify(data)
    else if (type == 'formData') data = setFormData(data)
    return this.request('post', api, data, type)
  }
}

/**
 * 转换成formdata格式数据
 * @param {*} source 被formdata的数据
 * @returns 
 */
function setFormData(source) {
  var data = {}
  if (Object.keys(source).length > 0) {
      if (source instanceof FormData) {
          data = source
      } else {
          var formdata = new FormData()
          for (let i in source) {
              formdata.append(i, source[i])
          }
          data = formdata
      }
  }
  return data
}

/**
 * 序列化对象为query格式
 * @param {*} source 被序列化的数据，一般用于get请求
 * @returns 
 */
export function parseParams(source) {
  try {
    var temps = []
    for(let i in source) {
      var key = i
      var value = source[i]
      if ( typeof(source[i]) == 'object') value = JSON.stringify(value)
      temps.push(`${key}=${value}`)
    }
    return temps.join('&')
  } catch (err) {
    return ''
  }
}

export default DyAxios
