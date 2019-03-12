var farmService = require('../../service/farm.js');
// var equipmentService = require('../../service/equipment.js');
var inspectionService = require('../../service/inspection.js');
var newsService = require('../../service/news.js');
var feedService = require('../../service/feed.js');

var util = require('../../utils/util.js');
const app = getApp();

Page({
  data: {
    userInfo: {},
    farmIdentity: '',
    // 轮播图
    banners: [],
    // 农场详情
    farm: {},
    weather: '',
    monitorInfo: [],
    inspection: {},
    feed: {},
    news: {}
  },
  onLoad: function() {
    this.setData({
      userInfo: app.globalData.userInfo,
      farmIdentity: wx.getStorageSync('curr-farm-identity')
    });
    this.loadData();
  },
  onShow: function () {
    this.loadData();
  },
  onPullDownRefresh: function() {
    this.loadData(function() {
      wx.stopPullDownRefresh();
    });
  },
  showMore: function(e) {
    var content = e.currentTarget.dataset.content;
    wx.showModal({
      content: content,
      confirmText: "复制",
      success(res) {
        if (res.confirm) {
          wx.setClipboardData({
            data: content,
            success(res) {
              wx.showToast({
                title: '已成功复制到粘贴板',
                icon: 'none'
              });
            }
          })
        }
      }
    });
  },
  loadData: function(callback) {
    const _this = this;
    wx.showLoading({
      title: '请稍后...',
      mask: true
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
      let weatherCityCode = res.weatherCityCode;
      if (!weatherCityCode) {
        weatherCityCode = 'CN101010100';
      }
      return farmService.selectFarmWeather(weatherCityCode)
    }).then(res => {
      if (res) {
        _this.setData({
          weather: res
        });
      }
      wx.hideLoading();
      callback && callback();
    }).catch(err => {
      wx.hideLoading();
      if (err) {
        if (err.message) {
          util.showErrorToast(err.message);
        }
      }
    });
    // equipmentService.getEquipmentCollectionHomeTj(farmId).then(res => {
    //   _this.setData({
    //     monitorInfo: res
    //   });
    // }).catch(err => {
    //   if (err) {
    //     if (err.message) {
    //       util.showErrorToast(err.message);
    //     }
    //   }
    // });

    inspectionService.getLastInspectionDetail(farmId).then(res => {
      _this.setData({
        inspection: res
      });
    });

    feedService.getLastFeedDetail(farmId).then(res => {
      _this.setData({
        feed: res
      });
    });

    newsService.getNewsByPage(1, 1).then(res => {
      if (res.list) {
        _this.setData({
          news: res.list[0]
        });
      }
    });

  },
  toEditFarmInfo: function () {
    if (this.data.farmIdentity != 'admin') {
      return;
    }
    wx.navigateTo({
      url: "/pages/farm/editInfo/index"
    });
  },
  toSelectWeatherCity: function () {
    if (this.data.farmIdentity != 'admin') {
      return;
    }
    wx.navigateTo({
      url: "/pages/weather/select"
    });
  },
  toFeedDetail: function (e) {
    wx.navigateTo({
      url: '/pages/farm/feed/detail?feedId=' + e.currentTarget.dataset.feedId,
    });
  },
  toInspectionDetail: function (e) {
    wx.navigateTo({
      url: '/pages/farm/inspection/detail?inspectionId=' + e.currentTarget.dataset.inspectionId,
    });
  },
  previewImage: function (e) {
    util.previewImage(e.currentTarget.dataset.src.replace('-200x200', '-yeetong'));
  },
  toMapPage: function () {
    const _this = this;
    if (_this.data.farm.latitude && _this.data.farm.longitude) {
      wx.navigateTo({
        url: '/pages/farm/farmMap/index?longitude=' + _this.data.farm.longitude + '&latitude=' + _this.data.farm.latitude + '&farmName=' + _this.data.farm.farmName
      });
    }
  }
})