<template>
  <div class="article-list">
    <div v-if="title" class="highlight">
      <span>{{ title }}</span>
    </div>
    <ul>
      <li v-for="item in formatedPosts" :key="item.id">
        <RdArticleListCard
          :href="item.href"
          :img="item.img.src"
          :title="item.title"
          :date="item.date"
          :readTimeText="item.readTime"
          :shouldReverseInMobile="false"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import RdArticleListCard from '~/components/shared/RdArticleListCard.vue'

export default {
  name: 'RdArticleList',

  components: {
    RdArticleListCard,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    posts: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  computed: {
    formatedPosts() {
      return this.posts?.filter((item, i) => i < 4) ?? []
    },
  },
}
</script>

<style lang="scss" scoped>
.article-list {
  .highlight {
    border-bottom: 3px solid #000928;
    padding: 0 0 12px;
    margin: 0 0 16px;
    @include media-breakpoint-up(md) {
      margin: 0 0 40px;
    }
    span {
      position: relative;
      font-size: 24px;
      font-weight: 700;
      line-height: 24px;
      letter-spacing: 0.05em;
      color: #000928;
      z-index: 100;
      &::before {
        content: '';
        position: absolute;
        bottom: 10px;
        left: 0;
        right: 0;
        height: 10px;
        background-color: #fff;
        z-index: -1;
      }
    }
  }
  ul {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    @include media-breakpoint-up(md) {
      &::after {
        content: '';
        width: calc((100% - 24px) / 2);
      }
    }
    @include media-breakpoint-up(xl) {
      &::after {
        content: '';
        width: calc((100% - 72px) / 4);
      }
    }
    li + li {
      margin: 16px 0 0;
      @include media-breakpoint-up(md) {
        margin: 32px 0 0;
      }
      @include media-breakpoint-up(xl) {
        margin: 0;
      }
    }
    li {
      width: 100%;
      @include media-breakpoint-up(md) {
        width: calc((100% - 24px) / 2);
        &:nth-child(2) {
          margin: 0;
        }
      }
      @include media-breakpoint-up(xl) {
        width: calc((100% - 72px) / 4);
      }
    }
  }
}
</style>
