var funcService = require('../../service/func.js');
var util = require('../../utils/util.js');
const app = getApp()

Page({
  data: {
    funcs: []
  },
  onLoad: function() {
    const _this = this;
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    var farmId = wx.getStorageSync('curr-farm-id');
    funcService.getAllMpFuncs(farmId).then(res => {
      wx.hideLoading();
      _this.setData({
        funcs: res
      })
    }).catch(err => {
      wx.hideLoading();
      if (err) {
        if (err.message) {
          util.showErrorToast(err.message);
        }
      }
    });
  }
})