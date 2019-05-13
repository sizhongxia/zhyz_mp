var mineService = require('../../service/mine.js');
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
const app = getApp()

Page({
  data: {
    currentFarmId: '',
    currentFarmIdentity: '',
    farmName: '',
    farmCode: '',
    farmQrCodeUrl: '',
    invitationCode: '',
    auditsNum: 0,
    userInfo: {},
    recommendModel: false,
    wxVersion: {
      SDKVersion: '',
      version: ''
    }
  },
  onShow: function () {
    const _this = this;
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    var systemInfo = wx.getSystemInfoSync();
    var farmId = wx.getStorageSync('curr-farm-id');
    _this.setData({
      currentFarmId: farmId,
      currentFarmIdentity: wx.getStorageSync('curr-farm-identity'),
      wxVersion: {
        SDKVersion: systemInfo.SDKVersion,
        version: systemInfo.version
      }
    });
    mineService.userInfo().then(res => {
      _this.setData({
        userInfo: res
      });
      return mineService.getMineBaseInfo(farmId)
    }).then(res => {
      _this.setData({
        farmName: res.farmName,
        farmCode: res.farmCode,
        farmQrCodeUrl: res.farmQrCodeUrl,
        auditsNum: res.auditsNum,
        invitationCode: res.invitationCode
      });
      if (res.farmIdentity) {
        wx.setStorageSync('curr-farm-identity', res.farmIdentity);
      }
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
  showFarmQrImg: function () {
    const _this = this;
    if (!!_this.data.farmQrCodeUrl) {
      util.previewImage(_this.data.farmQrCodeUrl);
    }
  },
  logout: function() {
    wx.showModal({
      title: '退出提示',
      content: '是否要推出当前账号？',
      success(res) {
        if (res.confirm) {
          wx.removeStorageSync('token');
          wx.redirectTo({
            url: '/pages/auth/login/login'
          });
        }
      }
    });
  },
  selectUserHeadPic: function() {
    const _this = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success(res) {
        const tempFilePaths = res.tempFilePaths;
        wx.showLoading({
          title: '请稍后...',
          mask: true
        });
        wx.uploadFile({
          url: api.UploadApi,
          filePath: tempFilePaths[0],
          name: 'file',
          header: {
            type: 'avator'
          },
          success(res) {
            const data = res.data;
            var userAvator = JSON.parse(data).data;
            var userInfo = _this.data.userInfo;
            mineService.updateUserAvator(userAvator).then(res => {
              userInfo.avator = JSON.parse(data).data;
              app.globalData.userInfo = userInfo;
              _this.setData({
                userInfo: userInfo
              });
            }).catch(err => {
              if (err) {
                if (err.message) {
                  util.showErrorToast(err.message);
                }
              }
            });
          },
          complete() {
            wx.hideLoading();
          }
        });
      }
    });
  },
  toEditFarmInfo: function() {
    wx.navigateTo({
      url: "/pages/farm/editInfo/index"
    });
  },
  toAuthFarms: function() {
    wx.navigateTo({
      url: "/pages/farm/auths/index"
    });
  },
  toAuthUserApply: function() {
    wx.navigateTo({
      url: "/pages/farm/userApply/index"
    });
  },
  toApplyFarm: function() {
    wx.navigateTo({
      url: "/pages/farm/applyNew/index"
    });
  },
  toEquipmentConfs: function() {
    wx.navigateTo({
      url: "/pages/equipment/alarm/conf/index"
    });
  },
  toLiveVideo: function() {
    wx.navigateTo({
      url: "/pages/livevideo/index"
    });
  },
  toResetpwd: function () {
    wx.navigateTo({
      url: '/pages/auth/resetpwd/index'
    })
  },
  toUserInfo: function () {
    wx.navigateTo({
      url: '/pages/mine/userinfo'
    })
  },
  toRecommend: function () {
    this.setData({
      recommendModel: true
    })
  },
  hideRecommendModel: function () {
    this.setData({
      recommendModel: false
    })
  },
  toAboutUs: function () {
    wx.navigateTo({
      url: '/pages/webview/index?path=https://www.yeetong.cn/mp/base/aboutus'
    });
  }
})