<template>
  <div
    :class="['w-full', 'aspect-w-1', `aspect-h-${verticalLength}`]"
    :style="{
      width: '100%',
      aspectRatio: `1 / ${verticalLength}`,
      backgroundImage: backgroundImage,
    }"
  >
    {{ hasStarMarkIcon ? '*' : '' }}
  </div>
</template>

<script>
export default {
  props: {
    backgroundImage: {
      type: String,
      default: 'linear-gradient(to right, white 0%, white 100%)',
    },
    verticalLength: {
      type: Number,
      default: 1,
    },
    hasStarMarkIcon: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
div {
  outline: 2px solid #1b1b1b;
  outline-offset: -2px;
  color: black;
  font-size: 46px;
  display: flex;
  justify-content: center;
  align-items: center;
  @include media-breakpoint-up(xl) {
    width: 16px !important;
    outline: 2px solid #1b1b1b;
    outline-offset: -1px;
    font-size: 36px;
  }
}
</style>
