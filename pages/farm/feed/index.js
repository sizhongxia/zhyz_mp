var farmService = require('../../../service/farm.js');
var feedService = require('../../../service/feed.js');
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
const app = getApp()
const logger = wx.getLogManager({ level: 1 })

Page({
  data: {
    page: 1,
    farmId: '',
    farmAreaId: '',
    feeds: [],
    loading: false,
    isOver: false
  },
  onLoad: function (options) {
    const _this = this;
    _this.setData({
      farmId: wx.getStorageSync('curr-farm-id')
    });
    _this.load();
  },
  onShow: function () {
  },
  load: function (callback) {
    const _this = this;
    if (_this.data.isOver) {
      callback && callback();
      return false;
    }
    _this.setData({
      loading: true
    });
    feedService.selectFeedData(_this.data.farmId, _this.data.farmAreaId, _this.data.page).then(res => {
      if (res && res.length > 0) {
        var size = res.length;
        var feeds = [];
        if (_this.data.page > 1 ) {
          feeds = _this.data.feeds;
        }
        for (var i = 0; i < size; i++) {
          feeds.push(res[i]);
        }
        _this.setData({
          page: _this.data.page + 1,
          feeds: feeds
        });
      } else {
        if (_this.data.page > 1) {
          wx.showToast({
            title: '无更多数据'
          });
        }
        _this.setData({
          isOver: true
        });
      }
      _this.setData({
        loading: false
      });
      callback && callback();
    }).catch(err => {
      logger.log(err);
      _this.setData({
        loading: false
      });
      callback && callback();
    });
  },
  toAdd: function () {
    wx.navigateTo({
      url: '/pages/farm/feed/add',
    });
  },
  loadMore: function () {
    this.load();
  },
  toDetail: function (e) {
    wx.navigateTo({
      url: '/pages/farm/feed/detail?feedId=' + e.currentTarget.dataset.feedId,
    });
  },
  onPullDownRefresh: function () {
    const _this = this;
    _this.setData({
      isOver: false,
      page: 1
    });
    _this.load(function() {
      wx.stopPullDownRefresh();
    });
  }
})