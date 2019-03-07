var farmService = require('../../../service/farm.js');
var layeggsService = require('../../../service/layeggs.js');
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
const app = getApp()

Page({
  data: {
    areas: [],
    eggTypes: [{
      value: 'J',
      name: '鸡'
    }, {
      value: 'Y',
      name: '鸭'
    }, {
      value: 'E',
      name: '鹅'
    }],
    eggColors: [{
      name: '粉色'
    }, {
      name: '绿色'
    }, {
      name: '青色'
    }, {
      name: '白色'
    }, {
      name: '棕褐色'
    }, {
      name: '其他'
    }],
    form: {
      farmId: '',
      farmAreaId: '',
      farmAreaName: '',
      eggColor: '粉色',
      eggType: 'J',
      eggTypeName: '鸡',
      eggNum: '',
      collectUser: '',
      collectDate: '2019-01-01',
      collectTime: '08:00',
      remark: '',
      layeggsPics: []
    },
    submiting: false
  },
  onLoad: function(options) {
    const _this = this;
    var farmId = wx.getStorageSync('curr-farm-id');
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
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
      wx.hideLoading();
    }).catch(err => {
      wx.hideLoading();
      if (err) {
        if (err.message) {
          util.showErrorToast(err.message);
        }
      }
    });
  },
  onReady: function() {
    const _this = this;
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var strHours = date.getHours();
    var strMinutes = date.getMinutes();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    if (strHours >= 0 && strHours <= 9) {
      strHours = "0" + strHours;
    }
    if (strMinutes >= 0 && strMinutes <= 9) {
      strMinutes = "0" + strMinutes;
    }
    var form = _this.data.form;
    form.collectDate = year + seperator1 + month + seperator1 + strDate;
    form.collectTime = strHours + seperator2 + strMinutes;
    _this.setData({
      form: form
    });
  },
  areaPickerChange: function(e) {
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
  collectDateChange: function(e) {
    const _this = this;
    var form = _this.data.form;
    form.collectDate = e.detail.value;
    _this.setData({
      form: form
    });
  },
  collectTimeChange: function(e) {
    const _this = this;
    var form = _this.data.form;
    form.collectTime = e.detail.value;
    _this.setData({
      form: form
    });
  },
  eggTypePickerChange: function (e) {
    const _this = this;
    if (e.detail.value > -1) {
      var form = _this.data.form;
      var eggType = _this.data.eggTypes[e.detail.value];
      form.eggTypeName = eggType.name;
      form.eggType = eggType.value;
      _this.setData({
        form: form
      });
    }
  },
  eggColorPickerChange: function (e) {
    const _this = this;
    if (e.detail.value > -1) {
      var form = _this.data.form;
      var eggColor = _this.data.eggColors[e.detail.value];
      form.eggColor = eggColor.name;
      _this.setData({
        form: form
      });
    }
  },
  inputEggNum: function (e) {
    const _this = this;
    var form = _this.data.form;
    form.eggNum = e.detail.value;
    _this.setData({
      form: form
    });
  },
  inputCollectUser: function(e) {
    const _this = this;
    var form = _this.data.form;
    form.collectUser = e.detail.value;
    _this.setData({
      form: form
    });
  },
  inputRemark: function(e) {
    const _this = this;
    var form = _this.data.form;
    form.remark = e.detail.value;
    _this.setData({
      form: form
    });
  },
  removePic: function(e) {
    const _this = this;
    wx.showModal({
      title: '提示',
      content: '是否要删除这张图片？',
      success(res) {
        if (res.confirm) {
          var form = _this.data.form;
          form.layeggsPics.splice(e.currentTarget.dataset.index, 1);
          _this.setData({
            form: form
          });
        }
      }
    });
  },
  selectLayeggsPic: function() {
    const _this = this;
    wx.chooseImage({
      count: 8,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths;
        const size = tempFilePaths.length;
        wx.showLoading({
          title: '请稍后...',
          mask: true
        });
        var uploading = false;
        var sucNum = 0;
        for (var i = 0; i < size; i++) {
          if (_this.data.form.layeggsPics.length + i + 1 > 8) {
            if (++sucNum == size && !uploading) {
              wx.hideLoading();
            }
            continue;
          }
          uploading = true;
          wx.uploadFile({
            url: api.UploadApi,
            filePath: tempFilePaths[i],
            name: 'file',
            header: {
              type: 'layeggs'
            },
            success(res) {
              const data = res.data;
              let form = _this.data.form;
              form.layeggsPics.push(JSON.parse(data).data);
              _this.setData({
                form: form
              });
            },
            complete() {
              if (++sucNum == size) {
                wx.hideLoading();
              }
            }
          });
        }
      }
    });
  },
  toAdd: function() {
    const _this = this;
    if (_this.data.submiting) {
      return false;
    }
    _this.setData({
      submiting: true
    });
    layeggsService.saveLayeggs(_this.data.form).then(res => {
      wx.showToast({
        title: '保存成功'
      });
      var form = _this.data.form;
      form.eggColor = "粉色";
      form.eggType = "J";
      form.eggTypeName = "鸡";
      form.eggNum = "";
      form.collectUser = "";
      form.layeggsPics = [];
      form.remark = "";
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