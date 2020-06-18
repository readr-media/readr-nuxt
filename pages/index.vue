<template>
  <div>
    <section class="container">
      <DumbSectionHeading
        title="最新文章"
        fill="#ebf02c"
        class="home__section-heading"
      />
      <DumbLatestSection
        v-if="shouldOpenLatestSection"
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
    this.latestPosts = response.items ?? []
  },
  data() {
    return {
      latestPosts: [],
    }
  },
  computed: {
    shouldOpenLatestSection() {
      return this.latestPosts.length > 0
    },
    latestPostMain() {
      return this.latestPosts[0]
    },
    latestPostsSub() {
      return this.latestPosts.slice(1)
    },
  },
}
</script>

<style lang="scss" scoped>
.home {
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
