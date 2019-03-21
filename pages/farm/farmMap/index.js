const app = getApp()
Page({
  data: {
    markers: [],
    longitude: 0,
    latitude: 0,
    height: 0
  },
  onLoad: function (options) {
    const _this = this;
    if (options.longitude && options.latitude) {
      wx.getSystemInfo({
        success(res) {
          var markers = [{
            id: 0,
            latitude: options.latitude,
            longitude: options.longitude,
            label: options.farmName,
            iconPath: '/static/images/marker.png',
            zIndex: 9999
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
  },
  bindmarkertap: function(e) {
    var marker = this.data.markers[e.markerId];
    wx.openLocation({
      latitude: Number(marker.latitude),
      longitude: Number(marker.longitude),
      scale: 18,
      name: marker.label
    })
  }
})