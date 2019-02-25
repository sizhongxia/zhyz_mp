const app = getApp();

Page({
  data: {
    currentFarmIdentity: ''
  },
  onLoad: function () {
    const _this = this;
    _this.setData({
      currentFarmIdentity: wx.getStorageSync('curr-farm-identity')
    });
  }
})