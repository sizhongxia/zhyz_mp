var feedService = require('../../../service/feed.js');
var util = require('../../../utils/util.js');
const app = getApp()
const logger = wx.getLogManager({ level: 1 })

Page({
  data: {
    feedObj: {}
  },
  onLoad: function (options) {
    const _this = this;
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    feedService.selectFeedDetail(options.feedId).then(res => {
      _this.setData({
        feedObj: res
      });
      wx.hideLoading();
    }).catch(err => {
      logger.log(err);
      wx.hideLoading();
    });
  },
  previewImage: function (e) {
    const _this = this;
    util.previewImage(_this.data.feedObj.feedOriginalPics[e.currentTarget.dataset.picIndex], _this.data.feedObj.feedOriginalPics);
  },
})