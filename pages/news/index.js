var newsService = require('../../service/news.js');
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
const app = getApp()
const logger = wx.getLogManager({
  level: 1
})
Page({
  data: {
    news: [],
    page: 1,
    total: 0
  },
  onLoad: function (options) {
    this.loadNews(1);
  },
  loadNews: function (page) {
    const _this = this;
    wx.showLoading({
      title: '加载中...'
    });
    newsService.getNewsByPage(page).then(res => {
      let news = _this.data.news;
      if (page > 1) {
        news.push(res.list);
      }
      console.info(res)
      _this.setData({
        news: res.list,
        page: res.current,
        total: res.total
      });
      wx.hideLoading();
    }).catch(err => {
      wx.hideLoading();
      logger.log(err);
    });
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onPullDownRefresh: function () {

  }
})