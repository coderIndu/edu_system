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