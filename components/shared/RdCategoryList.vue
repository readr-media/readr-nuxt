<template>
  <ul>
    <li v-for="(item, i) in posts" :key="`${item.id}-${i}`">
      <RdArticleListCard
        :href="item.href"
        :img="item.img.src"
        :title="item.title"
        :date="item.date"
        :readTimeText="item.readTime"
        :isReport="item.isReport"
        :shouldReverseInMobile="true"
        :shouldHighLightReport="true"
      />
    </li>
    <div class="position-correct" />
    <template v-if="isLoading">
      <RdSkeleton v-for="n in 4" :key="`skeleton${n}`" class="skeleton-item" />
    </template>
  </ul>
</template>

<script>
import RdArticleListCard from '~/components/shared/RdArticleListCard.vue'
import RdSkeleton from '~/components/shared/RdSkeleton.vue'

export default {
  name: 'RdCategoryList',

  components: {
    RdArticleListCard,
    RdSkeleton,
  },
  props: {
    slug: {
      type: String,
      default: '',
    },
    posts: {
      type: Array,
      required: true,
      default: () => [],
    },
    total: {
      type: Number,
      default: 0,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
ul {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  &::after {
    content: '';
  }
  li,
  &::after,
  .position-correct,
  .skeleton-item {
    width: 100%;
    @include media-breakpoint-up(sm) {
      width: calc((100% - 24px) / 2);
    }
    @include media-breakpoint-up(lg) {
      width: calc((100% - 48px) / 3);
    }
    @include media-breakpoint-up(xl) {
      width: calc((100% - 72px) / 4);
    }
  }
  li,
  .skeleton-item {
    margin: 0 0 16px;
    @include media-breakpoint-up(sm) {
      margin: 0 0 32px;
    }
    @include media-breakpoint-up(lg) {
      margin: 0 0 60px;
    }
  }
  .position-correct {
    margin: 0;
  }
}
</style>
