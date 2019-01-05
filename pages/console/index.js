const app = getApp();

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    elements: [
      { title: '操作条', name: 'bar', color: 'purple', icon: 'vipcard' },
      { title: '操作条', name: 'bar', color: 'purple', icon: 'vipcard' },
    ],
  },
  onLoad: function (options) {

  },
  onReady: function () {

  },
  onShow: function () {
  }
})