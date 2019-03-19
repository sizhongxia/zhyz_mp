var equipmentAlarmConfService = require('../../../../../service/equipmentAlarmConf.js');
var util = require('../../../../../utils/util.js');
const app = getApp()

Page({
  data: {
    conf: {},
    form: {
      confId: '',
      pushInterval: 0
    },
    submiting: false
  },
  onLoad: function (options) {
    const _this = this;
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    equipmentAlarmConfService.getEquipmentAlarmConfDetail(options.confId).then(res => {
      var form = _this.data.form;
      form.confId = options.confId;
      form.pushInterval = res.pushIntervalNumber;
      _this.setData({
        form: form
      });
      wx.hideLoading();
    }).catch(err => {
      wx.hideLoading();
      wx.navigateBack();
    });
  },
  inputPushInterval: function (e) {
    const _this = this;
    var form = _this.data.form;
    form.pushInterval = e.detail.value;
    _this.setData({
      form: form
    });
  },
  toUpdate: function (e) {
    const _this = this;
    if (_this.data.submiting) {
      return false;
    }
    _this.setData({
      submiting: true
    });
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    var reqObj = this.data.form;
    equipmentAlarmConfService.updateAlarmConfPushInterval(reqObj.confId, reqObj.pushInterval).then(res => {
      wx.hideLoading();
      wx.navigateBack();
    }).catch(err => {
      wx.hideLoading();
      _this.setData({
        submiting: false
      });
      if (err) {
        if (err.message) {
          util.showErrorToast(err.message);
        }
      }
    });
  }
})