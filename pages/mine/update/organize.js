var mineService = require('../../../service/mine.js');
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
const app = getApp()

Page({
  data: {
    organizeName: ''
  },
  onLoad: function (options) {
    this.setData({
      organizeName: options.organizeName
    })
  },
  toAction: function (e) {
    var formId = e.detail.formId;
    if ("the formId is a mock one" === formId) {
      formId = "";
    }
    var formVals = e.detail.value;
    if (formVals.organizeName === '') {
      util.showErrorToast('公司名称不允许为空');
      return;
    }
    const _this = this;
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    mineService.updateUserOrganize(formVals.organizeName).then(res => {
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