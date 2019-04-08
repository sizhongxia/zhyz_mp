var msgService = require('../../../service/msg.js');
var util = require('../../../utils/util.js');
const app = getApp()
Page({
  data: {
    messages: [],
    page: 1,
    over: false
  },
  onShow: function () {
    this.loadMessages(1);
  },
  loadMessages: function (page) {
    const _this = this;
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    _this.setData({
      over: false
    });
    msgService.getSystemMsgData(page).then(res => {
      if (res.length === 0) {
        _this.setData({
          over: true
        });
        wx.hideLoading();
        return;
      }
      let messages = _this.data.messages;
      if (page > 1) {
        var len = res.length;
        for (var i = 0; i < len; ++i) {
          messages.push(res[i]);
        }
      } else {
        messages = res;
      }
      _this.setData({
        messages: messages,
        page: page
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
  loadMore: function () {
    this.loadMessages(this.data.page + 1);
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
    this.loadMessages(1);
  }
})