var inspectionPointService = require('../../../../../service/inspectionPoint.js');
var util = require('../../../../../utils/util.js');
const app = getApp()

Page({
  data: {
    form: {
      pointId: '',
      farmLocation: ''
    }
  },
  onLoad: function (options) {
    this.setData({
      form: options
    })
  },
  inputPointFarmLocation: function (e) {
    const _this = this;
    var form = _this.data.form;
    form.farmLocation = e.detail.value;
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
    inspectionPointService.updateInspectionPointFarmLocation(_this.data.form).then(res => {
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