Page({
  data: {

  },
  onLoad: function (options) {
    var farmId = wx.getStorageSync('curr-farm-id');
    var farmIdentity = wx.getStorageSync('curr-farm-identity');
    if (farmId && farmIdentity) {
      console.debug('to index')
    }
  },
  onReady: function () {

  },
  onShow: function () {

  },
  toDetail: function (e) {
    wx.setStorageSync('curr-farm-id', e.currentTarget.dataset.farmId);
    wx.setStorageSync('curr-farm-identity', e.currentTarget.dataset.farmIdentity);
    wx.switchTab({
      url: '/pages/index/index'
    })
  }
})