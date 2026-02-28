App({
  globalData: {
    userInfo: null,
    openid: null,
    isLoggedIn: false
  },

  onLaunch() {
    this.checkLoginStatus()
  },

  checkLoginStatus() {
    const openid = wx.getStorageSync('openid')
    if (openid) {
      this.globalData.openid = openid
      this.globalData.isLoggedIn = true
      this.getUserInfo()
    }
  },

  getUserInfo() {
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.globalData.userInfo = userInfo
    }
  },

  login() {
    return new Promise((resolve, reject) => {
      wx.login({
        success: (res) => {
          if (res.code) {
            this.loginWithCode(res.code).then(resolve).catch(reject)
          } else {
            reject(new Error('wx.login failed'))
          }
        },
        fail: reject
      })
    })
  },

  loginWithCode(code) {
    const { request } = require('./utils/request')
    return request({
      url: '/api/user/login',
      method: 'POST',
      data: { code }
    }).then(res => {
      if (res.code === 0 && res.data) {
        this.globalData.openid = res.data.openid
        this.globalData.isLoggedIn = true
        wx.setStorageSync('openid', res.data.openid)
        if (res.data.nickName) {
          this.globalData.userInfo = res.data
          wx.setStorageSync('userInfo', res.data)
        }
        return res.data
      }
      throw new Error(res.message || 'Login failed')
    })
  },

  loginWithOpenid(openid) {
    const { request } = require('./utils/request')
    return request({
      url: '/api/user/login',
      method: 'POST',
      data: { openid }
    }).then(res => {
      if (res.code === 0 && res.data) {
        this.globalData.openid = res.data.openid
        this.globalData.isLoggedIn = true
        wx.setStorageSync('openid', res.data.openid)
        if (res.data.nickName) {
          this.globalData.userInfo = res.data
          wx.setStorageSync('userInfo', res.data)
        }
        return res.data
      }
      throw new Error(res.message || 'Login failed')
    })
  }
})
