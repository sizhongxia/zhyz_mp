var equipmentService = require('../../../service/equipment.js');
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
const app = getApp()

Page({
  data: {
    tabIndex: 5,
    equipmentId: '',
    equipment: {},
    alarms: [],
    alarm: {},
    alarmResPage: 1,
    alarmModel: false,
    hadAlarmMore: false,
    refreshing: false
  },
  onLoad: function (options) {
    const _this = this;  
    _this.setData({
      equipmentId: options.equipmentId
    })
    _this.getDetail(function() {
      wx.hideLoading();
    });
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
      _this.loadAlarm(callback);
    }).catch(err => {
      if (err) {
        if (err.message) {
          util.showErrorToast(err.message);
        }
      }
    });
  },
  tabSelect: function (e) {
    const _this = this;
    if (e.currentTarget.dataset.index == 2) {
      wx.showLoading({
        title: '请稍后...',
        mask: true
      });
      wx.navigateTo({
        url: '/pages/webview/index?path=https://www.yeetong.cn/mp/equipment/statistics/' + _this.data.equipmentId,
        complete: function () {
          wx.hideLoading();
        }
      });
      return;
    }
    if (e.currentTarget.dataset.index == 4) {
      wx.showLoading({
        title: '请稍后...',
        mask: true
      });
      wx.navigateTo({
        url: '/pages/equipment/alarm/conf/list?equipmentId=' + _this.data.equipmentId,
        complete: function () {
          wx.hideLoading();
        }
      });
      return;
    }
    _this.setData({
      tabIndex: e.currentTarget.dataset.index
    })
  },
  loadMore: function() {
    this.loadAlarm();
  },
  loadAlarm: function (callback) {
    const _this = this;
    _this.setData({
      hadAlarmMore: false
    })
    equipmentService.getEquipmentCollectionAlarmData(_this.data.equipmentId, _this.data.alarmResPage).then(res => {
      var alarms = _this.data.alarms;
      var size = res.length;
      if (_this.data.alarmResPage > 1) {
        for (var i = 0; i < size; i++) {
          alarms.push(res[i]);
        }
      } else {
        alarms = res;
      }
      _this.setData({
        hadAlarmMore: true,
        alarms: alarms,
        alarmResPage: _this.data.alarmResPage + 1
      });
      callback && callback();
    }).catch(err => {
      callback && callback();
      if (err) {
        if (err.message) {
          util.showErrorToast(err.message);
        }
      }
    })
  },
  showAlarmModel: function (e) {
    const _this = this;
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    equipmentService.getEquipmentCollectionAlarmDetail(e.currentTarget.dataset.resId).then(res => {
      _this.setData({
        alarm: res,
        alarmModel: true
      })
      wx.hideLoading();
    }).catch(err => {
      wx.hideLoading();
      if (err) {
        if (err.message) {
          util.showErrorToast(err.message);
        }
      }
    })
  },
  hideAlarmModel: function () {
    this.setData({
      alarmModel: false
    })
  }
  // ,
  // onPullDownRefresh: function () {
  //   const _this = this;
  //   if (_this.data.refreshing) {
  //     return;
  //   }
  //   _this.setData({
  //     alarmResPage: 1,
  //     refreshing: true
  //   });
  //   _this.getDetail(function () {
  //     wx.stopPullDownRefresh();
  //     wx.hideLoading();
  //     _this.setData({
  //       refreshing: false
  //     });
  //   });
  // }
})