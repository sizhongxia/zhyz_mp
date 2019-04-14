// const ApiUrl = 'http://192.168.31.144:9091';
// const ApiUrl = 'http://192.168.1.105:9091';
const ApiUrl = 'https://wxapi.yeetong.cn';
module.exports = {
  // 微信登陆
  AuthLogin: ApiUrl + '/zhyz/miniapp/api/auth/wxlogin',
  AuthReg: ApiUrl + '/zhyz/miniapp/api/auth/reg',
  AuthResetPwd: ApiUrl + '/zhyz/miniapp/api/auth/resetpwd',
  AuthBind: ApiUrl + '/zhyz/miniapp/api/auth/bind',
  AuthBindWx: ApiUrl + '/zhyz/miniapp/api/auth/bindwx',
  UpdateUserOrganize: ApiUrl + '/zhyz/miniapp/api/user/updateOrganize',
  UpdateUserEmail: ApiUrl + '/zhyz/miniapp/api/user/updateEmail',
  UpdateUserAvator: ApiUrl + '/zhyz/miniapp/api/user/updateAvator',
  UserInfo: ApiUrl + '/zhyz/miniapp/api/user/info',

  CheckUserSignin: ApiUrl + '/zhyz/miniapp/api/user/signin/check',
  SaveUserSignin: ApiUrl + '/zhyz/miniapp/api/user/signin/save',
  GainFormId: ApiUrl + '/zhyz/miniapp/api/user/signin/gainFormId',

  Cities: ApiUrl + '/zhyz/miniapp/api/cities',
  WeatherCities: ApiUrl + '/zhyz/miniapp/api/weatherCities',
  SendSmsVcode: ApiUrl + '/zhyz/miniapp/api/sendsmsvcode',

  // 授权访问的农场列表
  AuthFarms: ApiUrl + '/zhyz/miniapp/api/farm/auths',
  FarmUserVisitApply: ApiUrl + '/zhyz/miniapp/api/farm/userApplys',
  FarmUserVisitApplyHandle: ApiUrl + '/zhyz/miniapp/api/farm/userApplyHandle',
  FarmHomeData: ApiUrl + '/zhyz/miniapp/api/farm/homeData',
  FarmDetail: ApiUrl + '/zhyz/miniapp/api/farm/detail',
  FarmFuncs: ApiUrl + '/zhyz/miniapp/api/farm/funcs',
  FarmSaveFunc: ApiUrl + '/zhyz/miniapp/api/farm/addFunc',
  FarmDelFunc: ApiUrl + '/zhyz/miniapp/api/farm/delFunc',
  FarmCreate: ApiUrl + '/zhyz/miniapp/api/farm/create',
  UpdateFarmWeatherInfo: ApiUrl + '/zhyz/miniapp/api/farm/updateWeatherInfo',
  ToApplyFarmVisit: ApiUrl + '/zhyz/miniapp/api/farm/toApply',
  FarmBanners: ApiUrl + '/zhyz/miniapp/api/farm/banners',
  FarmWeather: ApiUrl + '/zhyz/miniapp/api/farm/weather',
  UpdateFarm: ApiUrl + '/zhyz/miniapp/api/farm/update',
  FarmUserAuthInfo: ApiUrl + '/zhyz/miniapp/api/farm/userAuthInfo',
  UpdateFarmUserAuthInfo: ApiUrl + '/zhyz/miniapp/api/farm/updateUserAuthInfo',
  MineBaseInfo: ApiUrl + '/zhyz/miniapp/api/farm/mineBaseInfo',
  FarmAreas: ApiUrl + '/zhyz/miniapp/api/farm/areas',
  
  SaveFeed: ApiUrl + '/zhyz/miniapp/api/feed/save',
  SaveFeedTag: ApiUrl + '/zhyz/miniapp/api/feed/saveTag',
  DeleteFeedTag: ApiUrl + '/zhyz/miniapp/api/feed/deleteTag',
  FeedTags: ApiUrl + '/zhyz/miniapp/api/feed/feedTags',
  FeedData: ApiUrl + '/zhyz/miniapp/api/feed/data',
  FeedDetail: ApiUrl + '/zhyz/miniapp/api/feed/detail',
  LastFeedDetail: ApiUrl + '/zhyz/miniapp/api/feed/getLastFeed',
  UpdateFeedTagSortNum: ApiUrl + '/zhyz/miniapp/api/feed/changeFeedTagSortNum',
  FeedTagDetail: ApiUrl + '/zhyz/miniapp/api/feed/tagDetail',
  UpdateFeedTag: ApiUrl + '/zhyz/miniapp/api/feed/updateTag',

  InspectionData: ApiUrl + '/zhyz/miniapp/api/inspection/data',
  SaveInspection: ApiUrl + '/zhyz/miniapp/api/inspection/save',
  InspectionDetail: ApiUrl + '/zhyz/miniapp/api/inspection/detail',
  LastInspectionDetail: ApiUrl + '/zhyz/miniapp/api/inspection/getLastInspection',
  DeleteInspection: ApiUrl + '/zhyz/miniapp/api/inspection/delete',
  
  InspectionPointData: ApiUrl + '/zhyz/miniapp/api/inspection/point/data',
  SaveInspectionPoint: ApiUrl + '/zhyz/miniapp/api/inspection/point/save',
  UpdateInspectionPointName: ApiUrl + '/zhyz/miniapp/api/inspection/point/updateName',
  UpdateInspectionPointFarmLocation: ApiUrl + '/zhyz/miniapp/api/inspection/point//updateFarmLocation',
  UpdateInspectionPointFarmArea: ApiUrl + '/zhyz/miniapp/api/inspection/point/updateFarmArea',
  UpdateInspectionPointObjectId: ApiUrl + '/zhyz/miniapp/api/inspection/point/updateObjectId',
  DeleteInspectionPoint: ApiUrl + '/zhyz/miniapp/api/inspection/point/delete',

  InspectionPointDetail: ApiUrl + '/zhyz/miniapp/api/inspection/point/detail',
  SaveInspectionPointCheckItem: ApiUrl + '/zhyz/miniapp/api/inspection/point/saveCheckItem',
  UpdateInspectionPointCheckItem: ApiUrl + '/zhyz/miniapp/api/inspection/point/updateCheckItem',
  DeleteInspectionPointCheckItem: ApiUrl + '/zhyz/miniapp/api/inspection/point/deleteCheckItem',
  InspectionPointCheckItemDetail: ApiUrl + '/zhyz/miniapp/api/inspection/point/checkItemDetail',

  FarmPicData: ApiUrl + '/zhyz/miniapp/api/farmPic/data',
  SaveFarmPic: ApiUrl + '/zhyz/miniapp/api/farmPic/save',
  UpdateFarmPic: ApiUrl + '/zhyz/miniapp/api/farmPic/update',
  DeleteFarmPic: ApiUrl + '/zhyz/miniapp/api/farmPic/delete',
  FarmPicDetail: ApiUrl + '/zhyz/miniapp/api/farmPic/detail',

  SaveFarmArea: ApiUrl + '/zhyz/miniapp/api/farmArea/save',
  UpdateFarmArea: ApiUrl + '/zhyz/miniapp/api/farmArea/update',
  DeleteFarmArea: ApiUrl + '/zhyz/miniapp/api/farmArea/delete',
  FarmAreaDetail: ApiUrl + '/zhyz/miniapp/api/farmArea/detail',

  EquipmentDetail: ApiUrl + '/zhyz/miniapp/api/equipment/detail',
  EquipmentTypeData: ApiUrl + '/zhyz/miniapp/api/equipment/typeList',
  EquipmentMonitorItems: ApiUrl + '/zhyz/miniapp/api/equipment/monitorItems',
  // EquipmentData: ApiUrl + '/zhyz/miniapp/api/equipment/list',
  // FarmAllEquipmentsData: ApiUrl + '/zhyz/miniapp/api/equipment/allFarmEquipments',
  // EquipmentVideoData: ApiUrl + '/zhyz/miniapp/api/equipment/videoList',
  // EquipmentCollectionHisData: ApiUrl + '/zhyz/miniapp/api/equipment/collectionHisData',
  EquipmentCollectionAlarmData: ApiUrl + '/zhyz/miniapp/api/equipment/collectionAlarmData',
  EquipmentCollectionAlarmDetail: ApiUrl + '/zhyz/miniapp/api/equipment/collectionAlarmDetail',
  
  // EquipmentCollectionHomeTj: ApiUrl + '/zhyz/miniapp/api/equipment/homeTj',

  EquipmentAlarmConfData: ApiUrl + '/zhyz/miniapp/api/equipment/alarm/conf/data',
  SaveEquipmentAlarmConf: ApiUrl + '/zhyz/miniapp/api/equipment/alarm/conf/save',
  EquipmentAlarmConfDetail: ApiUrl + '/zhyz/miniapp/api/equipment/alarm/conf/detail',
  ChangeEquipmentAlarmConfUseState: ApiUrl + '/zhyz/miniapp/api/equipment/alarm/conf/changeUseState',
  DeleteEquipmentAlarmConf: ApiUrl + '/zhyz/miniapp/api/equipment/alarm/conf/delete',
  UpdateAlarmConfRule: ApiUrl + '/zhyz/miniapp/api/equipment/alarm/conf/updateRule',
  UpdateAlarmConfPushInterval: ApiUrl + '/zhyz/miniapp/api/equipment/alarm/conf/updatePushInterval',
  UpdateAlarmConfPushType: ApiUrl + '/zhyz/miniapp/api/equipment/alarm/conf/updatePushType',
  SaveAlarmConfPushPerson: ApiUrl + '/zhyz/miniapp/api/equipment/alarm/conf/addPushPerson',
  DelAlarmConfPushPerson: ApiUrl + '/zhyz/miniapp/api/equipment/alarm/conf/rmPushPerson',
  

  CheckAlarmPhone: ApiUrl + '/zhyz/miniapp/api/check/alarmPhone',

  PoultryVarietyData: ApiUrl + '/zhyz/miniapp/api/poultry/variety/data',
  SavePoultryVariety: ApiUrl + '/zhyz/miniapp/api/poultry/variety/save',
  UpdatePoultryVariety: ApiUrl + '/zhyz/miniapp/api/poultry/variety/update',
  DeletePoultryVariety: ApiUrl + '/zhyz/miniapp/api/poultry/variety/delete',
  PoultryVarietyDetail: ApiUrl + '/zhyz/miniapp/api/poultry/variety/detail',

  SavePoultry: ApiUrl + '/zhyz/miniapp/api/poultry/save',
  PoultryData: ApiUrl + '/zhyz/miniapp/api/poultry/data',
  PoultryDetail: ApiUrl + '/zhyz/miniapp/api/poultry/detail',
  PoultryTypeNums: ApiUrl + '/zhyz/miniapp/api/poultry/tjdata',
  PoultryQrcode: ApiUrl + '/zhyz/miniapp/api/poultry/qrcode/',

  LayeggsData: ApiUrl + '/zhyz/miniapp/api/layeggs/data',
  LastLayeggs: ApiUrl + '/zhyz/miniapp/api/layeggs/getLastLayeggs',
  SaveLayeggs: ApiUrl + '/zhyz/miniapp/api/layeggs/save',
  LayeggsDetail: ApiUrl + '/zhyz/miniapp/api/layeggs/detail',
  DeleteLayeggs: ApiUrl + '/zhyz/miniapp/api/layeggs/delete',

  GetFuncs: ApiUrl + '/zhyz/miniapp/api/getFuncs',
  GetFuncDetail: ApiUrl + '/zhyz/miniapp/api/getFuncDetail',
  MsgData: ApiUrl + '/zhyz/miniapp/api/msg/list',
  WarningMsgData: ApiUrl + '/zhyz/miniapp/api/msg/warnings',
  SystemMsgData: ApiUrl + '/zhyz/miniapp/api/msg/system/messages',
  CheckMsgDot: ApiUrl + '/zhyz/miniapp/api/msg/checkMsgDot',
  CleanSystemMsgDot: ApiUrl + '/zhyz/miniapp/api/msg/cleanSystemMsgDot',
  CleanWarningMsgDot: ApiUrl + '/zhyz/miniapp/api/msg/cleanWarningMsgDot',

  NewsData: ApiUrl + '/zhyz/miniapp/api/news/list',

  UploadApi: ApiUrl + '/basic/api/upload'
}