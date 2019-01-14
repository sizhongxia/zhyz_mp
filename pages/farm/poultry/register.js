var poultryVarietyService = require('../../../service/poultryVariety.js');
var poultryService = require('../../../service/poultry.js');
var farmService = require('../../../service/farm.js');
const app = getApp()
const logger = wx.getLogManager({ level: 1 })
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
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
    areas: [],
    form: {
      farmId: '',
      farmAreaId: '',
      farmAreaName: '',
      kindId: '5c1cab687e29fcb927859601',
      kindName: '鸡',
      varietyId: '',
      varietyName: '',
      poultryGender: 'F',
      poultryGenderName: '雌/母',
      hadVaccination: '0',
      hadVaccinationTxt: '未接种',
      status: '1',
      statusTxt: '正常',
      batchNo: '',
      bornAt: '',
      number: 1
    },
    varieties: [],
    poultryGenders: [{
      value: 'F',
      name: '雌/母'
    }, {
      value: 'M',
      name: '雄/公'
    }],
    vaccinations: [{
      value: '0',
      name: '未接种'
    }, {
      value: '1',
      name: '已接种'
    }],
    statuss: [{
      value: '1',
      name: '正常'
    }, {
      value: '2',
      name: '已售卖'
    }, {
      value: '3',
      name: '生病中'
    }, {
      value: '4',
      name: '已死亡'
    }],
    submiting: false
  },
  onReady: function() {
    const _this = this;
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var form = _this.data.form;
    form.bornAt = year + seperator1 + month + seperator1 + strDate;
    _this.setData({
      form: form
    });
  },
  onLoad: function(options) {
    const _this = this;
    _this.loadPoultryVarietyData();
    var farmId = wx.getStorageSync('curr-farm-id');
    farmService.selectFarmAreas(farmId).then(res => {
      var form = _this.data.form;
      form.farmId = farmId;
      if (res.length > 0) {
        var area = res[0];
        form.farmAreaId = area.areaId;
        form.farmAreaName = area.areaName;
      }
      _this.setData({
        areas: res,
        form: form
      });
    }).catch(err => {
      logger.log(err);
    });
  },
  loadPoultryVarietyData: function() {
    const _this = this;
    wx.showLoading({
      title: '加载中...'
    });
    poultryVarietyService.getPoultryVarietyData(_this.data.form.kindId).then(res => {
      _this.setData({
        varieties: res
      });
      wx.hideLoading();
    }).catch(err => {
      _this.setData({
        varieties: []
      });
      wx.hideLoading();
      console.info(err);
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
  kindPickerChange: function(e) {
    const _this = this;
    if (e.detail.value > -1) {
      var form = _this.data.form;
      var kind = _this.data.kinds[e.detail.value];
      form.kindId = kind.id;
      form.kindName = kind.name;
      form.varietyId = '';
      form.varietyName = '';
      _this.setData({
        form: form
      });
      _this.loadPoultryVarietyData();
    }
  },
  poultryGenderPickerChange: function(e) {
    const _this = this;
    if (e.detail.value > -1) {
      var form = _this.data.form;
      var poultryGender = _this.data.poultryGenders[e.detail.value];
      form.poultryGender = poultryGender.value;
      form.poultryGenderName = poultryGender.name;
      _this.setData({
        form: form
      });
    }
  },
  vaccinationPickerChange: function(e) {
    const _this = this;
    if (e.detail.value > -1) {
      var form = _this.data.form;
      var vaccination = _this.data.vaccinations[e.detail.value];
      form.hadVaccination = vaccination.value;
      form.hadVaccinationTxt = vaccination.name;
      _this.setData({
        form: form
      });
    }
  },
  statusPickerChange: function(e) {
    const _this = this;
    if (e.detail.value > -1) {
      var form = _this.data.form;
      var status = _this.data.statuss[e.detail.value];
      form.status = status.value;
      form.statusTxt = status.name;
      _this.setData({
        form: form
      });
    }
  },
  varietyPickerChange: function(e) {
    const _this = this;
    if (e.detail.value > -1) {
      var variety = _this.data.varieties[e.detail.value];
      if (!variety) {
        return;
      }
      var form = _this.data.form;
      form.varietyId = variety.varietyId;
      form.varietyName = variety.varietyName;
      _this.setData({
        form: form
      });
    }
  },
  inputBatchNo: function(e) {
    const _this = this;
    var form = _this.data.form;
    form.batchNo = e.detail.value;
    _this.setData({
      form: form
    });
  },
  bornAtDateChange: function(e) {
    const _this = this;
    var form = _this.data.form;
    form.bornAt = e.detail.value;
    _this.setData({
      form: form
    });
  },
  inputNumber: function(e) {
    const _this = this;
    var form = _this.data.form;
    form.number = e.detail.value;
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
      title: '正在保存',
      mask: true
    })
    poultryService.savePoultry(_this.data.form).then(res => {
      wx.hideLoading();
      wx.showToast({
        title: '保存成功'
      });
      var form = _this.data.form;
      form.kindId = '5c1cab687e29fcb927859601';
      form.kindName = '鸡';
      form.varietyId = "";
      form.varietyName = "";
      form.poultryGender = "F";
      form.poultryGenderName = "雌/母";
      form.hadVaccination = "0";
      form.hadVaccinationTxt = "未接种";
      form.status = "1";
      form.statusTxt = "正常";
      form.batchNo = "";
      form.number = 1;
      _this.setData({
        submiting: false,
        form: form
      });
    }).catch(err => {
      wx.hideLoading();
      _this.setData({
        submiting: false
      });
      logger.log(err);
    });
  }
})