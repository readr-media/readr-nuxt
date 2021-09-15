<template>
  <!-- eslint-disable vue/no-v-html -->
  <div class="html-content-block Body" v-html="contentBlock"></div>
</template>

<script>
export default {
  props: {
    contentBlock: {
      type: String,
      isRequired: true,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.html-content-block {
  background: transparent;
  margin-bottom: 32px;
  display: inline-block;
  font-size: 18px;
  line-height: 200%;
  color: #333333;

  &:last-child {
    margin-bottom: 0;
  }

  &.only_one {
    margin-bottom: 0;
    display: inline;
  }
}
</style>
