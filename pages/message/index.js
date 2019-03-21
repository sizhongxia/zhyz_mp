var msgService = require('../../service/msg.js');
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
const app = getApp()
Page({
  data: {
    list: []
  },
  onShow: function () {
    const _this = this;
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    var farmId = wx.getStorageSync('curr-farm-id');
    msgService.getMsgData(farmId).then(res => {
      _this.setData({
        list: res
      })
      wx.hideLoading();
    }).catch(err => {
      wx.hideLoading();
      if (err) {
        if (err.message) {
          util.showErrorToast(err.message);
        }
      }
    });
  },
  toclick: function (e) {
    var type = e.currentTarget.dataset.type
    // var id = e.currentTarget.dataset.id
    if ("EQUIPMENT_WARNING" === type) {
      wx.showLoading({
        title: '请稍后...',
        mask: true
      })
      wx.navigateTo({
        url: '/pages/message/warning/index',
        complete: function () {
          wx.hideLoading();
        }
      })
    }
  }
})