var farmService = require('../../../service/farm.js');
var util = require('../../../utils/util.js');
const app = getApp()
const logger = wx.getLogManager({ level: 1 })

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    farm: {},
    applyModalVisible: false
  },
  scanFarmCode: function () {
    const _this = this;
    wx.scanCode({
      onlyFromCamera: false,
      scanType: ['qrCode'],
      success(res) {
        var qrVal = res.result.replace(new RegExp('"', "g"), "");
        if (qrVal.indexOf('https://farm.yeetong.cn/') === 0) {
          farmService.farmDetail(qrVal.substr(24)).then(res => {
            _this.setData({
              farm: res,
              applyModalVisible: true
            });
          }).catch(err => {
            logger.log(err);
          });
        } else {
          util.showErrorToast('无效的二维码');
        }
      },
      fail(err) {
        util.showErrorToast('无效的二维码');
      }
    });
  },
  toApply: function () {
    const _this = this;
    _this.toClose();
    farmService.applyFarmVisit(_this.data.farm.farmId).then(res => {
      if (res === 'SUC') {
        wx.showModal({
          title: '申请成功',
          content: '请耐心等待农场管理员审核',
        });
      } else if (res === 'D') {
        util.showErrorToast('请耐心等待农场管理员审核')
      } else if (res === 'Y') {
        wx.setStorageSync('curr-farm-id', _this.data.farm.farmId);
        wx.setStorageSync('curr-farm-identity', 'visitor');
        wx.switchTab({
          url: '/pages/index/index'
        });
      }
    }).catch(err => {
      logger.log(err);
    });
  },
  toClose: function () {
    this.setData({
      applyModalVisible: false
    });
  }
})