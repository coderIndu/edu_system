/**
 * 设置localstorage
 */

class LocalCache {
  setCatch(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  getCatch(key) {
    const value = window.localStorage.getItem(key)
    
    if(value===null) {
      return ''
    } 

    return JSON.parse(value)
  }

  deleteCache(key) {
    window.localStorage.removeItem(key)
  }

  clear() {
    window.localStorage.clear()
  }
}

class SessionCache {
  setCatch(key, value) {
    window.sessionStorage.setItem(key, JSON.stringify(value))
  }

  getCatch(key) {

    const value = window.sessionStorage.getItem(key)
    if(value===null) {
      return ''
    } 

    return JSON.parse(value)
  }

  deleteCache(key) {
    window.sessionStorage.removeItem(key)
  }

  claerCache() {
    window.sessionStorage.clear()
  }
}
export const sessionCache = new SessionCache()
export const localCache = new LocalCache()
