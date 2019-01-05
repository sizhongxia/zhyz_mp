const ApiUrl = 'http://192.168.31.144:9091';
// const ApiUrl = 'http://192.168.31.96:9091';
// const ApiUrl = 'http://192.168.1.107:9091';
// const ApiUrl = 'https://wxapi.yeetong.cn';
module.exports = {

  // 微信登陆
  AuthLogin: ApiUrl + '/zhyz/miniapp/api/auth/wxlogin',
  AuthBind: ApiUrl + '/zhyz/miniapp/api/auth/bind',
  // 授权访问的农场列表
  AuthFarms: ApiUrl + '/zhyz/miniapp/api/farm/auths',
  FarmUserVisitApply: ApiUrl + '/zhyz/miniapp/api/farm/userApplys',
  FarmUserVisitApplyHandle: ApiUrl + '/zhyz/miniapp/api/farm/userApplyHandle',
  FarmDetail: ApiUrl + '/zhyz/miniapp/api/farm/detail',
  ToApplyFarmVisit: ApiUrl + '/zhyz/miniapp/api/farm/toApply',
  FarmBanners: ApiUrl + '/zhyz/miniapp/api/farm/banners',
  FarmWeather: ApiUrl + '/zhyz/miniapp/api/farm/weather/baseTxt',
  UpdateFarm: ApiUrl + '/zhyz/miniapp/api/farm/update',
  MineBaseInfo: ApiUrl + '/zhyz/miniapp/api/farm/mineBaseInfo',

  UploadApi: ApiUrl + '/basic/api/upload',


}