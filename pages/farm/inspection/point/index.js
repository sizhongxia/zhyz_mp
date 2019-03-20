var inspectionPointService = require('../../../../service/inspectionPoint.js');
var util = require('../../../../utils/util.js');
const app = getApp()

Page({
  data: {
    points: []
  },
  onShow: function () {
    this.load();
  },
  load: function () {
    const _this = this;
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    inspectionPointService.getInspectionPointData(wx.getStorageSync('curr-farm-id')).then(res => {
      _this.setData({
        points: res
      });
      wx.hideLoading();
    }).catch(err => {
      wx.hideLoading();
      if (err) {
        if (err.message) {
          util.showErrorToast(err.message);
        }
      }
    })
  },
  toAdd: function () {
    wx.navigateTo({
      url: '/pages/farm/inspection/point/add',
    });
  },
  toDetail: function (e) {
    wx.navigateTo({
      url: '/pages/farm/inspection/point/detail?pointId=' + e.currentTarget.dataset.pointId
    });
  }
})