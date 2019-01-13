var api = require('../config/api.js')
var util = require('../utils/util.js')

const savePoultry = (form) => {
  return util.post(api.SavePoultry, form);
}
const getPoultryData = (farmId, poultryCode, batchNo, poultryTypeId, page) => {
  return util.post(api.PoultryData, {
    farmId: farmId,
    poultryCode: poultryCode,
    batchNo: batchNo,
    poultryTypeId: poultryTypeId,
    page: page
  });
}
const getPoultryTypeNums = (farmId) => {
  return util.post(api.PoultryTypeNums, {
    farmId: farmId
  });
}

module.exports = {
  savePoultry: savePoultry,
  getPoultryTypeNums: getPoultryTypeNums,
  getPoultryData: getPoultryData
}