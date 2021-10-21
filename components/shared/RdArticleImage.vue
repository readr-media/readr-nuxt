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
    width: 100%;
    font-size: 14px;
    line-height: 21px;
    text-align: justify;
    color: rgba(0, 9, 40, 0.5);
    padding: 0 20px;
    margin: 8px 0 0;
    @include media-breakpoint-up(xl) {
      font-size: 16px;
      line-height: 24px;
    }
  }
}
</style>
