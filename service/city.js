var api = require('../config/api.js')
var util = require('../utils/util.js')

const cities = code => {
  return util.post(api.Cities, {
    pcode: code
  })
}
const weatherCities = kw => {
  return util.post(api.WeatherCities, {
    kw: kw
  })
}

module.exports = {
  cities: cities,
  weatherCities: weatherCities
}