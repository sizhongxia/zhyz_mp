var api = require('../config/api.js')
var util = require('../utils/util.js')

const authFarms = () => {
  return util.post(api.AuthFarms, {})
}

module.exports = {
  authFarms: authFarms
}
