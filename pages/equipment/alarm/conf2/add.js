var equipmentAlarmConfService = require('../../../../service/equipmentAlarmConf.js');
var equipmentService = require('../../../../service/equipment.js');
var util = require('../../../../utils/util.js');
const app = getApp()

Page({
  data: {
    equipmentId: '',
    notifyTypes: [{
      ptName: '断电时',
      ptValue: '1'
    }, {
      ptName: '通电时',
      ptValue: '2'
    }],
    pushTypes: [{
      ptName: '公众号',
      ptValue: '0'
    }, {
      ptName: '短信',
      ptValue: '1'
    }],
    form: {
      equipmentId: '',
      notifyTypeId: '1',
      notifyTypeName: '断电时',
      pushInterval: 10,
      pushTypes: [],
      pushPerson1: '',
      pushPerson2: '',
      pushPerson3: '',
      pushPerson4: '',
      pushPerson5: ''
    },
    submiting: false
  },
  onLoad: function(options) {
    const _this = this;
    var form = _this.data.form;
    form.equipmentId = options.equipmentId;
    this.setData({
      form: form
    });
  },
  onShow: function() {
  },
  selectPushType: function(e) {
    const _this = this;
    var form = _this.data.form;
    form.pushTypes = e.detail.value;
    _this.setData({
      form: form
    });
  },
  notifyTypesChange: function (e) {
    const _this = this;
    var form = _this.data.form;
    var oc = _this.data.notifyTypes[e.detail.value];
    form.notifyTypeId = oc.ptValue;
    form.notifyTypeName = oc.ptName;
    _this.setData({
      form: form
    });
  },
  inputPushInterval: function(e) {
    const _this = this;
    var form = _this.data.form;
    form.pushInterval = e.detail.value;
    _this.setData({
      form: form
    });
  },
  inputPushPerson1: function(e) {
    const _this = this;
    var form = _this.data.form;
    form.pushPerson1 = e.detail.value;
    _this.setData({
      form: form
    });
  },
  inputPushPerson2: function(e) {
    const _this = this;
    var form = _this.data.form;
    form.pushPerson2 = e.detail.value;
    _this.setData({
      form: form
    });
  },
  inputPushPerson3: function(e) {
    const _this = this;
    var form = _this.data.form;
    form.pushPerson3 = e.detail.value;
    _this.setData({
      form: form
    });
  },
  inputPushPerson4: function(e) {
    const _this = this;
    var form = _this.data.form;
    form.pushPerson4 = e.detail.value;
    _this.setData({
      form: form
    });
  },
  inputPushPerson5: function(e) {
    const _this = this;
    var form = _this.data.form;
    form.pushPerson5 = e.detail.value;
    _this.setData({
      form: form
    });
  },
  checkPushPerson1: function(e) {
    this.checkPushPerson(this.data.form.pushPerson1);
  },
  checkPushPerson2: function(e) {
    this.checkPushPerson(this.data.form.pushPerson2);
  },
  checkPushPerson3: function(e) {
    this.checkPushPerson(this.data.form.pushPerson3);
  },
  checkPushPerson4: function(e) {
    this.checkPushPerson(this.data.form.pushPerson4);
  },
  checkPushPerson5: function(e) {
    this.checkPushPerson(this.data.form.pushPerson5);
  },
  checkPushPerson: function(phoneNo) {
    if (!phoneNo) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      });
      return;
    }
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    equipmentAlarmConfService.checkAlarmPhone(phoneNo).then(res => {
      wx.hideLoading();
      wx.showToast({
        title: res,
        icon: 'none'
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
  toAdd: function () {
    const _this = this;
    if (_this.data.submiting) {
      return false;
    }
    _this.setData({
      submiting: true
    });
    equipmentAlarmConfService.saveBlackoutAlarmConf(this.data.form).then(res => {
      wx.navigateBack();
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