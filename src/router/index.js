import { createRouter, createWebHistory, createWebHashHistory } from "vue-router"
import { localCache, sessionCache } from '../utils/cache'
import { firstMenu } from '../utils/map-menus'
import { showMsg } from '@/utils/showMsg'
import store from '../store'
import { el_notice } from "@/utils/element/notification"


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
      // showMsg.waring('token过期，请重新登录。')
      localCache.clear()
      sessionCache.clear()
      // el_notice('欢迎您的到来', '请选择登录或注册', 'success')
      return '/login'
    } 
    if(!token){   // 没有token首次登录
      console.log(2333);
      el_notice('欢迎您的到来', '请选择登录或注册', 'success')
      return '/login'
    }

    // 设置面板屑
    store.commit('header/setBreadcrumb', to.path)
  }

  if (to.path === '/main') {
    // 动态添加路由
    return firstMenu.path
  } 
  
})


export default router
