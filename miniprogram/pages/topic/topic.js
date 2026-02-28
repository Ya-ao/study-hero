const { get } = require('../../utils/request')
const config = require('../../config/index')

Page({
  data: {
    topic: '',
    hotTopics: [],
    difficulty: config.DEFAULT_DIFFICULTY,
    count: config.DEFAULT_COUNT,
    difficultyOptions: config.DIFFICULTY_OPTIONS,
    countOptions: config.COUNT_OPTIONS,
    loading: false
  },

  onLoad(options) {
    if (options.topic) {
      this.setData({
        topic: decodeURIComponent(options.topic)
      })
    }
    this.loadHotTopics()
  },

  async loadHotTopics() {
    try {
      const res = await get('/api/topics/hot')
      if (res.code === 0 && res.data?.topics) {
        this.setData({
          hotTopics: res.data.topics
        })
      }
    } catch (error) {
      console.error('Load hot topics failed:', error)
    }
  },

  onTopicInput(e) {
    this.setData({
      topic: e.detail.value
    })
  },

  onHotTopicTap(e) {
    const { topic } = e.currentTarget.dataset
    this.setData({
      topic
    })
  },

  onDifficultyChange(e) {
    this.setData({
      difficulty: e.detail.value
    })
  },

  onCountChange(e) {
    this.setData({
      count: parseInt(e.detail.value)
    })
  },

  async onStartTap() {
    if (!this.data.topic.trim()) {
      wx.showToast({
        title: '请输入学习主题',
        icon: 'none'
      })
      return
    }

    this.setData({ loading: true })

    try {
      wx.navigateTo({
        url: `/pages/game/game?topic=${encodeURIComponent(this.data.topic)}&difficulty=${this.data.difficulty}&count=${this.data.count}`
      })
    } finally {
      this.setData({ loading: false })
    }
  }
})
