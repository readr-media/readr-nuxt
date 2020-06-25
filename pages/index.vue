<template>
  <div>
    <DumbHeader />

    <section>
      <DumbCarousel
        v-if="shouldOpenEditorsChoice"
        :posts="editorsChoicePosts"
        class="home__carousel"
      >
        <template #heading>
          <DumbSectionHeading title="編輯精選" />
        </template>
      </DumbCarousel>
    </section>

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

    <section class="container container--database">
      <div class="database-heading">
        <h2>開放資料庫</h2>
      </div>
      <DumbDatabaseList :databases="databases" class="home__database-list" />
      <DumbDonateButton class="home__donate-btn" />
    </section>

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
        <div id="more-list-container">
          <DumbMoreList
            v-for="more in morePosts"
            :key="more.tag"
            :topic="more.tag"
            :posts="more.posts"
            class="home__more-list"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { viewportWidth } from '~/store/composition-api/viewport.js'
import styleVariables from '~/scss/_variables.scss'
import { onDemand } from '~/utils/integrations/index.js'
import {
  mockEditorsChoicePosts,
  mockDatabases,
  mockCollaborativeProjects,
  mockMorePostsNews,
  mockMorePostsPolitics,
  mockMorePostsRights,
  mockMorePostsEnv,
  mockMorePostsEdu,
  mockMorePostsOthers,
} from '~/constants/mocks.js'

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
      databases: mockDatabases,
      collaborativeProjects: mockCollaborativeProjects,
      morePosts: [
        mockMorePostsNews,
        mockMorePostsEdu,
        mockMorePostsPolitics,
        mockMorePostsRights,
        mockMorePostsEnv,
        mockMorePostsOthers,
      ],
      isLoadingMacy: false,
      macyInstance: undefined,
      unwatchIsViewportWidthUpMd: undefined,
    }
  },
  computed: {
    isViewportWidthUpMd() {
      return viewportWidth.value >= this.breakpointMd
    },
    breakpointMd() {
      return parseInt(styleVariables['breakpoint-md'], 10)
    },
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
    this.unwatchIsViewportWidthUpMd = this.$watch(
      'isViewportWidthUpMd',
      this.handleMacy,
      { immediate: true }
    )
  },
  methods: {
    // async fetchEditorsChoice() {
    //   const response = await this.$fetchPromotions({
    //     maxResult: 3,
    //   })
    //   this.editorsChoicePosts = response?.items ?? []
    // },
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
    async handleMacy(isViewportWidthUpMd) {
      if (this.macyInstance) {
        this.unwatchIsViewportWidthUpMd()
        return
      }

      if (isViewportWidthUpMd && !this.isLoadingMacy) {
        const loadMacy = onDemand('https://cdn.jsdelivr.net/npm/macy@2')
        this.isLoadingMacy = true
        try {
          await loadMacy()
          this.initMacy()
        } catch (error) {
          console.error(error)
        }
        this.isLoadingMacy = false
      }
    },
    initMacy() {
      this.macyInstance = window.Macy({
        container: '#more-list-container',
        mobileFirst: true,
        trueOrder: true,
        columns: 1,
        breakAt: {
          [this.breakpointMd]: {
            margin: { x: 22 },
            columns: 3,
          },
        },
      })
    },
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
  &__database-list {
    padding-left: 20px;
    padding-right: 20px;
    margin-bottom: 18px;
    @include media-breakpoint-up(md) {
      padding-left: 13.5%;
      padding-right: 13.5%;
      margin-bottom: 22px;
    }
  }
  &__donate-btn {
    margin-left: 20px;
    margin-right: 20px;
    max-width: 396px;
    @media (min-width: 436px) {
      margin-left: auto;
      margin-right: auto;
    }
  }
  &__more-list {
    padding-bottom: 30px;
    @include media-breakpoint-up(md) {
      padding-bottom: 60px;
    }
  }
}
.container {
  max-width: 1096px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 20px;
  padding-right: 20px;
  // 1136 = 1096 + 20 * 2
  @media (min-width: 1136px) {
    padding-left: 0;
    padding-right: 0;
  }
  &--latest,
  &--database {
    margin-bottom: 40px;
    @include media-breakpoint-up(md) {
      margin-bottom: 60px;
    }
  }
  &--database {
    padding-left: 0;
    padding-right: 0;
    padding-bottom: 20px;
    background-color: rgba(245, 235, 255, 0.2);
    @include media-breakpoint-up(md) {
      padding-bottom: 40px;
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
.database-heading {
  background-color: #04295e;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  text-align: center;
  padding-top: 20px;
  padding-bottom: 20px;
  @include media-breakpoint-up(md) {
    padding-top: 18px;
    padding-bottom: 18px;
  }
  h2 {
    letter-spacing: 2.5px;
    margin-left: 1.25px;
    font-size: 18px;
    font-weight: 900;
    line-height: 1.5;
    color: #ebf02c;
    @include media-breakpoint-up(md) {
      font-size: 24px;
      letter-spacing: 5px;
      margin-left: 2.5px;
    }
  }
}
.more-section {
  padding-top: 20px;
  @include media-breakpoint-up(md) {
    padding-top: 30px;
  }
}
.yellow-bg {
  background-color: #ebf02c;
}
</style>
