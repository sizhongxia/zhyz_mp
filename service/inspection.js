var api = require('../config/api.js')
var util = require('../utils/util.js')

const saveInspection = (inspection) => {
  return util.post(api.SaveInspection, inspection);
}
const selectInspectionData = (farmId, page) => {
  return util.post(api.InspectionData, { farmId: farmId, page: page });
}
const deleteInspection = (inspectionId) => {
  return util.post(api.DeleteInspection, { inspectionId: inspectionId});
}

module.exports = {
  saveInspection: saveInspection,
  selectInspectionData: selectInspectionData,
  deleteInspection: deleteInspection
}