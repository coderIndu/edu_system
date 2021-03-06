import { localCache } from '@/utils/cache'
let firstMenu = null

/**
 * 路由映射
 * @param {路由} menus 
 * @returns {菜单路由}
 */
export function mapMenusRoutes(menus) {
  const routes = []
  // 1. 先加载默认所有的routes
  const allRoutes = []
  const routeFiles = require.context('@/router/main', true, /\.js$/)
  routeFiles.keys().forEach(key => {
    const route = require("@/router/main" + key.split('.')[1])
    allRoutes.push(route.default)
  })

  // 2. 根据菜单获取需要添加的routes
  const _findGetRoute = (menus) => {
    for (const menu of menus) {
      if (menu.type == 2) {  // 存在二级路由
        const role = handlerRole() // 筛选权限路由
        const route = allRoutes.find(route => route.path === menu.url && role >= menu.role)
        if (route) routes.push(route)
      } else {
        _findGetRoute(menu.children)
      }
    }
  }
  _findGetRoute(menus)
  firstMenu = routes[0]
  return routes
}

// 寻找数据中的路由
export function pathMapToMenu(userMenus, currentPath) {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
      return findMenu
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

export function initMenus(menus) {
  const new_menus = []
  const role = handlerRole()
  menus.forEach(item => {
    const children = item.children.filter(item => {
      if(item.type === 2 && role >= item.role) {
        return item
      }
    })
    item.children = children
    new_menus.push(item)
  })
  return new_menus
}

function handlerRole() {
  const userInfo = localCache.getCatch('userInfo')
  const role = userInfo.role // 筛选权限路由
  switch (role) {
    case 'student':
      return 0
    case 'teacher':
      return 1
    case 'admin':
      return 2
    default:
      return 0
      // break;
  }
}

export { firstMenu }