
var inspectionService = require('../../../service/inspection.js');
var util = require('../../../utils/util.js');
const app = getApp()
const logger = wx.getLogManager({ level: 1 })

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    inspectionObj: {}
  },
  onLoad: function (options) {
    const _this = this;
    wx.showLoading({
      title: '加载中...'
    });
    inspectionService.selectInspectionDetail(options.inspectionId).then(res => {
      _this.setData({
        inspectionObj: res
      });
      wx.hideLoading();
    }).catch(err => {
      logger.log(err);
      wx.hideLoading();
    });
  },
  previewImage: function (e) {
    const _this = this;
    util.previewImage(_this.data.inspectionObj.inspectionOriginalPics[e.currentTarget.dataset.picIndex], _this.data.inspectionObj.inspectionOriginalPics);
  },
})