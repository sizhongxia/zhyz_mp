var equipmentService = require('../../../../service/equipment.js');
const app = getApp()

Page({
  data: {
    equipments: []
  },
  onLoad: function (options) {
    this.load();
  },
  load: function (callback) {
    const _this = this;
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    var farmId = wx.getStorageSync('curr-farm-id');
    equipmentService.getFarmBaseEquipmentData(farmId).then(res => {
      _this.setData({
        equipments: res
      });
      wx.hideLoading();
      callback && callback();
    }).catch(err => {
      wx.hideLoading();
      if (err) {
        if (err.message) {
          util.showErrorToast(err.message);
        }
      }
      callback && callback();
    });
  },
  toConfs: function (e) {
    wx.navigateTo({
      url: '/pages/equipment/alarm/conf/list?equipmentId=' + e.currentTarget.dataset.equipmentId
    });
  }
})