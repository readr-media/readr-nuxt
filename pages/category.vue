<template>
  <div class="g-page-wrapper category-wrapper">
    <RdNavbar @category-change="refetchList" />
    <div class="category">
      <RdListHeading
        :title="categoryText"
        color="#ebf02c"
        class="category__heading"
      />
      <RdCategoryNav
        :categories="categoryList"
        :currentCategorySlug="currentCategory.slug"
        class="category__category-nav"
        @item-clicked="refetchList"
      />
      <template v-if="shouldShowLatest">
        <RdArticleList
          :posts="latestList.items"
          :isLoading="latestList.isLoading"
          :shouldReverseInMobile="true"
          :shouldShowSkeleton="true"
          :shouldHighLightReport="true"
          :shouldSetLgBreakPoint="true"
          class="category__post"
        />
        <ClientOnly v-if="shouldMountLatestInfinite">
          <InfiniteLoading @infinite="loadMoreLatest">
            <div slot="spinner" />
            <div slot="no-more" />
            <div slot="no-results" />
            <div slot="error" />
          </InfiniteLoading>
        </ClientOnly>
      </template>
      <template v-else>
        <p v-if="shouldMountSlugLatestInfinite">我是測試lalala</p>
        <RdArticleList
          :posts="latestListByCategorySlug.items"
          :isLoading="latestListByCategorySlug.isLoading"
          :shouldReverseInMobile="true"
          :shouldShowSkeleton="true"
          :shouldHighLightReport="true"
          :shouldSetLgBreakPoint="true"
          class="category__post"
        />
        <ClientOnly v-if="shouldMountSlugLatestInfinite">
          <InfiniteLoading @infinite="loadMoreItems">
            <div slot="spinner" />
            <div slot="no-more" />
            <div slot="no-results" />
            <div slot="error" />
          </InfiniteLoading>
        </ClientOnly>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import InfiniteLoading from 'vue-infinite-loading'
import RdNavbar from '~/components/shared/RdNavbar.vue'
import RdListHeading from '~/components/shared/RdListHeading.vue'
import RdCategoryNav from '~/components/shared/RdCategoryNav.vue'
import RdArticleList from '~/components/shared/RdArticleList.vue'

import { latestList, latestListByCategorySlug } from '~/apollo/queries/posts.js'

import {
  getHref,
  formatReadTime,
  formatPostDate,
  isReport,
  SITE_TITLE,
  SITE_URL,
} from '~/helpers/index.js'

const PAGE_SIZE = 12

