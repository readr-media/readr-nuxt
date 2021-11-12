<template>
  <div class="g-page-wrapper tag-wrapper">
    <RdNavbar />
    <div class="tag">
      <RdListHeading :title="tagName" color="#ebf02c" class="tag__heading" />
      <RdArticleList
        :posts="tagList.items"
        :shouldReverseInMobile="true"
        :shouldShowSkeleton="true"
        :shouldHighLightReport="true"
        :shouldSetLgBreakPoint="true"
        class="tag__post"
      />
      <ClientOnly v-if="shouldMountInfiniteLoading">
        <InfiniteLoading @infinite="loadMoreLatestItems">
          <div slot="spinner" />
          <div slot="no-more" />
          <div slot="no-results" />
          <div slot="error" />
        </InfiniteLoading>
      </ClientOnly>
    </div>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import RdNavbar from '~/components/shared/RdNavbar.vue'
import RdListHeading from '~/components/shared/RdListHeading.vue'
import RdArticleList from '~/components/shared/RdArticleList.vue'

import { latestListByTagName } from '~/apollo/queries/posts.js'

import {
  getHref,
  formatReadTime,
  formatPostDate,
  isReport,
  SITE_TITLE,
  SITE_URL,
} from '~/helpers/index.js'

export default {
  name: 'Tag',

  components: {
    InfiniteLoading,
    RdNavbar,
    RdListHeading,
    RdArticleList,
  },

  data() {
    return {
      tagList: {
        items: [],
        meta: {
          count: 0,
        },
        isLoading: false,
      },
      pageNum: 16,
    }
  },

  apollo: {
    tagList: {
      query: latestListByTagName,
      variables() {
        return {
          first: this.pageNum,
          tagName: this.tagName,
        }
      },
      update(result) {
        const { items, meta } = result

        return {
          ...this.tagList,
          items: items.map((post) => {
            const {
              id = '',
              title = '',
              heroImage = {},
              ogImage = {},
              publishTime = '',
              wordCount = 0,
              style = '',
            } = post || {}

            return {
              id,
              title,
              href: getHref(post),
              img: {
                src:
                  heroImage?.urlTabletSized ||
                  ogImage?.urlTabletSized ||
                  require('~/assets/imgs/default/post.svg'),
              },
              readTime: formatReadTime(wordCount, 2),
              date: formatPostDate(publishTime),
              isReport: isReport(style),
            }
          }),
          meta,
        }
      },
    },
  },

  computed: {
    tagName() {
      return this.$route.params?.name ?? ''
    },
    shouldMountInfiniteLoading() {
      return this.totalLatestItems > 0
    },
    doesHaveAnyLatestItemsLeftToLoad() {
      return this.totalLatestItems < this.tagList.meta.count
    },
    totalLatestItems() {
      return this.tagList.items.length
    },
  },

  methods: {
    async loadMoreLatestItems(state) {
      if (this.tagList.isLoading) {
        return
      }
      this.tagList.isLoading = true

      try {
        await this.$apollo.queries.tagList.fetchMore({
          variables: {
            skip: this.totalLatestItems,
            first: this.pageNum,
            tagName: this.tagName,
            shouldQueryMeta: false,
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            return {
              items: [...previousResult.items, ...fetchMoreResult.items],
              meta: this.tagList.meta,
            }
          },
        })

        if (this.doesHaveAnyLatestItemsLeftToLoad) {
          state.loaded()
        } else {
          state.complete()
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err)
        state.error()
      } finally {
        this.tagList.isLoading = false
      }
    },
  },

  head() {
    const metaTitle = `${this.tagName} - ${SITE_TITLE}`
    const ogUrl = `${SITE_URL}${this.$route.path}`
    return {
      title: metaTitle,
      meta: [
        { hid: 'og:title', property: 'og:title', content: metaTitle },
        { hid: 'og:url', property: 'og:url', content: ogUrl },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.g-page-wrapper {
  min-height: 100vh;
  padding: 64px 0 0;
  overflow: hidden;
  @include media-breakpoint-up(sm) {
    padding: 80px 0 0;
  }
}
.tag-wrapper {
  width: 100%;
  min-height: 100vh;
  margin: 24px 0;
  @include media-breakpoint-up(sm) {
    margin: 48px 0 0;
  }
  @include media-breakpoint-up(lg) {
    margin: 60px 0 0;
  }
}
.tag {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding: 0 20px;
  @include media-breakpoint-up(md) {
    padding: 0;
    width: 672px;
  }
  @include media-breakpoint-up(lg) {
    padding: 0;
    width: 816px;
  }
  @include media-breakpoint-up(xl) {
    width: 1096px;
  }
  &__heading {
    margin: 0 0 16px;
    @include media-breakpoint-up(sm) {
      margin: 0 0 40px;
    }
  }
}
</style>
