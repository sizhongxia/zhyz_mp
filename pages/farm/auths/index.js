var farmService = require('../../../service/farm.js');
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
const app = getApp()

Page({
  data: {
    selectState: 'Y',
    farms: [],
    showAuthFarmDetail: false,
    farm: {}
  },
  onLoad: function (options) {
    this.loadData('Y');
  },
  tabSelect: function (e) {
    this.loadData(e.currentTarget.dataset.id);
  },
  loadData: function (state) {
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    farmService.authFarms(state).then(res => {
      this.setData({
        farms: res,
        selectState: state
      });
      wx.hideLoading();
    }).catch(err => {
      wx.hideLoading();
      if (err) {
        if (err.message) {
          util.showErrorToast(err.message);
        }
      }
    });
  },
  itemSelect: function (e) {
    var selectId = e.currentTarget.dataset.id;
    var farms = this.data.farms;
    var len = farms.length;
    for (var i = 0; i < len; ++i) {
      if (farms[i].resId == selectId) {
        this.setData({
          farm: farms[i],
          showAuthFarmDetail: true
        });
        break;
      }
    }
  },
  hideModal: function () {
    this.setData({
      farm: {},
      showAuthFarmDetail: false
    });
  },
  goIn: function () {
    wx.setStorageSync('curr-farm-id', this.data.farm.farmId);
    wx.setStorageSync('curr-farm-identity', this.data.farm.farmIdentity);
    this.setData({
      farm: {},
      showAuthFarmDetail: false
    });
    wx.reLaunch({
      url: '/pages/index/index'
    });
    // wx.switchTab({
    //   url: '/pages/index/index'
    // });
  }
})