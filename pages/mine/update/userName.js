var mineService = require('../../../service/mine.js');
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
const app = getApp()

Page({
  data: {
    userName: ''
  },
  onLoad: function (options) {
    this.setData({
      userName: options.userName
    })
  },
  toAction: function (e) {
    var formId = e.detail.formId;
    if ("the formId is a mock one" === formId) {
      formId = "";
    }
    var formVals = e.detail.value;
    if (formVals.userName === '') {
      util.showErrorToast('用户名不允许为空');
      return;
    }
    const _this = this;
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    mineService.updateUserName(formVals.userName).then(res => {
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