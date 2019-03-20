var farmService = require('../../../../service/farm.js');
var inspectionPointService = require('../../../../service/inspectionPoint.js');
var util = require('../../../../utils/util.js');
const app = getApp()

Page({
  data: {
    areas: [],
    form: {
      farmId: '',
      farmAreaId: '',
      farmAreaName: '农场',
      pointName: '',
      farmLocation: '',
      objectId: ''
    },
    submiting: false
  },
  onLoad: function (options) {
    const _this = this;
    var farmId = wx.getStorageSync('curr-farm-id');
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    var form = _this.data.form;
    form.farmId = farmId;
    farmService.selectFarmAreas(farmId).then(res => {
      res.unshift({
        areaId: '',
        areaName: '农场'
      });
      _this.setData({
        areas: res,
        form: form
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
  inputPointName: function (e) {
    const _this = this;
    var form = _this.data.form;
    form.pointName = e.detail.value;
    _this.setData({
      form: form
    });
  },
  inputFarmLocation: function (e) {
    const _this = this;
    var form = _this.data.form;
    form.farmLocation = e.detail.value;
    _this.setData({
      form: form
    });
  },
  inputObjectId: function (e) {
    const _this = this;
    var form = _this.data.form;
    form.objectId = e.detail.value;
    _this.setData({
      form: form
    });
  },
  toAdd: function () {
    const _this = this;
    if (_this.data.submiting) {
      return false;
    }
    _this.setData({
      submiting: true
    });
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    inspectionPointService.saveInspectionPoint(_this.data.form).then(res => {
      wx.hideLoading();
      wx.showToast({
        title: '保存成功'
      });
      var form = _this.data.form;
      form.pointName = "";
      form.objectId = "";
      form.farmLocation = "";
      form.farmAreaId = '';
      form.farmAreaName = '农场';
      _this.setData({
        submiting: false,
        form: form
      });
    }).catch(err => {
      wx.hideLoading();
      _this.setData({
        submiting: false
      });
      if (err) {
        if (err.message) {
          util.showErrorToast(err.message);
        }
      }
    });
  }
})