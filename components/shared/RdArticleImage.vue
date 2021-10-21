<template>
  <div class="image">
    <div class="image__image">
      <img v-lazy="image.url" :alt="image.name" />
    </div>

    <div class="image__info">{{ image.title }}</div>
  </div>
</template>

<script>
export default {
  name: 'RdArticleImage',

  props: {
    image: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.image {
  &__image {
    width: 100%;
    img {
      width: 100%;
    }
  }
  &__info {
    margin-top: 8px;
    width: 100%;
    height: 30px;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    text-align: left;
    color: #4a4a4a;
  }
}
</style>
