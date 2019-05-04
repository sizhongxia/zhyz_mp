var util = require('../../../utils/util.js');
var loginService = require('../../../service/login.js');
const app = getApp()
var scene = ''
Page({
  data: {
    // username: '',
    // password: '',
    // logining: false
    wtxt: '请稍后...',
    showGoinBtn: false
  },
  onLoad: function (query) {
    if (query) {
      if (!!query.scene) {
        scene = query.scene
      }
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
    _this.setData({
      wtxt: '正在检查版本信息...'
    })
    const updateManager = wx.getUpdateManager();
    updateManager.onCheckForUpdate(function (res) {
      if (!res.hasUpdate) {
        _this.setData({
          wtxt: '正在登陆...'
        })
        util.login().then(code => {
          return loginService.loginCheckAuth(code)
        }).then(res => {
          if (res) {
            _this.setData({
              wtxt: '欢迎使用'
            })
            _this.toLogin();
          } else {
            // wx.hideLoading();
            _this.setData({
              wtxt: '请点击按钮进行注册登陆',
              showGoinBtn: true
            })
          }
        });
      }
    });
    updateManager.onUpdateReady(function () {
      updateManager.applyUpdate()
    });
  },
  toLogin: function () {
    const _this = this;
    util.login().then(code => {
      return loginService.loginRequest({
        code: code,
        scene: scene
      });
    }).then(res => {
      app.globalData.userInfo = res;
      wx.setStorageSync('token', res.token);
      wx.redirectTo({
        url: '/pages/farm/select/index'
      });
    }).catch(err => {
      if (err) {
        if (!!err.message) {
          util.showErrorToast(err.message);
        }
      }
    });
  },
  // setUsername: function(e) {
  //   this.setData({
  //     username: e.detail.value
  //   });
  // },
  // setPassword: function(e) {
  //   this.setData({
  //     password: e.detail.value
  //   });
  // },
  // getUserInfoForWx: function (res) {
  //   const _this = this;
  //   if (res.detail.userInfo) {
  //     wx.showLoading({
  //       title: '请稍后...',
  //       mask: true
  //     });
  //     util.login().then(code => {
  //       return loginService.bindRequestByWx({
  //         code: code,
  //         nickName: res.detail.userInfo.nickName,
  //         avatarUrl: res.detail.userInfo.avatarUrl,
  //         gender: res.detail.userInfo.gender,
  //         country: res.detail.userInfo.country,
  //         province: res.detail.userInfo.province,
  //         city: res.detail.userInfo.city
  //       });
  //     }).then(res => {
  //       wx.hideLoading();
  //       _this.toLogin();
  //     }).catch(err => {
  //       wx.hideLoading();
  //       if (err) {
  //         if (err.message) {
  //           util.showErrorToast(err.message);
  //           return false;
  //         }
  //       }
  //     });
  //   } else {
  //     util.showErrorToast('请允许授权访问您的基本信息');
  //   }
  // },
  getUserInfo: function(res) {
    const _this = this;
    if (res.detail.userInfo) {
      // if (_this.data.logining) {
      //   return false;
      // }
      // if (!_this.data.username) {
      //   util.showErrorToast('请输入平台账号');
      //   return false;
      // }
      // if (!_this.data.password) {
      //   util.showErrorToast('请输入账号密码');
      //   return false;
      // }
      // _this.setData({
      //   logining: true
      // });
      wx.showLoading({
        title: '欢迎使用',
        mask: true
      });
      util.login().then(code => {
        return loginService.loginRequest({
          code: code,
          scene: scene,
          userName: res.detail.userInfo.nickName,
          userAvatar: res.detail.userInfo.avatarUrl,
          gender: res.detail.userInfo.gender,
          country: res.detail.userInfo.country,
          province: res.detail.userInfo.province,
          city: res.detail.userInfo.city
        });
        // return loginService.bindRequest({
        //   code: code,
        //   username: _this.data.username,
        //   password: _this.data.password,
        //   nickName: res.detail.userInfo.nickName,
        //   avatarUrl: res.detail.userInfo.avatarUrl,
        //   gender: res.detail.userInfo.gender,
        //   country: res.detail.userInfo.country,
        //   province: res.detail.userInfo.province,
        //   city: res.detail.userInfo.city
        // });
      }).then(res => {
        // _this.setData({
        //   logining: false
        // });
        // _this.toLogin();
        app.globalData.userInfo = res;
        wx.setStorageSync('token', res.token);
        wx.redirectTo({
          url: '/pages/farm/select/index',
          complete: function () {
            wx.hideLoading();
          }
        });
      }).catch(err => {
        // _this.setData({
        //   logining: false
        // });
        if (err) {
          if (err.message) {
            util.showErrorToast(err.message);
            return false;
          }
        }
        util.showErrorToast('请求失败');
      });
      // this.setData({
      //   userInfo: res.detail.userInfo,
      //   hasUserInfo: true
      // });
    }
  },
  // getUserInfoToReg: function (res) {
  //   const _this = this;
  //   if (res.detail.userInfo) {
  //     wx.setStorageSync('wx-user-info', res.detail.userInfo)
  //     wx.navigateTo({
  //       url: '/pages/auth/regist/index'
  //     })
  //   }
  // },
  // toResetpwd: function () {
  //   wx.navigateTo({
  //     url: '/pages/auth/resetpwd/index'
  //   })
  // }
})