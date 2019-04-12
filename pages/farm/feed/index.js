var farmService = require('../../../service/farm.js');
var feedService = require('../../../service/feed.js');
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
const app = getApp();

var farmId = '';
var currentPage = 1;

Page({
  data: {
    feeds: [],
    loading: false,
    isOver: false
  },
  onLoad: function (options) {
    farmId = wx.getStorageSync('curr-farm-id')
    this.setData({
      feeds: []
    });
    this.load(1);
  },
  load: function (page, callback) {
    const _this = this;
    _this.setData({
      loading: true
    });
    feedService.selectFeedData(farmId, '', page).then(res => {
      if (res && res.length > 0) {
        currentPage = currentPage + 1;
        _this.setData({
          ["feeds[" + (page - 1) + "]"]: res,
          loading: false
        });
      } else {
        _this.setData({
          isOver: true,
          loading: false
        });
      }
      callback && callback();
    }).catch(err => {
      _this.setData({
        loading: false
      });
      if (err) {
        if (err.message) {
          util.showErrorToast(err.message);
        }
      }
      callback && callback();
    });
  },
  loadMore: function () {
    this.load(currentPage);
  },
  toAdd: function () {
    wx.navigateTo({
      url: '/pages/farm/feed/add',
    });
  },
  toDetail: function (e) {
    wx.navigateTo({
      url: '/pages/farm/feed/detail?feedId=' + e.currentTarget.dataset.feedId,
    });
  },
  onPullDownRefresh: function () {
    const _this = this;
    _this.setData({
      feeds: [],
      isOver: false
    });
    currentPage = 1;
    _this.load(currentPage, function() {
      wx.stopPullDownRefresh();
    });
  }
})