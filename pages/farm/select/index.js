var farmService = require('../../../service/farm.js');
var util = require('../../../utils/util.js');
const app = getApp()
const logger = wx.getLogManager({ level: 1 })

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    barTitle: '选择农场',
    authFarms: [],
    farm: {},
    loading: false,
    applyModalVisible: false
  },
  onLoad: function (options) {
    const _this = this;
    _this.getAuths();
  },
  getAuths: function(){
    const _this = this;
    _this.setData({
      loading: true
    });
    wx.showLoading({
      title: '加载中...'
    });
    farmService.authFarms('Y').then(res => {
      wx.hideLoading();
      _this.setData({
        loading: false
      });
      if (res.length === 0) {
        _this.setData({
          barTitle: '扫码申请'
        });
        return false;
      }
      _this.setData({
        authFarms: res
      });
      if (res.length === 1) {
        wx.setStorageSync('curr-farm-id', res[0].farmId);
        wx.setStorageSync('curr-farm-identity', res[0].farmIdentity);
        wx.switchTab({
          url: '/pages/index/index'
        });
        return false;
      }
      var farmId = wx.getStorageSync('curr-farm-id');
      var farmIdentity = wx.getStorageSync('curr-farm-identity');
      if (farmId && farmIdentity) {
        let size = res.length;
        for (var i = 0; i < size; ++i) {
          if (farmId === res[i].farmId && farmIdentity === res[i].farmIdentity) {
            wx.switchTab({
              url: '/pages/index/index'
            });
            return false;
          }
        }
        wx.removeStorageSync('curr-farm-id');
        wx.removeStorageSync('curr-farm-identity');
      }
    }).catch(err => {
      _this.setData({
        loading: false
      });
      logger.log(err);
    });
  },
  toDetail: function(e) {
    wx.setStorageSync('curr-farm-id', e.currentTarget.dataset.farmId);
    wx.setStorageSync('curr-farm-identity', e.currentTarget.dataset.farmIdentity);
    wx.switchTab({
      url: '/pages/index/index'
    });
  },
  scanFarmCode: function() {
    const _this = this;
    wx.scanCode({
      onlyFromCamera: false,
      scanType: ['qrCode'],
      success(res) {
        var qrVal = res.result.replace(new RegExp('"', "g"), "");
        if (qrVal.indexOf('https://farm.yeetong.cn/') === 0) {
          farmService.farmDetail(qrVal.substr(24)).then(res => {
            _this.setData({
              farm: res,
              applyModalVisible: true
            });
          }).catch(err => {
            logger.log(err);
          });
        } else {
          util.showErrorToast('无效的二维码');
        }
      },
      fail(err) {
        util.showErrorToast('无效的二维码');
      }
    });
  },
  toApply: function () {
    const _this = this;
    _this.toClose();
    farmService.applyFarmVisit(_this.data.farm.farmId).then(res => {
      if(res === 'SUC') {
        wx.showModal({
          title: '申请成功',
          content: '请耐心等待农场管理员审核',
        });
      } else if (res === 'D') {
        util.showErrorToast('请耐心等待农场管理员审核')
      } else if(res === 'Y') {
        wx.setStorageSync('curr-farm-id', _this.data.farm.farmId);
        wx.setStorageSync('curr-farm-identity', 'visitor');
        wx.switchTab({
          url: '/pages/index/index'
        });
      }
    }).catch(err => {
      logger.log(err);
    });
  },
  toClose: function() {
    this.setData({
      applyModalVisible: false
    });
  }
})