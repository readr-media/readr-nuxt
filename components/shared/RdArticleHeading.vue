<template>
  <div class="heading">
    <RdHighLightHeading :text="category" class="heading__category" />
    <h1>{{ title }}</h1>
    <RdDateWithReadTime
      :date="date"
      :readTime="readTime"
      class="heading__time"
    />
    <div class="heading__credit">
      <RdArticleCreditList :list="creditList" class="heading__credit-list" />
      <RdArticleSocialList class="heading__credit-social" />
    </div>
  </div>
</template>

<script>
import RdHighLightHeading from '~/components/shared/RdHighLightHeading.vue'
import RdDateWithReadTime from '~/components/shared/RdDateWithReadTime.vue'
import RdArticleCreditList from '~/components/shared/RdArticleCreditList.vue'
import RdArticleSocialList from '~/components/shared/RdArticleSocialList.vue'

export default {
  name: 'RdArticleHeading',

  components: {
    RdHighLightHeading,
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
        margin: 0;
      }
    }
  }
}
</style>
