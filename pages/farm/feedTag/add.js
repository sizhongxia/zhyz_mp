var farmService = require('../../../service/farm.js');
var feedService = require('../../../service/feed.js');
var util = require('../../../utils/util.js');
const app = getApp()
const logger = wx.getLogManager({ level: 1 })

Page({
  data: {
    form: {
      farmId: '',
      feedTagName: '',
      feedTagContent: '',
    },
    submiting: false
  },
  inputFeedTagName: function (e) {
    const _this = this;
    var form = _this.data.form;
    form.feedTagName = e.detail.value;
    _this.setData({
      form: form
    });
  },
  inputFeedTagContent: function (e) {
    const _this = this;
    var form = _this.data.form;
    form.feedTagContent = e.detail.value;
    _this.setData({
      form: form
    });
  },
  toAdd: function () {
    const _this = this;
    if (_this.data.submiting){
      return false;
    }
    _this.setData({
      submiting: true
    });
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    _this.data.form.farmId = wx.getStorageSync('curr-farm-id');
    feedService.saveFeedTag(_this.data.form).then(res => {
      wx.hideLoading();
      wx.showToast({
        title: '保存成功'
      });
      var form = _this.data.form;
      form.feedTagName = "";
      form.feedTagContent = "";
      _this.setData({
        submiting: false,
        form: form
      });
    }).catch(err => {
      wx.hideLoading();
      _this.setData({
        submiting: false
      });
      if (err) {
        if (err.message) {
          util.showErrorToast(err.message);
        } else {
          logger.log(err);
        }
      }
    });
  }
})