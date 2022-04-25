import { localCache } from '@/utils/cache'

export default {
  namespaced: true,
  state() {
    return {
      breadcrumb: localCache.getCatch('breadcrumb') || []
    }
  },
  getters: {

  },
  mutations: {
    setBreadcrumb(state, data) {
      state.breadcrumb = data
      localCache.setCatch('breadcrumb', data)
    },
    setBreadcrumbList(state, findpath) {
      const menus = localCache.getCatch('currentMenu')
      let findArr = []
      menus.forEach(item => {
        // 变量子元素
        item?.children.forEach(i => {
          if(i.url === findpath) {
           findArr =  [item.name, i.name]
          }
        })
      })
      state.breadcrumb = findArr
    }
  },
  actions: {
    ac_setBreadcrumb({commit}, data) {
      commit('setBreadcrumb', data)
    },
    ac_setBreadcrumbList({ commit }, data) {
      commit('setBreadcrumbList', data)
    }
  }
}