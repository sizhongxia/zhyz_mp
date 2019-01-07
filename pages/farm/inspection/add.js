var farmService = require('../../../service/farm.js');
var inspectionService = require('../../../service/inspection.js');
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
const app = getApp()

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    areas: [],
    form: {
      farmId: '',
      farmAreaId: '',
      farmAreaName: '',
      inspectionPoint: '',
      inspectionPosition: '',
      isNormal: '1',
      inspectionDate: '2019-01-01',
      inspectionTime: '08:00',
      operator: '',
      inspectionRemark: '未发现异常',
      inspectionPics: []
    },
    submiting: false
  },
  onLoad: function (options) {
    const _this = this;
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
      console.error(err);
    });
  },
  onReady: function () {
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
    form.inspectionDate = year + seperator1 + month + seperator1 + strDate;
    form.inspectionTime = strHours + seperator2 + strMinutes;
    _this.setData({
      form: form
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
  inspectionDateChange: function (e) {
    const _this = this;
    var form = _this.data.form;
    form.inspectionDate = e.detail.value;
    _this.setData({
      form: form
    });
  },
  inspectionTimeChange: function (e) {
    const _this = this;
    var form = _this.data.form;
    form.inspectionTime = e.detail.value;
    _this.setData({
      form: form
    });
  },
  inputOperator: function (e) {
    const _this = this;
    var form = _this.data.form;
    form.operator = e.detail.value;
    _this.setData({
      form: form
    });
  },
  inputInspectionPosition: function (e) {
    const _this = this;
    var form = _this.data.form;
    form.inspectionPosition = e.detail.value;
    _this.setData({
      form: form
    });
  },
  switchNormalState: function (e) {
    const _this = this;
    var form = _this.data.form;
    form.isNormal = e.detail.value ? 1 : 2;
    if (!e.detail.value && form.inspectionRemark == '未发现异常') {
      form.inspectionRemark = '异常：';
    }
    if (e.detail.value && form.inspectionRemark == '异常：') {
      form.inspectionRemark = '未发现异常';
    }
    _this.setData({
      form: form
    });
  },
  inputInspectionRemark: function (e) {
    const _this = this;
    var form = _this.data.form;
    form.inspectionRemark = e.detail.value;
    _this.setData({
      form: form
    });
  },
  removePic: function (e) {
    const _this = this;
    wx.showModal({
      title: '提示',
      content: '是否要删除这张图片？',
      success(res) {
        if (res.confirm) {
          var form = _this.data.form;
          form.inspectionPics.splice(e.currentTarget.dataset.index, 1);
          _this.setData({
            form: form
          });
        }
      }
    });
  },
  selectInspectionPic: function () {
    const _this = this;
    wx.chooseImage({
      count: 8,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths;
        const size = tempFilePaths.length;
        wx.showLoading({
          title: '正在上传...',
        });
        var uploading = false;
        var sucNum = 0;
        for (var i = 0; i < size; i++) {
          if (_this.data.form.inspectionPics.length + i + 1 > 8) {
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
              type: 'inspection'
            },
            success(res) {
              const data = res.data;
              let form = _this.data.form;
              form.inspectionPics.push(JSON.parse(data).data);
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
  toAdd: function () {
    const _this = this;
    if (_this.data.submiting) {
      return false;
    }
    _this.setData({
      submiting: true
    });
    inspectionService.saveInspection(_this.data.form).then(res => {
      wx.showToast({
        title: '保存成功'
      });
      var form = _this.data.form;
      form.inspectionPoint = "";
      form.inspectionPosition = "";
      form.inspectionPics = [];
      form.inspectionRemark = "";
      form.operator = "";
      form.isNormal = "1";
      _this.setData({
        submiting: false,
        form: form
      });
    }).catch(err => {
      _this.setData({
        submiting: false
      });
      console.error(err);
    });
  }
})