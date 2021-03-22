<template>
  <h2>
    <span>{{ text }}</span>
  </h2>
</template>

<script>
export default {
  name: 'RdTitle',

  props: {
    text: {
      type: String,
      required: true,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
h2 {
  font-size: 28px;
  font-weight: 500;
  text-align: center;
  line-height: 36px;
  text-align: center;
  letter-spacing: 0.04em;
  @include media-breakpoint-up(md) {
    font-size: 32px;
    line-height: 44px;
  }
}
</style>
