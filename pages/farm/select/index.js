var farmService = require('../../../service/farm.js');

Page({
  data: {
    authFarms: []
  },
  onLoad: function (options) {
    const _this = this;
    farmService.authFarms().then( res => {
      if (res.length === 1) {
        wx.setStorageSync('curr-farm-id', res[0].farmId);
        wx.setStorageSync('curr-farm-identity', res[0].farmIdentity);
        wx.switchTab({
          url: '/pages/index/index'
        })
        return false;
      }
      _this.setData({
        authFarms: res
      });
      var farmId = wx.getStorageSync('curr-farm-id');
      var farmIdentity = wx.getStorageSync('curr-farm-identity');
      if (farmId && farmIdentity) {
        let size = res.length;
        for (var i = 0; i < size; ++i) {
          if (farmId === res[i].farmId && farmIdentity === res[i].farmIdentity) {
            wx.switchTab({
              url: '/pages/index/index'
            })
          }
        }
      }
    }).catch( err => {
      console.error(err);
    });
  },
  toDetail: function (e) {
    wx.setStorageSync('curr-farm-id', e.currentTarget.dataset.farmId);
    wx.setStorageSync('curr-farm-identity', e.currentTarget.dataset.farmIdentity);
    wx.switchTab({
      url: '/pages/index/index'
    })
  }
})