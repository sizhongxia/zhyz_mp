var farmService = require('../../../service/farm.js');
var util = require('../../../utils/util.js');
Page({
  data: {
    authFarms: [],
    farm: {},
    applyModalVisible: false
  },
  onLoad: function(options) {
    const _this = this;
    console.debug('获取用户农场授权信息...');
    farmService.authFarms().then(res => {
      if (res.length === 0) {
        wx.setNavigationBarTitle({
          title: '扫码申请'
        });
        return false;
      }
      _this.setData({
        authFarms: res
      });
      console.debug('用户农场授权信息>>>', res);
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
      console.error(err);
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
      onlyFromCamera: true,
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
            console.error(err);
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
          content: '请耐心等待农场管理员确认审核。',
        });
      } else if (res === 'D') {
        util.showErrorToast('无需重复提交申请')
      } else if(res === 'Y') {
        wx.setStorageSync('curr-farm-id', _this.data.farm.farmId);
        wx.setStorageSync('curr-farm-identity', 'visitor');
        wx.switchTab({
          url: '/pages/index/index'
        });
      }
    }).catch(err => {
      console.error(err);
    });
  },
  toClose: function() {
    this.setData({
      applyModalVisible: false
    });
  }
})