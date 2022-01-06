<template>
  <div class="latest-post">
    <div class="container">
      <ListHeading title="相關報導" class="heading" />
      <ArticleList
        title="相關報導"
        :posts="transformedRelatedPosts"
        :filterNum="4"
        class="list"
      />
    </div>
  </div>
</template>

<script>
import ListHeading from './ListHeading.vue'
import ArticleList from './ArticleList.vue'

import {
  getHref,
  formatReadTime,
  formatPostDate,
  isReport,
} from '~/helpers/index.js'
export default {
  components: {
    ListHeading,
    ArticleList,
  },
  props: {
    relatedPosts: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    transformedRelatedPosts() {
      return (
        this.relatedPosts?.map((post) => {
          const {
            id = '',
            name = '',
            publishTime = '',
            readingTime = 0,
            heroImage = {},
            style = '',
          } = post

          return {
            id,
            title: name,
            type: 'recommend',
            href: getHref(post),
            date: formatPostDate(publishTime),
            readTime: formatReadTime(readingTime),
            isReport: isReport(style),
            img: {
              src:
                heroImage?.urlMobileSized ||
                heroImage?.urlTabletSized ||
                require('~/assets/imgs/default/post.svg'),
            },
            content: [
              {
                name,
                href: getHref(post),
              },
            ],
          }
        }) ?? []
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.latest-post::v-deep {
  background: #1b1b1b !important;
  color: #fff;
  padding: 48px 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @include media-breakpoint-up(md) {
    padding: 60px 0;
  }
  .container {
    width: 100%;
    @include media-breakpoint-up(md) {
      width: 672px;
    }
    @include media-breakpoint-up(xl) {
      width: 1096px;
    }
  }
}
</style>
