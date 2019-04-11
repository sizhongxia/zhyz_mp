var util = require('../../../utils/util.js');
var loginService = require('../../../service/login.js');
const app = getApp()

Page({
  data: {
    token: '',
    username: '',
    password: '',
    logining: false
  },
  onLoad: function (query) {
    if (query) {
      if (query.type) {
        wx.setStorageSync('startup-parameter-type', query.type)
      }
      if (query.resId) {
        wx.setStorageSync('startup-parameter-resid', query.resId)
      }
    }
  },
  onShow: function () {
    const _this = this;
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    const updateManager = wx.getUpdateManager();
    updateManager.onCheckForUpdate(function (res) {
      if (!res.hasUpdate) {
        _this.toLogin();
      } else {
        wx.hideLoading();
      }
    });
    updateManager.onUpdateReady(function () {
      updateManager.applyUpdate()
    });
  },
  toLogin: function () {
    const _this = this;
    util.login().then(code => {
      return loginService.loginRequest(code);
    }).then(res => {
      app.globalData.userInfo = res;
      wx.setStorageSync('token', res.token);
      _this.setData({
        token: res.token
      });
      setTimeout(() => {
        wx.redirectTo({
          url: '/pages/farm/select/index',
          complete: function () {
            wx.hideLoading();
          }
        });
      }, 1000);
    }).catch(err => {
      wx.hideLoading();
      if (err) {
        if (!!err.message) {
          util.showErrorToast(err.message);
        }
      }
    });
  },
  setUsername: function(e) {
    this.setData({
      username: e.detail.value
    });
  },
  setPassword: function(e) {
    this.setData({
      password: e.detail.value
    });
  },
  getUserInfoForWx: function (res) {
    const _this = this;
    if (res.detail.userInfo) {
      wx.showLoading({
        title: '请稍后...',
        mask: true
      });
      util.login().then(code => {
        return loginService.bindRequestByWx({
          code: code,
          nickName: res.detail.userInfo.nickName,
          avatarUrl: res.detail.userInfo.avatarUrl,
          gender: res.detail.userInfo.gender,
          country: res.detail.userInfo.country,
          province: res.detail.userInfo.province,
          city: res.detail.userInfo.city
        });
      }).then(res => {
        wx.hideLoading();
        _this.toLogin();
      }).catch(err => {
        wx.hideLoading();
        if (err) {
          if (err.message) {
            util.showErrorToast(err.message);
            return false;
          }
        }
      });
    } else {
      util.showErrorToast('请允许授权访问您的基本信息');
    }
  },
  getUserInfo: function(res) {
    const _this = this;
    if (res.detail.userInfo) {
      if (_this.data.logining) {
        return false;
      }
      if (!_this.data.username) {
        util.showErrorToast('请输入平台账号');
        return false;
      }
      if (!_this.data.password) {
        util.showErrorToast('请输入账号密码');
        return false;
      }
      _this.setData({
        logining: true
      });
      util.login().then(code => {
        return loginService.bindRequest({
          code: code,
          username: _this.data.username,
          password: _this.data.password,
          nickName: res.detail.userInfo.nickName,
          avatarUrl: res.detail.userInfo.avatarUrl,
          gender: res.detail.userInfo.gender,
          country: res.detail.userInfo.country,
          province: res.detail.userInfo.province,
          city: res.detail.userInfo.city
        });
      }).then(res => {
        _this.setData({
          logining: false
        });
        _this.toLogin();
      }).catch(err => {
        _this.setData({
          logining: false
        });
        if (err) {
          if (err.message) {
            util.showErrorToast(err.message);
            return false;
          }
        }
        util.showErrorToast('请求失败');
      });
      this.setData({
        userInfo: res.detail.userInfo,
        hasUserInfo: true
      });
    }
  },
  getUserInfoToReg: function (res) {
    const _this = this;
    if (res.detail.userInfo) {
      wx.setStorageSync('wx-user-info', res.detail.userInfo)
      wx.navigateTo({
        url: '/pages/auth/regist/index'
      })
    }
  },
  toResetpwd: function () {
    wx.navigateTo({
      url: '/pages/auth/resetpwd/index'
    })
  }
})