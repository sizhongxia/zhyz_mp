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

const getEquipmentAlarmConfDetail = (confId) => {
  return util.post(api.EquipmentAlarmConfDetail, {
    confId: confId
  });
}

const changeEquipmentAlarmConfUseState = (confId, monitorState) => {
  return util.post(api.ChangeEquipmentAlarmConfUseState, {
    confId: confId,
    monitorState: monitorState
  });
}

const deleteEquipmentAlarmConf = (confId) => {
  return util.post(api.DeleteEquipmentAlarmConf, {
    confId: confId
  });
}

module.exports = {
  getEquipmentAlarmConfData: getEquipmentAlarmConfData,
  checkAlarmPhone: checkAlarmPhone,
  saveEquipmentAlarmConf: saveEquipmentAlarmConf,
  getEquipmentAlarmConfDetail: getEquipmentAlarmConfDetail,
  changeEquipmentAlarmConfUseState: changeEquipmentAlarmConfUseState,
  deleteEquipmentAlarmConf: deleteEquipmentAlarmConf
}