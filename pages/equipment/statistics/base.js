// https://github.com/chmini-app/CHCharts-wechat
const data =//[0.0001, 0.00032, 0.00046,0.0005, 0.00066,0.0007, 0.00012, -0.0046, -0.00065, -0.0032,]
  [
  {
    name: '线图2',
    data: [-1, -32, -46.5, -66.7, -12, 46, 65, 32, -3, -55, -100, 3, -1, -32, -46.5, -66.7, -12, 46, 65, 32, -3, -55, -100, 3],
    color: 'rgb(182,213,93)',
  }];
const xLabel = ['00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '00:00', '00:30', 
  '00:00', '00:30', '00:00', '00:30', '00:00', '00:30', 
  '00:00', '00:30', '00:00', '00:30', '00:00', '00:30', 
  '00:00', '00:30', '00:00', '00:30', '00:00', '00:30', 
  '00:00', '00:30', '00:00', '00:30', '00:00', '00:30', 
  '00:00', '00:30', '00:00', '00:30', '00:00', '00:30', 
  '00:00', '00:30', '00:00', '00:30', '00:00', '00:30', 
  '00:00', '00:30', '23:30'];
const options = {
  data: data,
  xLabel: xLabel,
  style: 'line',
  lineStyle: 'curve',
  area: true,
  showTooltip: true,
  tooltip: '{a}：{b}',
  showLabel: false,
};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dpr: wx.getSystemInfoSync().windowWidth / 750,
  },
  onLoad: function (options) {

  },
  onReady: function () {

  },
  onShow: function () {
    this.lineChart = this.selectComponent('#line');
    this.lineChart.setOptions(options);
    this.lineChart.initChart(320, 213);
  }
})