var api = require('../config/api.js')
var util = require('../utils/util.js')

const getAllMpFuncs = (farmId) => {
  return util.post(api.GetFuncs, {
    farmId: farmId,
    platformType: '02'
  });
}

const getFuncDetail = (resId, farmId) => {
  return util.post(api.GetFuncDetail, {
    farmId: farmId,
    resId: resId
  });
}


module.exports = {
  getAllMpFuncs: getAllMpFuncs,
  getFuncDetail: getFuncDetail
}