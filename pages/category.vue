<template>
  <div class="category-wrapper">
    <div class="category">
      <RdListHeading
        :title="categoryText"
        color="#ebf02c"
        class="category__heading"
      />
      <RdCategoryNav
        :categories="categories"
        class="category__category-nav"
        @item-clicked="refetchList"
      />
      <RdArticleList
        :posts="latestList.items"
        :shouldReverseInMobile="true"
        :shouldShowSkeleton="true"
        :shouldHighLightReport="true"
        :shouldSetLgBreakPoint="true"
        class="category__post"
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
import RdListHeading from '~/components/shared/RdListHeading.vue'
import RdCategoryNav from '~/components/shared/RdCategoryNav.vue'
import RdArticleList from '~/components/shared/RdArticleList.vue'

import { latestList, latestListByCategorySlug } from '~/apollo/queries/posts.js'
import { categories } from '~/apollo/queries/categories.js'

import {
  getHref,
  formatReadTime,
  formatPostDate,
  isReport,
} from '~/helpers/index.js'

export default {
  name: 'Category',

  components: {
    InfiniteLoading,
    RdListHeading,
    RdCategoryNav,
    // RdListItemCategory,
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
      categories: [],
      currentCategory: {
        name: this.$route.params?.name || '',
        slug: this.$route.params?.slug || 'all',
      },
      pageNum: 16,
    }
  },

  apollo: {
    latestList: {
      query() {
        return this.currentCategory.slug === 'all'
          ? latestList
          : latestListByCategorySlug
      },
      variables() {
        return {
          first: this.pageNum,
          categorySlug: this.currentCategory.slug,
        }
      },
      update(result) {
        const { items, meta } = result

        return {
          ...this.latestList,
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
    categories: {
      query: categories,
    },
  },

  computed: {
    categoryText() {
      return `所有${this.currentCategory.name}報導`
    },
    shouldMountInfiniteLoading() {
      return this.totalLatestItems > 0
    },
    doesHaveAnyLatestItemsLeftToLoad() {
      return this.totalLatestItems < this.latestList.meta.count
    },
    totalLatestItems() {
      return this.latestList.items.length
    },
  },

  methods: {
    async loadMoreLatestItems(state) {
      if (this.latestList.isLoading) {
        return
      }
      this.latestList.isLoading = true

      try {
        await this.$apollo.queries.latestList.fetchMore({
          variables: {
            skip: this.totalLatestItems,
            first: this.pageNum,
            categorySlug: this.currentCategory.slug,
            shouldQueryMeta: false,
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            return {
              items: [...previousResult.items, ...fetchMoreResult.items],
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
    refetchList({ name, slug }) {
      this.currentCategory.name = name && name !== '不分類' ? name : ''
      this.currentCategory.slug = slug ?? ''
    },
  },
}
</script>

<style lang="scss" scoped>
.category-wrapper {
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
