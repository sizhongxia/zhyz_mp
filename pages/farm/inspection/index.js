var farmService = require('../../../service/farm.js');
var inspectionService = require('../../../service/inspection.js');
var inspectionPointService = require('../../../service/inspectionPoint.js');
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
const app = getApp()

Page({
  data: {
    page: 1,
    farmId: '',
    inspections: [],
    loading: false,
    isOver: false
  },
  onLoad: function (options) {
    this.setData({
      farmId: wx.getStorageSync('curr-farm-id')
    });
    this.load();
  },
  load: function (callback) {
    const _this = this;
    if (_this.data.isOver) {
      callback && callback();
      return false;
    }
    _this.setData({
      loading: true
    });
    inspectionService.selectInspectionData(_this.data.farmId, _this.data.page).then(res => {
      if (res && res.length > 0) {
        var size = res.length;
        var inspections = [];
        if (_this.data.page > 1) {
          inspections = _this.data.inspections;
        }
        for (var i = 0; i < size; i++) {
          inspections.push(res[i]);
        }
        _this.setData({
          page: _this.data.page + 1,
          inspections: inspections
        });
      } else {
        if (_this.data.page === 1) {
          _this.setData({
            inspections: []
          });
        } else {
          wx.showToast({
            title: '无更多数据'
          });
        }
        _this.setData({
          isOver: true
        });
      }
      _this.setData({
        loading: false
      });
      callback && callback();
    }).catch(err => {
      if (err) {
        if (err.message) {
          util.showErrorToast(err.message);
        }
      }
      _this.setData({
        loading: false
      });
      callback && callback();
    });
  },
  toInspectionPoint: function () {
    wx.navigateTo({
      url: '/pages/farm/inspection/point/index',
    });
  },
  toScan: function () {
    const _this = this;
    // wx.scanCode({
    //   onlyFromCamera: true,
    //   scanType: ['qrCode'],
    //   success(res) {
    //     var qrVal = res.result.replace(new RegExp('"', "g"), "");
    //     if (qrVal.indexOf('https://www.yeetong.cn/inspectionpoint/') === 0) {
    //       wx.showLoading({
    //         title: '请稍后...',
    //         mask: true
    //       });
          // ?pointId=
          //var pointId = qrVal.substr(39);
          var pointId = '5c9209cde4b0a700435601ae';
          inspectionPointService.getInspectionPointDetail(pointId).then(res => {
            wx.hideLoading();
            if (res.farmId === _this.data.farmId && res.pointId) {
              wx.navigateTo({
                url: '/pages/farm/inspection/add?pointId=' + res.pointId,
              });
            } else {
              util.showErrorToast('请扫描当前农场的巡检点二维码');
            }
          }).catch(err => {
            wx.hideLoading();
            if (err) {
              if (err.message) {
                util.showErrorToast(err.message);
              }
            }
          });
    //     } else {
    //       util.showErrorToast('无效的巡检点');
    //     }
    //   },
    //   fail(err) {
    //     util.showErrorToast('无效的巡检点');
    //   }
    // });
  },
  loadMore: function () {
    this.load();
  },
  toDetail: function (e) {
    wx.navigateTo({
      url: '/pages/farm/inspection/detail?inspectionId=' + e.currentTarget.dataset.inspectionId,
    });
  },
  previewImage: function (e) {
    util.previewImage(e.currentTarget.dataset.picUrl);
  },
  removeItem: function (e) {
    const _this = this;
    wx.showModal({
      title: '提示',
      content: '删除后将无法找回！是否要删除？',
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '请稍后...',
            mask: true
          });
          inspectionService.deleteInspection(e.currentTarget.dataset.inspectionId).then(res => {
            wx.hideLoading();
            _this.setData({
              isOver: false,
              page: 1
            });
            _this.load();
          }).catch(err => {
            wx.hideLoading();
            if (err) {
              if (err.message) {
                util.showErrorToast(err.message);
              }
            }
          });
        }
      }
    });
  },
  onPullDownRefresh: function () {
    this.setData({
      page: 1,
      isOver: false
    });
    wx.showNavigationBarLoading();
    this.load(function () {
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
    });
  }
})