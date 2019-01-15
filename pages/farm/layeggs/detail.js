var layeggsService = require('../../../service/layeggs.js');
var util = require('../../../utils/util.js');
const app = getApp()
const logger = wx.getLogManager({ level: 1 })

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    layeggsObj: {}
  },
  onLoad: function (options) {
    const _this = this;
    layeggsService.getLayeggsDetail(options.layeggsId).then(res => {
      _this.setData({
        layeggsObj: res
      });
    }).catch(err => {
      logger.log(err);
    });
  },
  previewImage: function (e) {
    const _this = this;
    util.previewImage(_this.data.layeggsObj.layeggsOriginalPics[e.currentTarget.dataset.picIndex], _this.data.layeggsObj.layeggsOriginalPics);
  },
})