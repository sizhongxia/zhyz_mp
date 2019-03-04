var farmService = require('../../../service/farm.js');
var util = require('../../../utils/util.js');
const app = getApp()
const logger = wx.getLogManager({
  level: 1
})

Page({
  data: {
    authInfo: {},
    identities: [{
      name: '管理员',
      value: 'admin'
    }, {
      name: '运维人员',
      value: 'manager'
    }, {
      name: '访客',
      value: 'visitor'
    }],
    form: {
      resId: '',
      identity: '',
      identityName: ''
    }
  },
  onLoad: function(options) {
    const _this = this;
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    farmService.getFarmUserAuthInfo(options.authId).then(res => {
      var form = _this.data.form;
      form.resId = res.resId;
      form.identity = res.identity;
      form.identityName = res.identityName;
      _this.setData({
        authInfo: res,
        form: form
      });
      wx.hideLoading();
    }).catch(err => {
      logger.log(err);
      wx.hideLoading();
    });
  },
  identityPickerChange: function(e) {
    const _this = this;
    if (e.detail.value > -1) {
      var form = _this.data.form;
      var identity = _this.data.identities[e.detail.value];
      form.identityName = identity.name;
      form.identity = identity.value;
      _this.setData({
        form: form
      });
    }
  },
  toUpdate: function () {
    const _this = this;
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    farmService.updateFarmUserAuthInfo(_this.data.form).then(res => {
      wx.hideLoading();
      wx.showToast({
        title: '修改成功'
      })
    }).catch(err => {
      logger.log(err);
      wx.hideLoading();
      util.showErrorToast(err.message)
    });
  }
})