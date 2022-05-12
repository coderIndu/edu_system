/**
 * 设置localstorage
 */

class LocalCache {
  setCatch(key, value) {
    if(value instanceof Object) {
      value = JSON.stringify(value)
    }
    localStorage.setItem(key, value)
  }

  getCatch(key) {
    let value = localStorage.getItem(key)

    try {
      return JSON.parse(value)
    } catch (error) {
      return value
    }
  }

  deleteCache(key) {
   localStorage.removeItem(key)
  }

  clear() {
    localStorage.clear()
  }
}

class SessionCache {
  setCatch(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value))
  }

  getCatch(key) {
    const value = window.sessionStorage.getItem(key)
    return JSON.parse(value)
  }

  deleteCache(key) {
    window.sessionStorage.removeItem(key)
  }

  clear() {
    window.sessionStorage.clear()
  }
}
export const sessionCache = new SessionCache()
export const localCache = new LocalCache()
