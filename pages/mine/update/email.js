var mineService = require('../../../service/mine.js');
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
const app = getApp()

Page({
  data: {
    email: '',
    formId: ''
  },
  onLoad: function (options) {
    this.setData({
      email: options.email
    })
  },
  toAction: function(e) {
    var formId = e.detail.formId;
    if ("the formId is a mock one" === formId) {
      formId = "";
    }
    var formVals = e.detail.value;
    if (formVals.email === '') {
      util.showErrorToast('电子邮箱不允许为空');
      return;
    }
    const _this = this;
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    mineService.updateUserEmail(formVals.email).then(res => {
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