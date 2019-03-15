var equipmentService = require('../../../service/equipment.js');
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
const app = getApp()

Page({
  data: {
    resId: '',
    alarm: {}
  },
  onLoad: function (options) {
    const _this = this;
    _this.setData({
      resId: options.resId
    })
  },
  onReady: function () {
    const _this = this;
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    equipmentService.getEquipmentCollectionAlarmDetail(_this.data.resId).then(res => {
      _this.setData({
        alarm: res
      })
      wx.hideLoading();
    }).catch(err => {
      wx.hideLoading();
      if (err) {
        if (err.message) {
          util.showErrorToast(err.message);
        }
      }
      wx.navigateBack();
    })
  }
})