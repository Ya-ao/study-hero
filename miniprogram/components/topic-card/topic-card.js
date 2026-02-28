Component({
  properties: {
    topic: {
      type: Object,
      value: {}
    }
  },

  methods: {
    onTap() {
      this.triggerEvent('tap', { topic: this.properties.topic })
    }
  }
})
