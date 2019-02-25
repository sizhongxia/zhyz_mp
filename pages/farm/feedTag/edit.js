var feedService = require('../../../service/feed.js');
const app = getApp()
const logger = wx.getLogManager({ level: 1 })

Page({
  data: {
    form: {
      feedTagId: '',
      feedTagName: '',
      feedTagContent: '',
    },
    submiting: false
  },
  onLoad: function (options) {
    const _this = this;
    wx.showLoading({
      title: '加载中...'
    });
    feedService.selectFeedTagDetail(options.tagId).then(res => {
      _this.setData({
        form: res
      });
      wx.hideLoading();
    }).catch(err => {
      wx.hideLoading();
      logger.log(err);
    });
  },
  inputFeedTagName: function (e) {
    const _this = this;
    var form = _this.data.form;
    form.feedTagName = e.detail.value;
    _this.setData({
      form: form
    });
  },
  inputFeedTagContent: function (e) {
    const _this = this;
    var form = _this.data.form;
    form.feedTagContent = e.detail.value;
    _this.setData({
      form: form
    });
  },
  toUpdate: function () {
    const _this = this;
    if (_this.data.submiting) {
      return false;
    }
    _this.setData({
      submiting: true
    });
    feedService.updateFeedTag(_this.data.form).then(res => {
      wx.showToast({
        title: '修改成功'
      });
      _this.setData({
        submiting: false
      });
    }).catch(err => {
      _this.setData({
        submiting: false
      });
      logger.log(err);
    });
  }
})