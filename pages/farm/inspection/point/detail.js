var inspectionPointService = require('../../../../service/inspectionPoint.js');
var util = require('../../../../utils/util.js');
const app = getApp()


Page({
  data: {
    pointId: '',
    point: {}
  },
  onLoad: function (options) {
    const _this = this;
    _this.setData({
      pointId: options.pointId
    });
  },
  onShow: function () {
    this.loadDetail();
  },
  loadDetail: function () {
    const _this = this;
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    inspectionPointService.getInspectionPointDetail(_this.data.pointId).then(res => {
      _this.setData({
        point: res
      });
      wx.hideLoading();
    }).catch(err => {
      wx.hideLoading();
      wx.navigateBack();
    });
  },
  toDelete: function () {
    const _this = this;
    wx.showModal({
      title: '提示',
      content: '是否要删除当前巡检点？',
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '请稍后...',
            mask: true
          });
          inspectionPointService.deleteInspectionPoint(_this.data.pointId).then(res => {
            wx.hideLoading();
            wx.navigateBack();
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
  },
  previewImage: function (e) {
    util.previewImage(e.currentTarget.dataset.src.replace('-200x200', '-yeetong'));
  },
  updatePointName: function (e) {
    const _this = this;
    wx.navigateTo({
      url: '/pages/farm/inspection/point/update/name?pointId=' + _this.data.pointId + '&pointName=' + _this.data.point.pointName
    });
  },
  updatePointFarmArea: function (e) {
    const _this = this;
    wx.navigateTo({
      url: '/pages/farm/inspection/point/update/farmArea?pointId=' + _this.data.pointId + '&farmAreaId=' + _this.data.point.farmAreaId + '&farmAreaName=' + _this.data.point.farmAreaName
    });
  },
  updatePointFarmLocation: function (e) {
    const _this = this;
    wx.navigateTo({
      url: '/pages/farm/inspection/point/update/farmLocation?pointId=' + _this.data.pointId + '&farmLocation=' + _this.data.point.farmLocation
    });
  },
  updatePointObjectId: function (e) {
    const _this = this;
    wx.navigateTo({
      url: '/pages/farm/inspection/point/update/objectId?pointId=' + _this.data.pointId + '&objectId=' + _this.data.point.objectId
    });
  },
  addCheckItem: function (e) {
    const _this = this;
    wx.navigateTo({
      url: '/pages/farm/inspection/point/addCheckItem?pointId=' + _this.data.pointId
    });
  },
  rmCheckItem: function (e) {
    const _this = this;
    wx.showModal({
      title: '提示',
      content: '是否要移除当前检查项？',
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '请稍后...',
            mask: true
          });
          inspectionPointService.deleteInspectionPointCheckItem(e.currentTarget.dataset.itemId).then(res => {
            wx.hideLoading();
            _this.loadDetail();
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