var equipmentAlarmConfService = require('../../../../service/equipmentAlarmConf.js');
const app = getApp()

Page({
  data: {
    confId: '',
    conf: {}
  },
  onLoad: function(options) {
    const _this = this;
    _this.setData({
      confId: options.confId
    });
  },
  onShow: function () {
    this.loadDetail();
  },
  loadDetail: function() {
    const _this = this;
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    equipmentAlarmConfService.getEquipmentAlarmConfDetail(_this.data.confId).then(res => {
      _this.setData({
        conf: res
      });
      wx.hideLoading();
    }).catch(err => {
      wx.hideLoading();
      wx.navigateBack();
    });
  },
  switchUseState: function(e) {
    const _this = this;
    wx.showLoading({
      title: '请稍后...',
      mask: true
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
      if (err) {
        if (err.message) {
          util.showErrorToast(err.message);
        }
      }
    });
    // this.setData({
    //   skin: e.detail.value
    // }); 
  },
  toDelete: function () {
    const _this = this;
    wx.showModal({
      title: '提示',
      content: '是否要移除当前告警提醒？',
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '请稍后...',
            mask: true
          });
          equipmentAlarmConfService.deleteEquipmentAlarmConf(_this.data.conf.confId).then(res => {
            wx.hideLoading();
            wx.navigateBack({
              delta: 1
            });
          }).catch(err => {
            wx.hideLoading();
            if (err) {
              if (err.message) {
                util.showErrorToast(err.message);
              }
            }
          });
        }
      }
    });
  },
  updateRule: function () {
    const _this = this;
    wx.navigateTo({
      url: '/pages/equipment/alarm/conf/update/rule?confId=' + _this.data.conf.confId,
    });
  },
  updatePushInterval: function () {
    const _this = this;
    wx.navigateTo({
      url: '/pages/equipment/alarm/conf/update/pushInterval?confId=' + _this.data.conf.confId,
    });
  },
  updatePushType: function () {
    const _this = this;
    wx.navigateTo({
      url: '/pages/equipment/alarm/conf/update/pushType?confId=' + _this.data.conf.confId,
    });
  },
  addPushPerson: function () {
    const _this = this;
    wx.navigateTo({
      url: '/pages/equipment/alarm/conf/update/addPushPerson?confId=' + _this.data.conf.confId,
    });
  },
  rmPushPerson: function (e) {
    const _this = this;
    wx.showModal({
      title: '提示',
      content: '是否要移除当前推送人？',
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '请稍后...',
            mask: true
          });
          equipmentAlarmConfService.delAlarmConfPushPerson(_this.data.conf.confId, e.currentTarget.dataset.userId).then(res => {
            wx.hideLoading();
            _this.loadDetail();
          }).catch(err => {
            wx.hideLoading();
            if (err) {
              if (err.message) {
                util.showErrorToast(err.message);
              }
            }
          });
        }
      }
    });
  }
})