var api = require('../config/api.js')
var util = require('../utils/util.js')

const loginCheckAuth = (code) => {
  return util.post(api.CheckAuth, {
    code: code
  })
}

const loginRequest = data => {
  return util.post(api.AuthLogin, data)
}

const regRequest = data => {
  return util.post(api.AuthReg, data)
}

const resetPwdRequest = data => {
  return util.post(api.AuthResetPwd, data)
}

const bindRequestByWx = data => {
  return util.post(api.AuthBindWx, {
    code: data.code,
    nickName: data.nickName,
    avatarUrl: data.avatarUrl,
    gender: data.gender,
    country: data.country,
    province: data.province,
    city: data.city
  })
}

const bindRequest = data => {
  return util.post(api.AuthBind, {
    code: data.code,
    username: data.username,
    password: data.password,
    nickName: data.nickName,
    avatarUrl: data.avatarUrl,
    gender: data.gender,
    country: data.country,
    province: data.province,
    city: data.city
  })
}

module.exports = {
  loginCheckAuth: loginCheckAuth,
  bindRequestByWx: bindRequestByWx,
  resetPwdRequest: resetPwdRequest,
  regRequest: regRequest,
  loginRequest: loginRequest,
  bindRequest: bindRequest
}