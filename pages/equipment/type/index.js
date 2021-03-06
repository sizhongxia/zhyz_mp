var equipmentService = require('../../../service/equipment.js');
var util = require('../../../utils/util.js');
const app = getApp();

Page({
  data: {
    equipments: [],
    farmId: '',
    typeId: ''
  },
  onLoad: function(options) {
    this.setData({
      farmId: wx.getStorageSync('curr-farm-id'),
      typeId: options.typeId
    });
  },
  onShow: function (options) {
    this.load(false);
  },
  load: function(callback) {
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
  toStatistic: function(e) {
    // wx.navigateTo({
    //   url: '/pages/webview/index?path=https://www.yeetong.cn/mp/equipment/statistics/' + e.currentTarget.dataset.equipmentId
    // });
    if (this.data.typeId === '5c2085cb7e29123757fd3fed') {
      wx.navigateTo({
        url: '/pages/blackoutAlarm/index?equipmentId=' + e.currentTarget.dataset.equipmentId
      });
      return;
    }
    wx.navigateTo({
      url: '/pages/equipment/type/detail?equipmentId=' + e.currentTarget.dataset.equipmentId
    });
  },
  onPullDownRefresh: function () {
    this.load(wx.stopPullDownRefresh);
  }
})