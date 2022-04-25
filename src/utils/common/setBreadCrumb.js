import { localCache } from '../cache'
import { useMapActions } from '../useMapStore'

/**
 * 获取面包屑列表
 * @param {路径} path 
 * @returns 
 */
export function getBreadcrumbList(path) {
  const menus = localCache.getCatch('currentMenu')
  
  let findArr = []
  menus.forEach(item => {
    // 变量子元素
    item?.children.forEach(i => {
      if(i.url === path) {
       findArr =  [item.name, i.name]
       return
      }
    })
  })
  return findArr
}
