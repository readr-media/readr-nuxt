<template>
  <div v-if="text" class="highlight">
    <span>{{ text }}</span>
  </div>
</template>

<script>
export default {
  name: 'RdHighLightHeading',

  props: {
    text: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.highlight {
  span {
    position: relative;
    font-size: 14px;
    font-weight: 700;
    line-height: 14px;
    letter-spacing: 0.05em;
    color: #000928;
    border-bottom: 2px solid #000928;
    z-index: 100;
    @include media-breakpoint-up(md) {
      font-size: 16px;
      line-height: 16px;
    }
    &::before {
      content: '';
      position: absolute;
      bottom: 4px;
      left: 0;
      right: 0;
      height: 8px;
      background-color: #ebf02c;
      z-index: -1;
    }
  }
}
</style>
