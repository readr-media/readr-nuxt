<template>
  <div>
    <DumbCarousel
      v-if="shouldOpenEditorsChoice"
      :posts="editorsChoicePosts"
      class="home__carousel"
    >
      <template #heading>
        <DumbSectionHeading title="編輯精選" />
      </template>
    </DumbCarousel>

    <section class="container">
      <DumbSectionHeading
        title="最新文章"
        fill="#ebf02c"
        class="home__section-heading"
      />
      <DumbLatestList
        v-if="shouldOpenLatestList"
        :postMain="latestPostMain"
        :postsSub="latestPostsSub"
      />
    </section>
  </div>
</template>

<script>
export default {
  name: 'Home',
  async fetch() {
    await this.fetchEditorsChoice()
    await this.fetchLatestPosts()
  },
  data() {
    return {
      editorsChoicePosts: [],
      latestPosts: [],
    }
  },
  computed: {
    shouldOpenEditorsChoice() {
      return this.editorsChoicePosts.length > 0
    },
    shouldOpenLatestList() {
      return this.latestPosts.length > 0
    },
    latestPostMain() {
      return this.latestPosts[0]
    },
    latestPostsSub() {
      return this.latestPosts.slice(1)
    },
  },
  methods: {
    async fetchEditorsChoice() {
      const response = await this.$fetchPromotions({
        maxResult: 5,
      })
      this.editorsChoicePosts = response?.items ?? []
    },
    async fetchLatestPosts() {
      const response = await this.$fetchPosts({
        publishStatus: '{"$in":[2]}',
        type: '{"$in":[1,4]}',
        // type: '{"$in":[4]}',
        maxResult: 5,
        page: 1,
        sort: '-published_at',
        showAuthor: false,
        showUpdater: false,
        showTag: false,
        showComment: false,
        showProject: false,
      })
      this.latestPosts = response?.items ?? []
    },
  },
}
</script>

<style lang="scss" scoped>
.home {
  &__carousel {
    margin-bottom: 20px;
    @include media-breakpoint-up(md) {
      margin-bottom: 60px;
    }
  }
  &__section-heading {
    margin-bottom: 20px;
    @include media-breakpoint-up(md) {
      margin-bottom: 30px;
    }
  }
}
.container {
  max-width: 1096px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 20px;
  padding-right: 20px;
  @media (min-width: 1136px) {
    padding-left: 0;
    padding-right: 0;
  }
}
</style>
