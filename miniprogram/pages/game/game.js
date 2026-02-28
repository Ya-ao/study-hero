const { post } = require('../../utils/request')

Page({
  data: {
    topic: '',
    difficulty: 'medium',
    count: 10,
    questions: [],
    currentIndex: 0,
    selectedOption: -1,
    showResult: false,
    loading: true,
    startTime: 0,
    answers: []
  },

  onLoad(options) {
    this.setData({
      topic: decodeURIComponent(options.topic || ''),
      difficulty: options.difficulty || 'medium',
      count: parseInt(options.count) || 10
    })
    this.loadQuestions()
  },

  async loadQuestions() {
    this.setData({ loading: true })
    try {
      const res = await post('/api/game/questions', {
        topic: this.data.topic,
        difficulty: this.data.difficulty,
        count: this.data.count
      })
      
      if (res.code === 0 && res.data?.questions) {
        this.setData({
          questions: res.data.questions,
          loading: false,
          startTime: Date.now()
        })
      } else {
        throw new Error(res.message || 'Failed to load questions')
      }
    } catch (error) {
      console.error('Load questions failed:', error)
      wx.showToast({
        title: '加载题目失败',
        icon: 'none'
      })
      setTimeout(() => {
        wx.navigateBack()
      }, 1500)
    }
  },

  onOptionSelect(e) {
    const { index } = e.detail
    if (!this.data.showResult) {
      this.setData({
        selectedOption: index
      })
    }
  },

  onConfirmTap() {
    if (this.data.selectedOption === -1) {
      wx.showToast({
        title: '请选择一个答案',
        icon: 'none'
      })
      return
    }

    const currentQuestion = this.data.questions[this.data.currentIndex]
    const isCorrect = this.data.selectedOption === currentQuestion.answer

    this.setData({
      showResult: true
    })
  },

  onNextTap() {
    const currentQuestion = this.data.questions[this.data.currentIndex]
    const answer = {
      id: currentQuestion.id,
      question: currentQuestion.question,
      options: currentQuestion.options,
      answer: currentQuestion.answer,
      userAnswer: this.data.selectedOption,
      isCorrect: this.data.selectedOption === currentQuestion.answer
    }

    const answers = [...this.data.answers, answer]

    if (this.data.currentIndex < this.data.questions.length - 1) {
      this.setData({
        currentIndex: this.data.currentIndex + 1,
        selectedOption: -1,
        showResult: false,
        answers
      })
    } else {
      this.submitResult(answers)
    }
  },

  async submitResult(answers) {
    const duration = Math.floor((Date.now() - this.data.startTime) / 1000)
    const correctCount = answers.filter(a => a.isCorrect).length

    try {
      const res = await post('/api/game/submit', {
        topic: this.data.topic,
        difficulty: this.data.difficulty,
        totalQuestions: this.data.count,
        correctCount,
        duration,
        questions: answers
      })

      const score = res.data?.score || Math.round((correctCount / this.data.count) * 100)
      const achievements = res.data?.achievements || []

      wx.redirectTo({
        url: `/pages/result/result?score=${score}&correctCount=${correctCount}&totalCount=${this.data.count}&duration=${duration}&topic=${encodeURIComponent(this.data.topic)}&difficulty=${this.data.difficulty}&answers=${encodeURIComponent(JSON.stringify(answers))}&achievements=${encodeURIComponent(JSON.stringify(achievements))}`
      })
    } catch (error) {
      console.error('Submit result failed:', error)
      const score = Math.round((correctCount / this.data.count) * 100)
      wx.redirectTo({
        url: `/pages/result/result?score=${score}&correctCount=${correctCount}&totalCount=${this.data.count}&duration=${duration}&topic=${encodeURIComponent(this.data.topic)}&difficulty=${this.data.difficulty}&answers=${encodeURIComponent(JSON.stringify(answers))}`
      })
    }
  },

  computeProgress() {
    return Math.round(((this.data.currentIndex + 1) / this.data.questions.length) * 100)
  }
})
