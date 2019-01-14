var api = require('../config/api.js')
var util = require('../utils/util.js')

const saveInspection = (inspection) => {
  return util.post(api.SaveInspection, inspection);
}
const selectInspectionData = (farmId, page) => {
  return util.post(api.InspectionData, {
    farmId: farmId,
    page: page
  });
}
const selectInspectionDetail = (inspectionId) => {
  return util.post(api.InspectionDetail, {
    inspectionId: inspectionId
  });
}
const deleteInspection = (inspectionId) => {
  return util.post(api.DeleteInspection, {
    inspectionId: inspectionId
  });
}
const getLastInspectionDetail = (farmId) => {
  return util.post(api.LastInspectionDetail, {
    farmId: farmId
  });
}

module.exports = {
  saveInspection: saveInspection,
  selectInspectionData: selectInspectionData,
  deleteInspection: deleteInspection,
  getLastInspectionDetail: getLastInspectionDetail,
  selectInspectionDetail: selectInspectionDetail
}