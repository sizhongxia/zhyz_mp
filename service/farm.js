var api = require('../config/api.js')
var util = require('../utils/util.js')

const authFarms = (state) => {
  return util.post(api.AuthFarms, {
    state: state
  });
}
const getFarmHomeData = (farmId) => {
  return util.post(api.FarmHomeData, {
    farmId: farmId
  });
}
const getFarmFuncs = (farmId) => {
  return util.post(api.FarmFuncs, {
    farmId: farmId
  });
}
const saveFarmFunc = (farmId, funcPlatformId) => {
  return util.post(api.FarmSaveFunc, {
    farmId: farmId,
    funcPlatformId: funcPlatformId
  });
}
const delFarmFunc = (farmId, funcPlatformId) => {
  return util.post(api.FarmDelFunc, {
    farmId: farmId,
    funcPlatformId: funcPlatformId
  });
}
const userApplys = (farmId, state) => {
  return util.post(api.FarmUserVisitApply, {
    farmId: farmId,
    state: state
  });
}
const getFarmUserAuthInfo = (resId) => {
  return util.post(api.FarmUserAuthInfo, {
    resId: resId
  });
}
const updateFarmUserAuthInfo = (form) => {
  return util.post(api.UpdateFarmUserAuthInfo, form);
}
const createFarm = (form) => {
  return util.post(api.FarmCreate, form);
}
const userApplyHandle = (resId, state) => {
  return util.post(api.FarmUserVisitApplyHandle, {
    resId: resId,
    state: state
  });
}
const farmDetail = (farmId) => {
  return util.post(api.FarmDetail, {
    farmId: farmId
  });
}
const applyFarmVisit = (farmId) => {
  return util.post(api.ToApplyFarmVisit, {
    farmId: farmId
  });
}
const selectFarmBanners = (farmId) => {
  return util.post(api.FarmBanners, {
    farmId: farmId
  });
}
const selectFarmWeather = (weatherCityCode) => {
  return util.post(api.FarmWeather, {
    weatherCityCode: weatherCityCode
  });
}
const updateFarm = (farm) => {
  return util.post(api.UpdateFarm, farm);
}
const selectFarmAreas = (farmId) => {
  return util.post(api.FarmAreas, {
    farmId: farmId
  });
}

const updateFarmWeatherInfo = (farmId, cityCode) => {
  return util.post(api.UpdateFarmWeatherInfo, {
    farmId: farmId,
    cityCode: cityCode
  });
}

module.exports = {
  getFarmHomeData: getFarmHomeData,
  authFarms: authFarms,
  createFarm: createFarm,
  getFarmFuncs: getFarmFuncs,
  saveFarmFunc: saveFarmFunc,
  delFarmFunc: delFarmFunc,
  userApplys: userApplys,
  userApplyHandle: userApplyHandle,
  getFarmUserAuthInfo: getFarmUserAuthInfo,
  updateFarmUserAuthInfo: updateFarmUserAuthInfo,
  updateFarmWeatherInfo: updateFarmWeatherInfo,
  farmDetail: farmDetail,
  applyFarmVisit: applyFarmVisit,
  selectFarmBanners: selectFarmBanners,
  selectFarmWeather: selectFarmWeather,
  updateFarm: updateFarm,
  selectFarmAreas: selectFarmAreas
}