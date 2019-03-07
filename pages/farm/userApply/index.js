var farmService = require('../../../service/farm.js');
var util = require('../../../utils/util.js');
const app = getApp()

Page({
  data: {
    selectState: 'D',
    users: [],
    applyHandleModal: false,
    selectResId: ''
  },
  onLoad: function(options) {
    this.loadData('D');
  },
  tabSelect: function(e) {
    this.loadData(e.currentTarget.dataset.id);
  },
  loadData: function (state) {
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    var farmId = wx.getStorageSync('curr-farm-id');
    farmService.userApplys(farmId, state).then(res => {
      this.setData({
        users: res,
        selectState: state
      });
      wx.hideLoading();
    }).catch(err => {
      wx.hideLoading();
      if (err) {
        if (err.message) {
          util.showErrorToast(err.message);
        }
      }
    });
  },
  toHandle: function (e) {
    const _this = this;
    var state = e.currentTarget.dataset.state;
    if (state === 'Y' || state === 'N') {
      wx.navigateTo({
        url: '/pages/farm/userApply/reAuth?authId=' + e.currentTarget.dataset.id
      });
    } else if (state == 'D') {
      _this.setData({
        applyHandleModal: true,
        selectResId: e.currentTarget.dataset.id
      });
    }
  },
  removeAuth: function(e) {
    const _this = this;
    var state = e.currentTarget.dataset.state;
    if (state === 'Y') {
      wx.showModal({
        title: '移除授权',
        content: '是否要移除用户对当前农场的访问？',
        success(res) {
          if (res.confirm) {
            _this.toApplyHandle(e.currentTarget.dataset.id, 'N');
          }
        }
      });
    } else {
      wx.showToast({
        title: '只能取消已授权的用户',
        icon: 'none'
      });
    }
  },
  hideModal: function() {
    this.setData({
      applyHandleModal: false,
      selectResId: ''
    });
  },
  toAdopt: function() {
    this.toApplyHandle(this.data.selectResId, 'Y');
  },
  toRefuse: function () {
    const _this = this;
    wx.showModal({
      title: '拒绝访问',
      content: '是否要拒绝当前用户对农场的访问？',
      success(res) {
        if (res.confirm) {
          _this.toApplyHandle(_this.data.selectResId, 'N');
        }
      }
    });
  },
  toApplyHandle: function (resId, state) {
    const _this = this;
    _this.hideModal();
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    farmService.userApplyHandle(resId, state).then(res => {
      wx.hideLoading();
      _this.loadData(_this.data.selectState);
      wx.showModal({
        title: '提示',
        content: '处理成功'
      });
    }).catch(err => {
      wx.hideLoading();
      if (err) {
        if (err.message) {
          util.showErrorToast(err.message);
        }
      }
    });
  }
})