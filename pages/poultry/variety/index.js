var poultryVarietyService = require('../../../service/poultryVariety.js');
const app = getApp()
const logger = wx.getLogManager({ level: 1 })

Page({
  data: {
    varieties: []
  },
  onLoad: function(options) {
  },
  onShow: function() {
    this.load();
  },
  load: function(callback) {
    const _this = this;
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    var farmId = wx.getStorageSync('curr-farm-id');
    poultryVarietyService.getPoultryVarietyData(farmId).then(res => {
      _this.setData({
        varieties: res
      });
      wx.hideLoading();
      callback && callback();
    }).catch(err => {
      logger.log(err);
      wx.hideLoading();
      callback && callback();
    });
  },
  toAdd: function() {
    const _this = this;
    wx.navigateTo({
      url: '/pages/poultry/variety/add'
    });
  },
  toDetail: function(e) {
    wx.navigateTo({
      url: '/pages/poultry/variety/detail?varietyId=' + e.currentTarget.dataset.varietyId
    });
  }
})