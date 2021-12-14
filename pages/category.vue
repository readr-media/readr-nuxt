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
      <div v-for="category in categoryList" :key="category.slug">
        <template v-if="category.slug === currentCategory.slug">
          <RdArticleList
            :posts="getPostsByCategory(category.slug).items"
            :isLoading="getPostsByCategory(category.slug).isLoading"
            :shouldReverseInMobile="true"
            :shouldShowSkeleton="true"
            :shouldHighLightReport="true"
            :shouldSetLgBreakPoint="true"
            class="category__post"
          />
          <ClientOnly v-if="shouldMountSlugInfinite(category.slug)">
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
      currentCategory: {
        name: this.$route.params?.name || '',
        slug: this.$route.params?.slug || 'all',
      },
      isSlugPostLoading: false,
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
  },

  computed: {
    ...mapGetters({
      categoryList: 'category/categoryList',
    }),
    shouldShowLatest() {
      return this.currentCategory.slug === 'all'
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
      return this.latestList.items.length
    },
  },

  mounted() {
    if (this.categoryList?.length) {
      this.fetchPostsByCategory()
    }
  },

  methods: {
    fetchPostsByCategory() {
      this.categoryList?.forEach((item) => {
        const slug = item.slug
        this.$apollo.addSmartQuery(`${slug}Posts`, {
          query: latestListByCategorySlug,
          variables: () => ({
            first: PAGE_SIZE,
            categorySlug: slug,
            shouldQueryMeta: true,
          }),
          update: (result) => {
            const { items, meta } = result

            const data = {
              ...this[`${slug}Posts`],
              items: this.transformPosts(items),
              meta,
              isLoading: false,
              page: 0,
            }
            this[`${slug}Posts`] = data
            return data
          },
        })
      })
    },
    getPostsByCategory(slug) {
      return this[`${slug}Posts`]
    },
    shouldMountSlugInfinite(slug) {
      const currentLength = this.getPostsByCategory(slug).items?.length
      const total = this.getPostsByCategory(slug).meta?.count
      return currentLength < total
    },
    transformPosts(items = []) {
      return (
        items.map((post) => {
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
    async loadMoreItems(state) {
      const slug = this.currentCategory.slug
      const { items: prevItems, meta } = this[`${slug}Posts`]

      if (this[`${slug}Posts`].isLoading) {
        return
      }
      this[`${slug}Posts`].isLoading = true
      this[`${slug}Posts`].page += 1

      try {
        await this.$apollo.queries?.[`${slug}Posts`]?.fetchMore({
          variables: {
            first: PAGE_SIZE,
            skip: this[`${slug}Posts`].page * PAGE_SIZE,
            categorySlug: slug,
            shouldQueryMeta: false,
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const more = this.transformPosts(fetchMoreResult.items)
            // We have some problems of previousResult not being updated with $set,
            // so use the current data as prevItems for temporarily
            this.$set(this[`${slug}Posts`], 'items', [...prevItems, ...more])
          },
        })

        const doesHaveAnyItemsLeftToLoad =
          this[`${slug}Posts`]?.items.length < meta.count

        if (doesHaveAnyItemsLeftToLoad) {
          state.loaded()
        } else {
          state.complete()
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err)
        state.error()
      } finally {
        this[`${slug}Posts`].isLoading = false
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
