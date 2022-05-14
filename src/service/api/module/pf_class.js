/**
 * 专业班级请求相关
 */
 import http from "@/service/index"
 import url from '@/common/helper.js'


 /**
  * 获取专业对应的班级列表
  * @param {*} profession 专业名称
  * @returns 
  */
 export function getClassList(profession) {
   return http.get(`${url.getClassList}?profession=${profession}`)
 }
