var inspectionPointService = require('../../../../../service/inspectionPoint.js');
var util = require('../../../../../utils/util.js');
const app = getApp()

Page({
  data: {
    form: {
      pointId: '',
      pointName: ''
    }
  },
  onLoad: function (options) {
    this.setData({
      form: options
    })
  },
  inputPointName: function (e) {
    const _this = this;
    var form = _this.data.form;
    form.pointName = e.detail.value;
    _this.setData({
      form: form
    });
  },
  toUpdate: function (e) {
    const _this = this;
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    inspectionPointService.updateInspectionPointName(_this.data.form).then(res => {
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