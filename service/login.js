
const loginRequest = code => {
  wx.request({
    url: 'http://127.0.0.1:9091/zhyz/miniapp/api/login',
    data: {
      code: code
    }
  })
}

module.exports = {
  loginRequest: loginRequest
}
