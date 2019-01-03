
// var util = require('./utils/util.js')
// var loginService = require('./service/login.js')

App({
  onLaunch: function () {
    const _this = this;
    wx.getSystemInfo({
      success: e => {
        _this.globalData.StatusBar = e.statusBarHeight;
        _this.globalData.CustomBar = e.platform == 'android' ? e.statusBarHeight + 50 : e.statusBarHeight + 45;
      }
    });
  },
  globalData: {
    StatusBar: 0,
    CustomBar: 0,
    userInfo: null
  }
})