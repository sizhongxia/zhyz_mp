var farmService = require('../../service/farm.js');
var inspectionService = require('../../service/inspection.js');
var newsService = require('../../service/news.js');
var feedService = require('../../service/feed.js');
var msgService = require('../../service/msg.js');
var userSigninService = require('../../service/userSignin.js');

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
    news: {},
    signin: true,
    today: ''
  },
  onLoad: function () {
    const _this = this;
    _this.setData({
      userInfo: app.globalData.userInfo,
      farmIdentity: wx.getStorageSync('curr-farm-identity')
    });
    var sptype = wx.getStorageSync('startup-parameter-type');
    wx.removeStorageSync('startup-parameter-type');
    if (sptype === 'alarm') {
      var resId = wx.getStorageSync('startup-parameter-resid');
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
    userSigninService.checkSignin().then(res => {
      if (!res.signin) {
        _this.setData({
          signin: false,
          today: res.today
        });
      }
      _this.loadData();
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
          signin: true
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
  // onPullDownRefresh: function() {
  //   if (refreshing) {
  //     return;
  //   }
  //   refreshing = true;
  //   this.loadData(function() {
  //     setTimeout(()=>{
  //       wx.stopPullDownRefresh();
  //       refreshing = false;
  //     }, 1000)
  //   });
  // },
  // onPullDownRefresh() {
  //   wx.stopPullDownRefresh()
  // },
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
  loadData: function() {
    const _this = this;
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    var farmId = wx.getStorageSync('curr-farm-id');
    msgService.checkMsgDot(farmId).then(res => {
      if (res) {
        wx.showTabBarRedDot({
          index: 1
        })
      }
    });
    farmService.getFarmHomeData(farmId).then(res => {
      _this.setData({
        banners: res.banners,
        farm: res.farm,
        weather: res.weather,
        news: res.news
      });
      wx.hideLoading();
    }).catch(err => {
      wx.hideLoading();
      if (err) {
        if (err.message) {
          util.showErrorToast(err.message);
        }
      }
    });

    // setTimeout(() => {
      inspectionService.getLastInspectionDetail(farmId).then(res => {
        _this.setData({
          inspection: res
        });
      });
    // }, 1600)

    // setTimeout(() => {
      feedService.getLastFeedDetail(farmId).then(res => {
        _this.setData({
          feed: res
        });
      });
    // }, 2400)

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
    wx.navigateTo({
      url: '/pages/webview/index?path=https://www.yeetong.cn/mp/farm/map/' + _this.data.farm.farmId
    });
  }
})