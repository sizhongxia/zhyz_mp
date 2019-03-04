var layeggsService = require('../../../service/layeggs.js');
var util = require('../../../utils/util.js');
const app = getApp()
const logger = wx.getLogManager({ level: 1 })

Page({
  data: {
    layeggsObj: {}
  },
  onLoad: function (options) {
    const _this = this;
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    layeggsService.getLayeggsDetail(options.layeggsId).then(res => {
      _this.setData({
        layeggsObj: res
      });
      wx.hideLoading();
    }).catch(err => {
      wx.hideLoading();
      logger.log(err);
    });
  },
  previewImage: function (e) {
    const _this = this;
    util.previewImage(_this.data.layeggsObj.layeggsOriginalPics[e.currentTarget.dataset.picIndex], _this.data.layeggsObj.layeggsOriginalPics);
  },
})