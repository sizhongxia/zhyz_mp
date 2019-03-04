var equipmentService = require('../../../../service/equipment.js');
const app = getApp()
const logger = wx.getLogManager({ level: 1 })

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
      logger.log(err);
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