const app = getApp()
const logger = wx.getLogManager({ level: 1 })
var lpc = null; // LivePlayerContext
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    socketConnect: false,
    topicState: false,
  },
  onLoad: function () {
    const _this = this;
    _this.lpc = wx.createLivePlayerContext('rtmpPlayId');
    wx.onSocketError(function () {
      logger.log('连接 wss://wxapi.yeetong.cn/socket 失败');
    });
    wx.onSocketOpen(function () {
      _this.setData({
        socketConnect: true
      });
    });
    wx.onSocketMessage(function (data) {
      logger.log(data);
      if (data.data === '#topic#true#') {
        // 订阅成功
        _this.setData({
          topicState: true
        });
      }
    });
    wx.onSocketClose(function () {
      _this.setData({
        socketConnect: false
      });
      logger.log('Socket连接关闭');
    });
  },
  toConnectSocket: function () {
    // 连接Socket
    wx.connectSocket({
      url: 'wss://wxapi.yeetong.cn/socket'
    });
  },
  toTopic: function () {
    // 发送订阅请求
    this.sendSocketData("#topic#add#VSG/5c2045427e298eb6d157ca7a/5c2045427e298eb6d157ca7a/PushFlowStatus#WXXCX_1#");
  },
  toPullStream: function () {
    if (!this.data.topicState) {
      return false;
    }
    // 发送拉流请求
    this.sendSocketData("#send_data#VSG/5c2045427e298eb6d157ca7a/Call#S&5c2045427e298eb6d157ca7a&1&20190113152910&VSG&E#WXXCX_1#");
  },
  rtmpPlay: function () {
    if (lpc) {
      lpc.play({
        success: function (err) {
          wx.showToast({
            title: '播放',
            icon: 'none'
          });
        },
        fail: function (err) {
          logger.log(err);
        } 
      });
    }
  },
  rtmpPause: function () {
    if (lpc) {
      lpc.pause({
        success: function (err) {
          wx.showToast({
            title: '暂停',
            icon: 'none'
          });
        },
        fail: function (err) {
          logger.log(err);
        }
      });
    }
  },
  rtmpResume: function () {
    if (lpc) {
      lpc.resume({
        success: function (err) {
          wx.showToast({
            title: '恢复',
            icon: 'none'
          });
        },
        fail: function (err) {
          logger.log(err);
        }
      });
    }
  },
  rtmpFullScreen: function () {
    if (lpc) {
      lpc.requestFullScreen({
        success: function (err) {
          wx.showToast({
            title: '全屏',
            icon: 'none'
          });
        },
        fail: function (err) {
          logger.log(err);
        }
      });
    }
  },
  rtmpExitFullScreen: function () {
    if (lpc) {
      lpc.exitFullScreen({
        success: function (err) {
          wx.showToast({
            title: '退出全屏',
            icon: 'none'
          });
        },
        fail: function (err) {
          logger.log(err);
        }
      });
    }
  },
  rtmpPlayStateChange: function(e) {
    logger.log('live-player code:', e.detail.code)
  },
  rtmpPlayError: function(e) {
    logger.log('live-player error:', e.detail.errMsg);
    wx.showToast({
      title: '视频（直播）播放失败',
      icon: 'none'
    });
  },
  onShow: function () {
    const _this = this;
    // wx.sendSocketMessage(function () {
    //   console.log('打开连接');
    // });
    // setTimeout(() => {
    //   wx.closeSocket({
    //     code: 1000,
    //     reason: '流连接已建立',
    //     success: function () {
    //       console.info('Socket已关闭');
    //     },
    //     fail: function () {
    //       console.info('Socket关闭失败');
    //     }
    //   });
    // }, 10000);
  },
  sendSocketData: function (msg) {
    wx.sendSocketMessage({
      data: msg,
      fail: function (err) {
        logger.log(err);
      }
    });
  }
})