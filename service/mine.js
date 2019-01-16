var api = require('../config/api.js')
var util = require('../utils/util.js')

const getMineBaseInfo = (farmId) => {
  return util.post(api.MineBaseInfo, {
    farmId: farmId
  });
}

const updateUserAvator = (avatarUrl) => {
  return util.post(api.UpdateUserAvator, {
    avatarUrl: avatarUrl
  });
}

module.exports = {
  getMineBaseInfo: getMineBaseInfo,
  updateUserAvator: updateUserAvator
}