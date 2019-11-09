var equipmentService = require('../../service/equipment.js');
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
const app = getApp()

Page({
  data: {
    currentFarmIdentity: '',
    tabIndex: 5,
    equipmentId: '',
    equipment: {
      status: '00'
    },
    list: [],
    page: 1,
    hadMore: true
  },
  onLoad: function(options) {
    this.setData({
      equipmentId: options.equipmentId,
      currentFarmIdentity: wx.getStorageSync('curr-farm-identity')
    });
  },
  onShow: function (options) {
    this.getDetail()
  },
  getDetail: function (callback) {
    const _this = this;
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    equipmentService.getEquipmentDetail(_this.data.equipmentId).then(res => {
      _this.setData({
        equipment: res,
        page: 1,
        list: [],
        hadMore: true
      });
      wx.hideLoading();
      callback && callback();
      setTimeout(function() {
        _this.loadList();
      }, 10)
    }).catch(err => {
      wx.hideLoading();
      callback && callback()
      if (err) {
        if (err.message) {
          util.showErrorToast(err.message);
        }
      }
    });
  },
  toggleOutlineReceiveStatus: function (e) {
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    equipmentService.toggleOutlineReceiveStatus(this.data.equipmentId).then(res => {
      wx.hideLoading();
    }).catch(err => {
      wx.hideLoading();
      if (err) {
        if (err.message) {
          util.showErrorToast(err.message);
        }
      }
    })
  },
  loadList: function () {
    const _this = this;
    if (!_this.data.hadMore) {
      wx.showToast({
        icon: 'none',
        title: '无更多数据'
      })
      return;
    }
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    equipmentService.getBlackoutAlarmList(_this.data.equipmentId, _this.data.page).then(res => {
      if (res && res.length > 0) {
        var _res = _this.data.list;
        var size = res.length;
        if (_this.data.page > 1) {
          for (var i = 0; i < size; i++) {
            _res.push(res[i]);
          }
        } else {
          _res = res;
        }
        _this.setData({
          list: _res,
          hadMore: true,
          page: _this.data.page + 1
        });
      } else {
        _this.setData({
          hadMore: false
        });
        wx.showToast({
          icon: 'none',
          title: '无更多数据'
        })
      }
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
  tabSelect: function (e) {
    const _this = this;
    if (e.currentTarget.dataset.index == 4) {
      wx.showLoading({
        title: '请稍后...',
        mask: true
      });
      wx.navigateTo({
        url: '/pages/equipment/alarm/conf2/list?equipmentId=' + _this.data.equipmentId,
        complete: function () {
          wx.hideLoading();
        }
      });
      return;
    }
    _this.setData({
      tabIndex: e.currentTarget.dataset.index
    })
  },
  onPullDownRefresh: function () {
    this.getDetail(wx.stopPullDownRefresh);
  },
  onReachBottom: function () {
    this.loadList()
  }
})