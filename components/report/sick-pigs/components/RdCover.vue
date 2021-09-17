<template>
  <div class="cover">
    <div class="cover__wrapper">
      <RdCoverNews :contents="contents" :latestNews="latestNews" />
      <div class="cover__description">{{ contents.description }}</div>
    </div>
  </div>
</template>

<script>
import RdCoverNews from './RdCoverNews.vue'
export default {
  components: {
    RdCoverNews,
  },
  props: {
    contents: {
      type: Object,
      default: () => {},
    },
    latestNews: {
      type: Object,
      default: () => {},
    },
    bookmarts: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="scss" scoped>
.cover {
  padding: 24px 0 0 0;
  @include media-breakpoint-up(md) {
    padding: 60px 0 16px 0;
  }
  &__wrapper {
    max-width: 1120px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__description {
    padding: 24px 16px;
    font-size: 18px;
    line-height: 200%;
    width: 100%;
    color: #000928;
    @include media-breakpoint-up(md) {
      color: #333333;
      padding: 0 16px;
      margin-top: 24px;
    }
  }
}
</style>
