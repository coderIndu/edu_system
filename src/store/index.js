import { createStore } from "vuex"
import login from "./login/login"
import { localCache } from '../utils/cache'
import header from './header'

const store = createStore({
  state() {
    return {
      username: localCache.getCatch('userInfo')?.username,
      password: localCache.getCatch("password"),
      user_id: localCache.getCatch('userInfo')?.userid,
      userInfo: localCache.getCatch('userInfo')
    }
  },
  mutations: {
    initState(state) {  // 初始化
      state.userInfo = localCache.getCatch('userInfo')
      state.user_id = state.userInfo.userid
      state.username = state.userInfo.username
      state.password = localCache.getCatch("password")
    }
  },
  getters: {},
  actions: {},
  modules: {
    login,
    header
  }
})

export default store
