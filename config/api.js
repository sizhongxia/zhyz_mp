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

  FarmAreas: ApiUrl + '/zhyz/miniapp/api/farm/areas',
  SaveFeed: ApiUrl + '/zhyz/miniapp/api/feed/save',
  SaveFeedTag: ApiUrl + '/zhyz/miniapp/api/feed/saveTag',
  FeedTags: ApiUrl + '/zhyz/miniapp/api/feed/feedTags',
  FeedData: ApiUrl + '/zhyz/miniapp/api/feed/data',
  FeedDetail: ApiUrl + '/zhyz/miniapp/api/feed/detail',
  LastFeedDetail: ApiUrl + '/zhyz/miniapp/api/feed/getLastFeed',
  UpdateFeedTagSortNum: ApiUrl + '/zhyz/miniapp/api/feed/changeFeedTagSortNum',
  FeedTagDetail: ApiUrl + '/zhyz/miniapp/api/feed/tagDetail',
  UpdateFeedTag: ApiUrl + '/zhyz/miniapp/api/feed/updateTag',

  InspectionData: ApiUrl + '/zhyz/miniapp/api/inspection/data',
  SaveInspection: ApiUrl + '/zhyz/miniapp/api/inspection/save',
  LastInspectionDetail: ApiUrl + '/zhyz/miniapp/api/inspection/getLastInspection',
  DeleteInspection: ApiUrl + '/zhyz/miniapp/api/inspection/delete',

  FarmPicData: ApiUrl + '/zhyz/miniapp/api/farmPic/data',
  SaveFarmPic: ApiUrl + '/zhyz/miniapp/api/farmPic/save',
  UpdateFarmPic: ApiUrl + '/zhyz/miniapp/api/farmPic/update',
  DeleteFarmPic: ApiUrl + '/zhyz/miniapp/api/farmPic/delete',
  FarmPicDetail: ApiUrl + '/zhyz/miniapp/api/farmPic/detail',

  SaveFarmArea: ApiUrl + '/zhyz/miniapp/api/farmArea/save',
  UpdateFarmArea: ApiUrl + '/zhyz/miniapp/api/farmArea/update',
  DeleteFarmArea: ApiUrl + '/zhyz/miniapp/api/farmArea/delete',
  FarmAreaDetail: ApiUrl + '/zhyz/miniapp/api/farmArea/detail',

  EquipmentData: ApiUrl + '/zhyz/miniapp/api/equipment/list',
  FarmAllEquipmentsData: ApiUrl + '/zhyz/miniapp/api/equipment/allFarmEquipments',
  EquipmentTypeData: ApiUrl + '/zhyz/miniapp/api/equipment/typeList',
  EquipmentCollectionHisData: ApiUrl + '/zhyz/miniapp/api/equipment/collectionHisData',
  EquipmentCollectionAlarmData: ApiUrl + '/zhyz/miniapp/api/equipment/collectionAlarmData',
  EquipmentCollectionHomeTj: ApiUrl + '/zhyz/miniapp/api/equipment/homeTj',

  EquipmentAlarmConfData: ApiUrl + '/zhyz/miniapp/api/equipment/alarm/conf/data',
  SaveEquipmentAlarmConf: ApiUrl + '/zhyz/miniapp/api/equipment/alarm/conf/save',
  EquipmentAlarmConfDetail: ApiUrl + '/zhyz/miniapp/api/equipment/alarm/conf/detail',
  ChangeEquipmentAlarmConfUseState: ApiUrl + '/zhyz/miniapp/api/equipment/alarm/conf/changeUseState',
  DeleteEquipmentAlarmConf: ApiUrl + '/zhyz/miniapp/api/equipment/alarm/conf/delete',
  CheckAlarmPhone: ApiUrl + '/zhyz/miniapp/api/check/alarmPhone',

  PoultryVarietyData: ApiUrl + '/zhyz/miniapp/poultry/variety/data',
  SavePoultryVariety: ApiUrl + '/zhyz/miniapp/poultry/variety/save',
  UpdatePoultryVariety: ApiUrl + '/zhyz/miniapp/poultry/variety/update',
  DeletePoultryVariety: ApiUrl + '/zhyz/miniapp/poultry/variety/delete',
  PoultryVarietyDetail: ApiUrl + '/zhyz/miniapp/poultry/variety/detail',

  SavePoultry: ApiUrl + '/zhyz/miniapp/poultry/save',
  
  
  UploadApi: ApiUrl + '/basic/api/upload'
}