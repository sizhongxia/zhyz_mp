var msgService = require('../../service/msg.js');
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
const app = getApp()
Page({
  data: {
    list: []
  },
  onShow: function () {
    this.loadData(false);
  },
  loadData: function (ck) {
    const _this = this;
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    msgService.checkMsgDot().then(res => {
      if (res > 0) {
        wx.setTabBarBadge({
          index: 1,
          text: res + ''
        })
      } else {
        wx.removeTabBarBadge({
          index: 1
        })
      }
      return msgService.getMsgData();
    }).then(res => {
      _this.setData({
        list: res
      })
      wx.hideLoading();
      ck && ck();
    }).catch(err => {
      wx.hideLoading();
      ck && ck();
      if (err) {
        if (err.message) {
          util.showErrorToast(err.message);
        }
      }
    });
  },
  toclick: function (e) {
    var type = e.currentTarget.dataset.type;
    if (!type) {
      return;
    }
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    msgService.cleanMsgDot(type).then(res => {
      wx.navigateTo({
        url: '/pages/message/basetpl/index?type=' + type,
        complete: function () {
          wx.hideLoading();
        }
      })
    }).catch(err => {
      wx.hideLoading();
      if (err) {
        if (err.message) {
          util.showErrorToast(err.message);
        }
      }
    })
  },
  onPullDownRefresh: function () {
    this.loadData(wx.stopPullDownRefresh);
  }
})