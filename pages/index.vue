<template>
  <div>
    <UiHeader />

    <section>
      <UiCarousel
        v-if="shouldOpenEditorChoices"
        :posts="allEditorChoices"
        class="home__carousel"
      >
        <template #heading>
          <UiSectionHeading title="編輯精選" />
        </template>
      </UiCarousel>
    </section>

    <section class="container container--latest">
      <UiSectionHeading
        title="最新文章"
        fill="#ebf02c"
        class="home__section-heading"
      />
      <UiPostLatestList
        v-if="shouldOpenLatestList"
        :postMain="latestPostMain"
        :postsSub="latestPostsSub"
      />
    </section>

    <section class="container container--database">
      <div class="database-heading">
        <h2>開放資料庫</h2>
      </div>
      <UiDatabaseList
        :list="databases.all"
        :loadMore="loadMoreDatabases"
        :shouldLoadMore="shouldLoadMoreDatabases"
        class="home__database-list"
      />

      <UiButtonDonate class="home__donate-btn" />
    </section>

    <section class="horizontal-container">
      <div class="container container--quote">
        <UiSectionHeading
          title="協作專區"
          color="#f5ebff"
          fill="#04295e"
          class="home__section-heading"
        />
        <UiQuoteSlide :quotes="quotes" />
      </div>
      <div class="container container--wall">
        <UiCollaboratorWall
          v-if="countOfCollaboratorWall"
          :count="countOfCollaboratorWall"
          :names="namesOfCollaboratorWall"
          :loadNames="loadCollaboratorNames"
        />
      </div>
      <UiHorizontalList
        class="home__horizontal-list"
        :items="allCollaborations"
      />
    </section>

    <section class="more-section yellow-bg">
      <div class="container">
        <UiSectionHeading title="更多專題" class="home__section-heading" />
        <div id="more-list-container">
          <UiMoreList
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
import { get as axiosGet } from 'axios'

import { allEditorChoices } from '~/apollo/queries/editor-choices.gql'
import { allCollaborations } from '~/apollo/queries/collaborations.gql'
import { databases } from '~/apollo/queries/data.gql'
import { quotes } from '~/apollo/queries/quotes.gql'

import { viewportWidth } from '~/composition/store/viewport.js'
import styleVariables from '~/scss/_variables.scss'
import { onDemand } from '~/utils/integrations/index.js'
import {
  mockMorePostsNews,
  mockMorePostsPolitics,
  mockMorePostsRights,
  mockMorePostsEnv,
  mockMorePostsEdu,
  mockMorePostsOthers,
} from '~/constants/mocks.js'

const DATABASES_PAGE_SIZE = 3

const NUM_OF_COLLABORATOR_NAMES_SHOULD_FETCH = 80

export default {
  name: 'Home',
  apollo: {
    allEditorChoices: {
      query: allEditorChoices,
    },
    allCollaborations: {
      query: allCollaborations,
    },
    databases: {
      query: databases,
      update: (data) => data,
    },
    quotes: {
      query: quotes,
    },
  },
  async fetch() {
    await this.fetchLatestPosts()
  },
  data() {
    return {
      allEditorChoices: [],
      allCollaborations: [],

      databases: {
        all: [],
        meta: {},
      },
      databasesPage: 0,

      latestPosts: [],
      collaboratorWall: {
        count: 0,
        names: '',
      },
      quotes: [],
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
    shouldOpenEditorChoices() {
      return this.allEditorChoices && this.allEditorChoices.length > 0
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

    prevNumOfDatabases() {
      return DATABASES_PAGE_SIZE * this.databasesPage
    },
    currentNumOfDatabases() {
      return this.prevNumOfDatabases + DATABASES_PAGE_SIZE
    },
    shouldLoadMoreDatabases() {
      return this.databases.meta.count > 3 && this.currentNumOfDatabases < 9
    },

    countOfCollaboratorWall: {
      get() {
        return this.collaboratorWall.count
      },
      set(num) {
        this.collaboratorWall.count = num
      },
    },
    namesOfCollaboratorWall: {
      get() {
        return this.collaboratorWall.names
      },
      set(names) {
        this.collaboratorWall.names = names
      },
    },
  },
  async mounted() {
    this.unwatchIsViewportWidthUpMd = this.$watch(
      'isViewportWidthUpMd',
      this.handleMacy,
      { immediate: true }
    )

    this.countOfCollaboratorWall =
      (await this.fetchCountOfCollaboratorWall()) || 0
  },
  methods: {
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
    async fetchCountOfCollaboratorWall() {
      try {
        const response = await axiosGet('/google-sheets', {
          params: {
            spreadsheetId: '1vEuoCAAXR8NMoh6qiOnj6kNdLv0lc-CaInLnWUuvySo',
            range: '名稱列表!F1',
          },
        })

        return Number(response.data.values[0][0])
      } catch (error) {
        console.error(error)
      }
    },
    async loadCollaboratorNames() {
      if (this.namesOfCollaboratorWall) {
        return
      }

      this.namesOfCollaboratorWall =
        (await this.fetchNamesOfCollaboratorWall()) || ''
    },
    async fetchNamesOfCollaboratorWall() {
      const theEndRowNum = this.countOfCollaboratorWall + 1
      const theBeginningRowNum =
        theEndRowNum - NUM_OF_COLLABORATOR_NAMES_SHOULD_FETCH + 1
      try {
        const response = await axiosGet('/google-sheets', {
          params: {
            spreadsheetId: '1vEuoCAAXR8NMoh6qiOnj6kNdLv0lc-CaInLnWUuvySo',
            range: `名稱列表!B${theBeginningRowNum}:B${theEndRowNum}`,
            majorDimension: 'COLUMNS',
          },
        })

        return response.data.values[0].join(' ')
      } catch (error) {
        console.error(error)
      }
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
    loadMoreDatabases() {
      this.databasesPage += 1
      this.$apollo.queries.databases.fetchMore({
        variables: {
          first: DATABASES_PAGE_SIZE,
          skip: this.prevNumOfDatabases,
          hasMeta: true,
        },
        updateQuery: (prevResult, { fetchMoreResult }) => ({
          all: [...prevResult.all, ...fetchMoreResult.all],
          meta: this.databases.meta,
        }),
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.home {
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
  &__horizontal-list {
    padding-left: 20px;
    @media (min-width: 1096px) {
      // (100vw - 1096px) / 2 + 20px
      padding-left: calc(50% - 528px);
    }
    @media (min-width: 1136px) {
      // (100vw - 1096px) / 2
      padding-left: calc(50% - 548px);
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
  &--database {
    padding-left: 0;
    padding-right: 0;
    padding-bottom: 20px;
    background-color: rgba(245, 235, 255, 0.2);
    @include media-breakpoint-up(md) {
      padding-bottom: 40px;
    }
  }
  &--quote {
    margin-bottom: 20px;
    @include media-breakpoint-up(md) {
      margin-bottom: 24px;
    }
  }
  &--wall {
    margin-bottom: 14px;
    max-width: 1070px;
    @include media-breakpoint-up(md) {
      margin-bottom: 20px;
    }
  }
}

.home__carousel,
.container--latest,
.container--database,
.horizontal-container {
  margin-bottom: 40px;
  @include media-breakpoint-up(md) {
    margin-bottom: 60px;
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
