var poultryVarietyService = require('../../../service/poultryVariety.js');
const app = getApp()
const logger = wx.getLogManager({ level: 1 })

Page({
  data: {
    form: {},
    submiting: false
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    const _this = this;
    poultryVarietyService.getPoultryVarietyDetail(options.varietyId).then(res => {
      _this.setData({
        form: res
      });
      wx.hideLoading();
    }).catch(err => {
      wx.hideLoading();
      logger.log(err);
    });
  },
  inputVarietyName: function(e) {
    const _this = this;
    var form = _this.data.form;
    form.varietyName = e.detail.value;
    _this.setData({
      form: form
    });
  },
  toUpdate: function() {
    const _this = this;
    if (_this.data.submiting) {
      return false;
    }
    _this.setData({
      submiting: true
    });
    poultryVarietyService.updatePoultryVariety(_this.data.form).then(res => {
      wx.showToast({
        title: '修改成功'
      });
      _this.setData({
        submiting: false
      });
    }).catch(err => {
      _this.setData({
        submiting: false
      });
      logger.log(err);
    });
  },
  toDelete: function() {
    const _this = this;
    wx.showModal({
      title: '提示',
      content: '删除后将无法找回！是否要删除？',
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '请稍后...',
            mask: true
          });
          poultryVarietyService.deletePoultryVariety(_this.data.form.varietyId).then(res => {
            wx.hideLoading();
            wx.navigateBack({
              delta: 1
            });
          }).catch(err => {
            wx.hideLoading();
            logger.log(err);
          });
        }
      }
    });
  }
})