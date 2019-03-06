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
    feedService.selectFeedTags(wx.getStorageSync('curr-farm-id')).then(res => {
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
  },
  removeItem: function (e) {
    const _this = this;
    wx.showModal({
      title: '提示',
      content: '删除后将无法找回！是否要删除？',
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '请稍后...',
            mask: true
          });
          feedService.deleteFeedTag(e.currentTarget.dataset.tagId).then(res => {
            wx.hideLoading();
            _this.setData({
              isOver: false,
              page: 1
            });
            _this.load();
          }).catch(err => {
            wx.hideLoading();
            if (err) {
              if (err.message) {
                util.showErrorToast(err.message);
              } else {
                logger.log(err);
              }
            }
          });
        }
      }
    });
  }
})