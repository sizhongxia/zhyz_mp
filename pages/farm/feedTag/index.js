var feedService = require('../../../service/feed.js');
const app = getApp()
const logger = wx.getLogManager({ level: 1 })

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    feedTags: []
  },
  onShow: function () {
    this.load();
  },
  load: function () {
    const _this = this;
    wx.showLoading({
      title: '加载中...'
    });
    feedService.selectFeedTags().then(res => {
      _this.setData({
        feedTags: res
      });
      wx.hideLoading();
    }).catch(err => {
      logger.log(err);
      wx.hideLoading();
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