const app = getApp();
var farmService = require('../../service/farm.js');
var util = require('../../utils/util.js');

Page({
  data: {
    userInfo: {},
    // 轮播图
    banners: [],
    // 农场详情
    farm: {},
    weather: ''
  },
  onLoad: function() {
    const _this = this;
    _this.setData({
      userInfo: app.globalData.userInfo
    });
    _this.loadData();
  },
  loadData: function(callback) {
    const _this = this;
    var farmId = wx.getStorageSync('curr-farm-id');
    farmService.selectFarmBanners(farmId).then(res => {
      _this.setData({
        banners: res
      });
      return farmService.farmDetail(farmId);
    }).then(res => {
      _this.setData({
        farm: res
      });
      if (res.weatherCityCode) {
        return farmService.selectFarmWeather(res.weatherCityCode)
      } else {
        callback && callback();
      }
    }).then(res => {
      _this.setData({
        weather: res
      });
      callback && callback();
    }).catch(err => {
      console.error(err);
    });
    // var farmIdentity = wx.getStorageSync('curr-farm-identity');
    // console.info(farmId)
    // console.info(farmIdentity)
  },
  onShow: function() {},
  onPullDownRefresh() {
    this.loadData(function() {
     wx.stopPullDownRefresh();
    });
  }
})