var util = require('../../../utils/util.js');
var loginService = require('../../../service/login.js');
var smsService = require('../../../service/sms.js');
const logger = wx.getLogManager({ level: 1 })
const app = getApp()
Page({
  data: {
    vcodeTxt: '获取',
    vcodeLoading: false,
    smsType: 'MpRePwd',
    formData: {
      phoneNo: '',
      vcode: '',
      password: '',
      repassword: ''
    }
  },
  sendSmsVcode: function () {
    const _this = this;
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    smsService.sendSmsVcode({
      smsType: this.data.smsType,
      phoneNo: this.data.formData.phoneNo
    }).then(res => {
      wx.hideLoading();
      _this.setData({
        vcodeLoading: true,
        vcodeTxt: 120
      })
      var timer = setInterval(() => {
        var vcodeTxt = _this.data.vcodeTxt - 1;
        if (vcodeTxt == 0) {
          _this.setData({
            vcodeLoading: false,
            vcodeTxt: '获取'
          })
          clearInterval(timer);
          return;
        }
        _this.setData({
          vcodeTxt: vcodeTxt
        })
      }, 1000);
    }).catch(err => {
      wx.hideLoading();
      if (err) {
        if (err.message) {
          util.showErrorToast(err.message);
        } else {
          logger.log(err);
        }
      }
    });
  },
  changePhoneNo: function (e) {
    var formData = this.data.formData;
    formData.phoneNo = e.detail.value
  },
  toResetPwd: function (e) {
    var formId = e.detail.formId;
    if ("the formId is a mock one" === formId) {
      formId = "";
    }
    e.detail.value.formId = formId;
    var formVals = e.detail.value;
    if (formVals.phoneNo === '') {
      util.showErrorToast('手机号不允许为空');
      return;
    }
    if (formVals.vcode === '') {
      util.showErrorToast('验证码不允许为空');
      return;
    }
    if (formVals.password === '') {
      util.showErrorToast('登录密码不允许为空');
      return;
    }
    if (formVals.repassword === '') {
      util.showErrorToast('重复密码不允许为空');
      return;
    }
    if (formVals.repassword != formVals.password) {
      util.showErrorToast('两次密码输入不一致');
      return;
    }
    formVals.smsType = this.data.smsType;
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    loginService.resetPwdRequest(formVals).then(res => {
      wx.hideLoading();
      wx.showModal({
        title: '提示',
        content: res,
        success(res) {
          wx.navigateBack();
        }
      })
    }).catch(err => {
      wx.hideLoading();
      if (err) {
        if (err.message) {
          util.showErrorToast(err.message);
        } else {
          logger.log(err);
        }
      }
    });
  }
})