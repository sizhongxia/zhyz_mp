
var inspectionService = require('../../../service/inspection.js');
var util = require('../../../utils/util.js');
const app = getApp()

Page({
  data: {
    inspectionObj: {}
  },
  onLoad: function (options) {
    const _this = this;
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    inspectionService.selectInspectionDetail(options.inspectionId).then(res => {
      _this.setData({
        inspectionObj: res
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
  previewImage: function (e) {
    const _this = this;
    util.previewImage(_this.data.inspectionObj.inspectionOriginalPics[e.currentTarget.dataset.picIndex], _this.data.inspectionObj.inspectionOriginalPics);
  },
})