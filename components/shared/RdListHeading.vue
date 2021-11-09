<template>
  <div v-if="title" class="highlight">
    <span :style="colorVar">{{ title }}</span>
  </div>
</template>

<script>
export default {
  name: 'RdListHeading',

  props: {
    title: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '#fff',
    },
  },
  computed: {
    colorVar() {
      return { '--color': this.color }
    },
  },
}
</script>

<style lang="scss" scoped>
.highlight {
  border-bottom: 3px solid #000928;
  padding: 0 0 12px;
  span {
    position: relative;
    font-size: 24px;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0.05em;
    color: #000928;
    z-index: 100;
    &::before {
      content: '';
      position: absolute;
      bottom: 10px;
      left: 0;
      right: 0;
      height: 10px;
      background-color: var(--color);
      z-index: -1;
    }
  }
}
</style>
