Page({
  data: {
    current: 'equipment'
  },
  onLoad: function (options) {

  },
  onReady: function () {

  },
  onShow: function () {
  },
  handleChange({ detail }) {
    if (detail.key === this.data.current) {
      return false;
    }
    wx.showLoading({
      title: '加载中...'
    });
    wx.redirectTo({
      url: '/pages/' + detail.key + '/index',
      complete: () => {
        wx.hideLoading();
      }
    });
  }
})