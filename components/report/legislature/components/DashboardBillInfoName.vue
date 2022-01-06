<template>
  <h1>{{ text }}</h1>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
h1 {
  font-weight: 900;
  font-size: 18px;
  line-height: 26px;
  color: #985f0b;
}
</style>
