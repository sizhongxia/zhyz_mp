var api = require('../config/api.js')
var util = require('../utils/util.js')

const getMsgData = (farmId) => {
  return util.post(api.MsgData, {
    farmId: farmId
  });
}

const getWarningMsgData = (farmId, page) => {
  return util.post(api.WarningMsgData, {
    farmId: farmId,
    page: page
  });
}

const getSystemMsgData = (page) => {
  return util.post(api.SystemMsgData, {
    page: page
  });
}

const checkMsgDot = (farmId) => {
  return util.post(api.CheckMsgDot, {
    farmId: farmId
  });
}

const cleanWarningMsgDot = (farmId) => {
  return util.post(api.CleanWarningMsgDot, {
    farmId: farmId
  });
}

const cleanSystemMsgDot = () => {
  return util.post(api.CleanSystemMsgDot);
}

module.exports = {
  getMsgData: getMsgData,
  getWarningMsgData: getWarningMsgData,
  getSystemMsgData: getSystemMsgData,
  checkMsgDot: checkMsgDot,
  cleanWarningMsgDot: cleanWarningMsgDot,
  cleanSystemMsgDot: cleanSystemMsgDot
}