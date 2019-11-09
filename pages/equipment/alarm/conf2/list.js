var equipmentAlarmConfService = require('../../../../service/equipmentAlarmConf.js');
const app = getApp()

Page({
  data: {
    equipmentId: '',
    confs: []
  },
  onLoad: function (options) {
    this.setData({
      equipmentId: options.equipmentId
    });
  },
  onShow: function () {
    this.load();
  },
  load: function (callback) {
    const _this = this;
    var farmId = wx.getStorageSync('curr-farm-id');
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    equipmentAlarmConfService.getEquipmentAlarmConfData(_this.data.equipmentId).then(res => {
      _this.setData({
        confs: res
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
  toAdd: function () {
    const _this = this;
    wx.navigateTo({
      url: '/pages/equipment/alarm/conf2/add?equipmentId=' + _this.data.equipmentId,
    });
  },
  toDetail: function (e) {
    wx.navigateTo({
      url: '/pages/equipment/alarm/conf2/detail?confId=' + e.currentTarget.dataset.confId
    });
  }
    
})