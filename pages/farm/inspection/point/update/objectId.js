var inspectionPointService = require('../../../../../service/inspectionPoint.js');
var util = require('../../../../../utils/util.js');
const app = getApp()

Page({
  data: {
    form: {
      pointId: '',
      objectId: ''
    }
  },
  onLoad: function (options) {
    this.setData({
      form: options
    })
  },
  inputObjectId: function (e) {
    const _this = this;
    var form = _this.data.form;
    form.objectId = e.detail.value;
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
    inspectionPointService.updateInspectionPointObjectId(_this.data.form).then(res => {
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