// login -> module
import { accountLoginRequest, requestUserInfoById } from "@/service/api/module/login"
import { localCache } from '@/utils/cache'
import { showMsg } from '@/utils/showMsg'
import router from "@/router"
import { mapMenusRoutes, initMenus } from '@/utils/map-menus'


const loginModule = {
  namespaced: true,
  state() {
    return {
      token: localCache.getCatch('token') || '',
      userInfo: localCache.getCatch('userInfo') || {},
      menus: [],
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
      state.menus = initMenus(menus)
      // 获取路由
      const routes = mapMenusRoutes(menus)
      localCache.setCatch('currentMenu', state.menus)
      // 动态注册路由
      routes.forEach(route => {
        route.mate = {
          keepAlive: true
        }
        // console.log(route);
        router.addRoute('main', route) 
      })
      router.options.routes.push(...routes)
    }
  },
  actions: {
    // 登录
    async accountLoginAction({ commit, dispatch, state }, payload) {
      // 1. 实现登录逻辑
      try {
        
        const loginResult = await accountLoginRequest(payload) // 发送请求
       
        const { token, userid } = loginResult['data']
        // 1.1 保存数据
        commit('changeUserToken', token)
        
        // 设置过期时间
        localCache.setCatch('expirationTime', new Date().getTime() + 60*60*1000)

        // 2. 请求用户信息
        await dispatch("updateUserInfo", userid)
        // const userInfo = await requestUserInfoById(userid)
        // commit("changeUserInfo", userInfo.data.user)
        // 2.1 设置rootState初始化userInfo  
        commit('initState', {}, {root: true})

        // 3. 登录成功,注册动态路由
        commit("changeUserMenu", state.userInfo.menu)
        
        router.push('/main')
      } catch (error) {
        let msg = ""
        if(error?.data?.errors.length) {
          msg =  error?.data?.errors[0]?.msg
        }
       
        showMsg.err(msg)
        console.log(error)
      }
    },
    initLoginState({ commit, state }) {
      if (state.userInfo) {
        commit("changeUserMenu", state.userInfo.menu)
      }
    },
    async updateUserInfo({ commit }, userid) {
      const userInfo = await requestUserInfoById(userid)
      commit("changeUserInfo", userInfo.data.user)
    }
  }
}

export default loginModule
