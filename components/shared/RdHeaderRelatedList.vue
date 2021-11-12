<template>
  <div class="header-related-list">
    <div class="deco" />
    <ul>
      <li v-for="item in list" :key="item.id">
        <RdArticleListCard
          :href="item.href"
          :img="item.img.src"
          :title="item.title"
          :isReport="item.isReport"
          :shouldHideBottomInfos="true"
          :shouldNotLazyload="true"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import RdArticleListCard from '~/components/shared/RdArticleListCard.vue'

export default {
  name: 'RdHeaderRelatedList',

  components: {
    RdArticleListCard,
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="scss" scoped>
.header-related-list {
  display: none;
  @include media-breakpoint-up(lg) {
    display: block;
    background-color: #fff;
  }
  .deco {
    height: 6px;
    background-color: #ebf02c;
  }
  ul {
    width: 100%;
    max-width: 1320px;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    padding: 32px 60px;
    li {
      width: calc((100% - 80px) / 5);
    }
  }
}
</style>
