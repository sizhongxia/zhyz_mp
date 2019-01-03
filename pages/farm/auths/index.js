var farmService = require('../../../service/farm.js');
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
const app = getApp()

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    selectState: 'Y'
  },
  onLoad: function (options) {

  },
  onReady: function () {

  },
  tabSelect: function (e) {
    this.setData({
      selectState: e.currentTarget.dataset.id
    });
  }
})