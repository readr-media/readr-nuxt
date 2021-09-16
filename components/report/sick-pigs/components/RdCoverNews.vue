<template>
  <div class="cover-news">
    <div class="cover-news__subtitle">{{ contents.subtitle }}</div>
    <div class="cover-news__title">{{ contents.title }}</div>
    <RdUiContinueUpdate />
    <div class="cover-news__news">
      <div class="cover-news__news_date">
        最後更新：{{ latestNews.update_time }}
      </div>
      <div class="cover-news__news_title">{{ latestNews.title }}</div>
      <div class="cover-news__news_content" v-html="latestNews.content"></div>
    </div>
  </div>
</template>

<script>
import RdUiContinueUpdate from './RdUiContinueUpdate.vue'
export default {
  components: {
    RdUiContinueUpdate,
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
  },
}
</script>

<style lang="scss" scoped>
.cover-news {
  padding: 16px 28px;
  background: #ffffff;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1),
    0px 2px 2px -1px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  @include media-breakpoint-up(md) {
    padding: 32px;
  }
  &__subtitle {
    font-weight: bold;
    font-size: 24px;
    line-height: 35px;
    color: #000928;
    @include media-breakpoint-up(md) {
      font-weight: 500;
      font-size: 24px;
      color: #333333;
    }
  }
  &__title {
    font-weight: bold;
    font-size: 32px;
    line-height: 150%;
    color: #bf6d28;
    margin: 0 0 24px 0;
    @include media-breakpoint-up(md) {
      margin: 0 0 32px 0;
      font-size: 60px;
      line-height: 72px;
    }
  }
  &__news {
    &_date {
      margin: 12px 0 11px 0;
      font-weight: 900;
      font-size: 14px;
      line-height: 21px;
      color: #000000;
      @include media-breakpoint-up(md) {
        margin: 16px 0 15px 0;
      }
    }
    &_title {
      font-weight: bold;
      font-size: 20px;
      line-height: 180%;
      color: #bf6d28;
    }
    &_content {
      margin-top: 12px;
      font-size: 18px;
      line-height: 200%;
      color: #000928;
      max-width: 540px;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      white-space: normal;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
