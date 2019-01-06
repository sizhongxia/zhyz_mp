var feedService = require('../../../service/feed.js');
const app = getApp()

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    form: {
      feedTagId: '',
      feedTagName: '',
      feedTagContent: '',
    },
    submiting: false
  },
  onLoad: function (options) {
    const _this = this;
    feedService.selectFeedTagDetail(options.tagId).then(res => {
      _this.setData({
        form: res
      });
    }).catch(err => {
      console.error(err);
    });
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
  toUpdate: function () {
    const _this = this;
    if (_this.data.submiting) {
      return false;
    }
    _this.setData({
      submiting: true
    });
    feedService.updateFeedTag(_this.data.form).then(res => {
      wx.showToast({
        title: '修改成功'
      });
      _this.setData({
        submiting: false
      });
    }).catch(err => {
      _this.setData({
        submiting: false
      });
      console.error(err);
    });
  }
})