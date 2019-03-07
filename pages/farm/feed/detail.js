var feedService = require('../../../service/feed.js');
var util = require('../../../utils/util.js');
const app = getApp()

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
      wx.hideLoading();
      if (err) {
        if (err.message) {
          util.showErrorToast(err.message);
        }
      }
    });
  },
  previewImage: function (e) {
    const _this = this;
    util.previewImage(_this.data.feedObj.feedOriginalPics[e.currentTarget.dataset.picIndex], _this.data.feedObj.feedOriginalPics);
  },
})