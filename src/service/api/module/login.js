import http from "@/service/index"
import { parseParams } from "@/service/request"
import url from '@/common/helper.js'
/**
 * 用户登录
 * @param {Object} account 用户对象
 * @returns 
 */
export function accountLoginRequest(account) {
  return http.post(url.login, { user: account })
}


/**
 * 获取登录的用户信息(权限菜单等)
 * @param {String} userid 用户id
 * @returns 
 */
export function requestUserInfoById(userid) {
  return http.get(`${url.getInfo}?${parseParams({userid})}`)
}

/**
 * 用户注册
 * @param {Object} form 注册的表单信息
 */
export function onRegister(form) {
  const data = {user: form}
  return http.post(url.register, data)
}