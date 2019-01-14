var farmService = require('../../../service/farm.js');
var farmAreaService = require('../../../service/farmArea.js');
const app = getApp()

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    areas: []
  },
  onLoad: function (options) {
    this.load();
  },
  load: function (callback) {
    const _this = this;
    var farmId = wx.getStorageSync('curr-farm-id');
    wx.showLoading({
      title: '加载中...'
    });
    farmService.selectFarmAreas(farmId).then(res => {
      _this.setData({
        areas: res
      });
      wx.hideLoading();
      callback && callback();
    }).catch(err => {
      logger.log(err);
      wx.hideLoading();
      callback && callback();
    });
  },
  toAdd: function () {
    wx.navigateTo({
      url: '/pages/farm/farmArea/add',
    });
  },
  toEdit: function (e) {
    wx.navigateTo({
      url: '/pages/farm/farmArea/edit?areaId=' + e.currentTarget.dataset.areaId,
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
          farmAreaService.deleteFarmArea(e.currentTarget.dataset.areaId).then(res => {
            wx.hideLoading();
            _this.load();
          }).catch(err => {
            wx.hideLoading();
            logger.log(err);
          });
        }
      }
    });
  },
  onPullDownRefresh: function () {
    this.load(function () {
      wx.stopPullDownRefresh();
    });
  }
})