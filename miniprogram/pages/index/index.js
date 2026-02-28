const { get } = require('../../utils/request')
const { formatDate } = require('../../utils/util')

Page({
  data: {
    todayStats: {
      questionCount: 0,
      correctRate: 0,
      streakDays: 0
    },
    recentRecords: [],
    loading: true
  },

  onLoad() {
    this.checkLogin()
  },

  onShow() {
    if (getApp().globalData.isLoggedIn) {
      this.loadData()
    }
  },

  async checkLogin() {
    const app = getApp()
    if (!app.globalData.isLoggedIn) {
      try {
        await app.login()
        this.loadData()
      } catch (error) {
        console.error('Login failed:', error)
        this.setData({ loading: false })
      }
    } else {
      this.loadData()
    }
  },

  async loadData() {
    this.setData({ loading: true })
    try {
      const [todayRes, recentRes] = await Promise.all([
        get('/api/stats/today'),
        get('/api/stats/recent')
      ])
      
      this.setData({
        todayStats: todayRes.data || {
          questionCount: 0,
          correctRate: 0,
          streakDays: 0
        },
        recentRecords: (recentRes.data?.records || []).map(r => ({
          ...r,
          createTime: formatDate(r.createTime)
        })),
        loading: false
      })
    } catch (error) {
      console.error('Load data failed:', error)
      this.setData({ loading: false })
    }
  },

  onStartTap() {
    wx.navigateTo({
      url: '/pages/topic/topic'
    })
  },

  onRecentTap(e) {
    const { item } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/result/result?recordId=${item.id}`
    })
  },

  onPullDownRefresh() {
    this.loadData().then(() => {
      wx.stopPullDownRefresh()
    })
  },

  onShareAppMessage() {
    return {
      title: '学习英雄 - AI问答引导式学习',
      path: '/pages/index/index',
      imageUrl: ''
    }
  }
})
