Page({
  statechange(e) {
    console.log('live-player code:', e.detail.code)
  },
  error(e) {
    LogManager.log('live-player error:', e.detail.errMsg)
  },
  onShow: function () {
    const _this = this;
    // setInterval(() => {
    //   console.info(new Date());
    // }, 2000)

    wx.connectSocket({
      url: 'wss://wxapi.yeetong.cn/socket'
    })
    wx.onSocketError(function () {
      console.log('连接失败');
    });
    wx.onSocketOpen(function () {
      console.log('连接成功');
      console.log('发送订阅请求');
      _this.sendSocketData("#topic#add#VSG/d9afaa6dec6e45f1b22565c9473f4982/870f0a2c1a5c4ec4a8c95cf53b39a5f0/PushFlowStatus#WXXCX_1#");
    });
    wx.onSocketMessage(function (data) {
      console.log('接受到数据:');
      console.log(data);
      if (data.data === '#topic#true#') {
        console.log('订阅成功');
        console.log('发送视频流请求');
        _this.sendSocketData("#send_data#VSG/d9afaa6dec6e45f1b22565c9473f4982/Call#S&870f0a2c1a5c4ec4a8c95cf53b39a5f0&1&20190113152910&VSG&E#WXXCX_1#");
      }
    });
    wx.onSocketClose(function () {
      console.log('连接关闭');
    });
    // wx.sendSocketMessage(function () {
    //   console.log('打开连接');
    // });
    setTimeout(() => {
      wx.closeSocket({
        code: 1000,
        reason: '流连接已建立',
        success: function () {
          console.info('Socket已关闭');
        },
        fail: function () {
          console.info('Socket关闭失败');
        }
      });
    }, 10000);
  },
  sendSocketData: function (msg) {
    wx.sendSocketMessage({
      data: msg,
      success: function () {
        console.info('发送数据成功');
      },
      fail: function (err) {
        console.info('发送数据失败');
        console.info(err);
      }
    });
  }
})