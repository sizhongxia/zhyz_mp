//获取应用实例
const app = getApp();

Page({
  data: {
    userInfo: {},
    current: 'index',
    // 轮播图
    banner: [{
      id: 1,
      picUrl: 'https://static.yeetong.cn/yeetong/zhyz/mp-banner-default.png-yeetong'
    }],
    channel: [{
      id: 1,
      name: '测试',
      iconUrl: '/static/images/icon_func.png',
      url: ''
    }, {
      id: 2,
      name: '测试',
      iconUrl: '/static/images/icon_func.png',
      url: ''
    }, {
      id: 3,
      name: '测试',
      iconUrl: '/static/images/icon_func.png',
      url: ''
    }, {
      id: 4,
      name: '测试',
      iconUrl: '/static/images/icon_func.png',
      url: '/pages/mine/index',
      // navigate
      openType: 'redirect'
    }, {
      id: 5,
      name: '测试',
      iconUrl: '/static/images/icon_func.png',
      url: ''
    }]
  },
  onLoad: function () {
    const _this = this;
    _this.setData({
      userInfo: app.globalData.userInfo
    });
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
