// login -> module
import { accountLoginRequest, requestUserInfoById } from "@/service/api/module/login"
import { localCache } from '@/utils/cache'
import { showMsg } from '@/utils/showMsg'
import router from "@/router"
import { mapMenusRoutes } from '@/utils/map-menus'


const loginModule = {
  namespaced: true,
  state() {
    return {
      token: localCache.getCatch('token') || '',
      userInfo: localCache.getCatch('userInfo') || {},
      menus: localCache.getCatch('currentMenu') || [],
    }
  },
  getters: {},
  mutations: {
    changeUserToken(state, token) {
      state.token = token
      localCache.setCatch('token', token)
    },
    changeUserInfo(state, data) {
      state.userInfo = data
      localCache.setCatch("userInfo", data)
    },
    changeUserMenu(state, menus) {
      state.menus = menus
      // 获取路由
      const routes = mapMenusRoutes(menus)
      localCache.setCatch('currentMenu', menus)
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

        const loginResult = await accountLoginRequest(payload) // 发送请求
        
        const { token, userid } = loginResult['data']

        // 1.1 保存数据
        commit('changeUserToken', token)
        
        // 设置过期时间
        localCache.setCatch('expirationTime', new Date().getTime() + 60*60*1000)

        // 2. 请求用户信息
        const userInfo = await requestUserInfoById(userid)
        commit("changeUserInfo", userInfo.data || {})

        // 3. 登录成功
        // showMsg.success("登录成功")
        const localUserInfo = localCache.getCatch("userInfo")
        localUserInfo && commit("changeUserMenu", localUserInfo?.user?.menu)

        router.push('/main')
      } catch (error) {
        showMsg.err('账号/密码错误，请检查')
        console.log(error)
      }
    },
    initLoginState({ commit, state }) {
      console.log(state.userInfo);
      if (state.userInfo) {
        commit("changeUserMenu", state.userInfo?.user?.menu)
      }
    }
  }
}

export default loginModule
