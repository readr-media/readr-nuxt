<template>
  <div
    :class="['w-full', 'aspect-w-1', `aspect-h-${verticalLength}`]"
    :style="{
      width: '100%',
      aspectRatio: `1 / ${verticalLength}`,
      backgroundImage: backgroundImage,
    }"
  />
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
  },
}
</script>

<style scoped>
div {
  outline: 1px solid #1b1b1b;
  outline-offset: -1px;
}
</style>
