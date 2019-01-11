var equipmentService = require('../../../../service/equipment.js');
const app = getApp()

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    equipments: []
  },
  onLoad: function (options) {
    this.load();
  },
  load: function (callback) {
    const _this = this;
    var farmId = wx.getStorageSync('curr-farm-id');
    wx.showLoading({
      title: '加载中...'
    });
    equipmentService.getFarmBaseEquipmentData(farmId).then(res => {
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
  toConfs: function (e) {
    wx.navigateTo({
      url: '/pages/equipment/alarm/conf/list?equipmentId=' + e.currentTarget.dataset.equipmentId
    });
  }
})