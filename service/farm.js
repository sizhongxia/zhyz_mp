var api = require('../config/api.js')
var util = require('../utils/util.js')

const authFarms = () => {
  return util.post(api.AuthFarms, {});
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

module.exports = {
  authFarms: authFarms,
  farmDetail: farmDetail,
  applyFarmVisit: applyFarmVisit,
  selectFarmBanners: selectFarmBanners,
  selectFarmWeather: selectFarmWeather,
  updateFarm: updateFarm
}
