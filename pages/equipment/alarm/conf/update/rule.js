var equipmentAlarmConfService = require('../../../../../service/equipmentAlarmConf.js');
var equipmentService = require('../../../../../service/equipment.js');
var util = require('../../../../../utils/util.js');
const app = getApp()

Page({
  data: {
    monitorItems: [],
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
    conf: {},
    form: {
      confId: '',
      monitorAlarmValue: 0,
      operationalCharacter: '',
      operationalCharacterName: '',
      monitorItemCode: '',
      monitorItemName: '请选择',
      monitorItemUnit: ''
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
      form.operationalCharacter = res.operationalCharacterCode;
      form.operationalCharacterName = res.operationalCharacter;
      form.monitorItemCode = res.monitorTermCode;
      form.monitorItemName = res.monitorTermName;
      form.monitorItemUnit = res.monitorTermUnit;
      form.monitorAlarmValue = res.monitorAlarmValue;
      _this.setData({
        conf: res,
        form: form
      });
      return equipmentService.getEquipmentMonitorItems(res.equipmentId)
    }).then(res => {
      _this.setData({
        monitorItems: res
      });
      wx.hideLoading();
    }).catch(err => {
      wx.hideLoading();
      wx.navigateBack();
    });
  },
  inputMonitorAlarmValue: function (e) {
    const _this = this;
    var form = _this.data.form;
    form.monitorAlarmValue = e.detail.value;
    _this.setData({
      form: form
    });
  },
  monitorItemsChange: function (e) {
    const _this = this;
    var form = _this.data.form;
    var oc = _this.data.monitorItems[e.detail.value];
    form.monitorItemCode = oc.code;
    form.monitorItemName = oc.name;
    form.monitorItemUnit = oc.unit;
    _this.setData({
      form: form
    });
  },
  operationalCharacterChange: function (e) {
    const _this = this;
    var form = _this.data.form;
    var oc = _this.data.operationalCharacters[e.detail.value];
    form.operationalCharacter = oc.ocValue;
    form.operationalCharacterName = oc.ocName;
    _this.setData({
      form: form
    });
  },
  updateRule: function (e) {
    const _this = this;
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
  }

})