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

const userInfo = () => {
  return util.post(api.UserInfo);
}


module.exports = {
  getMineBaseInfo: getMineBaseInfo,
  updateUserAvator: updateUserAvator,
  userInfo: userInfo
}