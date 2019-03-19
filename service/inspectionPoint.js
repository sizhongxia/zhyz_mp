var api = require('../config/api.js')
var util = require('../utils/util.js')

const getInspectionPointData = (farmId) => {
  return util.post(api.InspectionPointData, {
    farmId: farmId
  });
}
const saveInspectionPoint = (form) => {
  return util.post(api.SaveInspectionPoint, form);
}
const updateInspectionPoint = (form) => {
  return util.post(api.UpdateInspectionPoint, form);
}

const deleteInspectionPoint = (pointId) => {
  return util.post(api.DeleteInspectionPoint, {
    pointId: pointId
  });
}
const getInspectionPointDetail = (pointId) => {
  return util.post(api.InspectionPointDetail, {
    pointId: pointId
  });
}
const saveInspectionPointCheckItem = (form) => {
  return util.post(api.SaveInspectionPointCheckItem, form);
}
const updateInspectionPointCheckItem = (form) => {
  return util.post(api.UpdateInspectionPointCheckItem, form);
}
const deleteInspectionPointCheckItem = (itemId) => {
  return util.post(api.DeleteInspectionPointCheckItem, {
    itemId: itemId
  });
}
const getInspectionPointCheckItemDetail = (itemId) => {
  return util.post(api.DeleteInspectionPointCheckItem, {
    itemId: itemId
  });
}
module.exports = {
  getInspectionPointData: getInspectionPointData,
  saveInspectionPoint: saveInspectionPoint,
  updateInspectionPoint: updateInspectionPoint,
  deleteInspectionPoint: deleteInspectionPoint,
  getInspectionPointDetail: getInspectionPointDetail,
  saveInspectionPointCheckItem: saveInspectionPointCheckItem,
  updateInspectionPointCheckItem: updateInspectionPointCheckItem,
  deleteInspectionPointCheckItem: deleteInspectionPointCheckItem,
  getInspectionPointCheckItemDetail: getInspectionPointCheckItemDetail
}