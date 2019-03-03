var api = require('../config/api.js')
var util = require('../utils/util.js')

const loginRequest = code => {
  return util.post(api.AuthLogin, {
    code: code
  })
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
  bindRequestByWx: bindRequestByWx,
  resetPwdRequest: resetPwdRequest,
  regRequest: regRequest,
  loginRequest: loginRequest,
  bindRequest: bindRequest
}