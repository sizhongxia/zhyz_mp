var farmPicService = require('../../../service/farmPic.js');
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
const app = getApp()

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    pics: []
  },
  onLoad: function (options) {
    const _this = this;
    var farmId = wx.getStorageSync('curr-farm-id');
    farmPicService.getFarmPicData(farmId).then(res => {
      _this.setData({
        pics: res
      });
    }).catch(err => {
      console.error(err);
    });
  }
})