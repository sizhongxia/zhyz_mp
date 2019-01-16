const app = getApp();

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    currentFarmIdentity: ''
  },
  onLoad: function () {
    const _this = this;
    _this.setData({
      currentFarmIdentity: wx.getStorageSync('curr-farm-identity')
    });
  }
})