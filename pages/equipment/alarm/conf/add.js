var equipmentAlarmConfService = require('../../../../service/equipmentAlarmConf.js');
var util = require('../../../../utils/util.js');
const app = getApp()
const logger = wx.getLogManager({ level: 1 })

Page({
  data: {
    equipmentId: '',
    operationalCharacters: [{
      ocName: '大于',
      ocValue: 'Gt'
    }, {
      ocName: '小于',
      ocValue: 'Lt'
    }, {
      ocName: '大于等于',
      ocValue: 'Gte'
    }, {
      ocName: '小于等于',
      ocValue: 'Lte'
    }],
    monitorStates: [{
      msName: '生效',
      msValue: '1'
    }, {
      msName: '未启用',
      msValue: '0'
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
      monitorAlarmValue: 0,
      operationalCharacter: 'Gt',
      operationalCharacterName: '大于',
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
  inputMonitorAlarmValue: function(e) {
    const _this = this;
    var form = _this.data.form;
    form.monitorAlarmValue = e.detail.value;
    _this.setData({
      form: form
    });
  },
  operationalCharacterChange: function(e) {
    const _this = this;
    var form = _this.data.form;
    var oc = _this.data.operationalCharacters[e.detail.value];
    form.operationalCharacter = oc.ocValue;
    form.operationalCharacterName = oc.ocName;
    _this.setData({
      form: form
    });
  },
  selectPushType: function(e) {
    const _this = this;
    var form = _this.data.form;
    form.pushTypes = e.detail.value;
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
      logger.log(err);
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
    equipmentAlarmConfService.saveEquipmentAlarmConf(this.data.form).then(res => {
      wx.showToast({
        title: '保存成功'
      });
      var form = _this.data.form;
      form.monitorAlarmValue = 0;
      form.operationalCharacter = "Gt";
      form.operationalCharacterName = "大于";
      form.pushInterval = 10;
      form.pushTypes = [];
      form.pushPerson1 = "";
      form.pushPerson2 = "";
      form.pushPerson3 = "";
      form.pushPerson4 = "";
      form.pushPerson5 = "";
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