import http from "../index"
import { parseParams } from "@/service/request"
const url = {
  login: "/users/login",  // 用户登录
  getInfo: "/user"        // 获取用户信息
}


export function accountLoginRequest(account) {
  return http.post(url.login, { user: account })
}

export function requestUserInfoById(userid) {
  return http.get(`${url.getInfo}?${parseParams({userid})}`)
  // return jfRequest.request({
  //   method: "GET",
  //   url: url.getInfo,
  //   params: { userid },
  //   headers: {
  //     authorization: `Bearer ${token}`
  //   }
  // })
}