<template>
  <div class="home-category-list">
    <ul>
      <li v-for="item in posts" :key="item.id">
        <RdArticleListCard
          :href="item.href"
          :img="item.img.src"
          :title="item.title"
          :date="item.date"
          :readTimeText="item.readTime"
          :isReport="item.isReport"
        />
      </li>
      <div class="position-correct" />
    </ul>
  </div>
</template>

<script>
import RdArticleListCard from '~/components/shared/RdArticleListCard.vue'

export default {
  name: 'RdHomeCategoryList',

  components: {
    RdArticleListCard,
  },
  props: {
    posts: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
}
</script>

<style lang="scss" scoped>
.home-category-list {
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
    .position-correct {
      width: 100%;
      @include media-breakpoint-up(sm) {
        width: calc((100% - 24px) / 2);
      }
      @include media-breakpoint-up(xl) {
        width: 256px;
      }
    }
    li {
      margin: 0 0 16px;
      @include media-breakpoint-up(sm) {
        margin: 0 0 32px;
      }
      @include media-breakpoint-up(xl) {
        margin: 0 0 60px;
        &:nth-child(3),
        &:nth-child(4) {
          margin: 0;
        }
      }
    }
    .position-correct {
      margin: 0;
    }
  }
}
</style>
