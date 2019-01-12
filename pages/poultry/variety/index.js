var poultryVarietyService = require('../../../service/poultryVariety.js');
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
const app = getApp()

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
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
      title: '加载中...'
    });
    poultryVarietyService.getPoultryVarietyData().then(res => {
      _this.setData({
        varieties: res
      });
      wx.hideLoading();
      callback && callback();
    }).catch(err => {
      console.error(err);
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