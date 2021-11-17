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
      <RdArticleList
        :posts="latestList.items"
        :isLoading="latestList.isLoading"
        :shouldReverseInMobile="true"
        :shouldShowSkeleton="true"
        :shouldHighLightReport="true"
        :shouldSetLgBreakPoint="true"
        class="category__post"
      />
      <ClientOnly v-if="moreResultNum">
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
      currentCategory: {
        name: this.$route.params?.name || '',
        slug: this.$route.params?.slug || 'all',
      },
      pageNum: 16,
      moreResultNum: 1,
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
        this.moreResultNum = items.length < this.pageNum ? 0 : 1

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
  },

  computed: {
    ...mapGetters({
      categoryList: 'category/categoryList',
    }),
    categoryText() {
      return `所有${this.currentCategory.name}報導`
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
            shouldQueryMeta: true,
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            this.moreResultNum = fetchMoreResult.items.length
            return {
              ...this.latestList,
              items: [...previousResult.items, ...fetchMoreResult.items],
              meta: this.latestList.meta,
            }
          },
        })

        if (this.moreResultNum) {
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
