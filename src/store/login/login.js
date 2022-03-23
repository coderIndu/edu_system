/* eslint-disable no-unused-vars */
// login -> module
import { accountLoginRequest, requestUserInfoById } from "@/service/login/login"
import { localCache } from '@/utils/cache'
import showMsg from '@/utils/showMsg'
import router from "@/router"
import { mapMenusRoutes } from '@/utils/map-menus'
import $message from '@/utils/showMsg'

// 定义两个泛型<S, R> : 模块，根
const loginModule = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {}
    }
  },
  getters: {},
  mutations: {
    changeUserToken(state, token) {
      state.token = token
    },
    changeUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    changeUserMenu(state, menu) {
      state.menu = menu
      // 获取路由
      const routes = mapMenusRoutes(menu)
      // 动态注册路由
      routes.forEach(route => {
        router.addRoute('main', route)
      })
    }
  },
  actions: {
    // 登录
    async accountLoginAction({ commit }, payload) {
      // 1. 实现登录逻辑
      try {

        const loginResult = await accountLoginRequest(payload)
        const { token, userid } = loginResult['data']

        // 1.1 保存数据
        commit('changeUserToken', token)
        localCache.setCatch('token', token)

        // 2. 请求用户信息
        const userInfo = await requestUserInfoById(userid, token)
        localCache.setCatch("userInfo", userInfo.data)
        commit("changeUserInfo", userInfo.data)

        // 3. 登录成功
        showMsg.success("登录成功")

        router.push('/main')
      } catch (error) {
        console.log($message)
        console.dir(error)
      }
    },
    initLoginState({ commit }) {
      console.log(localCache.getCatch('token'))
      const token = localCache.getCatch('token')
      const userInfo = localCache.getCatch("userInfo")
      if (token) {
        commit("changeUserToken", token)
      }
      if (userInfo) {
        console.log(userInfo)
        commit("changeUserMenu", userInfo.user.menu)
      }
    }
  }
}

export default loginModule
