var farmService = require('../../../service/farm.js');
var util = require('../../../utils/util.js');
const app = getApp()

Page({
  data: {
    authInfo: {},
    index: 0,
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
      var index = 0;
      for (var indx in _this.data.identities) {
        if (_this.data.identities[indx].value === form.identity) {
          index = indx;
        }
      }
      _this.setData({
        index: index,
        authInfo: res,
        form: form
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
      wx.hideLoading();
      if (err) {
        if (err.message) {
          util.showErrorToast(err.message);
        }
      }
    });
  }
})