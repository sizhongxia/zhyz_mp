var farmPicService = require('../../../service/farmPic.js');
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
const app = getApp()

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    listData: [
      { "name": "鸡", "total": "120", "vacNum": "70", "vacRatio": "34%" },
      { "name": "鸭", "total": "125", "vacNum": "74", "vacRatio": "67%" },
      { "name": "鹅", "total": "119", "vacNum": "76", "vacRatio": "89%" },
      { "name": "猪", "total": "117", "vacNum": "78", "vacRatio": "100%" }
    ],
    tabIndex: 1
  },
  onLoad: function (options) {

  },
  onShow: function () {
    const bardata = [{
      name: "种类数量统计",
      data: [3200, 260, 45, 6],
      color: "rgb(72, 207, 174)"
    }];
    const xLabel = ['鸡', '鸭', '鹅', '猪'];
    const lineChart = this.selectComponent('#bar');
    lineChart.setOptions({
      data: bardata,
      xLabel: xLabel,
      style: 'bar',
      showTooltip: true,
      tooltip: '种类：{a}, 数量：{b}',
      showLabel: false,
      rectStyle: 'accum',
    });

    wx.getSystemInfo({
      success: function (res) {
        lineChart.initChart(res.screenWidth, 213);
      },
      complete: function () {
      }
    });
  },
  tabSelect: function (e) {
    const _this = this;
    if (e.currentTarget.dataset.index == 3) {
      wx.showLoading();
      wx.navigateTo({
        url: '/pages/farm/poultry/register',
        complete: function () {
          wx.hideLoading();
        }
      });
      return;
    }
    _this.setData({
      tabIndex: e.currentTarget.dataset.index
    });
  },
  openCamera: function () {
    wx.showToast({
      title: '打开摄像机'
    })
  },
  toSearch: function () {
    wx.showToast({
      title: '搜索'
    })
  }
})