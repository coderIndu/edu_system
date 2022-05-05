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
  // console.log(allRoutes, menus);
  // 2. 根据菜单获取需要添加的routes
  const _findGetRoute = (menus) => {
    for (const menu of menus) {
      if (menu.type == 2) {  // 存在二级路由
        // console.log(menu)
        const route = allRoutes.find(route => route.path === menu.url)
        if (route) routes.push(route)
      } else {
        _findGetRoute(menu.children)
      }
    }
  }
  // console.log(menus)
  _findGetRoute(menus)
  // console.log(routes);
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

export { firstMenu }