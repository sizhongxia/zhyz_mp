var api = require('./config/api.js')
var util = require('./utils/util.js')

App({
  onLaunch: function () {

    util.login().then(code => {
      return util.post(api.AuthLogin, {code: code})
    }).then(res => {
      console.info(res)
    }).catch(err => {

    })
    // 登录
    // https://github.com/tumobi/nideshop-mini-program/blob/master/app.js
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     console.info(res.code)
    //     wx.request({
    //       url: 'http://127.0.0.1:9091/zhyz/miniapp/api/login',
    //       data: {
    //         code: res.code
    //       }
    //     })
    //   }
    // })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})