Component({
  properties: {
    question: {
      type: Object,
      value: {}
    },
    currentIndex: {
      type: Number,
      value: 0
    },
    totalCount: {
      type: Number,
      value: 0
    },
    selectedOption: {
      type: Number,
      value: -1
    },
    showResult: {
      type: Boolean,
      value: false
    }
  },

  data: {
    optionLabels: ['A', 'B', 'C', 'D']
  },

  methods: {
    onOptionTap(e) {
      const { index } = e.currentTarget.dataset
      if (!this.properties.showResult) {
        this.triggerEvent('select', { index })
      }
    }
  }
})
