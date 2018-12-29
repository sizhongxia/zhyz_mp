
// var util = require('./utils/util.js')
// var loginService = require('./service/login.js')

App({
  onLaunch: function () {
    // util.login().then(code => {
    //   return loginService.loginRequest(code)
    // }).then(res => {
    //   wx.setStorageSync('token', res.token);
    //   wx.setStorageSync('avator', res.avator);
    //   wx.setStorageSync('userName', res.userName);
    // }).catch(err => {
    //   if (err) {
    //     // {code: 403, count: 0, data: null, message: "您暂未绑定平台账号"}
    //     if (err.code === 403) {
    //       wx.redirectTo({
    //         url: '/pages/auth/login/login'
    //       });
    //       return false;
    //     }
    //   }
    // })
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
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  globalData: {
    userInfo: null
  }
})