var poultryService = require('../../../service/poultry.js');
var api = require('../../../config/api.js');
const app = getApp()
const logger = wx.getLogManager({ level: 1 })
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
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
      logger.log(err);
    });
  }
})