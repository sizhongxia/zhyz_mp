var api = require('../config/api.js')
var util = require('../utils/util.js')

const loginRequest = code => {
  return util.post(api.AuthLogin, {
    code: code
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
  loginRequest: loginRequest,
  bindRequest: bindRequest
}
