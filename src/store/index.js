import { createStore } from "vuex"
import login from "./login/login"
import { localCache } from '../utils/cache'
const store = createStore({
  state() {
    return {
      username: localCache.getCatch('userInfo')?.user || '',
      password: localCache.getCatch("password") || ''
    }
  },
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    login
  }
})

export default store
