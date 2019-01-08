var api = require('../config/api.js')
var util = require('../utils/util.js')

const getEquipmentData = (farmId) => {
  return util.post(api.EquipmentData, {
    farmId: farmId
  });
}
const getEquipmentTypeData = (farmId, typeId) => {
  return util.post(api.EquipmentTypeData, {
    farmId: farmId,
    typeId: typeId
  });
}



module.exports = {
  getEquipmentData: getEquipmentData,
  getEquipmentTypeData: getEquipmentTypeData
}