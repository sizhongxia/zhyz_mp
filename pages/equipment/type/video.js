var equipmentService = require('../../../service/equipment.js');
const app = getApp();

Page({
  data: {
    equipments: [],
    farmId: '',
    typeId: ''
  },
  onLoad: function (options) {
    this.setData({
      farmId: wx.getStorageSync('curr-farm-id'),
      typeId: options.typeId
    });
  },
  onShow: function () {
    this.load();
  },
  load: function (callback) {
    const _this = this;
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    equipmentService.getEquipmentTypeData(_this.data.farmId, _this.data.typeId).then(res => {
      _this.setData({
        equipments: res.equipments
      });
      if (res.equipmentTypeName) {
        wx.setNavigationBarTitle({
          title: res.equipmentTypeName
        })
      }
      wx.hideLoading();
      callback && callback();
    }).catch(err => {
      wx.hideLoading();
      callback && callback();
      if (err) {
        if (err.message) {
          util.showErrorToast(err.message);
        }
      }
    });
  },
  toVideoLive: function (e) {
    wx.navigateTo({
      url: '/pages/livevideo/base?equipmentId=' + e.currentTarget.dataset.equipmentId
    });
  }
  // onPullDownRefresh: function () {
  //   const _this = this;
  //   _this.load(function () {
  //     wx.stopPullDownRefresh();
  //   });
  // }
})