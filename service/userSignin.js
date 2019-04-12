var api = require('../config/api.js')
var util = require('../utils/util.js')

const checkSignin = () => {
  return util.post(api.CheckUserSignin, {});
}
const saveSignin = (formId) => {
  return util.post(api.SaveUserSignin, {
    formId: formId
  });
}

module.exports = {
  checkSignin: checkSignin,
  saveSignin: saveSignin
}