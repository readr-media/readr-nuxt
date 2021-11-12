<template>
  <div class="heading">
    <RdArticleHeadingTopList
      v-if="doesHaveCategories"
      :list="categories"
      class="heading__category"
    />
    <h1>{{ title }}</h1>
    <RdDateWithReadTime
      :date="date"
      :readTimeText="readTimeText"
      class="heading__time"
    />
    <div class="heading__credit">
      <RdArticleCreditList :list="creditList" class="heading__credit-list" />
      <RdArticleSocialList class="heading__credit-social" />
    </div>
  </div>
</template>

<script>
import RdArticleHeadingTopList from '~/components/shared/RdArticleHeadingTopList.vue'
import RdDateWithReadTime from '~/components/shared/RdDateWithReadTime.vue'
import RdArticleCreditList from '~/components/shared/RdArticleCreditList.vue'
import RdArticleSocialList from '~/components/shared/RdArticleSocialList.vue'

export default {
  name: 'RdArticleHeading',

  components: {
    RdArticleHeadingTopList,
    RdDateWithReadTime,
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
    readTimeText: {
      type: String,
      default: '',
    },
    categories: {
      type: Array,
      default: () => [],
    },
    creditList: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    doesHaveCategories() {
      return this.categories?.length > 0
    },
  },
}
</script>

<style lang="scss" scoped>
.heading {
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
  }
  &__time {
    margin: 0 0 16px;
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
        max-width: 360px;
        margin: 0;
      }
    }
  }
}
</style>
