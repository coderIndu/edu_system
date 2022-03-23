import jfRequest from "../index"

// 枚举
const url = {
  login: "/users/login",
  getInfo: "/user"
}


export function accountLoginRequest(account) {
  return jfRequest.request({
    method: "POST",
    url: url.login,
    data: { user: account }
  })
}

export function requestUserInfoById(userid, token) {
  return jfRequest.request({
    method: "GET",
    url: url.getInfo,
    params: { userid },
    headers: {
      authorization: `Bearer ${token}`
    }
  })
}