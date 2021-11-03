<template>
  <div class="heading">
    <label
      v-if="category"
      class="heading__category"
      @click="handleCategoryClicked"
    >
      <span>{{ categoryName }}</span>
    </label>
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
import RdDateWithReadTime from '~/components/shared/RdDateWithReadTime.vue'
import RdArticleCreditList from '~/components/shared/RdArticleCreditList.vue'
import RdArticleSocialList from '~/components/shared/RdArticleSocialList.vue'

export default {
  name: 'RdArticleHeading',

  components: {
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
    category: {
      type: Object,
      default: () => {},
    },
    creditList: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    categoryName() {
      return this.category?.name ?? ''
    },
    categorySlug() {
      return this.category?.slug ?? ''
    },
  },
  methods: {
    handleCategoryClicked() {
      this.$router.push({
        name: 'category',
        params: { slug: this.categorySlug },
      })
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
    cursor: pointer;
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
