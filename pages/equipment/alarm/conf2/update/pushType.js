var equipmentAlarmConfService = require('../../../../../service/equipmentAlarmConf.js');
var util = require('../../../../../utils/util.js');
const app = getApp()

Page({
  data: {
    pushTypes: [{
      ptName: '公众号',
      ptValue: '0',
      checked: false
    }, {
      ptName: '短信',
      ptValue: '1',
      checked: false
    }],
    form: {
      confId: '',
      pushTypes: []
    },
    submiting: false
  },
  onLoad: function (options) {
    const _this = this;
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    equipmentAlarmConfService.getEquipmentAlarmConfDetail(options.confId).then(res => {
      var form = _this.data.form;
      form.confId = options.confId;
      form.pushTypes = res.pushTypes;
      var pushTypes = _this.data.pushTypes;
      for (var ind1 in pushTypes) {
        for (var ind2 in form.pushTypes) {
          if (pushTypes[ind1].ptValue == form.pushTypes[ind2]) {
            pushTypes[ind1].checked = true;
            break;
          }
        }
      }
      _this.setData({
        pushTypes: pushTypes,
        form: form
      });
      wx.hideLoading();
    }).catch(err => {
      wx.hideLoading();
      wx.navigateBack();
    });
  },
  selectPushType: function (e) {
    const _this = this;
    var form = _this.data.form;
    form.pushTypes = e.detail.value;
    _this.setData({
      form: form
    });
  },
  toUpdate: function (e) {
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
    var reqObj = this.data.form;
    equipmentAlarmConfService.updateAlarmConfPushType(reqObj.confId, reqObj.pushTypes).then(res => {
      wx.hideLoading();
      wx.navigateBack();
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