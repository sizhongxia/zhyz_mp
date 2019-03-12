var api = require('../config/api.js')
var util = require('../utils/util.js')

// const getEquipmentData = (farmId) => {
//   return util.post(api.EquipmentData, {
//     farmId: farmId
//   });
// }

// const getFarmBaseEquipmentData = (farmId) => {
//   return util.post(api.FarmAllEquipmentsData, {
//     farmId: farmId
//   });
// }

const getEquipmentTypeData = (farmId, typeId) => {
  return util.post(api.EquipmentTypeData, {
    farmId: farmId,
    typeId: typeId
  });
}

// const getEquipmentVideoData = (farmId) => {
//   return util.post(api.EquipmentVideoData, {
//     farmId: farmId
//   });
// }

// const getEquipmentCollectionHisData = (equipmentId, date) => {
//   return util.post(api.EquipmentCollectionHisData, {
//     equipmentId: equipmentId,
//     date: date
//   });
// }

// const getEquipmentCollectionAlarmData = (equipmentId, date) => {
//   return util.post(api.EquipmentCollectionAlarmData, {
//     equipmentId: equipmentId,
//     date: date
//   });
// }

// const getEquipmentCollectionHomeTj = (farmId) => {
//   return util.post(api.EquipmentCollectionHomeTj, {
//     farmId: farmId
//   });
// }

module.exports = {
  // getEquipmentData: getEquipmentData,
  // getFarmBaseEquipmentData: getFarmBaseEquipmentData,
  getEquipmentTypeData: getEquipmentTypeData,
  // getEquipmentVideoData: getEquipmentVideoData,
  // getEquipmentCollectionHisData: getEquipmentCollectionHisData,
  // getEquipmentCollectionAlarmData: getEquipmentCollectionAlarmData,
  // getEquipmentCollectionHomeTj: getEquipmentCollectionHomeTj
}