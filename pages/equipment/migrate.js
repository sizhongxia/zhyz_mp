var equipmentService = require('../../service/equipment.js');
var farmService = require('../../service/farm.js');
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
const app = getApp()

Page({
  data: {
    farms: [],
    farmIndex: 0,
    areas: [],
    areaIndex: 0,
    form: {
      formId: '',
      equipmentId: '',
      farmId: '',
      farmName: '',
      areaId: '',
      areaName: ''
    }
  },
  onLoad: function (options) {
    const _this = this;
    var form = _this.data.form;
    form.equipmentId = options.equipmentId;
    form.farmId = options.farmId;
    form.areaId = options.areaId;
    _this.setData({
      form: form
    })
  },
  onShow: function (e) {
    const _this = this;
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    var form = _this.data.form;
    farmService.authFarms('Y').then(res => {
      wx.hideLoading();
      if (res.length > 0) {
        var farmIndex = 0;
        for (var indx in res) {
          if (res[indx].farmId === form.farmId) {
            farmIndex = indx;
            form.farmName = res[indx].farmName;
          }
        }
      }
      _this.setData({
        farms: res,
        farmIndex: farmIndex,
        form: form
      });
      if (form.farmId) {
        _this.loadFarmAreas(form.farmId);
      }
    }).catch(err => {
      wx.hideLoading();
      if (err) {
        if (err.message) {
          util.showErrorToast(err.message);
        }
      }
    });
  },
  loadFarmAreas: function (farmId) {
    const _this = this;
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    var form = _this.data.form;
    farmService.selectFarmAreas(farmId).then(res => {
      wx.hideLoading();
      if (res.length > 0) {
        var areaIndex = 0;
        for (var indx in res) {
          if (res[indx].areaId === form.areaId) {
            areaIndex = indx;
            form.areaName = res[indx].areaName;
          }
        }
      }
      _this.setData({
        areas: res,
        areaIndex: areaIndex,
        form: form
      });
    }).catch(err => {
      wx.hideLoading();
      if (err) {
        if (err.message) {
          util.showErrorToast(err.message);
        }
      }
    });
  },
  farmPickerChange: function (e) {
    const _this = this;
    if (e.detail.value > -1) {
      var form = _this.data.form;
      var farm = _this.data.farms[e.detail.value];
      form.farmId = farm.farmId;
      form.farmName = farm.farmName;
      form.areaId = '';
      form.areaName = '';
      _this.setData({
        form: form
      });
      if (form.farmId) {
        _this.loadFarmAreas(form.farmId);
      }
    }
  },
  areaPickerChange: function (e) {
    const _this = this;
    if (e.detail.value > -1) {
      var form = _this.data.form;
      var area = _this.data.areas[e.detail.value];
      form.areaId = area.areaId;
      form.areaName = area.areaName;
      _this.setData({
        form: form
      });
    }
  },
  toMigrate: function(e) {
    const _this = this;
    if (e.detail.formId) {
      wx.showLoading({
        title: '请稍后...',
        mask: true
      })
      var form = _this.data.form;
      form.formId = e.detail.formId;
      equipmentService.toMigrate(form).then(res => {
        wx.hideLoading();
        wx.navigateBack({
          delta: 2
        });
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
})