var api = require('../config/api.js')
var util = require('../utils/util.js')

const saveLayeggs = (form) => {
  return util.post(api.SaveLayeggs, form);
}
const getLayeggsData = (farmId, collectDate, searchType, page) => {
  return util.post(api.LayeggsData, {
    farmId: farmId,
    collectDate: collectDate,
    searchType: searchType,
    page: page
  });
}
const getLastLayeggs = (farmId) => {
  return util.post(api.LastLayeggs, {
    farmId: farmId
  });
}
const getLayeggsDetail = (layeggsId) => {
  return util.post(api.LayeggsDetail, {
    layeggsId: layeggsId
  });
}
const deleteLayeggs = (layeggsId) => {
  return util.post(api.DeleteLayeggs, {
    layeggsId: layeggsId
  });
}

module.exports = {
  saveLayeggs: saveLayeggs,
  getLayeggsData: getLayeggsData,
  getLastLayeggs: getLastLayeggs,
  getLayeggsDetail: getLayeggsDetail,
  deleteLayeggs: deleteLayeggs
}