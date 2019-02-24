Page({
  data: {
    path: ''
  },
  onLoad: function (options) {
    const _this = this;
    _this.setData({
      path: options.path
    });
  }
})