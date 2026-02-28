const { get } = require('../../utils/request')
const { formatDate } = require('../../utils/util')
const config = require('../../config/index')

Page({
  data: {
    userInfo: null,
    stats: {
      totalQuestions: 0,
      correctCount: 0,
      streakDays: 0
    },
    achievements: [],
    history: [],
    loading: true
  },

  onLoad() {
    this.loadData()
  },

  onShow() {
    if (getApp().globalData.isLoggedIn) {
      this.loadData()
    }
  },

  async loadData() {
    this.setData({ loading: true })
    try {
      const [userRes, achievementsRes, historyRes] = await Promise.all([
        get('/api/user/info'),
        get('/api/stats/achievements'),
        get('/api/stats/history?limit=10')
      ])

      const userInfo = userRes.data || {}
      const correctRate = userInfo.stats?.totalQuestions > 0 
        ? Math.round((userInfo.stats.correctCount / userInfo.stats.totalQuestions) * 100) 
        : 0

      this.setData({
        userInfo,
        stats: {
          totalQuestions: userInfo.stats?.totalQuestions || 0,
          correctRate,
          streakDays: userInfo.stats?.streakDays || 0
        },
        achievements: (achievementsRes.data?.achievements || []).map(a => ({
          ...a,
          unlockedAt: formatDate(a.unlockedAt)
        })),
        history: (historyRes.data?.records || []).map(h => ({
          ...h,
          createTime: formatDate(h.createTime)
        })),
        loading: false
      })
    } catch (error) {
      console.error('Load data failed:', error)
      this.setData({ loading: false })
    }
  },

  onChooseAvatar(e) {
    const { avatarUrl } = e.detail
    this.updateUserInfo({ avatarUrl })
  },

  onNicknameInput(e) {
    const nickName = e.detail.value
    if (nickName) {
      this.updateUserInfo({ nickName })
    }
  },

  async updateUserInfo(data) {
    try {
      const res = await require('../../utils/request').put('/api/user/info', data)
      if (res.code === 0) {
        this.setData({
          userInfo: {
            ...this.data.userInfo,
            ...data
          }
        })
        wx.setStorageSync('userInfo', this.data.userInfo)
        wx.showToast({
          title: '更新成功',
          icon: 'success'
        })
      }
    } catch (error) {
      console.error('Update user info failed:', error)
      wx.showToast({
        title: '更新失败',
        icon: 'none'
      })
    }
  },

  onHistoryTap(e) {
    const { item } = e.currentTarget.dataset
    wx.showModal({
      title: item.topic,
      content: `得分：${item.score}分\n题目：${item.totalQuestions}题\n正确：${item.correctCount}题\n时间：${item.createTime}`,
      showCancel: false
    })
  },

  onPullDownRefresh() {
    this.loadData().then(() => {
      wx.stopPullDownRefresh()
    })
  }
})
