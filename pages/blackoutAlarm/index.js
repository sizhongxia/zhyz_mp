var equipmentService = require('../../service/equipment.js');
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
const app = getApp()

Page({
  data: {
    currentFarmIdentity: '',
    tabIndex: 5,
    equipmentId: '',
    equipment: {
      status: '00'
    }
  },
  onLoad: function(options) {
    this.setData({
      equipmentId: options.equipmentId,
      currentFarmIdentity: wx.getStorageSync('curr-farm-identity')
    });
  },
  onShow: function (options) {
    this.getDetail()
  },
  getDetail: function (callback) {
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
      callback && callback()
    }).catch(err => {
      wx.hideLoading();
      callback && callback()
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
    this.getDetail(wx.stopPullDownRefresh);
  }
})