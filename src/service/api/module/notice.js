import http from '@/service/index'
import apis from '@/common/helper'
import utils from '@/utils'
/**
 * 新建公告
 * @param {*} data
 * @returns 
 */
export const addNotice = (data) => {
  return http.post(apis.addNotice, data)
}

/**
 * 删除公告
 * @param {*} query 
 * @returns 
 */
export const delNotice = (query) => {
  return http.get(apis.delNotice + `?${utils.parseParams(query)}`)
}

/**
 * 获取公告列表
 * @param {*} query 
 * @returns 
 */
export const getNoticeList = (query) => {
  return http.get(apis.getNoticeList + `?${utils.parseParams(query)}`)
}