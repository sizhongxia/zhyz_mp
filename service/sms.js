var api = require('../config/api.js')
var util = require('../utils/util.js')

const sendSmsVcode = data => {
  return util.post(api.SendSmsVcode, {
    smsType: data.smsType,
    phoneNo: data.phoneNo
  })
}

module.exports = {
  sendSmsVcode: sendSmsVcode
}