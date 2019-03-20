var inspectionPointService = require('../../../../service/inspectionPoint.js');
var util = require('../../../../utils/util.js');
const app = getApp()

Page({
  data: {
    form: {
      pointId: '',
      itemTitle: '',
      itemContent: ''
    }
  },
  onLoad: function (options) {
    var form = this.data.form;
    form.pointId = options.pointId;
    this.setData({
      form: form
    })
  },
  inputItemTitle: function (e) {
    const _this = this;
    var form = _this.data.form;
    form.itemTitle = e.detail.value;
    _this.setData({
      form: form
    });
  },
  inputItemContent: function (e) {
    const _this = this;
    var form = _this.data.form;
    form.itemContent = e.detail.value;
    _this.setData({
      form: form
    });
  },
  toSave: function (e) {
    const _this = this;
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    inspectionPointService.saveInspectionPointCheckItem(_this.data.form).then(res => {
      wx.hideLoading();
      wx.navigateBack();
    }).catch(err => {
      wx.hideLoading();
      if (err) {
        if (err.message) {
          util.showErrorToast(err.message);
        }
      }
    })
  }
})