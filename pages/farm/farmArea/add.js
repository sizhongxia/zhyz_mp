var farmAreaService = require('../../../service/farmArea.js');
var util = require('../../../utils/util.js');
const app = getApp()
const logger = wx.getLogManager({ level: 1 })

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
    var farmId = wx.getStorageSync('curr-farm-id');
    var form = _this.data.form;
    form.farmId = farmId;
    _this.setData({
      form: form
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
  toAdd: function () {
    const _this = this;
    if (_this.data.submiting) {
      return false;
    }
    _this.setData({
      submiting: true
    });
    farmAreaService.saveFarmArea(_this.data.form).then(res => {
      wx.showToast({
        title: '保存成功'
      });
      var form = _this.data.form;
      form.areaName = "";
      form.acreage = "";
      form.areaPosition = "";
      form.areaDescribe = "";
      _this.setData({
        submiting: false,
        form: form
      });
    }).catch(err => {
      _this.setData({
        submiting: false
      });
      if (err) {
        if (err.message) {
          util.showErrorToast(err.message);
        } else {
          logger.log(err);
        }
      }
    });
  }
})