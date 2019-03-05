var farmService = require('../../service/farm.js');
var cityService = require('../../service/city.js');
var util = require('../../utils/util.js');
const app = getApp();
const logger = wx.getLogManager({ level: 1 })
Page({
  data: {
    hidden: true,
    kw: '',
    datas: []
  },
  onLoad() {
    this.loadWeatherCity();
  },
  loadWeatherCity() {
    wx.showLoading({
      title: '请稍后...',
      mask: true
    })
    const _this = this;
    cityService.weatherCities(_this.data.kw).then(res => {
      wx.hideLoading();
      _this.setData({
        datas: res
      })
    }).catch(err => {
      wx.hideLoading();
      logger.log(err);
    });
  },
  onReady() {
    let that = this;
    wx.createSelectorQuery().select('.indexBar-box').boundingClientRect(function (res) {
      that.setData({
        boxTop: res.top
      })
    }).exec();
    wx.createSelectorQuery().select('.indexes').boundingClientRect(function (res) {
      that.setData({
        barTop: res.top
      })
    }).exec()
  },
  //获取文字信息
  getCur(e) {
    this.setData({
      hidden: false,
      listCur: this.data.datas[e.target.id].key
    })
  },
  setCur(e) {
    this.setData({
      hidden: true,
      listCur: this.data.listCur
    })
  },
  //滑动选择Item
  tMove(e) {
    let y = e.touches[0].clientY,
      offsettop = this.data.boxTop,
      that = this;
    //判断选择区域,只有在选择区才会生效
    if (y > offsettop) {
      let num = parseInt((y - offsettop) / 20);
      this.setData({
        listCur: that.data.datas[num].key
      })
    };
  },
  //触发全部开始选择
  tStart() {
    this.setData({
      hidden: false
    })
  },
  //触发结束选择
  tEnd() {
    this.setData({
      hidden: true,
      listCurID: this.data.listCur
    })
  },
  indexSelect(e) {
    let that = this;
    let barHeight = this.data.barHeight;
    console.info(barHeight)
    let list = this.data.datas;
    let scrollY = Math.ceil(list.length * e.detail.y / barHeight);
    for (let i = 0; i < list.length; i++) {
      if (scrollY < i + 1) {
        that.setData({
          listCur: list[i].key,
          movableY: i * 20
        })
        return false
      }
    }
  },
  bindKeyWordInput(e) {
    this.setData({
      kw: e.detail.value
    })
  },
  toSearch() {
    this.loadWeatherCity()
  },
  updateFarmWeatherInfo(e) {

    wx.showModal({
      title: '提示',
      content: '是否要更改农场天气城市信息。',
      success: function (r) {
        if (r.confirm) {
          wx.showLoading({
            title: '请稍后...',
            mask: true
          })
          var farmId = wx.getStorageSync('curr-farm-id');
          farmService.updateFarmWeatherInfo(farmId, e.currentTarget.dataset.code).then(res => {
            wx.hideLoading();
            wx.navigateBack();
          }).catch(err => {
            wx.hideLoading();
            if (err) {
              if (err.message) {
                util.showErrorToast(err.message);
              } else {
                logger.log(err);
              }
            }
          });
        }
      }
    })
  }
});