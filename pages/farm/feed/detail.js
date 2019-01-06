var feedService = require('../../../service/feed.js');
var util = require('../../../utils/util.js');
const app = getApp()

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    feedObj: {}
  },
  onLoad: function (options) {
    const _this = this;
    feedService.selectFeedDetail(options.feedId).then(res => {
      console.info(res);
      _this.setData({
        feedObj: res
      });
    }).catch(err => {
      console.info(err);
    });
  },
  previewImage: function (e) {
    const _this = this;
    util.previewImage(e.currentTarget.dataset.picUrl, _this.data.feedObj.feedPics);
  },
})