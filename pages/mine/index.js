var util = require('../../utils/util.js');
var api = require('../../config/api.js')
Page({
  data: {
  },
  onLoad: function (options) {

  },
  onReady: function () {

  },
  onShow: function () {
  },
  logout() {
    wx.removeStorageSync('token');
    wx.redirectTo({
      url: '/pages/auth/login/login'
    });
  },
  testLogout() {
    util.post(api.TestLogout, {}).then(res => {
      console.info(res)
    }).catch(err => {
      console.info(err)
    });
  }
})