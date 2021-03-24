<template>
  <header class="header">
    <p>
      <span
        v-for="text in texts"
        :key="text"
        :class="{ highlight: isCurrentTextHighlighted(text) }"
        v-text="text"
      />
    </p>
  </header>
</template>

<script>
export default {
  name: 'RdQuizHeader',
  props: {
    texts: {
      type: Array,
      default: () => [],
    },
    textHighlight: {
      type: String,
      default: '',
    },
  },
  methods: {
    isCurrentTextHighlighted(text) {
      return text === this.textHighlight
    },
  },
}
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 48px;
  background-color: #ffeded;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #6a6a6a;
}

.highlight {
  color: #f50e0e;
}
</style>
