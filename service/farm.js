var api = require('../config/api.js')
var util = require('../utils/util.js')

const authFarms = () => {
  return util.post(api.AuthFarms, {})
}
const farmDetail = (farmId) => {
  return util.post(api.FarmDetail, { farmId: farmId })
}
const applyFarmVisit = (farmId) => {
  return util.post(api.ToApplyFarmVisit, { farmId: farmId })
}

module.exports = {
  authFarms: authFarms,
  farmDetail: farmDetail,
  applyFarmVisit: applyFarmVisit
}
