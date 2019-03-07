var farmService = require('../../../service/farm.js');
var cityService = require('../../../service/city.js');
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
const app = getApp()

Page({
  data: {
    cities: [[{ code: "110000", pcode: "86", name: "北京市" }, { code: "120000", pcode: "86", name: "天津市" }, { code: "130000", pcode: "86", name: "河北省" }, { code: "140000", pcode: "86", name: "山西省" }, { code: "150000", pcode: "86", name: "内蒙古自治区" }, { code: "210000", pcode: "86", name: "辽宁省" }, { code: "220000", pcode: "86", name: "吉林省" }, { code: "230000", pcode: "86", name: "黑龙江省" }, { code: "310000", pcode: "86", name: "上海市" }, { code: "320000", pcode: "86", name: "江苏省" }, { code: "330000", pcode: "86", name: "浙江省" }, { code: "340000", pcode: "86", name: "安徽省" }, { code: "350000", pcode: "86", name: "福建省" }, { code: "360000", pcode: "86", name: "江西省" }, { code: "370000", pcode: "86", name: "山东省" }, { code: "410000", pcode: "86", name: "河南省" }, { code: "420000", pcode: "86", name: "湖北省" }, { code: "430000", pcode: "86", name: "湖南省" }, { code: "440000", pcode: "86", name: "广东省" }, { code: "450000", pcode: "86", name: "广西壮族自治区" }, { code: "460000", pcode: "86", name: "海南省" }, { code: "500000", pcode: "86", name: "重庆市" }, { code: "510000", pcode: "86", name: "四川省" }, { code: "520000", pcode: "86", name: "贵州省" }, { code: "530000", pcode: "86", name: "云南省" }, { code: "540000", pcode: "86", name: "西藏自治区" }, { code: "610000", pcode: "86", name: "陕西省" }, { code: "620000", pcode: "86", name: "甘肃省" }, { code: "630000", pcode: "86", name: "青海省" }, { code: "640000", pcode: "86", name: "宁夏回族自治区" }, { code: "650000", pcode: "86", name: "新疆维吾尔自治区" }, { code: "710000", pcode: "86", name: "台湾省" }, { code: "810000", pcode: "86", name: "香港特别行政区" }, { code: "820000", pcode: "86", name: "澳门特别行政区" }], [{ code: "110100", pcode: "110000", name: "市辖区" }], [{ code: "110101", pcode: "110100", name: "东城区" }, { code: "110102", pcode: "110100", name: "西城区" }, { code: "110105", pcode: "110100", name: "朝阳区" }, { code: "110106", pcode: "110100", name: "丰台区" }, { code: "110107", pcode: "110100", name: "石景山区" }, { code: "110108", pcode: "110100", name: "海淀区" }, { code: "110109", pcode: "110100", name: "门头沟区" }, { code: "110111", pcode: "110100", name: "房山区" }, { code: "110112", pcode: "110100", name: "通州区" }, { code: "110113", pcode: "110100", name: "顺义区" }, { code: "110114", pcode: "110100", name: "昌平区" }, { code: "110115", pcode: "110100", name: "大兴区" }, { code: "110116", pcode: "110100", name: "怀柔区" }, { code: "110117", pcode: "110100", name: "平谷区" }, { code: "110118", pcode: "110100", name: "密云区" }, { code: "110119", pcode: "110100", name: "延庆区" }]],
    citiesIndex: [0, 0, 0],
    farm: {},
    updating: false
  },
  onLoad: function (options) {
    const _this = this;
    wx.showLoading({
      title: '加载中'
    });
    var farmId = wx.getStorageSync('curr-farm-id');
    farmService.farmDetail(farmId).then(res => {
      _this.setData({
        farm: res
      });
      const data = {
        cities: _this.data.cities,
        citiesIndex: _this.data.citiesIndex
      }
      var provinces = this.data.cities[0], len = provinces.length
      for (var idx = 0; idx < len; idx++) {
        if (provinces[idx].code === _this.data.farm.provinceCode) {
          data.citiesIndex[0] = idx;
          cityService.cities(_this.data.farm.provinceCode).then(res => {
            data.cities[1] = res
            var citys = data.cities[1], clen = citys.length
            for (var cidx = 0; cidx < clen; cidx++) {
              if (citys[cidx].code === _this.data.farm.cityCode) {
                data.citiesIndex[1] = cidx;
                return cityService.cities(_this.data.farm.cityCode);
              }
            }
          }).then(res => {
            data.cities[2] = res
            var countys = data.cities[2], cclen = countys.length
            for (var ccidx = 0; ccidx < cclen; ccidx++) {
              if (countys[ccidx].code === _this.data.farm.countyCode) {
                data.citiesIndex[2] = ccidx;
                break;
              }
            }
            _this.setData(data)
            wx.hideLoading()
          }).catch(err => {
            wx.hideLoading()
            if (err) {
              if (err.message) {
                util.showErrorToast(err.message);
              }
            }
          });
          break;
        }
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
  bindCityPickerChange(e) {
    this.setData({
      citiesIndex: e.detail.value
    })
  },
  bindCityPickerColumnChange(e) {
    const _this = this;
    const data = {
      cities: _this.data.cities,
      citiesIndex: _this.data.citiesIndex
    }
    if (e.detail.column === 0) {
      data.citiesIndex[0] = e.detail.value;
      wx.showLoading({
        title: '请稍后...',
        mask: true
      });
      cityService.cities(data.cities[0][e.detail.value].code).then(res => {
        data.cities[1] = res
        return cityService.cities(data.cities[1][0].code);
      }).then(res => {
        data.citiesIndex[0] = e.detail.value
        data.citiesIndex[1] = 0
        data.citiesIndex[2] = 0
        data.cities[2] = res
        _this.setData(data)
        wx.hideLoading()
      }).catch(err => {
        wx.hideLoading()
        if (err) {
          if (err.message) {
            util.showErrorToast(err.message);
          }
        }
      });
    } else if (e.detail.column === 1) {
      wx.showLoading({
        title: '请稍后...',
        mask: true
      });
      cityService.cities(data.cities[1][e.detail.value].code).then(res => {
        data.cities[2] = res
        data.citiesIndex[1] = e.detail.value
        data.citiesIndex[2] = 0
        _this.setData(data)
        wx.hideLoading()
      }).catch(err => {
        wx.hideLoading()
        if (err) {
          if (err.message) {
            util.showErrorToast(err.message);
          }
        }
      });
    } else {
      data.citiesIndex[2] = e.detail.value
      _this.setData(data)
    }
  },
  chooseFarmLocation: function () {
    const _this = this;
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success() {
              _this.chooseLocation();
            },
            fail() {
              wx.showModal({
                title: '授权提示',
                content: '请允许获取您的位置信息来完善农场地理位置信息。',
                showCancel: false,
                success: function () {
                  wx.openSetting({
                    success(res) {
                      if (!res.authSetting['scope.userLocation']) {
                        wx.navigateBack();
                      } else {
                        _this.chooseLocation();
                      }
                    }
                  })
                }
              })
            }
          })
        } else {
          _this.chooseLocation();
        }
      }
    })
  },
  chooseLocation: function () {
    const _this = this;
    wx.chooseLocation({
      success: function (res) {
        var farm = _this.data.farm;
        farm.longitude = Number(res.longitude).toFixed(6)
        farm.latitude = Number(res.latitude).toFixed(6)
        farm.latlng = Number(res.longitude).toFixed(6) + "," + Number(res.latitude).toFixed(6)
        farm.address = res.address + res.name
        _this.setData({
          farm: farm
        })
      }
    })
  },
  selectFarmLogo: function() {
    const _this = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths;
        wx.showLoading({
          title: '请稍后...',
          mask: true
        });
        wx.uploadFile({
          url: api.UploadApi,
          filePath: tempFilePaths[0],
          name: 'file',
          header: {
            type: 'farm_logo'
          },
          success(res) {
            const data = res.data;
            let farm = _this.data.farm;
            farm.farmLogo = JSON.parse(data).data;
            _this.setData({
              farm: farm
            });
          },
          complete() {
            wx.hideLoading();
          }
        });
      }
    });
  },
  previewQrCodeImage: function () {
    util.previewImage(this.data.farm.qrCodeUrl);
  },
  previewFarmLogoImage: function () {
    util.previewImage(this.data.farm.farmLogo);
  },
  toUpdate: function(e) {
    const _this = this;
    if (_this.data.updating) {
      return false;
    }
    var farm = _this.data.farm;
    var nVal = e.detail.value;
    farm.farmName = nVal.farmName;
    if (farm.farmName === '') {
      util.showErrorToast('农场名称不允许为空');
      return;
    }
    farm.acreage = nVal.acreage;
    farm.farmAddress = nVal.address;
    farm.farmRemark = nVal.remark;
    farm.website = nVal.website;
    farm.formId = e.detail.formId;

    var cities = this.data.cities, citiesIndex = this.data.citiesIndex;
    farm.provinceCode = cities[0][citiesIndex[0]].code;
    farm.cityCode = cities[1][citiesIndex[1]].code;
    farm.countyCode = '';
    if (cities[2][citiesIndex[2]]) {
      farm.countyCode = cities[2][citiesIndex[2]].code;
    }
    _this.setData({
      updating: true
    });
    farmService.updateFarm(farm).then(res => {
      wx.showModal({
        showCancel: false,
        content: '修改成功'
      });
      _this.setData({
        updating: false
      });
    }).catch(err => {
      _this.setData({
        updating: false
      });
      if (err) {
        if (err.message) {
          util.showErrorToast(err.message);
        }
      }
    });
  }
})