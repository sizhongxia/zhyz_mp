const app = getApp();

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    currentFarmId: '',
    currentFarmIdentity: ''
  },
  onLoad: function (options) {
    var farmId = wx.getStorageSync('curr-farm-id');
    var farmIdentity = wx.getStorageSync('curr-farm-identity');
    this.setData({
      currentFarmId: farmId,
      currentFarmIdentity: farmIdentity
    });
  },
  onReady: function() {

  },
  onShow: function() {},
  logout: function() {
    wx.showModal({
      title: '退出提示',
      content: '是否要推出当前账号？',
      success(res) {
        if (res.confirm) {
          wx.removeStorageSync('token');
          wx.redirectTo({
            url: '/pages/auth/login/login'
          });
        }
      }
    });
  },
  toEditFarmInfo: function() {
    wx.navigateTo({
      url: "/pages/farm/editInfo/index"
    })
  },
  toAuthFarms: function() {
    wx.navigateTo({
      url: "/pages/farm/auths/index"
    })
  }
})