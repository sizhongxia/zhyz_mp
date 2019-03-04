var api = require('../config/api.js')
var util = require('../utils/util.js')

const cities = code => {
  return util.post(api.Cities, {
    pcode: code
  })
}

module.exports = {
  cities: cities
}