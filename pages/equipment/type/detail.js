var equipmentService = require('../../../service/equipment.js');
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
const app = getApp()

Page({
  data: {
    tabIndex: 1,
    equipmentId: '',
    equipment: {}
  },
  onLoad: function (options) {
    const _this = this;  
    _this.setData({
      equipmentId: options.equipmentId
    })
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    equipmentService.getEquipmentDetail(options.equipmentId).then(res => {
      _this.setData({
        equipment: res
      });
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
  tabSelect: function (e) {
    const _this = this;
    if (e.currentTarget.dataset.index == 2) {
      wx.navigateTo({
        url: '/pages/webview/index?path=https://www.yeetong.cn/mp/equipment/statistics/' + _this.data.equipmentId
      });
      return;
    }
    if (e.currentTarget.dataset.index == 3) {
      wx.showLoading({
        title: '请稍后...',
        mask: true
      });
      wx.navigateTo({
        url: '/pages/equipment/alarm/conf/list?equipmentId=' + _this.data.equipmentId,
        complete: function () {
          wx.hideLoading();
        }
      });
      return;
    }
  }
})