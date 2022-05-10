/**
 * 专业班级请求相关
 */
 import http from "@/service/index"
 import url from '@/common/helper.js'

 export function getClassList(query) {
   return http.get(`${url.getClassList}?profession=${query}`)
 }
