var farmService = require('../../../service/farm.js');
var farmPicService = require('../../../service/farmPic.js');
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
const app = getApp()
const logger = wx.getLogManager({ level: 1 })

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    areas: [],
    form: {
      farmId: '',
      farmAreaId: '',
      farmAreaName: '本农场',
      title: '',
      fileList: []
    },
    submiting: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this;
    var farmId = wx.getStorageSync('curr-farm-id');
    farmService.selectFarmAreas(farmId).then(res => {
      var form = _this.data.form;
      form.farmId = farmId;
      res.unshift({
        areaId: '',
        areaName: '本农场'
      });
      _this.setData({
        areas: res,
        form: form
      });
    }).catch(err => {
      logger.log(err);
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
  inputTitle: function (e) {
    const _this = this;
    var form = _this.data.form;
    form.title = e.detail.value;
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
          form.fileList.splice(e.currentTarget.dataset.index, 1);
          _this.setData({
            form: form
          });
        }
      }
    });
  },
  selectPic: function () {
    const _this = this;
    wx.chooseImage({
      count: 9,
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
          uploading = true;
          wx.uploadFile({
            url: api.UploadApi,
            filePath: tempFilePaths[i],
            name: 'file',
            header: {
              type: 'farm'
            },
            success(res) {
              const data = res.data;
              let form = _this.data.form;
              form.fileList.push(JSON.parse(data).data);
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
  toSave: function () {
    const _this = this;
    if (_this.data.submiting) {
      return false;
    }
    _this.setData({
      submiting: true
    });
    farmPicService.saveFarmPic(_this.data.form).then(res => {
      wx.showToast({
        title: '保存成功'
      });
      var form = _this.data.form;
      form.farmAreaId = "";
      form.farmAreaName = "本农场";
      form.fileList = [];
      form.title = "";
      _this.setData({
        submiting: false,
        form: form
      });
    }).catch(err => {
      _this.setData({
        submiting: false
      });
      logger.log(err);
    });
  }
})