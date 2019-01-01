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
  }
})