const app = getApp()
Page({
  data: {
    markers: [],
    longitude: '',
    latitude: '',
    height: 0
  },
  onLoad: function (options) {
    const _this = this;
    if (options.longitude && options.latitude) {
      wx.getSystemInfo({
        success(res) {
          var markers = [{
            latitude: options.latitude,
            longitude: options.longitude,
            title: options.farmName,
            iconPath: '/static/images/marker.png'
          }];
          _this.setData({
            latitude: options.latitude,
            longitude: options.longitude,
            height: res.windowHeight,
            markers: markers
          });
        }
      })
    } else {
      wx.showToast({
        icon: 'none',
        title: '请先设置农场经纬度信息'
      });
      wx.navigateBack({
        delta: 1
      });
    }
  }
})