var equipmentAlarmConfService = require('../../../../service/equipmentAlarmConf.js');
const app = getApp()

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
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
      title: '加载中...'
    });
    equipmentAlarmConfService.getEquipmentAlarmConfData(_this.data.equipmentId).then(res => {
      _this.setData({
        confs: res
      });
      wx.hideLoading();
      callback && callback();
    }).catch(err => {
      LogManager.log(err);
      wx.hideLoading();
      callback && callback();
    });
  },
  toAdd: function () {
    const _this = this;
    wx.navigateTo({
      url: '/pages/equipment/alarm/conf/add?equipmentId=' + _this.data.equipmentId,
    });
  },
  toDetail: function (e) {
    console.info(e.currentTarget.dataset.confId);
    wx.navigateTo({
      url: '/pages/equipment/alarm/conf/detail?confId=' + e.currentTarget.dataset.confId
    });
  }
    
})