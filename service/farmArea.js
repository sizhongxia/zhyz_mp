var api = require('../config/api.js')
var util = require('../utils/util.js')


const saveFarmArea = (farmArea) => {
  return util.post(api.SaveFarmArea, farmArea);
}
const getFarmAreaDetail = (areaId) => {
  return util.post(api.FarmAreaDetail, {
    areaId: areaId
  });
}
const deleteFarmArea = (areaId) => {
  return util.post(api.DeleteFarmArea, {
    areaId: areaId
  });
}
const updateFarmArea = (farmArea) => {
  return util.post(api.UpdateFarmArea, farmArea);
}

module.exports = {
  saveFarmArea: saveFarmArea,
  getFarmAreaDetail: getFarmAreaDetail,
  deleteFarmArea: deleteFarmArea,
  updateFarmArea: updateFarmArea
}