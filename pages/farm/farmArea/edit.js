var farmAreaService = require('../../../service/farmArea.js');
const app = getApp()

Page({
  data: {
    form: {
      farmId: '',
      areaName: '',
      acreage: '',
      areaPosition: '',
      areaDescribe: ''
    },
    submiting: false
  },
  onLoad: function (options) {
    const _this = this;
    wx.showLoading({
      title: '加载中...'
    });
    farmAreaService.getFarmAreaDetail(options.areaId).then(res => {
      _this.setData({
        form: res
      });
      wx.hideLoading();
    }).catch(err => {
      logger.log(err);
      wx.hideLoading();
    });
  },
  inputAreaName: function (e) {
    const _this = this;
    var form = _this.data.form;
    form.areaName = e.detail.value;
    _this.setData({
      form: form
    });
  },
  inputAreaDescribe: function (e) {
    const _this = this;
    var form = _this.data.form;
    form.areaDescribe = e.detail.value;
    _this.setData({
      form: form
    });
  },
  inputAreaPosition: function (e) {
    const _this = this;
    var form = _this.data.form;
    form.areaPosition = e.detail.value;
    _this.setData({
      form: form
    });
  },
  inputAcreage: function (e) {
    const _this = this;
    var form = _this.data.form;
    form.acreage = e.detail.value;
    _this.setData({
      form: form
    });
  },
  toUpdate: function () {
    const _this = this;
    if (_this.data.submiting) {
      return false;
    }
    _this.setData({
      submiting: true
    });
    farmAreaService.updateFarmArea(_this.data.form).then(res => {
      wx.showToast({
        title: '保存成功'
      });
      _this.setData({
        submiting: false
      });
    }).catch(err => {
      _this.setData({
        submiting: false
      });
      logger.log(err);
    });
  }
})