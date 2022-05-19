import http from "@/service";
import apis from '@/common/helper'

/**
 * 获取图形验证码
 * @returns 验证码的svg
 */
export const getLoginCode = () => {
  return http.get(apis.getLoginCode)
}

/**
 * 发送邮箱验证码
 * @param {*} data 邮箱
 * @returns 
 */
export const sendEmailCode = (data) => {
  return http.post(apis.sendEmailCode, data)
}