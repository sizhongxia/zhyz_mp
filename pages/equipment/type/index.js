var equipmentService = require('../../../service/equipment.js');
const app = getApp();
const logger = wx.getLogManager({ level: 1 })

Page({
  data: {
    equipments: [],
    typeName: 'Loading...',
    farmId: '',
    typeId: ''
  },
  onLoad: function(options) {
    const _this = this;
    _this.setData({
      farmId: wx.getStorageSync('curr-farm-id'),
      typeId: options.typeId
    });
    _this.load();
  },
  load: function(callback) {
    const _this = this;
    wx.showLoading({
      title: '加载中...'
    });
    if (_this.data.typeId == 'SP') {
      equipmentService.getEquipmentVideoData(_this.data.farmId).then(res => {
        _this.setData({
          equipments: res.equipments,
          typeName: res.equipmentTypeName
        });
        wx.hideLoading();
        callback && callback();
      }).catch(err => {
        logger.log(err);
        wx.hideLoading();
        callback && callback();
      });
    } else {
      equipmentService.getEquipmentTypeData(_this.data.farmId, _this.data.typeId).then(res => {
        _this.setData({
          equipments: res.equipments,
          typeName: res.equipmentTypeName
        });
        wx.hideLoading();
        callback && callback();
      }).catch(err => {
        logger.log(err);
        wx.hideLoading();
        callback && callback();
      });
    }
  },
  toStatistic: function(e) {
    wx.navigateTo({
      url: '/pages/webview/index?path=https://www.yeetong.cn/mp/equipment/statistics/' + e.currentTarget.dataset.equipmentId
    });
  },
  toVideoLive: function(e) {
    wx.navigateTo({
      url: '/pages/webview/index?path=https://www.yeetong.cn/mp/equipment/livevideo/' + e.currentTarget.dataset.equipmentId
    });
  },
  onPullDownRefresh: function() {
    const _this = this;
    _this.load(function() {
      wx.stopPullDownRefresh();
    });
  }
})