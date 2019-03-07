var poultryService = require('../../../service/poultry.js');
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
const app = getApp()
Page({
  data: {
    poultryId: '',
    poultryQrcodeBaseUrl: api.PoultryQrcode,
    poultry: {}
  },
  onLoad: function (options) {
    this.setData({
      poultryId: options.poultryId
    });
  },
  onShow: function() {
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    const _this = this;
    poultryService.getPoultryDetail(_this.data.poultryId).then(res => {
      _this.setData({
        poultry: res
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
  }
})