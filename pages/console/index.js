var farmService = require('../../service/farm.js');
const app = getApp();
Page({
  data: {
    currentFarmIdentity: '',
    farmId: '',
    farmLogo: '',
    funcs: []
  },
  onLoad: function (query) {
    const _this = this;
    _this.setData({
      farmId: wx.getStorageSync('curr-farm-id')
    });
  },
  onShow: function () {
    const _this = this;
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    farmService.farmDetail(_this.data.farmId).then(res => {
      _this.setData({
        farmLogo: res.farmLogo
      });
    })
    farmService.getFarmFuncs(_this.data.farmId).then(res => {
      wx.hideLoading();
      _this.setData({
        funcs: res,
        currentFarmIdentity: wx.getStorageSync('curr-farm-identity')
      });
    }).catch(err => {
      wx.hideLoading();
      _this.setData({
        funcs: []
      });
      if (err) {
        if (err.message) {
          util.showErrorToast(err.message);
        }
      }
    });
  }
})