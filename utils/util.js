var api = require('../config/api.js')
/**
 * 封封微信的的request
 */
function request(url, data = {}, method = "POST") {
  console.debug(url, data, method)
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'Content-Type': 'application/json',
        'Yt-Smart-Culture-Token': wx.getStorageSync('token')
      },
      success: function (res) {
        console.debug(res)
        if (res.statusCode === 200) {
          if (res.data.code === 200) {
            resolve(res.data.data);
          } else {
            reject(res.data);
          }
        } else {
          showErrorToast(res.errMsg)
          reject(null);
        }
      },
      fail: function (err) {
        reject(err)
        console.log("failed")
      }
    })
  });
}

function post(url, data = {}) {
  return request(url, data, 'POST')
}

/**
 * 检查微信会话是否过期
 */
function checkSession() {
  return new Promise(function (resolve, reject) {
    wx.checkSession({
      success: function () {
        resolve(true);
      },
      fail: function () {
        reject(false);
      }
    })
  });
}

/**
 * 调用微信登录
 */
function login() {
  return new Promise(function (resolve, reject) {
    wx.login({
      success: function (res) {
        if (res.code) {
          resolve(res.code);
        } else {
          reject(res);
        }
      },
      fail: function (err) {
        reject(err);
      }
    });
  });
}

function showErrorToast(msg) {
  wx.showToast({
    title: msg,
    image: '/static/images/icon_error.png'
  })
}

module.exports = {
  request,
  post,
  showErrorToast,
  checkSession,
  login
}