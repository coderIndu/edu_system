import { localCache } from '@/utils/cache'

/**
 * 权限验证，隐藏按钮
 * @param {*} app vue实例
 */
export function validation(app) {
  app.directive('auth', {
    mounted(el) {
      const userInfo = localCache.getCatch('userInfo')
      if(userInfo.role === 'student') {  // 是学生则隐藏按钮
        el.style.display = 'none'
      }
    }
  })
}

/**
 * 自动滚动条到底部
 * @param {*} el 
 */
export function scrollAuto(el) {
  el.scrollTop = el.scrollHeight
}

/**
 * 防抖函数
 * @param {*} fn 执行函数
 * @param {*} delay 延迟
 * @returns 
 */
 let timer = null
export function debounce(fn, delay=1000) {
  return (...args) => {
    if(timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay);
  }
}