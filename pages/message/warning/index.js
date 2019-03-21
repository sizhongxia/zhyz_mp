var msgService = require('../../../service/msg.js');
var util = require('../../../utils/util.js');
const app = getApp()
Page({
  data: {
    warnings: [],
    page: 1,
    over: false
  },
  onShow: function () {
    this.loadWarnings(1);
  },
  loadWarnings: function (page) {
    const _this = this;
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    _this.setData({
      over: false
    });
    var farmId = wx.getStorageSync('curr-farm-id');
    msgService.getWarningMsgData(farmId, page).then(res => {
      if (res.length === 0) {
        _this.setData({
          over: true
        });
        wx.hideLoading();
        return;
      }
      let warnings = _this.data.warnings;
      if (page > 1) {
        var len = res.length;
        for (var i = 0; i < len; ++i) {
          warnings.push(res[i]);
        }
      } else {
        warnings = res;
      }
      _this.setData({
        warnings: warnings,
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
    this.loadWarnings(this.data.page + 1);
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
    this.loadWarnings(1);
  }
})