var farmPicService = require('../../../service/farmPic.js');
const app = getApp()

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    form: {
      picId: '',
      title: '',
      picUrl: '',
      sortNum: 999
    },
    submiting: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this;
    wx.showLoading({
      title: '加载中...'
    });
    farmPicService.getFarmPicDetail(options.picId).then(res => {
      _this.setData({
        form: res
      });
      wx.hideLoading();
    }).catch(err => {
      console.error(err);
      wx.hideLoading();
    });
  },
  inputPicTitle: function (e) {
    const _this = this;
    var form = _this.data.form;
    form.title = e.detail.value;
    _this.setData({
      form: form
    });
  },
  inputSortNum: function (e) {
    const _this = this;
    var form = _this.data.form;
    form.sortNum = e.detail.value;
    _this.setData({
      form: form
    });
  },
  toSave: function () {
    const _this = this;
    if (_this.data.submiting) {
      return false;
    }
    _this.setData({
      submiting: true
    });
    farmPicService.updateFarmPic(_this.data.form).then(res => {
      wx.showToast({
        title: '保存成功'
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