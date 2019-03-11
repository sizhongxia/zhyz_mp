var mineService = require('../../service/mine.js');
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
const app = getApp()

Page({
  data: {
    user: {}
  },
  onLoad: function (options) {
    this.setData({
      user: app.globalData.userInfo
    });
  },
  onShow: function () {
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    const _this = this;
    mineService.userInfo().then(res => {
      _this.setData({
        user: res
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
  toChangeEmail: function () {
    wx.navigateTo({
      url: '/pages/mine/update/email?email=' + this.data.user.email
    })
  },
  toChangeOrganize: function () {
    wx.navigateTo({
      url: '/pages/mine/update/organize?organizeName=' + this.data.user.organizeName
    })
  }
})