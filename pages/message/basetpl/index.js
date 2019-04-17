var msgService = require('../../../service/msg.js');
var util = require('../../../utils/util.js');
const app = getApp()
Page({
  data: {
    type: '',
    list: [],
    page: 1,
    over: false
  },
  onLoad: function (options) {
    this.setData({
      type: options.type
    })
  },
  onShow: function () {
    this.loadData(1, false);
  },
  loadData: function (page, ck) {
    const _this = this;
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    _this.setData({
      over: false
    });
    msgService.getMsgTypeItemsData(_this.data.type, page).then(res => {
      if (res.length === 0) {
        _this.setData({
          over: true
        });
        wx.hideLoading();
        ck && ck();
        return;
      }
      let list = _this.data.list;
      if (page > 1) {
        var len = res.length;
        for (var i = 0; i < len; ++i) {
          list.push(res[i]);
        }
      } else {
        list = res;
      }
      _this.setData({
        list: list,
        page: page
      });
      wx.hideLoading();
      ck && ck();
    }).catch(err => {
      wx.hideLoading();
      ck && ck();
      if (err) {
        if (err.message) {
          util.showErrorToast(err.message);
        }
      }
    });
  },
  loadMore: function () {
    this.loadData(this.data.page + 1, false);
  },
  toDetail: function (e) {
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    wx.navigateTo({
      url: '/pages/webview/index?path=https://www.yeetong.cn/mp/msg/detail/' + e.currentTarget.dataset.id,
      complete: function () {
        wx.hideLoading();
      }
    });
  },
  onPullDownRefresh: function () {
    this.loadData(1, wx.stopPullDownRefresh);
  }
})