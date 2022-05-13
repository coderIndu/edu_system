import url from '@/common/helper'
import http from '@/service' 

/**
 * 上传文件
 * @param {Object} data 文件数据
 * @returns 
 */
export  function uploadFile(data, query="") {
  return http.post(url.uploadFile + `?${query}`, data, 'formData')
}

/**
 * 获取文件列表
 * @param {*} query (course_id, class_id) 
 * @returns 
 */
export function getFileList(query) {
  return http.get(url.getfiles + `?${query}`)
}

/**
 * 删除文件
 * ids: 文件id数组
 */
export function removeFiles(data) {
  return http.post(url.removeFiles, data)
}