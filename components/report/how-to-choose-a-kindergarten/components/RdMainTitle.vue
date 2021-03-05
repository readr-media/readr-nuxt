<template>
  <h2 class="htcak-h1">{{ text }}</h2>
</template>

<script>
export default {
  name: 'RdMainTitle',

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
  text-align: center;

  &::after {
    content: '';
    display: block;
    background-color: currentColor;
    width: 80px;
    height: 3px;
    margin: 12px auto 0 auto;
  }
}
</style>
