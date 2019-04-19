var farmService = require('../../service/farm.js');
var inspectionService = require('../../service/inspection.js');
var newsService = require('../../service/news.js');
var feedService = require('../../service/feed.js');
var msgService = require('../../service/msg.js');
var userSigninService = require('../../service/userSignin.js');

var util = require('../../utils/util.js');
const app = getApp();

var farmId = '';
Page({
  data: {
    userInfo: {},
    farmIdentity: '',
    // 轮播图
    banners: [],
    // 农场详情
    farm: {},
    weather: '',
    weatherNow: {},
    hlys: [],
    inspection: {},
    feed: {},
    news: {},
    signin: true,
    signinsuc: false,
    today: ''
  },
  onLoad: function () {
    const _this = this;
    _this.setData({
      userInfo: app.globalData.userInfo,
      farmIdentity: wx.getStorageSync('curr-farm-identity')
    });
    farmId = wx.getStorageSync('curr-farm-id');
    // 获取首页数据
    _this.loadData();

    var sptype = wx.getStorageSync('startup-parameter-type');
      // 清除
    wx.removeStorageSync('startup-parameter-type');
    if (sptype === 'alarm') {
      var resId = wx.getStorageSync('startup-parameter-resid');
      // 清除
      wx.removeStorageSync('startup-parameter-resid');
      if (resId) {
        wx.showLoading({
          title: '请稍后...',
          mask: true
        })
        wx.navigateTo({
          url: '/pages/startup/alarm/index?resId=' + resId,
          complete: function () {
            wx.hideLoading();
          }
        })
      }
    }
  },
  onShow: function () {
    const _this = this;
    // 
    userSigninService.checkSignin().then(res => {
      if (!res.signin) {
        _this.setData({
          signin: false,
          today: res.today
        });
      }
    })
  },
  toSignin: function (e) {
    const _this = this;
    if (e.detail.formId) {
      wx.showLoading({
        title: '请稍后...',
        mask: true
      })
      userSigninService.saveSignin(e.detail.formId).then(res => {
        _this.setData({
          signin: true,
          signinsuc: true
        });
        wx.hideLoading();
      }).catch(err => {
        _this.setData({
          signin: true
        });
        wx.hideLoading();
      })
    } else {
      _this.setData({
        signin: true
      });
    }
  },
  toGainFormId: function (e) {
    const _this = this;
    _this.setData({
      signinsuc: false
    });
    if (e.detail.formId) {
      userSigninService.gainFormId(e.detail.formId);
    }
  },
  onPullDownRefresh: function() {
    wx.showNavigationBarLoading();
    this.loadData(function () {
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
    });
  },
  loadData: function(callback) {
    const _this = this;
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    // 获取农场数据
    farmService.getFarmHomeData(farmId).then(res => {
      _this.setData({
        banners: res.banners,
        farm: res.farm,
        weather: res.weather,
        weatherNow: res.weatherNow,
        hlys: res.hlys,
        news: res.news
      });
      // 加载巡检记录
      return inspectionService.getLastInspectionDetail(farmId);
    }).then(res => {
      _this.setData({
        inspection: res
      });
      // 加载投食记录
      return feedService.getLastFeedDetail(farmId);
    }).then(res => {
      _this.setData({
        feed: res
      });
      return msgService.checkMsgDot();
    }).then(res => {
      if (res > 0) {
        wx.setTabBarBadge({
          index: 1,
          text: res + ''
        })
      }
      wx.hideLoading();
      callback && callback();
    }).catch(err => {
      wx.hideLoading();
      callback && callback();
      if (err) {
        if (err.message) {
          util.showErrorToast(err.message);
        }
      }
    });
  },
  // 更改天气
  toSelectWeatherCity: function () {
    if (this.data.farmIdentity != 'admin') {
      return;
    }
    wx.navigateTo({
      url: "/pages/weather/select"
    });
  },
  // 投食详情
  toFeedDetail: function (e) {
    wx.navigateTo({
      url: '/pages/farm/feed/detail?feedId=' + e.currentTarget.dataset.feedId,
    });
  },
  // 巡检详情
  toInspectionDetail: function (e) {
    wx.navigateTo({
      url: '/pages/farm/inspection/detail?inspectionId=' + e.currentTarget.dataset.inspectionId,
    });
  },
  // 预览图片
  previewImage: function (e) {
    util.previewImage(e.currentTarget.dataset.src.replace('-200x200', '-yeetong'));
  },
  toCopy: function (e) {
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
  }
})