import { createRouter, createWebHistory, createWebHashHistory } from "vue-router"
import { localCache, sessionCache } from '../utils/cache'
import { firstMenu } from '../utils/map-menus'
import { showMsg } from '@/utils/showMsg'
const routes = [
  {
    path: "/",
    redirect: "/main",
  },
  {
    path: "/main",
    name: 'main',
    component: () => import("@/views/main/main.vue")
  },
  {
    path: "/login",
    name: 'login',
    component: () => import("@/views/login/login.vue")
  },
  {
    path: "/404",
    name: 'notFound',
    component: () => import("@/views/error-page/404.vue")
  },
  { path: '/:pathMatch(.*)', redirect: '/404', hidden: true }
]


const router = createRouter({
  routes,
  history: createWebHistory()
})

router.beforeEach((to, from) => {
  if (to.path !== '/login') {
    const token = localCache.getCatch('token')
    const nowTime = new Date().getTime()
    const expirationTime = localCache.getCatch('expirationTime')
   
    // token过期重新登录
    if (token && nowTime > expirationTime) {
      showMsg.waring('token过期，请重新登录。')
      localCache.clear()
      sessionCache.clear()
      return '/login'
    } else if(!token){   // 没有token首次登录
      return '/login'
    }
   
  }
  
  if (to.path === '/main') {
    // 动态添加路由
    return firstMenu.path
  }
})


export default router
