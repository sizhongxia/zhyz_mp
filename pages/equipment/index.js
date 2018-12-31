Page({
  data: {
    scrollTop: 0
  },
  onLoad: function (options) {

  },
  onReady: function () {

  },
  onShow: function () {
  },
  //页面滚动执行方式
  onPageScroll(event) {
    this.setData({
      scrollTop: event.scrollTop
    })
  }
})