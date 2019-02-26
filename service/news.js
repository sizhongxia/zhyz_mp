var api = require('../config/api.js')
var util = require('../utils/util.js')

const getNewsByPage = (page, size) => {
  return util.post(api.NewsData, {
    page: page,
    size: size || 10
  });
}

module.exports = {
  getNewsByPage: getNewsByPage
}