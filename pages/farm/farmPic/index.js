var farmPicService = require('../../../service/farmPic.js');
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
const app = getApp()

Page({
  data: {
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
      title: '请稍后...',
      mask: true
    });
    const _this = this;
    farmPicService.getFarmPicData(_this.data.farmId).then(res => {
      _this.setData({
        pics: res
      });
      wx.hideLoading();
      callback && callback();
    }).catch(err => {
      wx.hideLoading();
      callback && callback();
      if (err) {
        if (err.message) {
          util.showErrorToast(err.message);
        }
      }
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
            title: '请稍后...',
            mask: true
          });
          farmPicService.deleteFarmPic(e.currentTarget.dataset.id).then(res => {
            wx.hideLoading();
            _this.load();
          }).catch(err => {
            wx.hideLoading();
            if (err) {
              if (err.message) {
                util.showErrorToast(err.message);
              }
            }
          });
        }
      }
    });
  }
})