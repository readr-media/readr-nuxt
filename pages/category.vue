<template>
  <div class="category">
    <UiHeader
      class="category__header"
      @sendGaEvt="$sendGaEvtForHeaderClick('logo')"
    />

    <UiSectionHeading title="最新文章" fill="#ebf02c" />

    <ul class="post-list">
      <UiPostListItem
        v-for="post in latestPosts"
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
      <InfiniteLoading @infinite="loadMoreLatestPosts">
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
import UiPostListItem from '~/components/category/ui/PostListItem.vue'

export default {
  name: 'Category',

  components: {
    UiPostListItem,
    InfiniteLoading,
  },

  async fetch() {
    await this.loadLatestList()
  },

  data() {
    return {
      latestList: {
        items: [],
        page: 0,
        isLoading: false,
      },
    }
  },

  computed: {
    latestPosts() {
      return this.latestList.items.map((post) => {
        const { id, title = '', publishedAt = '' } = post

        return {
          id,
          title,
          href: this.$getHref(post),
          heroImg: this.$getImage(post),
          publishedAt: this.$getFormattedDate(publishedAt),
        }
      })
    },
  },

  methods: {
    async loadLatestList() {
      this.latestList.page += 1

      const items = await this.$fetchLatestPosts({
        maxResult: 25,
        page: this.latestList.page,
      })

      this.latestList.items.push(...items)

      return items
    },
    async loadMoreLatestPosts(state) {
      try {
        this.latestList.isLoading = true

        const items = await this.loadLatestList()

        if (items.length > 0) {
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