const { formatDuration } = require('../../utils/util')
const { get } = require('../../utils/request')

Page({
  data: {
    score: 0,
    correctCount: 0,
    totalCount: 0,
    duration: 0,
    topic: '',
    difficulty: '',
    answers: [],
    achievements: [],
    wrongAnswers: [],
    showAchievementModal: false,
    currentAchievement: null,
    loading: false
  },

  onLoad(options) {
    if (options.recordId) {
      this.loadRecordDetail(options.recordId)
    } else {
      this.initFromOptions(options)
    }
  },

  async loadRecordDetail(recordId) {
    this.setData({ loading: true })
    try {
      const res = await get(`/api/stats/record/${recordId}`)
      if (res.code === 0 && res.data) {
        const data = res.data
        const answers = (data.questions || []).map(q => ({
          ...q,
          isCorrect: q.userAnswer === q.answer
        }))
        const wrongAnswers = answers.filter(a => !a.isCorrect)
        
        this.setData({
          score: data.score,
          correctCount: data.correctCount,
          totalCount: data.totalQuestions,
          duration: data.duration,
          durationText: this.formatDuration(data.duration),
          topic: data.topic,
          difficulty: data.difficulty,
          answers,
          wrongAnswers,
          loading: false
        })
      } else {
        throw new Error(res.message || '加载失败')
      }
    } catch (error) {
      console.error('Load record detail failed:', error)
      wx.showToast({
        title: '加载记录失败',
        icon: 'none'
      })
      setTimeout(() => {
        wx.switchTab({ url: '/pages/index/index' })
      }, 1500)
    }
  },

  initFromOptions(options) {
    const score = parseInt(options.score) || 0
    const correctCount = parseInt(options.correctCount) || 0
    const totalCount = parseInt(options.totalCount) || 0
    const duration = parseInt(options.duration) || 0
    const topic = decodeURIComponent(options.topic || '')
    const difficulty = options.difficulty || 'medium'
    
    let answers = []
    try {
      answers = JSON.parse(decodeURIComponent(options.answers || '[]'))
    } catch (e) {
      console.error('Parse answers failed:', e)
    }

    let achievements = []
    try {
      achievements = JSON.parse(decodeURIComponent(options.achievements || '[]'))
    } catch (e) {
      console.error('Parse achievements failed:', e)
    }

    const wrongAnswers = answers.filter(a => !a.isCorrect)
    const durationText = this.formatDuration(duration)

    this.setData({
      score,
      correctCount,
      totalCount,
      duration,
      durationText,
      topic,
      difficulty,
      answers,
      achievements,
      wrongAnswers
    })

    if (achievements.length > 0) {
      this.showAchievement(0)
    }
  },

  showAchievement(index) {
    if (index >= this.data.achievements.length) {
      this.setData({ showAchievementModal: false })
      return
    }

    this.setData({
      showAchievementModal: true,
      currentAchievement: this.data.achievements[index]
    })
  },

  onAchievementClose() {
    const currentIndex = this.data.achievements.indexOf(this.data.currentAchievement)
    this.showAchievement(currentIndex + 1)
  },

  onRetryTap() {
    wx.redirectTo({
      url: `/pages/game/game?topic=${encodeURIComponent(this.data.topic)}&difficulty=${this.data.difficulty}&count=${this.data.totalCount}`
    })
  },

  onHomeTap() {
    wx.switchTab({
      url: '/pages/index/index'
    })
  },

  formatDuration(seconds) {
    return formatDuration(seconds)
  },

  onShareAppMessage() {
    return {
      title: `我在「学习英雄」获得了${this.data.score}分！主题：${this.data.topic}`,
      path: '/pages/index/index',
      imageUrl: ''
    }
  }
})
