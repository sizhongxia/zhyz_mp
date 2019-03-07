var farmService = require('../../../service/farm.js');
var util = require('../../../utils/util.js');
const app = getApp()

Page({
  data: {
    farm: {},
    applyModalVisible: false
  },
  scanFarmCode: function () {
    const _this = this;
    wx.scanCode({
      onlyFromCamera: false,
      scanType: ['qrCode'],
      success(res) {
        var qrVal = res.result.replace(new RegExp('"', "g"), "");
        if (qrVal.indexOf('https://farm.yeetong.cn/') === 0) {
          wx.showLoading({
            title: '请稍后...',
            mask: true
          });
          farmService.farmDetail(qrVal.substr(24)).then(res => {
            wx.hideLoading();
            _this.setData({
              farm: res,
              applyModalVisible: true
            });
          }).catch(err => {
            wx.hideLoading();
            if (err) {
              if (err.message) {
                util.showErrorToast(err.message);
              }
            }
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
  toCreateFarm: function () {
    wx.navigateTo({
      url: '/pages/farm/create/index'
    })
  },
  toApply: function () {
    const _this = this;
    _this.toClose();
    wx.showLoading({
      title: '加载中...'
    });
    farmService.applyFarmVisit(_this.data.farm.farmId).then(res => {
      wx.hideLoading();
      if (res === 'SUC') {
        wx.showModal({
          title: '申请成功',
          content: '请耐心等待农场管理员审核',
        });
      } else if (res === 'D') {
        util.showErrorToast('请耐心等待农场管理员审核')
      } else if (res === 'Y') {
        wx.setStorageSync('curr-farm-id', _this.data.farm.farmId);
        wx.setStorageSync('curr-farm-identity', 'visitor');
        wx.switchTab({
          url: '/pages/index/index'
        });
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
  toClose: function () {
    this.setData({
      applyModalVisible: false
    });
  }
})