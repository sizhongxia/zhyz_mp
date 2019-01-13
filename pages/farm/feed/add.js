var farmService = require('../../../service/farm.js');
var feedService = require('../../../service/feed.js');
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
const app = getApp()

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    areas: [],
    feedTags: [],
    form: {
      farmId: '',
      farmAreaId: '',
      farmAreaName: '',
      feedPosition: '',
      feedDate: '2019-01-01',
      feedTime: '08:00',
      feedRaiser: '',
      feedRemark: '',
      feedPics: []
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
      LogManager.log(err);
    });
    feedService.selectFeedTags().then(res => {
      _this.setData({
        feedTags: res
      });
    }).catch(err => {
      LogManager.log(err);
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
    form.feedDate = year + seperator1 + month + seperator1 + strDate;
    form.feedTime = strHours + seperator2 + strMinutes;
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
  feedDateChange: function (e) {
    const _this = this;
    var form = _this.data.form;
    form.feedDate = e.detail.value;
    _this.setData({
      form: form
    });
  },
  feedTimeChange: function (e) {
    const _this = this;
    var form = _this.data.form;
    form.feedTime = e.detail.value;
    _this.setData({
      form: form
    });
  },
  inputFeedRaiser: function (e) {
    const _this = this;
    var form = _this.data.form;
    form.feedRaiser = e.detail.value;
    _this.setData({
      form: form
    });
  },
  inputFeedPosition: function (e) {
    const _this = this;
    var form = _this.data.form;
    form.feedPosition = e.detail.value;
    _this.setData({
      form: form
    });
  },
  inputFeedRemark: function (e) {
    const _this = this;
    var form = _this.data.form;
    form.feedRemark = e.detail.value;
    _this.setData({
      form: form
    });
  },
  selectFeedTag: function (e) {
    const _this = this;
    var form = _this.data.form;
    form.feedRemark = e.target.dataset.content;
    _this.setData({
      form: form
    });
    feedService.changeFeedTagSortNum(e.target.dataset.tagId);
  },
  removePic: function (e) {
    const _this = this;
    wx.showModal({
      title: '提示',
      content: '是否要删除这张图片？',
      success(res) {
        if (res.confirm) {
          var form = _this.data.form;
          form.feedPics.splice(e.currentTarget.dataset.index, 1);
          _this.setData({
            form: form
          });
        }
      }
    });
  },
  selectFeedPic: function () {
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
          if (_this.data.form.feedPics.length + i + 1 > 8) {
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
              type: 'feed'
            },
            success(res) {
              const data = res.data;
              let form = _this.data.form;
              form.feedPics.push(JSON.parse(data).data);
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
    feedService.saveFeed(_this.data.form).then(res => {
      wx.showToast({
        title: '保存成功'
      });
      var form = _this.data.form;
      form.feedPosition = "";
      form.feedRaiser = "";
      form.feedPics = [];
      form.feedRemark = "";
      _this.setData({
        submiting: false,
        form: form
      });
    }).catch(err => {
      _this.setData({
        submiting: false
      });
      LogManager.log(err);
    });
  }
})