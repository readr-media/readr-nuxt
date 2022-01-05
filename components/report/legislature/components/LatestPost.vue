<template>
  <div class="latest-post">
    <div class="container">
      <ListHeading title="最新報導" class="heading" />
      <ArticleList
        :posts="transformedLatestPosts"
        :filterNum="4"
        class="list"
      />
    </div>
  </div>
</template>

<script>
import ListHeading from './ListHeading.vue'
import ArticleList from './ArticleList.vue'
import { latestPosts } from '~/apollo/queries/posts.js'
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
  apollo: {
    latestPosts: {
      query: latestPosts,
      prefetch: false,
      variables() {
        return {
          first: 4,
        }
      },
    },
  },
  computed: {
    transformedLatestPosts() {
      return this.latestPosts?.map((post) => {
        const {
          id = '',
          title = '',
          heroImage = {},
          readingTime = 0,
          publishTime = '',
          style = '',
        } = post || {}

        return {
          id,
          title,
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
        }
      })
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
