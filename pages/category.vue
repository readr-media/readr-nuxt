<template>
  <div class="category">
    <RdHeader class="category__header" />

    <RdSectionHeading title="最新文章" fill="#ebf02c" />

    <ul class="post-list">
      <RdListItemCategory
        v-for="post in latestList.items"
        :key="post.id"
        :post="post"
        class="category__post"
      />

      <template v-if="latestList.isLoading">
        <div
          v-for="n in 4"
          :key="`skeleton${n}`"
          class="category__post post-skeleton"
        >
          <div class="post-skeleton__picture" />
          <div class="post-skeleton__title" />
          <div class="post-skeleton__title" />
          <div class="post-skeleton__title post-skeleton__title--last" />
          <div class="post-skeleton__date" />
        </div>
      </template>
    </ul>
    <ClientOnly>
      <InfiniteLoading @infinite="loadMoreLatestItems">
        <div slot="spinner" />
        <div slot="no-more" />
        <div slot="no-results" />
        <div slot="error" />
      </InfiniteLoading>
    </ClientOnly>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import RdHeader from '~/components/shared/Header/RdHeader.vue'
import RdSectionHeading from '~/components/shared/RdSectionHeading.vue'
import RdListItemCategory from '~/components/shared/List/RdListItemCategory.vue'

import { latestPosts } from '~/apollo/queries/posts.gql'

import { getHref, formatDate } from '~/helpers/index.js'

export default {
  name: 'Category',

  components: {
    InfiniteLoading,
    RdHeader,
    RdSectionHeading,
    RdListItemCategory,
  },

  data() {
    return {
      latestList: {
        items: [],
        meta: {
          count: 0,
        },
        pageSize: 25,
        isLoading: false,
      },
    }
  },

  apollo: {
    latestList: {
      query: latestPosts,
      variables() {
        return {
          first: this.latestList.pageSize,
          shouldQueryMeta: true,
        }
      },
      update(result) {
        const { items, meta } = result

        return {
          ...this.latestList,
          items: items.map(function transformContent(post) {
            const {
              id = '',
              name = '',
              heroImage = {},
              ogImage = {},
              publishTime = '',
            } = post || {}

            return {
              id,
              title: name,
              href: getHref(post),
              img: {
                src:
                  heroImage?.urlTabletSized ||
                  ogImage?.urlTabletSized ||
                  require('~/assets/default/post.svg'),
              },
              date: formatDate(publishTime),
            }
          }),
          meta,
        }
      },
    },
  },

  computed: {
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
            first: this.latestList.pageSize,
            skip: this.totalLatestItems,
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
  },
}
</script>

<style lang="scss" scoped>
.category {
  &__header {
    margin-bottom: 20px;
    @include media-breakpoint-up(md) {
      margin-bottom: 60px;
    }
  }

  $margin-right--post: 24px;
  $post-column-count: 3;
  $post-column-count--lg: 4;

  &__post {
    margin-bottom: 20px;
    @include media-breakpoint-up(md) {
      margin: 0 $margin-right--post 40px 0;
    }
    @include media-breakpoint-only(md) {
      width: calc(
        100% / #{$post-column-count} - #{$margin-right--post * (
            $post-column-count - 1
          ) / $post-column-count}
      );
      &:nth-child(#{$post-column-count}n) {
        margin: 0 0 40px 0;
      }
    }
    @include media-breakpoint-up(lg) {
      width: calc(
        100% / #{$post-column-count--lg} - #{$margin-right--post * (
            $post-column-count--lg - 1
          ) / $post-column-count--lg}
      );
      &:nth-child(#{$post-column-count--lg}n) {
        margin: 0 0 40px 0;
      }
    }
  }
}

.post-list {
  padding: 40px 20px 8px 20px;
  @include media-breakpoint-up(md) {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    padding: 40px 48px 20px 48px;
  }
  @include media-breakpoint-up(lg) {
    padding: 40px 20px 20px 20px;
    max-width: 1096px;
    box-sizing: content-box;
    margin: 0 auto;
  }
}

.post-skeleton {
  overflow-anchor: none;

  &__picture {
    padding-top: 50%;
    margin-bottom: 12px;
    background-image: linear-gradient(
      270deg,
      rgba(196, 196, 196, 0.2) 0%,
      rgba(196, 196, 196, 0.3) 27.08%,
      rgba(196, 196, 196, 0.3) 64.06%,
      rgba(196, 196, 196, 0.2) 100%
    );
  }

  &__title {
    height: 20px;
    margin-bottom: 6px;
    background-image: linear-gradient(
      270deg,
      rgba(196, 196, 196, 0.2) 0%,
      rgba(196, 196, 196, 0.3) 33.85%,
      rgba(196, 196, 196, 0.3) 57.29%,
      rgba(196, 196, 196, 0.2) 100%
    );

    &--last {
      margin-bottom: 24px;
      width: 52.4%;
    }
  }

  &__date {
    margin: 0 auto;
    width: 90px;
    height: 16px;
    background-image: linear-gradient(
      270deg,
      rgba(196, 196, 196, 0.3) 0%,
      rgba(196, 196, 196, 0.2) 100%
    );
  }
}
</style>
