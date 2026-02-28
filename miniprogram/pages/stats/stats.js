const { get } = require('../../utils/request')
const { formatDate } = require('../../utils/util')

Page({
  data: {
    todayStats: {
      questionCount: 0,
      correctRate: 0,
      streakDays: 0
    },
    history: [],
    loading: true,
    hasMore: true,
    offset: 0,
    limit: 20
  },

  onLoad() {
    this.loadData()
  },

  onShow() {
    if (getApp().globalData.isLoggedIn) {
      this.loadTodayStats()
    }
  },

  async loadTodayStats() {
    try {
      const res = await get('/api/stats/today')
      if (res.code === 0) {
        this.setData({
          todayStats: res.data || {
            questionCount: 0,
            correctRate: 0,
            streakDays: 0
          }
        })
      }
    } catch (error) {
      console.error('Load today stats failed:', error)
    }
  },

  async loadData() {
    this.setData({ loading: true })
    try {
      const [todayRes, historyRes] = await Promise.all([
        get('/api/stats/today'),
        get(`/api/stats/history?limit=${this.data.limit}&offset=0`)
      ])

      this.setData({
        todayStats: todayRes.data || {
          questionCount: 0,
          correctRate: 0,
          streakDays: 0
        },
        history: (historyRes.data?.records || []).map(h => ({
          ...h,
          createTime: formatDate(h.createTime)
        })),
        loading: false,
        offset: this.data.limit,
        hasMore: (historyRes.data?.records || []).length >= this.data.limit
      })
    } catch (error) {
      console.error('Load data failed:', error)
      this.setData({ loading: false })
    }
  },

  async loadMore() {
    if (!this.data.hasMore || this.data.loading) return

    this.setData({ loading: true })
    try {
      const res = await get(`/api/stats/history?limit=${this.data.limit}&offset=${this.data.offset}`)
      const newRecords = (res.data?.records || []).map(h => ({
        ...h,
        createTime: formatDate(h.createTime)
      }))

      this.setData({
        history: [...this.data.history, ...newRecords],
        offset: this.data.offset + this.data.limit,
        hasMore: newRecords.length >= this.data.limit,
        loading: false
      })
    } catch (error) {
      console.error('Load more failed:', error)
      this.setData({ loading: false })
    }
  },

  onReachBottom() {
    this.loadMore()
  },

  onPullDownRefresh() {
    this.loadData().then(() => {
      wx.stopPullDownRefresh()
    })
  },

  onRecordTap(e) {
    const { item } = e.currentTarget.dataset
    wx.showModal({
      title: item.topic,
      content: `得分：${item.score}分\n题目：${item.totalQuestions}题\n正确：${item.correctCount}题\n用时：${item.duration}秒\n时间：${item.createTime}`,
      showCancel: false
    })
  }
})
