var mineService = require('../../service/mine.js');
const app = getApp()
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
  onLoad: function (options) {
    const _this = this;
    _this.setData({
      userInfo: app.globalData.userInfo
    });
  },
  onReady: function() {
  },
  onShow: function() {
    const _this = this;
    var farmId = wx.getStorageSync('curr-farm-id');
    var farmIdentity = wx.getStorageSync('curr-farm-identity');
    _this.setData({
      currentFarmId: farmId,
      currentFarmIdentity: farmIdentity
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
      console.error(err);
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
  toAuthUserApply: function () {
    wx.navigateTo({
      url: "/pages/farm/userApply/index"
    });
  },
  toApplyFarm: function () {
    wx.navigateTo({
      url: "/pages/farm/applyNew/index"
    });
  },
  toFeedTags: function () {
    wx.navigateTo({
      url: "/pages/farm/feedTag/index"
    });
  }
})