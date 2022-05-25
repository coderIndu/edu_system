import url from '@/common/helper'
import http from '@/service' 
import utils from '@/utils'
/**
 * 获取课程列表
 * @param {Object} data 文件数据
 *  { create_id, class_id, page, limit }
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
 * 获取课程详情
 * @param {*} query 课程id
 * @returns 
 */
export function getCourseDetails(query) {
  return http.get(url.getCourseDetails + `?${utils.parseParams(query)}`)
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
 * @param {Array} data id数组 
 * @returns 
 */
export function dropManyCourse(ids) {
  return http.post(url.dropManyCourse, ids)
}

/**
 * 课程打卡
 * @param {*} query { course_id, userid }
 * @returns 
 */
export function addClock(query) {
  return http.get(url.addClock + `?${utils.parseParams(query)}`)
}


/**
 * 获取课程的学生打卡列表
 * @param {*} query {course_id}
 * @returns 
 */
export function getClockList(query) {
  return http.get(url.getClockList + `?${utils.parseParams(query)}`)
}
