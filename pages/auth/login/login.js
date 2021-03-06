var util = require('../../../utils/util.js');
var loginService = require('../../../service/login.js');
const app = getApp();
var scene = '';
var isAuthentication = false;
Page({
  data: {
    // username: '',
    // password: '',
    // logining: false
    wtxt: '请稍后...',
    showGoinBtn: false,
    wxVersion: {
      SDKVersion: '',
      version: ''
    }
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
    if (isAuthentication) {
      return;
    }
    // _this.setData({
    //   wtxt: '正在检查版本信息'
    // })
    // const updateManager = wx.getUpdateManager();
    // updateManager.onCheckForUpdate(function (res) {
    //   if (!res.hasUpdate) {
    var systemInfo = wx.getSystemInfoSync();
    _this.setData({
      wtxt: '请稍后...',
      wxVersion: {
        SDKVersion: systemInfo.SDKVersion,
        version: systemInfo.version
      }
    })
    util.login().then(code => {
      return loginService.loginCheckAuth(code)
    }).then(res => {
      if (res) {
        _this.setData({
          wtxt: '欢迎使用'
        });
        // if (wx.checkIsSupportSoterAuthentication) {
        //   wx.checkIsSupportSoterAuthentication({
        //     success(res) {
        //       if (res.supportMode.indexOf('fingerPrint') > -1) {
        //         wx.checkIsSoterEnrolledInDevice({
        //           checkAuthMode: 'fingerPrint',
        //           success(res) {
        //             if (res.isEnrolled) {
        //               _this.setData({
        //                 wtxt: '请使用指纹进行安全认证'
        //               });
        //               wx.startSoterAuthentication({
        //                 requestAuthModes: ['fingerPrint'],
        //                 challenge: 'login_yeetong_cn',
        //                 authContent: '指纹安全认证',
        //                 success(res) {
        //                   isAuthentication = true;
        //                   _this.toLogin();
        //                 }
        //               })
        //             } else {
        //               _this.toLogin();
        //             }
        //           },
        //           fail() {
        //             _this.toLogin();
        //           }
        //         })
        //       } else {
        //         _this.toLogin();
        //       }
        //     },
        //     fail() {
        //       _this.toLogin();
        //     }
        //   })
        // } else {
        //   _this.toLogin();
        // }
        _this.toLogin();
      } else {
        _this.setData({
          wtxt: '首次使用小程序请先授权登录',
          showGoinBtn: true
        })
      }
    });
    //   }
    // });
    // updateManager.onUpdateReady(function () {
    //   updateManager.applyUpdate()
    // });
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
  
  getUserInfo: function(res) {
    const _this = this;
    if (res.detail.userInfo) {
      wx.showLoading({
        title: '正在登录',
        mask: true
      });
      util.login().then(code => {
		  wx.getUserInfo({
			  withCredentials: true,
			  lang: 'zh_CN',
			  success: function(res) {
				const userInfo = res.userInfo;
				const nickName = userInfo.nickName;
				const avatarUrl = userInfo.avatarUrl;
				const gender = userInfo.gender; // 性别 0：未知、1：男、2：女
				const province = userInfo.province;
				const city = userInfo.city;
				const country = userInfo.country;
				const rawData = res.rawData;
				const encryptedData = res.encryptedData;
				const iv = res.iv;
				const signature = res.signature;
				loginService.loginRequest({
				  code: code,
				  scene: scene,
				  userName: nickName,
				  userAvatar: avatarUrl,
				  gender: gender,
				  country: country,
				  province: province,
				  city: city,
				  rawData: rawData,
				  encryptedData: encryptedData,
				  iv: iv,
				  signature: signature
				}).then(res => {
					app.globalData.userInfo = res;
					wx.setStorageSync('token', res.token);
					wx.redirectTo({
					  url: '/pages/farm/select/index',
					  complete: function () {
						wx.hideLoading();
					  }
					});
				})
			}
		});
      }).catch(err => {
        if (err) {
          if (err.message) {
            util.showErrorToast(err.message);
            return false;
          }
        }
        util.showErrorToast('请求失败');
      });
    }
  }
})