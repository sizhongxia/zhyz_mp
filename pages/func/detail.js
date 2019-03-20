var funcService = require('../../service/func.js');
var farmService = require('../../service/farm.js');
var util = require('../../utils/util.js');
const app = getApp();
Page({
  data: {
    moveing: false,
    resId: '',
    func: {}
  },
  onLoad: function (options) {
    this.setData({
      resId: options.resId
    })
    this.load();
  },
  load: function() {
    const _this = this;
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    var farmId = wx.getStorageSync('curr-farm-id');
    funcService.getFuncDetail(_this.data.resId, farmId).then(res => {
      wx.hideLoading();
      _this.setData({
        func: res
      })
      _this.towerSwiper(res.pics);
    }).catch(err => {
      wx.hideLoading();
      if (err) {
        if (err.message) {
          util.showErrorToast(err.message);
        }
      }
    });
  },
  // 初始化towerSwiper
  towerSwiper(list) {
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      towerList: list
    })
  },

  // towerSwiper触摸开始
  towerStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },

  // towerSwiper计算方向
  towerMove(e) {
    this.setData({
      moveing: true,
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },

  // towerSwiper计算滚动
  towerEnd(e) {
    if (!this.data.moveing) {
      let list = this.data.towerList;
      var curr = '', pics = []
      for (var idx in list) {
        if(list[idx].mLeft === 0) {
          curr = list[idx].url
        }
        pics.push(list[idx].url)
      }
      util.previewImage(curr, pics)
      return;
    }
    let direction = this.data.direction;
    let list = this.data.towerList;
    if (direction == 'right') {
      let mLeft = list[0].mLeft;
      let zIndex = list[0].zIndex;
      for (let i = 1; i < list.length; i++) {
        list[i - 1].mLeft = list[i].mLeft
        list[i - 1].zIndex = list[i].zIndex
      }
      list[list.length - 1].mLeft = mLeft;
      list[list.length - 1].zIndex = zIndex;
      this.setData({
        moveing: false,
        towerList: list
      })
    } else {
      let mLeft = list[list.length - 1].mLeft;
      let zIndex = list[list.length - 1].zIndex;
      for (let i = list.length - 1; i > 0; i--) {
        list[i].mLeft = list[i - 1].mLeft
        list[i].zIndex = list[i - 1].zIndex
      }
      list[0].mLeft = mLeft;
      list[0].zIndex = zIndex;
      this.setData({
        moveing: false,
        towerList: list
      })
    }
  },
  toAdd: function() {
    const _this = this;
    wx.showModal({
      title: '提示',
      content: '是否要添加当前应用到该农场？',
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '请稍后...',
            mask: true
          });
          var farmId = wx.getStorageSync('curr-farm-id');
          farmService.saveFarmFunc(farmId, _this.data.resId).then(res => {
            wx.hideLoading();
            wx.navigateBack();
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
  toRemove: function () {
    const _this = this;
    wx.showModal({
      title: '提示',
      content: '是否要移除当前应用？移除不会清除数据！',
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '请稍后...',
            mask: true
          });
          var farmId = wx.getStorageSync('curr-farm-id');
          farmService.delFarmFunc(farmId, _this.data.resId).then(res => {
            wx.hideLoading();
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
  }
});