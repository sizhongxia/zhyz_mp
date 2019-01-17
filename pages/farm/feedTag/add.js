var farmService = require('../../../service/farm.js');
var feedService = require('../../../service/feed.js')
const app = getApp()
const logger = wx.getLogManager({ level: 1 })

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    form: {
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
    feedService.saveFeedTag(_this.data.form).then(res => {
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
      _this.setData({
        submiting: false
      });
      logger.log(err);
    });
  }
})