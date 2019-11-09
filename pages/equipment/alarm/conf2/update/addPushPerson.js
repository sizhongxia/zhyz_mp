var equipmentAlarmConfService = require('../../../../../service/equipmentAlarmConf.js');
var util = require('../../../../../utils/util.js');
const app = getApp()

Page({
  data: {
    form: {
      confId: '',
      pushPerson: ''
    },
    submiting: false
  },
  onLoad: function (options) {
    const _this = this;
    var form = _this.data.form;
    form.confId = options.confId;
    _this.setData({
      form: form
    });
  },
  inputPushPerson: function (e) {
    const _this = this;
    var form = _this.data.form;
    form.pushPerson = e.detail.value;
    _this.setData({
      form: form
    });
  },
  checkPushPerson: function (e) {
    const _this = this;
    var phoneNo = _this.data.form.pushPerson;
    if (!phoneNo) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      });
      return;
    }
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    equipmentAlarmConfService.checkAlarmPhone(phoneNo).then(res => {
      wx.hideLoading();
      wx.showToast({
        title: res,
        icon: 'none'
      });
    }).catch(err => {
      wx.hideLoading();
      if (err) {
        if (err.message) {
          util.showErrorToast(err.message);
        }
      }
    });
  },
  toSave: function (e) {
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
    equipmentAlarmConfService.saveAlarmConfPushPerson(reqObj.confId, reqObj.pushPerson).then(res => {
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