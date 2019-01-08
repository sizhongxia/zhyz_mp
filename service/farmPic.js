var api = require('../config/api.js')
var util = require('../utils/util.js')

const getFarmPicData = (farmId) => {
  return util.post(api.FarmPicData, {
    farmId: farmId
  });
}
const saveFarmPic = (farmPic) => {
  return util.post(api.SaveFarmPic, farmPic);
}
const getFarmPicDetail = (picId) => {
  return util.post(api.FarmPicDetail, {
    picId: picId
  });
}
const deleteFarmPic = (picId) => {
  return util.post(api.DeleteFarmPic, {
    picId: picId
  });
}
const updateFarmPic = (farmPic) => {
  return util.post(api.UpdateFarmPic, farmPic);
}

module.exports = {
  getFarmPicData: getFarmPicData,
  saveFarmPic: saveFarmPic,
  getFarmPicDetail: getFarmPicDetail,
  deleteFarmPic: deleteFarmPic,
  updateFarmPic: updateFarmPic
}