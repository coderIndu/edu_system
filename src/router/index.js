import { createRouter, createWebHistory } from "vue-router"
import { localCache } from '../utils/cache'
import { firstMenu } from '../utils/map-menus'
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
    console.log(localCache)
    const token = localCache?.getCatch('token')
    if (!token) {
      console.log("not token")
      return '/login'
    }
  }

  if (to.path === '/main') {
    return firstMenu.path
  }
})


export default router
