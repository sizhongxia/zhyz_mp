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

const updateUserOrganize = (organizeName) => {
  return util.post(api.UpdateUserOrganize, {
    organizeName: organizeName
  });
}

const updateUserPhoneNo = (phoneNo) => {
  return util.post(api.UpdateUserPhoneNo, {
    phoneNo: phoneNo
  });
}

const updateUserName = (userName) => {
  return util.post(api.UpdateUserName, {
    userName: userName
  });
}

const updateUserEmail = (email) => {
  return util.post(api.UpdateUserEmail, {
    email: email
  });
}

const userInfo = () => {
  return util.post(api.UserInfo);
}


module.exports = {
  getMineBaseInfo: getMineBaseInfo,
  updateUserAvator: updateUserAvator,
  updateUserName: updateUserName,
  updateUserPhoneNo: updateUserPhoneNo,
  updateUserOrganize: updateUserOrganize,
  updateUserEmail: updateUserEmail,
  userInfo: userInfo
}