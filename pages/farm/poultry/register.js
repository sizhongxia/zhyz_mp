const app = getApp()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar
  },
  toRegisterBatch: function() {
    wx.showLoading();
    wx.navigateTo({
      url: '/pages/farm/poultry/register/batch',
      complete: function() {
        wx.hideLoading();
      }
    });
  },
  toRegisterSingle: function() {
    wx.showLoading();
    wx.navigateTo({
      url: '/pages/farm/poultry/register/single',
      complete: function() {
        wx.hideLoading();
      }
    });
  }
})