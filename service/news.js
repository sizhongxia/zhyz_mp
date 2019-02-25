var api = require('../config/api.js')
var util = require('../utils/util.js')

const getNewsByPage = (page) => {
  return util.post(api.NewsData, {
    page: page
  });
}

module.exports = {
  getNewsByPage: getNewsByPage
}