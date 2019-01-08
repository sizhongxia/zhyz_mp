var equipmentService = require('../../../service/equipment.js');
const app = getApp();

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    equipmentId: '',
    itemName: '',
    date: '',
    maxDate: '',
    tabIndex: '1',
    alarms: []
  },
  onLoad: function(options) {
    const _this = this;
    _this.setData({
      equipmentId: options.equipmentId
    });
  },
  onReady: function () {
    this.load();
  },
  load: function() {
    const _this = this;
    wx.showLoading({
      title: '加载中...'
    });
    equipmentService.getEquipmentCollectionHisData(_this.data.equipmentId, _this.data.date).then(res => {
      _this.setData({
        itemName: res.equipmentTypeName,
        date: res.date,
        maxDate: res.maxDate
      });
      // https://github.com/chmini-app/CHCharts-wechat
      _this.lineChart = this.selectComponent('#line');
      _this.lineChart.setOptions({
        data: [{
          name: res.equipmentTypeName + '值',
          data: res.values,
          color: '#0081ff'
        }],
        xLabel: res.labels,
        style: 'line',
        lineStyle: 'curve',
        area: true,
        showTooltip: true,
        tooltip: '时间:{a}, ' + res.equipmentTypeName + '值:{b} ' + res.unit,
        showLabel: false,
      });
      wx.getSystemInfo({
        success: function(res) {
          _this.lineChart.initChart(res.screenWidth, 320);
        },
        complete: function () {
          _this.loadAlarm(function() {
            wx.hideLoading();
          });
        }
      });
    }).catch(err => {
      console.error(err);
      wx.hideLoading();
    })
  },
  loadAlarm: function (callback) {
    const _this = this;
    equipmentService.getEquipmentCollectionAlarmData(_this.data.equipmentId, _this.data.date).then(res => {
      _this.setData({
        alarms: res
      });
      callback && callback()
    }).catch(err => {
      console.error(err);
      callback && callback()
    })
  },
  dateChange: function (e) {
    const _this = this;
    _this.setData({
      date: e.detail.value
    });
    _this.load();
  },
  tabSelect: function (e) {
    const _this = this;
    _this.setData({
      tabIndex: e.currentTarget.dataset.index
    });
  }
})