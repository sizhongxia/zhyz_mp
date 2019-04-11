var poultryService = require('../../../service/poultry.js');
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
const app = getApp()

Page({
  data: {
    tabIndex: 2,
    farmId: '',
    searchType: '',
    searchPoultryCode: '',
    batchNo: '',
    page: 1, //当前页
    haveNext: false,
    poultries: []
  },
  onLoad: function() {
    var farmId = wx.getStorageSync('curr-farm-id');
    const _this = this;
    _this.setData({
      farmId: farmId
    });
    _this.loadPoultries();
  },
  onShow: function() {
    const _this = this;
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    poultryService.getPoultryTypeNums(_this.data.farmId).then(res => {
      _this.setData({
        listData: res.list
      });
      const bardata = [{
        name: "种类数量统计",
        data: res.values,
        color: "rgb(72, 207, 174)"
      }];
      const xLabel = res.labels;
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
        success: function(res) {
          lineChart.initChart(res.screenWidth, 213);
        },
        complete: function() {
          wx.hideLoading();
        }
      });
    }).catch(err => {
      wx.hideLoading();
      if (err) {
        if (err.message) {
          util.showErrorToast(err.message);
        }
      }
    });
  },
  tabSelect: function(e) {
    const _this = this;
    if (e.currentTarget.dataset.index == 3) {
      wx.showLoading({
        title: '请稍后...',
        mask: true
      });
      wx.navigateTo({
        url: '/pages/farm/poultry/register',
        complete: function() {
          wx.hideLoading();
        }
      });
      return;
    }
    _this.setData({
      tabIndex: e.currentTarget.dataset.index
    });
  },
  openCamera: function() {
    const _this = this;
    wx.scanCode({
      onlyFromCamera: true,
      scanType: ['qrCode'],
      success(res) {
        var qrVal = res.result.replace(new RegExp('"', "g"), "");
        var poultryQrPrefix = 'https://www.yeetong.cn/Qr/poultry/';
        if (qrVal.indexOf(poultryQrPrefix) === 0) {
          _this.setData({
            searchPoultryCode: qrVal.substr(poultryQrPrefix.length)
          });
          _this.loadPoultries();
        } else {
          util.showErrorToast('无效的二维码');
        }
      },
      fail(err) {
        util.showErrorToast('无效的二维码');
      }
    });
  },
  inputSearchPoultryCode: function(e) {
    const _this = this;
    _this.setData({
      searchPoultryCode: e.detail.value
    });
  },
  inputBatchNo: function (e) {
    const _this = this;
    _this.setData({
      batchNo: e.detail.value
    });
  },
  toSearch: function() {
    const _this = this;
    _this.setData({
      page: 1
    });
    _this.loadPoultries();
  },
  selectSearchType: function(e) {
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
    _this.loadPoultries();
  },
  loadPoultries: function(aftPage) {
    const _this = this;
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    poultryService.getPoultryData(_this.data.farmId, _this.data.searchPoultryCode, _this.data.batchNo, _this.data.searchType, _this.data.page).then(res => {
      wx.hideLoading();
      if (res.length > 0) {
        _this.setData({
          poultries: res,
          haveNext: true
        });
      } else {
        if (_this.data.page == 1) {
          _this.setData({
            poultries: [],
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
        }
      }
    });
  },
  prePage: function() {
    const _this = this;
    _this.setData({
      page: _this.data.page - 1
    });
    _this.loadPoultries();
  },
  aftPage: function() {
    const _this = this;
    _this.setData({
      page: _this.data.page + 1
    });
    _this.loadPoultries(true);
  },
  toDetail: function (e) {
    wx.navigateTo({
      url: '/pages/farm/poultry/detail?poultryId=' + e.currentTarget.dataset.poultryId
    });
  }
})