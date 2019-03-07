var poultryVarietyService = require('../../../service/poultryVariety.js');
var util = require('../../../utils/util.js');
const app = getApp()

Page({
  data: {
    kinds: [{
      id: '5c1cab687e29fcb927859601',
      name: '鸡'
    }, {
      id: '5c1cab687e29fcb927859602',
      name: '鸭'
    }, {
      id: '5c1cab687e29fcb927859603',
      name: '鹅'
    }, {
      id: '5c1cab687e29fcb927859604',
      name: '猪'
    }],
    form: {
      farmId: '',
      poultryTypeId: '5c1cab687e29fcb927859601',
      poultryTypeName: '鸡',
      varietyName: ''
    },
    submiting: false
  },
  onLoad: function () {
    const _this = this;
    var form = _this.data.form;
    form.farmId = wx.getStorageSync('curr-farm-id');
    _this.setData({
      form: form
    });
  },
  kindPickerChange: function (e) {
    const _this = this;
    if (e.detail.value > -1) {
      var form = _this.data.form;
      var kind = _this.data.kinds[e.detail.value];
      form.poultryTypeId = kind.id;
      form.poultryTypeName = kind.name;
      _this.setData({
        form: form
      });
    }
  },
  inputVarietyName: function (e) {
    const _this = this;
    var form = _this.data.form;
    form.varietyName = e.detail.value;
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
    poultryVarietyService.savePoultryVariety(_this.data.form).then(res => {
      wx.showToast({
        title: '保存成功'
      });
      var form = _this.data.form;
      form.poultryTypeId = "5c1cab687e29fcb927859601";
      form.poultryTypeName = "鸡";
      form.varietyName = "";
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
        }
      }
    });
  }
})