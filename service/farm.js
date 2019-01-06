var api = require('../config/api.js')
var util = require('../utils/util.js')

const authFarms = (state) => {
  return util.post(api.AuthFarms, { state: state });
}
const userApplys = (farmId, state) => {
  return util.post(api.FarmUserVisitApply, { farmId: farmId, state: state });
}
const userApplyHandle = (resId, state) => {
  return util.post(api.FarmUserVisitApplyHandle, { resId: resId, state: state });
}
const farmDetail = (farmId) => {
  return util.post(api.FarmDetail, { farmId: farmId });
}
const applyFarmVisit = (farmId) => {
  return util.post(api.ToApplyFarmVisit, { farmId: farmId });
}
const selectFarmBanners = (farmId) => {
  return util.post(api.FarmBanners, { farmId: farmId });
}
const selectFarmWeather = (weatherCityCode) => {
  return util.post(api.FarmWeather, { weatherCityCode: weatherCityCode });
}
const updateFarm = (farm) => {
  return util.post(api.UpdateFarm, farm);
}
const selectFarmAreas = (farmId) => {
  return util.post(api.FarmAreas, { farmId: farmId });
}

module.exports = {
  authFarms: authFarms,
  userApplys: userApplys,
  userApplyHandle: userApplyHandle,
  farmDetail: farmDetail,
  applyFarmVisit: applyFarmVisit,
  selectFarmBanners: selectFarmBanners,
  selectFarmWeather: selectFarmWeather,
  updateFarm: updateFarm,
  selectFarmAreas: selectFarmAreas
}
