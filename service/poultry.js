var api = require('../config/api.js')
var util = require('../utils/util.js')

const savePoultry = (form) => {
  return util.post(api.SavePoultry, form);
}

module.exports = {
  savePoultry: savePoultry
}