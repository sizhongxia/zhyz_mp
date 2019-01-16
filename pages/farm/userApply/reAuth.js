var farmService = require('../../../service/farm.js');
const app = getApp()
const logger = wx.getLogManager({
  level: 1
})

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
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
      title: '加载中...'
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
      title: '正在修改...'
    });
    farmService.updateFarmUserAuthInfo(_this.data.form).then(res => {
      wx.hideLoading();
      wx.showToast({
        title: '修改成功'
      })
    }).catch(err => {
      logger.log(err);
      wx.hideLoading();
    });
  }
})