export default {
  name: 'Category',

  components: {
    InfiniteLoading,
    RdNavbar,
    RdListHeading,
    RdCategoryNav,
    RdArticleList,
  },

  data() {
    return {
      latestList: {
        items: [],
        meta: {
          count: 0,
        },
        isLoading: false,
      },
      latestListByCategorySlug: {
        items: [],
        meta: {
          count: 0,
        },
        isLoading: false,
      },
      currentCategory: {
        name: this.$route.params?.name || '',
        slug: this.$route.params?.slug || 'all',
      },
      slugPostsPage: 0,
      isSlugPostLoading: false,
      isMounted: false,
    }
  },

  apollo: {
    latestList: {
      query: latestList,
      variables() {
        return {
          first: PAGE_SIZE,
        }
      },
      update(result) {
        const { items, meta } = result

        return {
          ...this.latestList,
          items: this.transformPosts(items),
          meta,
        }
      },
    },
    latestListByCategorySlug: {
      query: latestListByCategorySlug,
      variables() {
        return {
          first: PAGE_SIZE,
          categorySlug: this.currentCategory.slug,
          shouldQueryMeta: true,
        }
      },
      update(result) {
        const { items, meta } = result

        return {
          ...this.latestListByCategorySlug,
          items: this.transformPosts(items),
          meta,
        }
      },
    },
  },

  computed: {
    ...mapGetters({
      categoryList: 'category/categoryList',
    }),
    shouldShowLatest() {
      return this.isMounted && this.currentCategory.slug === 'all'
    },
    categoryText() {
      return `所有${this.currentCategory.name}報導`
    },
    shouldMountLatestInfinite() {
      return this.totalLatestItems > 0
    },
    doesHaveAnyLatestItemsLeftToLoad() {
      return this.totalLatestItems < this.latestList.meta.count
    },
    totalLatestItems() {
      return this.latestList?.items.length
    },
    shouldMountSlugLatestInfinite() {
      return this.totalSlugLatestItems > 0
    },
    doesHaveAnySlugLatestItemsLeftToLoad() {
      return (
        this.totalSlugLatestItems < this.latestListByCategorySlug.meta.count
      )
    },
    totalSlugLatestItems() {
      console.log('mm', this.latestListByCategorySlug?.items.length)
      return this.latestListByCategorySlug?.items.length
    },
  },

  mounted() {
    this.isMounted = true
  },

  methods: {
    transformPosts(items = []) {
      return (
        items?.map((post) => {
          const {
            id = '',
            title = '',
            heroImage = {},
            ogImage = {},
            publishTime = '',
            readingTime = 0,
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
            readTime: formatReadTime(readingTime),
            date: formatPostDate(publishTime),
            isReport: isReport(style),
          }
        }) ?? []
      )
    },
    async loadMoreLatest(state) {
      if (this.latestList.isLoading) {
        return
      }
      this.latestList.isLoading = true

      try {
        await this.$apollo.queries.latestList.fetchMore({
          variables: {
            skip: this.totalLatestItems,
            first: PAGE_SIZE,
            shouldQueryMeta: false,
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            return {
              ...this.latestList,
              items: [...previousResult?.items, ...fetchMoreResult?.items],
              meta: this.latestList.meta,
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
        this.latestList.isLoading = false
      }
    },
    async loadMoreItems(state) {
      console.log('momo')
      if (this.latestListByCategorySlug.isLoading) {
        return
      }
      this.latestListByCategorySlug.isLoading = true
      this.slugPostsPage += 1

      console.log('kk', this.totalSlugLatestItems)

      try {
        await this.$apollo.queries.latestListByCategorySlug.fetchMore({
          variables: {
            skip: this.slugPostsPage * PAGE_SIZE,
            first: PAGE_SIZE,
            categorySlug: this.currentCategory.slug,
            shouldQueryMeta: false,
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            return {
              ...this.latestListByCategorySlug,
              items: [...previousResult?.items, ...fetchMoreResult?.items],
              meta: this.latestListByCategorySlug.meta,
            }
          },
        })

        if (this.doesHaveAnySlugLatestItemsLeftToLoad) {
          state.loaded()
        } else {
          state.complete()
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err)
        state.error()
      } finally {
        this.latestListByCategorySlug.isLoading = false
      }
    },
    refetchList({ name, slug }) {
      this.slugPostsPage = 0
      // this.$apollo.queries.latestListByCategorySlug.refetch({
      //   first: PAGE_SIZE,
      //   categorySlug: slug,
      //   shouldQueryMeta: true,
      // })
      this.currentCategory.name = name && name !== '不分類' ? name : ''
      this.currentCategory.slug = slug ?? ''
      console.log('yyy', this.latestListByCategorySlug?.items.length)
      console.log('rrr', this.shouldMountSlugLatestInfinite)
    },
  },

  head() {
    const metaTitle = `所有報導 - ${SITE_TITLE}`
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
.category-wrapper {
  width: 100%;
  margin: 24px 0 0;
  @include media-breakpoint-up(sm) {
    margin: 48px 0 0;
  }
  @include media-breakpoint-up(lg) {
    margin: 60px 0 0;
  }
}
.category {
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
    margin: 0 0 12px;
  }
  &__category-nav {
    margin: 0 0 8px;
    @include media-breakpoint-up(sm) {
      margin: 0 0 45px;
    }
  }
}
</style>
