import http from "@/service";
import helper from "@/common/helper";
import { parseParams } from "@/utils/common/formatter";


/**
 * 获取统计数据列表
 * @param {*} query 
 * @returns 
 */
export function getCountList(query) {
  return http.get(helper.getCountList+`?${parseParams(query)}`)
}