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
    totalPage: 1
  },
  loadNews: function (page, ck) {
    const _this = this;
    wx.showLoading({
      title: '加载中...'
    });
    newsService.getNewsByPage(page, 10).then(res => {
      let news = _this.data.news;
      if (page > 1) {
        var len = res.list.length;
        for (var i = 0; i < len; ++i) {
          news.push(res.list[i]);
        }
      } else {
        news = res.list;
      }
      _this.setData({
        news: news,
        page: res.current,
        totalPage: res.totalPage
      });
      wx.hideLoading();
      ck && ck();
    }).catch(err => {
      wx.hideLoading();
      logger.log(err);
    });
  },
  onReady: function () {
    this.loadNews(1);
  },
  loadMore: function () {
    this.loadNews(this.data.page + 1);
  },
  onPullDownRefresh: function () {
    this.loadNews(1, function () {
      wx.stopPullDownRefresh();
    });
  }
})