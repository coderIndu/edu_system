import url from '@/common/helper'
import http from '@/service' 

/**
 * 上传文件
 * @param {Object} data 文件数据
 * @returns 
 */
export  function uploadFile(data,) {
  return http.post(url.uploadFile, data, 'formData')
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
 * @param 文件ids
 * @returns 
 */
export function removeFiles(data) {
  return http.post(url.removeFiles, data)
}