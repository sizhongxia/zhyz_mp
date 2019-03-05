var layeggsService = require('../../../service/layeggs.js');
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
const app = getApp()
const logger = wx.getLogManager({ level: 1 })

Page({
  data: {
    farmId: '',
    page: 1, //当前页
    haveNext: false,
    collectDate: '',
    searchType: 'J',
    layeggses: []
  },
  onLoad: function () {
    var farmId = wx.getStorageSync('curr-farm-id');
    const _this = this;
    _this.setData({
      farmId: farmId
    });
    _this.loadLayeggses();
  },
  onShow: function () {
    const _this = this;
  },
  toSearch: function () {
    const _this = this;
    _this.setData({
      page: 1
    });
    _this.loadLayeggses();
  },
  selectSearchType: function (e) {
    const _this = this;
    var cType = _this.data.searchType;
    if (cType === e.currentTarget.dataset.type) {
      _this.setData({
        page: 1,
        searchType: ''
      });
    } else {
      _this.setData({
        page: 1,
        searchType: e.currentTarget.dataset.type
      });
    }
    _this.loadLayeggses();
  },
  collectDateChange: function (e) {
    const _this = this;
    _this.setData({
      collectDate: e.detail.value
    });
  },
  loadLayeggses: function (aftPage) {
    const _this = this;
    wx.showLoading({
      title: '加载中'
    });
    layeggsService.getLayeggsData(_this.data.farmId, _this.data.collectDate, _this.data.searchType, _this.data.page).then(res => {
      wx.hideLoading();
      if (res.length > 0) {
        _this.setData({
          layeggses: res,
          haveNext: true
        });
      } else {
        if (_this.data.page == 1) {
          _this.setData({
            layeggses: [],
            haveNext: false
          });
          wx.showToast({
            title: '无数据',
            icon: 'none'
          });
        } else {
          _this.setData({
            haveNext: false
          });
          wx.showToast({
            title: '无更多数据',
            icon: 'none'
          })
        }
        if (aftPage) {
          _this.setData({
            page: _this.data.page - 1
          });
        }
      }
    }).catch(err => {
      wx.hideLoading();
      if (err) {
        if (err.message) {
          util.showErrorToast(err.message);
        } else {
          logger.log(err);
        }
      }
    });
  },
  prePage: function () {
    const _this = this;
    _this.setData({
      page: _this.data.page - 1
    });
    _this.loadLayeggses();
  },
  aftPage: function () {
    const _this = this;
    _this.setData({
      page: _this.data.page + 1
    });
    _this.loadLayeggses(true);
  },
  toDetail: function (e) {
    wx.navigateTo({
      url: '/pages/farm/layeggs/detail?layeggsId=' + e.currentTarget.dataset.layeggsId
    });
  },
  toAdd: function (e) {
    wx.navigateTo({
      url: '/pages/farm/layeggs/add'
    });
  }
})