var util = require('../../../utils/util.js');
var loginService = require('../../../service/login.js');
const app = getApp()

Page({
  data: {
    username: '',
    password: '',
    logining: false
  },
  onReady: function () {
    const _this = this;
    if (wx.getStorageSync('token')) {
      _this.toLogin();
    }
  },
  toLogin: function () {
    const _this = this;
    if (_this.data.logining) {
      return false;
    }
    _this.setData({
      logining: true
    });
    util.login().then(code => {
      return loginService.loginRequest(code);
    }).then(res => {
      app.globalData.userInfo = res;
      wx.setStorageSync('token', res.token);
      wx.redirectTo({
        url: '/pages/farm/select/index'
      });
    }).catch(err => {
      _this.setData({
        logining: false
      });
      if (err) {
        if (err.message) {
          util.showErrorToast(err.message);
          return false;
        } else {
          console.error(err);
        }
      }
      util.showErrorToast('登陆失败');
    });
  },
  setUsername: function(e) {
    this.setData({
      username: e.detail.detail.value
    });
  },
  setPassword: function(e) {
    this.setData({
      password: e.detail.detail.value
    });
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
          } else {
            console.error(err);
          }
        }
        util.showErrorToast('请求失败');
      });
      this.setData({
        userInfo: res.detail.userInfo,
        hasUserInfo: true
      });
    }
  }
})