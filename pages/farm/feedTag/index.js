var feedService = require('../../../service/feed.js');
var util = require('../../../utils/util.js');
const app = getApp()
const logger = wx.getLogManager({ level: 1 })

Page({
  data: {
    feedTags: []
  },
  onShow: function () {
    this.load();
  },
  load: function () {
    const _this = this;
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    feedService.selectFeedTags().then(res => {
      _this.setData({
        feedTags: res
      });
      wx.hideLoading();
    }).catch(err => {
      wx.hideLoading();
      if (err) {
        if (err.message) {
          util.showErrorToast(err.message);
        } else {
          logger.log(err);
        }
      }
    })
  },
  toAdd: function () {
    wx.navigateTo({
      url: '/pages/farm/feedTag/add',
    });
  },
  toEdit: function (e) {
    wx.navigateTo({
      url: '/pages/farm/feedTag/edit?tagId=' + e.currentTarget.dataset.tagId
    });
  } 
})