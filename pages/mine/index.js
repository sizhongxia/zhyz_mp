const app = getApp();

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar
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
  }
})