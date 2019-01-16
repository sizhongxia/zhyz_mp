var farmService = require('../../service/farm.js');
var equipmentService = require('../../service/equipment.js');
var inspectionService = require('../../service/inspection.js');
var feedService = require('../../service/feed.js');
const logger = wx.getLogManager({ level: 1 })

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
    monitorInfo: [],
    inspection: {},
    feed: {}
  },
  onLoad: function() {
    const _this = this;
    _this.setData({
      userInfo: app.globalData.userInfo
    });
    _this.loadData();
    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate(function(res) {
      console.log(res.hasUpdate)
    });
    updateManager.onUpdateReady(function() {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success(res) {
          if (res.confirm) {
            updateManager.applyUpdate()
          }
        }
      })
    });
  },
  onShow: function() {},
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
      logger.log(err);
    });

    equipmentService.getEquipmentCollectionHomeTj(farmId).then(res => {
      _this.setData({
        monitorInfo: res
      });
    }).catch(err => {
      logger.log(err);
    });

    inspectionService.getLastInspectionDetail(farmId).then(res => {
      _this.setData({
        inspection: res
      });
    }).catch(err => {
      logger.log(err);
    });

    feedService.getLastFeedDetail(farmId).then(res => {
      _this.setData({
        feed: res
      });
    }).catch(err => {
      logger.log(err);
    });
  },
  previewImage: function (e) {
    util.previewImage(e.currentTarget.dataset.src.replace('-200x200', '-yeetong'));
  },
  toEquipment: function() {
    wx.switchTab({
      url: '/pages/equipment/index'
    });
  },
})