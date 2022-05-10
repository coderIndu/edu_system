import url from '@/common/helper'
import http from '@/service' 

/**
 * 获取课程列表
 * @param {Object} data 文件数据
 * @returns 
 */
export function getCourseList(data) {
  return http.post(url.getCourseList, data)
}

/**
 * 新建课程
 * @param {*} data 
 * @returns 
 */
export function addCourse(data) {
  return http.post(url.addCourse, data)
}

/**
 * 删除单个课程
 * @param {*} courseId 
 * @returns 
 */
export function removeCourse(courseId) {
  return http.get(url.removeCourse + '?id=' + courseId)
}

/**
 * 删除多个课程
 * @param {Array} isd 
 * @returns 
 */
export function dropManyCourse(ids) {
  return http.post(url.dropManyCourse, ids)
}