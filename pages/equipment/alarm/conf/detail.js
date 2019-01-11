var equipmentAlarmConfService = require('../../../../service/equipmentAlarmConf.js');
const app = getApp()

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    conf: {}
  },
  onLoad: function(options) {
    const _this = this;
    wx.showLoading({
      title: '加载中...'
    });
    equipmentAlarmConfService.getEquipmentAlarmConfDetail(options.confId).then(res => {
      _this.setData({
        conf: res
      });
      wx.hideLoading();
    }).catch(err => {
      wx.hideLoading();
      console.error(err);
    });
  },
  switchUseState: function(e) {
    const _this = this;
    wx.showLoading({
      title: '正在切换状态...'
    });
    var conf = _this.data.conf;
    equipmentAlarmConfService.changeEquipmentAlarmConfUseState(_this.data.conf.confId, e.detail.value?1:0).then(res => {
      conf.useState = e.detail.value;
      _this.setData({
        conf: conf
      });
      wx.hideLoading();
    }).catch(err => {
      conf.useState = !e.detail.value;
      _this.setData({
        conf: conf
      });
      wx.hideLoading();
      console.error(err);
    });
    // this.setData({
    //   skin: e.detail.value
    // }); 
  },
  toDelete: function () {
    const _this = this;
    wx.showModal({
      title: '提示',
      content: '删除后将无法恢复！是否要删除？',
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '正在删除...'
          });
          equipmentAlarmConfService.deleteEquipmentAlarmConf(_this.data.conf.confId).then(res => {
            wx.hideLoading();
            wx.navigateBack({
              delta: 1
            });
          }).catch(err => {
            wx.hideLoading();
            console.error(err);
          });
        }
      }
    });
  }
})