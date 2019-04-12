const vPush = require("./vpush/vpush.pro.js");
App({
  vPush: new vPush('wxb4bab327bf7710a4'),
  onLaunch: function () {
  },
  globalData: {
    userInfo: null
  }
})