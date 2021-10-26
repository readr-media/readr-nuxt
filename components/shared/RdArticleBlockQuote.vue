<template>
  <div class="block-quote">
    {{ content }}
  </div>
</template>

<script>
export default {
  name: 'RdArticleBlockQuote',

  props: {
    content: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style lang="scss" scoped>
.block-quote {
  width: 100%;
}
</style>
