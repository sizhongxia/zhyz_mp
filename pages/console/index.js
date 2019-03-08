var farmService = require('../../service/farm.js');
const app = getApp();

Page({
  data: {
    currentFarmId: '',
    currentFarmIdentity: '',
    funcs: []
  },
  onShow: function () {
    const _this = this;
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    var currentFarmId = wx.getStorageSync('curr-farm-id');
    farmService.getFarmFuncs(currentFarmId).then(res => {
      wx.hideLoading();
      _this.setData({
        funcs: res,
        currentFarmId: currentFarmId,
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