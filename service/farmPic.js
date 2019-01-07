var api = require('../config/api.js')
var util = require('../utils/util.js')

const getFarmPicData = (farmId) => {
  return util.post(api.FarmPicData, {
    farmId: farmId
  });
}

module.exports = {
  getFarmPicData: getFarmPicData
}