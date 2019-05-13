var equipmentService = require('../../service/equipment.js');
const app = getApp();
var lpc = null;
var pinfo = {
  "2001":"已经连接服务器",
  "2002":"已经连接服务器,开始拉流",
  "2003":"网络接收到首个视频数据包(IDR)",
  "2004":"视频播放开始",
  "2005":"视频播放进度",
  "2006":"视频播放结束",
  "2007":"视频播放Loading",
  "2008":"解码器启动",
  "2009":"视频分辨率改变",
  "-2301":"网络断连，且经多次重连抢救无效，更多重试请自行重启播放",
  "-2302":"获取加速拉流地址失败",
  "2101":"当前视频帧解码失败",
  "2102":"当前音频帧解码失败",
  "2103":"网络断连, 已启动自动重连",
  "2104":"网络来包不稳：可能是下行带宽不足，或由于主播端出流不均匀",
  "2105":"当前视频播放出现卡顿",
  "2106":"硬解启动失败，采用软解",
  "2107":"当前视频帧不连续，可能丢帧",
  "2108":"当前流硬解第一个I帧失败，SDK自动切软解",
  "3001":"RTMP -DNS解析失败",
  "3002":"RTMP服务器连接失败",
  "3003":"RTMP服务器握手失败",
  "3005":"RTMP 读/写失败"
};
Page({
  data: {
    liveUrl: ''
  },
  onLoad: function (param) {
    const _this = this;
    equipmentService.getCameraDetail(param.equipmentId).then(res => {
      console.info(res);
      _this.setData({
        liveUrl: res.playRtmpUrl
      });
      lpc = wx.createLivePlayerContext('rtmpPlayId');
      lpc.play({
        success: function (err) {
          wx.showToast({
            title: '即将播放',
            icon: 'none'
          });
        },
        fail: function (err) {
        }
      });
    }).catch(err => {
      wx.showToast({
        title: '摄像头暂未接入'
      });
    });
  },
  rtmpFullScreen: function () {
    const _this = this;
    if (lpc) {
      lpc.requestFullScreen({
        success: function (err) {
          wx.showToast({
            title: '全屏',
            icon: 'none'
          });
        },
        fail: function (err) {
        }
      });
    }
  },
  rtmpExitFullScreen: function () {
    const _this = this;
    if (lpc) {
      lpc.exitFullScreen({
        success: function (err) {
          wx.showToast({
            title: '退出全屏',
            icon: 'none'
          });
        },
        fail: function (err) {
        }
      });
    }
  },
  rtmpPlayStateChange: function (e) {
    wx.showToast({
      title: pinfo[e.detail.code + ''],
      icon: 'none'
    });
  },
  rtmpPlayError: function (e) {
    wx.showToast({
      title: '视频（直播）播放失败',
      icon: 'none'
    });
  }
})