import { localCache } from '@/utils/cache'
import { getBreadcrumbList } from '@/utils/common/setBreadCrumb'
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
    setBreadcrumb(state, path) {
      const findArr = getBreadcrumbList(path)
      state.breadcrumb = findArr
      console.log(2333, findArr);
      localCache.setCatch('breadcrumb', findArr)
    }
  }
}