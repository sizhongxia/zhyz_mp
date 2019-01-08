var equipmentService = require('../../service/equipment.js');
const app = getApp();

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    equipments: [],
    farmId: ''
  },
  onLoad: function(options) {
    const _this = this;
    _this.setData({
      farmId: wx.getStorageSync('curr-farm-id')
    });
    _this.load();
  },
  load: function(callback) {
    const _this = this;
    wx.showLoading({
      title: '加载中...'
    });
    equipmentService.getEquipmentData(_this.data.farmId).then(res => {
      _this.setData({
        equipments: res
      });
      wx.hideLoading();
      callback && callback();
    }).catch(err => {
      console.error(err);
      wx.hideLoading();
      callback && callback();
    });
  },
  onPullDownRefresh: function() {
    const _this = this;
    _this.load(function() {
      wx.stopPullDownRefresh();
    });
  }
})