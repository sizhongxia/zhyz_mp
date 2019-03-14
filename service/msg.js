var api = require('../config/api.js')
var util = require('../utils/util.js')

const getMsgData = (farmId) => {
  return util.post(api.MsgData, {
    farmId: farmId
  });
}

module.exports = {
  getMsgData: getMsgData
}