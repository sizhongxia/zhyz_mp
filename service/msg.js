var api = require('../config/api.js')
var util = require('../utils/util.js')

const getMsgData = () => {
  return util.post(api.MsgData);
}

const checkMsgDot = () => {
  return util.post(api.CheckMsgDot);
}

const cleanMsgDot = (msgType) => {
  return util.post(api.CleanMsgDot, {
    msgType: msgType
  });
}

const getMsgTypeItemsData = (msgType, page) => {
  return util.post(api.MsgTypeItemsData, {
    msgType: msgType,
    page: page
  });
}

// const getWarningMsgData = (farmId, page) => {
//   return util.post(api.WarningMsgData, {
//     farmId: farmId,
//     page: page
//   });
// }

// const getSystemMsgData = (page) => {
//   return util.post(api.SystemMsgData, {
//     page: page
//   });
// }


// const cleanSystemMsgDot = () => {
//   return util.post(api.CleanSystemMsgDot);
// }

module.exports = {
  getMsgData: getMsgData,
  // getWarningMsgData: getWarningMsgData,
  // getSystemMsgData: getSystemMsgData,
  checkMsgDot: checkMsgDot,
  cleanMsgDot: cleanMsgDot,
  getMsgTypeItemsData: getMsgTypeItemsData
}