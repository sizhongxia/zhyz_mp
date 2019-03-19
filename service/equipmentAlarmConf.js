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

const updateAlarmConfRule = (confId, monitorItemCode, monitorAlarmValue, operationalCharacter) => {
  return util.post(api.UpdateAlarmConfRule, {
    confId: confId,
    monitorItemCode: monitorItemCode,
    monitorAlarmValue: monitorAlarmValue,
    operationalCharacter: operationalCharacter
  });
}
const updateAlarmConfPushInterval = (confId, pushInterval) => {
  return util.post(api.UpdateAlarmConfPushInterval, {
    confId: confId,
    pushInterval: pushInterval
  });
}
const updateAlarmConfPushType = (confId, pushTypes) => {
  return util.post(api.UpdateAlarmConfPushType, {
    confId: confId,
    pushTypes: pushTypes
  });
}
const saveAlarmConfPushPerson = (confId, pushPerson) => {
  return util.post(api.SaveAlarmConfPushPerson, {
    confId: confId,
    pushPerson: pushPerson
  });
}
const delAlarmConfPushPerson = (confId, userId) => {
  return util.post(api.DelAlarmConfPushPerson, {
    confId: confId,
    userId: userId
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
  updateAlarmConfRule: updateAlarmConfRule,
  updateAlarmConfPushInterval: updateAlarmConfPushInterval,
  updateAlarmConfPushType: updateAlarmConfPushType,
  saveAlarmConfPushPerson: saveAlarmConfPushPerson,
  delAlarmConfPushPerson: delAlarmConfPushPerson,
  saveEquipmentAlarmConf: saveEquipmentAlarmConf,
  getEquipmentAlarmConfDetail: getEquipmentAlarmConfDetail,
  changeEquipmentAlarmConfUseState: changeEquipmentAlarmConfUseState,
  deleteEquipmentAlarmConf: deleteEquipmentAlarmConf
}