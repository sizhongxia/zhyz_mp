var farmService = require('../../../service/farm.js');
var farmAreaService = require('../../../service/farmArea.js');
var util = require('../../../utils/util.js');
const app = getApp()

Page({
  data: {
    areas: []
  },
  onShow: function () {
    this.load();
  },
  load: function (callback) {
    const _this = this;
    var farmId = wx.getStorageSync('curr-farm-id');
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    farmService.selectFarmAreas(farmId).then(res => {
      _this.setData({
        areas: res
      });
      wx.hideLoading();
      callback && callback();
    }).catch(err => {
      wx.hideLoading();
      callback && callback();
      if (err) {
        if (err.message) {
          util.showErrorToast(err.message);
        } else {
          logger.log(err);
        }
      }
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
            title: '请稍后...',
            mask: true
          });
          farmAreaService.deleteFarmArea(e.currentTarget.dataset.areaId).then(res => {
            wx.hideLoading();
            _this.load();
          }).catch(err => {
            wx.hideLoading();
            if (err) {
              if (err.message) {
                util.showErrorToast(err.message);
              } else {
                logger.log(err);
              }
            }
          });
        }
      }
    });
  }
  // onPullDownRefresh: function () {
  //   this.load(function () {
  //     wx.stopPullDownRefresh();
  //   });
  // }
})