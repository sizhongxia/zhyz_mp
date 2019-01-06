var api = require('../config/api.js')
var util = require('../utils/util.js')

const saveFeed = (feed) => {
  return util.post(api.SaveFeed, feed);
}
const selectFeedTags = () => {
  return util.post(api.FeedTags, {});
}
const selectFeedData = (farmId, farmAreaId, page) => {
  return util.post(api.FeedData, { farmId: farmId, farmAreaId: farmAreaId, page: page });
}

const selectFeedDetail = (feedId) => {
  return util.post(api.FeedDetail, { feedId: feedId });
}

module.exports = {
  saveFeed: saveFeed,
  selectFeedTags: selectFeedTags,
  selectFeedData: selectFeedData,
  selectFeedDetail: selectFeedDetail
}
