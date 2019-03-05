var mineService = require('../../service/mine.js');
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
const app = getApp()
const logger = wx.getLogManager({
  level: 1
})

Page({
  data: {
    user: {}
  },
  onLoad: function (options) {
    const _this = this;
    _this.setData({
      user: app.globalData.userInfo
    });
    mineService.userInfo().then(res => {
      _this.setData({
        user: res
      });
    }).catch(err => {
      logger.log(err);
    });
  }
})