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

const updateInspectionPointName = (form) => {
  return util.post(api.UpdateInspectionPointName, form);
}

const updateInspectionPointFarmLocation = (form) => {
  return util.post(api.UpdateInspectionPointFarmLocation, form);
}

const updateInspectionPointFarmArea = (form) => {
  return util.post(api.UpdateInspectionPointFarmArea, form);
}

const updateInspectionPointObjectId = (form) => {
  return util.post(api.UpdateInspectionPointObjectId, form);
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
  updateInspectionPointName: updateInspectionPointName,
  updateInspectionPointFarmLocation: updateInspectionPointFarmLocation,
  updateInspectionPointFarmArea: updateInspectionPointFarmArea,
  updateInspectionPointObjectId: updateInspectionPointObjectId,
  deleteInspectionPoint: deleteInspectionPoint,
  getInspectionPointDetail: getInspectionPointDetail,
  saveInspectionPointCheckItem: saveInspectionPointCheckItem,
  updateInspectionPointCheckItem: updateInspectionPointCheckItem,
  deleteInspectionPointCheckItem: deleteInspectionPointCheckItem,
  getInspectionPointCheckItemDetail: getInspectionPointCheckItemDetail
}