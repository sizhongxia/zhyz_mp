var api = require('../config/api.js')
var util = require('../utils/util.js')

const getMineBaseInfo = (farmId) => {
  return util.post(api.MineBaseInfo, {
    farmId: farmId
  });
}

module.exports = {
  getMineBaseInfo: getMineBaseInfo
}