var wxCharts = require('../../static/libs/wxcharts/wxcharts.js');
const app = getApp();

var ringChart = null;
var lineChart = null;
var columnChart = null;

var chartData = {
  main: {
    title: '总成交量',
    data: [15, 20, 45, 37],
    categories: ['2012', '2013', '2014', '2015']
  }
};

Page({
  data: {
    userInfo: {},
    current: 'index',
    // 轮播图
    banner: [{
      id: 1,
      picUrl: 'https://static.yeetong.cn/yeetong/zhyz/mp-banner-default.png-yeetong'
    }],
    channel: [{
      id: 1,
      name: '测试',
      value: '12'
    }, {
      id: 2,
      name: '测试',
      value: '12'
    }, {
      id: 3,
      name: '测试',
      iconUrl: '/static/images/icon_func.png',
      value: '12'
    }]
  },
  createSimulationData: function () {
    var categories = [];
    var data = [];
    for (var i = 0; i < 7; i++) {
      categories.push('2016-' + (i + 1));
      data.push(Math.random() * (20 - 10) + 10);
    }
    return {
      categories: categories,
      data: data
    }
  },
  onLoad: function () {
    const _this = this;
    _this.setData({
      userInfo: app.globalData.userInfo
    });
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    ringChart = new wxCharts({
      animation: true,
      canvasId: 'ringCanvas',
      type: 'ring',
      extra: {
        ringWidth: 18,
        pie: {
          offsetAngle: -45
        }
      },
      subtitle: {
        name: '性别比例',
        color: '#666666',
        fontSize: 12
      },
      series: [{
        name: '公鸡',
        data: 15,
        stroke: true
      }, {
        name: '母鸡',
        data: 35,
        stroke: true
      }],
      width: windowWidth,
      height: 260,
      dataLabel: true,
      legend: true
    });
    ringChart.addEventListener('renderComplete', () => {
      console.log('renderComplete');
    });

    var simulationData = _this.createSimulationData();
    lineChart = new wxCharts({
      canvasId: 'lineCanvas',
      type: 'line',
      animation: true,
      categories: simulationData.categories,
      series: [{
        name: '产蛋',
        data: simulationData.data,
        format: function (val, name) {
          return val.toFixed(0);
        }
      }],
      xAxis: {
        disableGrid: true
      },
      yAxis: {
        title: '产蛋 (个)',
        format: function (val) {
          return val.toFixed(0);
        },
        min: 0
      },
      width: windowWidth,
      height: 260,
      dataLabel: true,
      dataPointShape: true,
      extra: {
        lineStyle: 'curve'
      }
    });

    columnChart = new wxCharts({
      canvasId: 'columnCanvas',
      type: 'column',
      animation: true,
      categories: chartData.main.categories,
      series: [{
        name: '产蛋',
        data: chartData.main.data
      }],
      yAxis: {
        format: function (val) {
          return val;
        },
        title: '产蛋',
        min: 0
      },
      xAxis: {
        disableGrid: false,
        type: 'calibration'
      },
      extra: {
        column: {
          width: 15
        }
      },
      width: windowWidth,
      height: 260,
    });
  },
  touchHandler: function (e) {
    console.log(ringChart.getCurrentDataIndex(e));
  },
  onShow: function () {
  },
  handleChange({ detail }) {
    if (detail.key === this.data.current) {
      return false;
    }
    wx.showLoading({
      title: '加载中...'
    });
    wx.redirectTo({
      url: '/pages/' + detail.key + '/index',
      complete: () => {
        wx.hideLoading();
      }
    });
  }
})
