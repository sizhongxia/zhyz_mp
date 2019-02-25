var farmService = require('../../../service/farm.js');
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
const app = getApp()
const logger = wx.getLogManager({ level: 1 })

Page({
  data: {
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
      wx.hideLoading();
    }).catch(err => {
      wx.hideLoading();
      logger.log(err);
    });
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
          title: '正在上传...',
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
    _this.setData({
      updating: true
    });
    var farm = _this.data.farm;
    var nVal = e.detail.value;
    farm.farmName = nVal.farmName;
    farm.acreage = nVal.acreage;
    farm.farmAddress = nVal.address;
    farm.farmRemark = nVal.remark;
    farm.website = nVal.website;
    farm.formId = e.detail.formId;
    farmService.updateFarm(farm).then(res => {
      wx.showModal({
        content: '修改成功'
      });
      _this.setData({
        updating: false
      });
    }).catch(err => {
      logger.log(err);
      _this.setData({
        updating: false
      });
    });
  }
})