import axios from "axios"
import qs from 'qs'
import {showMsg} from '@/utils/showMsg'
import { localCache } from '@/utils/cache'

class Axios {
  // axios的一个实例
  instance

  constructor(config) {
    this.instance = axios.create(config)

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

    this.instance.interceptors.response.use((res) => {
      const code = res.status
      switch (code) {
        case 404: { showMsg.err('响应失败。'); break }
        case 401: { showMsg.err('权限不足。'); break }
        default: { break }
      }
      return res
    })
  }
  // 发送请求
  request(method, api, data, type) {
    // console.log(api);
    return new Promise(resolve => {
      this.instance({
        method,
        url: api,
        data,
        type
      }).then(res => resolve(res)).catch(err => resolve(err))
    })
  }

  get(api, data) {
    return this.request('get', api, data)
  }

  post(api, data, type='json') {
    if (type == 'form') data = qs.stringify(data)
    else if (type == 'formData') data = setFormData(data)
    return this.request('post', api, data, type)
  }
}

/**
 * 转换成formdata格式数据
 * @param {被formdata的数据} source 
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
 * @param {被序列化的数据，一般用于get请求} source 
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
export default Axios
