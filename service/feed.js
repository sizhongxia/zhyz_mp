var api = require('../config/api.js')
var util = require('../utils/util.js')

const saveFeed = (feed) => {
  return util.post(api.SaveFeed, feed);
}
const saveFeedTag = (feedTag) => {
  return util.post(api.SaveFeedTag, feedTag);
}
const selectFeedTags = (farmId) => {
  return util.post(api.FeedTags, {
    farmId: farmId
  });
}
const deleteFeedTag = (tagId) => {
  return util.post(api.DeleteFeedTag, {
    feedTagId: tagId
  });
}
const selectFeedData = (farmId, farmAreaId, page) => {
  return util.post(api.FeedData, {
    farmId: farmId,
    farmAreaId: farmAreaId,
    page: page
  });
}
const getLastFeedDetail = (farmId) => {
  return util.post(api.LastFeedDetail, {
    farmId: farmId
  });
}
const selectFeedDetail = (feedId) => {
  return util.post(api.FeedDetail, {
    feedId: feedId
  });
}
const changeFeedTagSortNum = (feedTagId) => {
  return util.post(api.UpdateFeedTagSortNum, {
    feedTagId: feedTagId
  });
}

const selectFeedTagDetail = (feedTagId) => {
  return util.post(api.FeedTagDetail, {
    feedTagId: feedTagId
  });
}
const updateFeedTag = (feedTag) => {
  return util.post(api.UpdateFeedTag, feedTag);
}

module.exports = {
  saveFeed: saveFeed,
  saveFeedTag: saveFeedTag,
  selectFeedTags: selectFeedTags,
  deleteFeedTag: deleteFeedTag,
  selectFeedData: selectFeedData,
  selectFeedDetail: selectFeedDetail,
  changeFeedTagSortNum: changeFeedTagSortNum,
  selectFeedTagDetail: selectFeedTagDetail,
  updateFeedTag: updateFeedTag,
  getLastFeedDetail: getLastFeedDetail
}