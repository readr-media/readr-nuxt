<template>
  <div class="article-heading">
    <div class="article-heading__category">
      <span>{{ category }}</span>
    </div>
    <h1>{{ title }}</h1>
    <div class="article-heading__time">
      <span class="date">{{ date }}</span>
      <span class="read">{{ readTimeText }}</span>
    </div>
    <div class="article-heading__credit">
      <RdArticleCreditList
        :list="creditList"
        class="article-heading__credit-list"
      />
      <RdArticleSocialList class="article-heading__credit-social" />
    </div>
  </div>
</template>

<script>
import RdArticleCreditList from '~/components/shared/RdArticleCreditList.vue'
import RdArticleSocialList from '~/components/shared/RdArticleSocialList.vue'

export default {
  name: 'RdArticleHeading',

  components: {
    RdArticleCreditList,
    RdArticleSocialList,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    date: {
      type: String,
      default: '',
    },
    readTime: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      default: '',
    },
    creditList: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    readTimeText() {
      const min = Math.round(this.readTime / 60)
      return `閱讀時間 ${min} 分鐘`
    },
  },
}
</script>

<style lang="scss" scoped>
.article-heading {
  h1 {
    font-size: 28px;
    font-weight: 700;
    line-height: 36px;
    letter-spacing: 0.04em;
    color: #000928;
    margin: 0 0 16px;
    @include media-breakpoint-up(md) {
      font-size: 36px;
      line-height: 1.5;
      letter-spacing: 0.03em;
    }
  }
  &__category {
    margin: 0 0 8px;
    span {
      position: relative;
      font-size: 14px;
      font-weight: 700;
      line-height: 14px;
      letter-spacing: 0.05em;
      color: #000928;
      border-bottom: 2px solid #000928;
      z-index: 100;
      @include media-breakpoint-up(md) {
        font-size: 16px;
        line-height: 16px;
      }
      &::before {
        content: '';
        position: absolute;
        bottom: 4px;
        left: 0;
        right: 0;
        height: 8px;
        background-color: #ebf02c;
        z-index: -1;
      }
    }
  }
  &__time {
    font-size: 14px;
    line-height: 1.5;
    color: rgba(0, 9, 40, 0.66);
    margin: 0 0 16px;
    @include media-breakpoint-up(md) {
      font-size: 16px;
    }
    .date {
      position: relative;
      padding: 0 14px 0 0;
      @include media-breakpoint-up(md) {
        padding: 0 20px 0 0;
      }
      &::after {
        content: '';
        position: absolute;
        top: 9px;
        right: 3px;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background-color: rgba(0, 9, 40, 0.2);
        @include media-breakpoint-up(md) {
          top: 11px;
          right: 5px;
        }
      }
    }
  }
  &__credit {
    display: block;
    @include media-breakpoint-up(md) {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    &-list {
      margin: 0 0 16px;
      @include media-breakpoint-up(md) {
        margin: 0;
      }
    }
  }
}
</style>
