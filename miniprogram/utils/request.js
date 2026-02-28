const config = require('../config/index')

const BASE_URL = config.BASE_URL

function request(options) {
  const openid = wx.getStorageSync('openid')
  
  return new Promise((resolve, reject) => {
    wx.request({
      url: BASE_URL + options.url,
      method: options.method || 'GET',
      data: options.data || {},
      header: {
        'Content-Type': 'application/json',
        'x-openid': openid || ''
      },
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data)
        } else if (res.statusCode === 401) {
          wx.removeStorageSync('openid')
          wx.removeStorageSync('userInfo')
          const app = getApp()
          if (app) {
            app.globalData.isLoggedIn = false
            app.globalData.openid = null
            app.globalData.userInfo = null
          }
          reject(new Error('Unauthorized'))
        } else {
          reject(new Error(res.data.message || 'Request failed'))
        }
      },
      fail: (err) => {
        reject(new Error(err.errMsg || 'Network error'))
      }
    })
  })
}

function get(url, data) {
  return request({ url, method: 'GET', data })
}

function post(url, data) {
  return request({ url, method: 'POST', data })
}

function put(url, data) {
  return request({ url, method: 'PUT', data })
}

module.exports = {
  request,
  get,
  post,
  put
}
