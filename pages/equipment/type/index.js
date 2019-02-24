var equipmentService = require('../../../service/equipment.js');
const app = getApp();
const logger = wx.getLogManager({ level: 1 })

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    equipments: [],
    typeName: 'Loading...',
    farmId: '',
    typeId: ''
  },
  onLoad: function(options) {
    const _this = this;
    _this.setData({
      farmId: wx.getStorageSync('curr-farm-id'),
      typeId: options.typeId
    });
    _this.load();
  },
  load: function(callback) {
    const _this = this;
    wx.showLoading({
      title: '加载中...'
    });

    if (_this.data.typeId == 'SP') {
      equipmentService.getEquipmentVideoData(_this.data.farmId).then(res => {
        _this.setData({
          equipments: res.equipments,
          typeName: res.equipmentTypeName
        });
        wx.hideLoading();
        callback && callback();
      }).catch(err => {
        logger.log(err);
        wx.hideLoading();
        callback && callback();
      });
      return;
    }
    equipmentService.getEquipmentTypeData(_this.data.farmId, _this.data.typeId).then(res => {
      _this.setData({
        equipments: res.equipments,
        typeName: res.equipmentTypeName
      });
      wx.hideLoading();
      callback && callback();
    }).catch(err => {
      logger.log(err);
      wx.hideLoading();
      callback && callback();
    });
  },
  toStatistic: function(e) {
    const _this = this;
    var path = "";
    var itemName = "";
    if (_this.data.typeId == '5c20b71a7e29f28d5eaf774c') {
      // 温度
      path = "base";
    } else if (_this.data.typeId == '5c20b71a7e29f28d5eaf774d') {
      // 湿度
      path = "base";
    } else if (_this.data.typeId == '5c2085cb7e29123757fd3fe8') {
      // 氨气
      path = "base";
    }
    if(path) {
      wx.navigateTo({
        url: '/pages/equipment/statistics/' + path + '?equipmentId=' + e.currentTarget.dataset.equipmentId
      });
    } else {
      wx.navigateTo({
        url: '/pages/webview/index?path=https://www.yeetong.cn/equipment/statistics/' + e.currentTarget.dataset.equipmentId
      });
    }
  },
  toVideoLive: function(e) {
    wx.showToast({
      title: '实时视频正在接入，敬请期待...',
      icon: 'none'
    });
  },
  onPullDownRefresh: function() {
    const _this = this;
    _this.load(function() {
      wx.stopPullDownRefresh();
    });
  }
})