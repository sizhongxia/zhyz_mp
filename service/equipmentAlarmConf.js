var api = require('../config/api.js')
var util = require('../utils/util.js')

const getEquipmentAlarmConfData = (equipmentId) => {
  return util.post(api.EquipmentAlarmConfData, {
    equipmentId: equipmentId
  });
}

const checkAlarmPhone = (phoneNo) => {
  return util.post(api.CheckAlarmPhone, {
    phoneNo: phoneNo
  });
}

const saveEquipmentAlarmConf = (form) => {
  return util.post(api.SaveEquipmentAlarmConf, form);
}

module.exports = {
  getEquipmentAlarmConfData: getEquipmentAlarmConfData,
  checkAlarmPhone: checkAlarmPhone,
  saveEquipmentAlarmConf: saveEquipmentAlarmConf
}