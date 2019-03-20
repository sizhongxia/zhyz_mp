var farmService = require('../../../../../service/farm.js');
var inspectionPointService = require('../../../../../service/inspectionPoint.js');
var util = require('../../../../../utils/util.js');
const app = getApp()

Page({
  data: {
    areas: [],
    index: 0,
    form: {
      pointId: '',
      farmAreaId: '',
      farmAreaName: ''
    }
  },
  onLoad: function (options) {
    const _this = this;
    var farmId = wx.getStorageSync('curr-farm-id');
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    farmService.selectFarmAreas(farmId).then(res => {
      res.unshift({
        areaId: '',
        areaName: '农场'
      });
      var index = 0;
      for (var indx in res) {
        if (res[indx].areaId === options.farmAreaId) {
          index = indx
        }
      }
      _this.setData({
        areas: res,
        index: index,
        form: options
      });
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
  areaPickerChange: function (e) {
    const _this = this;
    if (e.detail.value > -1) {
      var form = _this.data.form;
      var area = _this.data.areas[e.detail.value];
      form.farmAreaId = area.areaId;
      form.farmAreaName = area.areaName;
      _this.setData({
        form: form
      });
    }
  },
  toUpdate: function (e) {
    const _this = this;
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    inspectionPointService.updateInspectionPointFarmArea(_this.data.form).then(res => {
      wx.hideLoading();
      wx.navigateBack();
    }).catch(err => {
      wx.hideLoading();
      if (err) {
        if (err.message) {
          util.showErrorToast(err.message);
        }
      }
    })
  }
})