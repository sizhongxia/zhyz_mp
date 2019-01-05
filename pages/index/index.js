var farmService = require('../../service/farm.js');
var util = require('../../utils/util.js');
const app = getApp();

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    userInfo: {},
    // 轮播图
    banners: [],
    // 农场详情
    farm: {},
    weather: '',
    monitor: {
      tmp: {
        online: 0,
        warn: 0
      },
      hum: {
        online: 0,
        warn: 0
      },
      ammonia: {
        online: 0,
        warn: 0
      },
      camera: {
        online: 0,
        outline: 0
      }
    }
  },
  onLoad: function() {
    const _this = this;
    _this.setData({
      userInfo: app.globalData.userInfo
    });
  },
  onShow: function() {
    this.loadData();
  },
  loadData: function(callback) {
    const _this = this;
    wx.showLoading({
      title: '加载中...'
    });
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
        wx.hideLoading();
        callback && callback();
      }
    }).then(res => {
      if (res) {
        _this.setData({
          weather: res
        });
        wx.hideLoading();
        callback && callback();
      }
    }).catch(err => {
      wx.hideLoading();
      console.error(err);
    });
    // var farmIdentity = wx.getStorageSync('curr-farm-identity');
    // console.info(farmId)
    // console.info(farmIdentity)
  },
  previewQrCodeImage: function() {
    util.previewImage(this.data.farm.qrCodeUrl);
  }
})