var farmPicService = require('../../../service/farmPic.js');
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
const app = getApp()

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    farmId: '',
    pics: []
  },
  onLoad: function (options) {
    const _this = this;
    var farmId = wx.getStorageSync('curr-farm-id');
    _this.setData({
      farmId: farmId
    });
    _this.load();
  },
  load: function (callback) {
    wx.showLoading({
      title: '加载中...'
    });
    const _this = this;
    farmPicService.getFarmPicData(_this.data.farmId).then(res => {
      _this.setData({
        pics: res
      });
      wx.hideLoading();
      callback && callback();
    }).catch(err => {
      console.error(err);
      wx.hideLoading();
      callback && callback();
    });
  },
  toUpload: function() {
    wx.navigateTo({
      url: '/pages/farm/farmPic/upload',
    });
  },
  onPullDownRefresh: function () {
    const _this = this;
    _this.load(function () {
      wx.stopPullDownRefresh();
    });
  },
  toEdit: function (e) {
    wx.navigateTo({
      url: '/pages/farm/farmPic/edit?picId=' + e.currentTarget.dataset.id
    });
  },
  removeItem: function (e) {
    const _this = this;
    wx.showModal({
      title: '提示',
      content: '删除后将无法找回！是否要删除？',
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '正在删除...'
          });
          farmPicService.deleteFarmPic(e.currentTarget.dataset.id).then(res => {
            wx.hideLoading();
            _this.load();
          }).catch(err => {
            wx.hideLoading();
            console.error(err);
          });
        }
      }
    });
  }
})