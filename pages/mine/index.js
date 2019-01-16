var mineService = require('../../service/mine.js');
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
const app = getApp()
const logger = wx.getLogManager({
  level: 1
})

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    currentFarmId: '',
    currentFarmIdentity: '',
    farmName: '',
    auditsNum: 0,
    userInfo: {}
  },
  onLoad: function(options) {
    const _this = this;
    _this.setData({
      userInfo: app.globalData.userInfo
    });
  },
  onShow: function () {
    const _this = this;
    var farmId = wx.getStorageSync('curr-farm-id');
    _this.setData({
      currentFarmId: farmId,
      currentFarmIdentity: wx.getStorageSync('curr-farm-identity')
    });
    wx.showLoading({
      title: '加载中...'
    });
    mineService.getMineBaseInfo(farmId).then(res => {
      _this.setData({
        farmName: res.farmName,
        auditsNum: res.auditsNum
      });
      wx.hideLoading();
    }).catch(err => {
      wx.hideLoading();
      logger.log(err);
    });
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
          title: '正在上传...',
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
              logger.log(err);
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
  toPoultryVariety: function() {
    wx.navigateTo({
      url: "/pages/poultry/variety/index"
    });
  },
  toFeedTags: function() {
    wx.navigateTo({
      url: "/pages/farm/feedTag/index"
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
  }
})