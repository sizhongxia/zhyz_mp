var equipmentService = require('../../service/equipment.js');
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
const app = getApp()

Page({
  data: {
    tabIndex: 5,
    equipmentId: '',
    equipment: {}
  },
  onLoad: function(options) {
    this.setData({
      equipmentId: options.equipmentId
    });
  },
  onShow: function (options) {
    this.getDetail()
  },
  getDetail: function () {
    const _this = this;
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    equipmentService.getEquipmentDetail(_this.data.equipmentId).then(res => {
      _this.setData({
        equipment: res
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
  tabSelect: function (e) {
    const _this = this;
    _this.setData({
      tabIndex: e.currentTarget.dataset.index
    })
  },
  onPullDownRefresh: function () {
    this.load(wx.stopPullDownRefresh);
  }
})