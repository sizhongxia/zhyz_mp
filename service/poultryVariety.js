var api = require('../config/api.js')
var util = require('../utils/util.js')

const getPoultryVarietyData = (farmId, poultryTypeId) => {
  return util.post(api.PoultryVarietyData, {
    farmId: farmId,
    poultryTypeId: poultryTypeId
  });
}
const savePoultryVariety = (form) => {
  return util.post(api.SavePoultryVariety, form);
}
const updatePoultryVariety = (form) => {
  return util.post(api.UpdatePoultryVariety, form);
}
const deletePoultryVariety = (varietyId) => {
  return util.post(api.DeletePoultryVariety, {
    varietyId: varietyId
  });
}
const getPoultryVarietyDetail = (varietyId) => {
  return util.post(api.PoultryVarietyDetail, {
    varietyId: varietyId
  });
}

module.exports = {
  getPoultryVarietyData: getPoultryVarietyData,
  savePoultryVariety: savePoultryVariety,
  updatePoultryVariety: updatePoultryVariety,
  deletePoultryVariety: deletePoultryVariety,
  getPoultryVarietyDetail: getPoultryVarietyDetail
}