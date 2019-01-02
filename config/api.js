const ApiUrl = 'http://192.168.31.144:9091/zhyz/miniapp/api/';
// const ApiUrl = 'http://192.168.31.96:9091/zhyz/miniapp/api/';
// const ApiUrl = 'http://192.168.1.107:9091/zhyz/miniapp/api/';
// const ApiUrl = 'https://wxapi.yeetong.cn/zhyz/miniapp/api/';
module.exports = {

  // 微信登陆
  AuthLogin: ApiUrl + 'auth/wxlogin',
  AuthBind: ApiUrl + 'auth/bind',
  // 授权访问的农场列表
  AuthFarms: ApiUrl + 'farm/auths',
  FarmDetail: ApiUrl + 'farm/detail',
  ToApplyFarmVisit: ApiUrl + 'farm/toApply',
  FarmBanners: ApiUrl + 'farm/banners',
  FarmWeather: ApiUrl + 'farm/weather/baseTxt',
  

}