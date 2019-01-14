const app = getApp()
const logger = wx.getLogManager({
  level: 1
})
var lpc = null; // LivePlayerContext
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    farmId: '5c2045427e298eb6d157ca7a',
    cameraId: '5c2045427e298eb6d157ca7a',
    height: wx.getSystemInfoSync().windowHeight,
    socketConnect: false,
    topicState: false,
    ready: false,
    playing: false,
    pause: false,
    lastOptionTxt: []
  },
  setOptionTxt: function(txt) {
    var txts = this.data.lastOptionTxt;
    var today = new Date();
    var h = today.getHours();
    if (h < 10) {
      h = "0" + h
    }
    var m = today.getMinutes();
    if (m < 10) {
      m = "0" + m
    }
    var s = today.getSeconds();
    if (s < 10) {
      s = "0" + s
    }
    txts.unshift(h + ":" + m + ":" + s + " >>> " + txt);
    this.setData({
      lastOptionTxt: txts
    });
  },
  onLoad: function() {
    const _this = this;
    _this.lpc = wx.createLivePlayerContext('rtmpPlayId');
    wx.onSocketError(function() {
      logger.log('连接 wss://wxapi.yeetong.cn/socket 失败');
      _this.setOptionTxt('连接 wss://wxapi.yeetong.cn/socket 失败')
    });
    wx.onSocketOpen(function() {
      _this.setOptionTxt('onSocketOpen, 连接成功');
      _this.setData({
        socketConnect: true
      });
      _this.toTopic();
    });
    wx.onSocketMessage(function(data) {
      _this.setOptionTxt('接收到Socket服务器传来的消息');
      _this.setOptionTxt('数据：' + data.data);
      logger.log(data);
      console.info(data.data);
      if (data.data === '#topic#true#') {
        _this.setOptionTxt('订阅成功');
        // 订阅成功
        _this.setData({
          topicState: true
        });
        _this.toPullStream();
      } else if (data.data === '#send_data#true#1#') {
        _this.setOptionTxt('发送请求成功，等待服务器响应');
      } else if (data.data.indexOf("&VSG&") > -1) {
        // -2终端以获取命令，-1未启动， 0正在连接初始化，1正在推流
        if (data.data.indexOf(_this.data.cameraId + "&-2") > -1) {
          _this.setOptionTxt('终端已获取命令');
        } else if (data.data.indexOf(_this.data.cameraId + "&-1") > -1) {
          _this.setOptionTxt('即将开始推流');
        } else if (data.data.indexOf(_this.data.cameraId + "&0") > -1) {
          _this.setOptionTxt('正在初始化推流操作');
        } else if (data.data.indexOf(_this.data.cameraId + "&1") > -1) {
          _this.setOptionTxt('正在推流，可进行播放');
          _this.setData({
            ready: true
          });
          _this.rtmpPlay();
        } else if (data.data.indexOf(_this.data.cameraId + "&2") > -1) {
          _this.setOptionTxt('推流失败');
          _this.setData({
            ready: false
          });
        } else if (data.data.indexOf(_this.data.cameraId + "&3") > -1) {
          _this.setOptionTxt('重新唤醒中');
        } else if (data.data.indexOf(_this.data.cameraId + "&4") > -1) {
          _this.setOptionTxt('拉流或推流地址为空');
        }
      } else if (data.data.indexOf("&PTZ&") > -1) {
        //1接收成功，2执行成功，-1执行失败
        if (data.data.indexOf(_this.data.cameraId + "&1") > -1) {
          _this.setOptionTxt('终端已获取命令');
        } else if (data.data.indexOf(_this.data.cameraId + "&2") > -1) {
          _this.setOptionTxt('操作执行成功');
        } else if (data.data.indexOf(_this.data.cameraId + "&-1") > -1) {
          _this.setOptionTxt('操作执行失败');
        }
      }
    });
    wx.onSocketClose(function() {
      _this.setData({
        socketConnect: false
      });
      logger.log('Socket连接关闭');
      _this.setOptionTxt('Socket连接关闭');
    });
  },
  toConnectSocket: function() {
    const _this = this;
    _this.setOptionTxt('连接Socket...');
    // 连接Socket
    wx.connectSocket({
      url: 'wss://wxapi.yeetong.cn/socket'
    });
  },
  onUnload: function() {
    wx.closeSocket({
      code: 1000,
      reason: '页面关闭'
    });
  },
  toTopic: function() {
    const _this = this;
    _this.setOptionTxt('发送订阅请求...');
    // 发送订阅请求
    this.sendSocketData("#topic#add#VSG/5c2045427e298eb6d157ca7a/5c2045427e298eb6d157ca7a/PushFlowStatus#WXXCX_1#");
  },
  toPullStream: function() {
    const _this = this;
    if (!_this.data.topicState) {
      return false;
    }
    _this.setOptionTxt('发送拉流请求');
    // 发送拉流请求
    this.sendSocketData("#send_data#VSG/5c2045427e298eb6d157ca7a/Call#S&5c2045427e298eb6d157ca7a&1&20190113152910&VSG&E#WXXCX_1#");
  },
  // 订阅操作
  toTopicOption: function() {
    const _this = this;
    _this.setOptionTxt('发送订阅操作请求...');
    this.sendSocketData("#topic#add#PTZ/5c2045427e298eb6d157ca7a/5c2045427e298eb6d157ca7a/PTZStatus#WXXCX_1#");
  },
  toOption: function(e) {
    const _this = this;
    _this.setOptionTxt('发送操作请求...');
    /**
     * PAN_LEFT,//左
				TILT_UP,//上
				PAN_RIGHT,//右
				TILT_DOWN,//下
				ZOOM_IN,//焦距变大
				ZOOM_OUT,//焦距变小
				FOCUS_NEAR,//焦点前调
				FOCUS_FAR,//焦点后调
				IRIS_OPEN,//光圈扩大
				IRIS_CLOSE,//光圈缩小
				PAN_AUTO  //云台左右自动扫描
     */
    this.sendSocketData("#send_data#PTZ/5c2045427e298eb6d157ca7a/Call#S&5c2045427e298eb6d157ca7a&192.168.66.243&8000&admin&goyo1234567890&" + e.currentTarget.dataset.option + "&500&3&20190114152910&PTZ&E#WXXCX_1#");
  },

  rtmpPlay: function() {
    const _this = this;
    if (_this.lpc) {
      _this.setOptionTxt('播放');
      _this.lpc.play({
        success: function(err) {
          wx.showToast({
            title: '播放',
            icon: 'none'
          });
          _this.setData({
            playing: true
          });
        },
        fail: function(err) {
          logger.log(err);
        }
      });
    }
  },
  rtmpPause: function() {
    const _this = this;
    if (_this.lpc) {
      _this.setOptionTxt('暂停');
      _this.lpc.pause({
        success: function(err) {
          wx.showToast({
            title: '暂停',
            icon: 'none'
          });
          _this.setData({
            playing: false,
            pause: true
          });
        },
        fail: function(err) {
          logger.log(err);
        }
      });
    }
  },
  rtmpResume: function() {
    const _this = this;
    if (_this.lpc) {
      _this.setOptionTxt('恢复');
      _this.lpc.resume({
        success: function(err) {
          wx.showToast({
            title: '恢复',
            icon: 'none'
          });
          _this.setData({
            playing: true,
            pause: false
          });
        },
        fail: function(err) {
          logger.log(err);
        }
      });
    }
  },
  rtmpFullScreen: function() {
    const _this = this;
    if (_this.lpc) {
      _this.setOptionTxt('全屏');
      _this.lpc.requestFullScreen({
        success: function(err) {
          wx.showToast({
            title: '全屏',
            icon: 'none'
          });
        },
        fail: function(err) {
          logger.log(err);
        }
      });
    }
  },
  rtmpExitFullScreen: function() {
    const _this = this;
    if (_this.lpc) {
      _this.lpc.exitFullScreen({
        success: function(err) {
          wx.showToast({
            title: '退出全屏',
            icon: 'none'
          });
        },
        fail: function(err) {
          logger.log(err);
        }
      });
    }
  },
  rtmpPlayStateChange: function(e) {
    logger.log('live-player code:', e.detail.code)
    _this.setOptionTxt('live-player code:' + e.detail.code);
  },
  rtmpPlayError: function(e) {
    logger.log('live-player error:', e.detail.errMsg);
    wx.showToast({
      title: '视频（直播）播放失败',
      icon: 'none'
    });
  },
  onShow: function() {
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
  sendSocketData: function(msg) {
    wx.sendSocketMessage({
      data: msg,
      fail: function(err) {
        logger.log(err);
      }
    });
  }
})