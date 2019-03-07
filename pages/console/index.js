var farmService = require('../../service/farm.js');
const app = getApp();

Page({
  data: {
    currentFarmId: '',
    currentFarmIdentity: '',
    funcs: []
  },
  onLoad: function () {
    const _this = this;
    _this.setData({
      currentFarmId: wx.getStorageSync('curr-farm-id'),
      currentFarmIdentity: wx.getStorageSync('curr-farm-identity')
    });
  },
  onShow: function () {
    const _this = this;
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    farmService.getFarmFuncs(_this.data.currentFarmId).then(res => {
      wx.hideLoading();
      _this.setData({
        funcs: res
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