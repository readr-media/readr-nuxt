<template>
  <div>
    <DumbHeader />

    <DumbCarousel
      v-if="shouldOpenEditorsChoice"
      :posts="editorsChoicePosts"
      class="home__carousel"
    >
      <template #heading>
        <DumbSectionHeading title="編輯精選" />
      </template>
    </DumbCarousel>

    <section class="container container--latest">
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

    <DumbDonateButton class="home__donate-btn" />

    <section class="horizontal-container">
      <DumbSectionHeading
        title="協作專區"
        color="#f5ebff"
        fill="#04295e"
        class="home__section-heading"
      />
      <DumbHorizontalList :projects="collaborativeProjects" />
    </section>

    <section class="more-section yellow-bg">
      <div class="container">
        <DumbSectionHeading title="更多專題" class="home__section-heading" />
        <div ref="moreListContainer">
          <DumbMoreList
            v-for="more in morePosts"
            :key="more.tag"
            :topic="more.tag"
            :posts="more.posts"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {
  mockCollaborativeProjects,
  mockEditorsChoicePosts,
  mockMorePostsNews,
  mockMorePostsPolitics,
  mockMorePostsRights,
  mockMorePostsEnv,
  mockMorePostsEdu,
  mockMorePostsOthers,
} from '~/constants/mock.js'

export default {
  name: 'Home',
  async fetch() {
    // await this.fetchEditorsChoice()
    await this.fetchLatestPosts()
  },
  data() {
    return {
      editorsChoicePosts: mockEditorsChoicePosts,
      latestPosts: [],
      collaborativeProjects: mockCollaborativeProjects,
      morePosts: [
        mockMorePostsNews,
        mockMorePostsEdu,
        mockMorePostsPolitics,
        mockMorePostsRights,
        mockMorePostsEnv,
        mockMorePostsOthers,
      ],
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
  mounted() {
    window.Macy({
      container: this.$refs.moreListContainer,
      columns: 3,
      trueOrder: true,
      margin: {
        x: 22,
        y: 60,
      },
    })
  },
  methods: {
    async fetchEditorsChoice() {
      const response = await this.$fetchPromotions({
        maxResult: 3,
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
  head() {
    return {
      script: [
        {
          src: 'https://cdn.jsdelivr.net/npm/macy@2',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.home {
  &__carousel {
    margin-bottom: 40px;
    @include media-breakpoint-up(md) {
      margin-bottom: 60px;
    }
  }
  &__section-heading {
    margin-bottom: 20px;
    max-width: 1096px;
    @include media-breakpoint-up(md) {
      margin-bottom: 30px;
    }
  }
  &__donate-btn {
    margin-left: 20px;
    margin-right: 20px;
    max-width: 396px;
    margin-bottom: 40px;
    @media (min-width: 436px) {
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 110px;
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
  &--latest {
    margin-bottom: 40px;
    @media (min-width: 1136px) {
      margin-bottom: 60px;
    }
  }
}
.horizontal-container {
  padding-left: 20px;
  margin-bottom: 40px;
  @include media-breakpoint-up(md) {
    margin-bottom: 60px;
  }
  @media (min-width: 1096px) {
    // (100vw - 1096px) / 2 + 20px
    padding-left: calc(50vw - 528px);
  }
  @media (min-width: 1136px) {
    // (100vw - 1096px) / 2
    padding-left: calc(50vw - 548px);
  }
}
.more-section {
  padding-top: 20px;
  padding-bottom: 30px;
  @include media-breakpoint-up(md) {
    padding-top: 30px;
    padding-bottom: 0;
  }
}
.yellow-bg {
  background-color: #ebf02c;
}
</style>
