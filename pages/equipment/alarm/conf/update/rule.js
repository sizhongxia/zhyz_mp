var equipmentAlarmConfService = require('../../../../../service/equipmentAlarmConf.js');
var equipmentService = require('../../../../../service/equipment.js');
var util = require('../../../../../utils/util.js');
const app = getApp()

Page({
  data: {
    monitorItems: [],
    icindex: 0,
    ccindex: 0,
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
      var index = 0;
      for (var indx in _this.data.operationalCharacters) {
        if (_this.data.operationalCharacters[indx].ocValue === form.operationalCharacter) {
          index = indx;
        }
      }
      _this.setData({
        conf: res,
        ccindex: index,
        form: form
      });
      return equipmentService.getEquipmentMonitorItems(res.equipmentId)
    }).then(res => {
      var index = 0;
      for (var indx in res) {
        if (res[indx].code === _this.data.form.monitorItemCode) {
          index = indx;
        }
      }
      _this.setData({
        monitorItems: res,
        icindex: index
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
    equipmentAlarmConfService.updateAlarmConfRule(reqObj.confId, reqObj.monitorItemCode, reqObj.monitorAlarmValue, reqObj.operationalCharacter).then(res => {
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