<template>
  <div>
    <RdHeader @sendGaEvent="$sendGaEventForHeaderClick('logo')" />

    <section class="marquee-container">
      <RdMarquee class="home__marquee" />
      <nuxt-link
        to="/landing"
        @click.native="$sendGaEventForHomeClick('landing')"
      >
        <span>了解更多</span>
        <SvgArrowMore />
      </nuxt-link>
    </section>

    <section>
      <RdCarousel
        v-if="shouldOpenEditorChoices"
        :posts="allEditorChoices"
        class="home__carousel"
        @sendGaEvent="$sendGaEventForHomeClick('editor choices')"
      >
        <template #heading>
          <RdSectionHeading title="編輯精選" />
        </template>
      </RdCarousel>
    </section>

    <section ref="latest" class="container container--latest">
      <RdSectionHeading
        v-intersect="scrollDepthObserver"
        title="最新文章"
        fill="#ebf02c"
        class="home__section-heading"
      />
      <RdListLatest
        v-if="shouldOpenLatestList"
        :postMain="latestPostMain"
        :postsSub="latestPostsSub"
        @sendGaEvent="$sendGaEventForHomeClick('latest articles')"
      />
    </section>

    <section class="container container--database">
      <div v-intersect="scrollDepthObserver" class="database-heading">
        <h2>開放資料庫</h2>
      </div>
      <RdDatabaseList
        :list="databases.all"
        :loadMore="loadMoreDatabases"
        :shouldLoadMore="shouldLoadMoreDatabases"
        class="home__database-list"
        @sendGaEvent:database="$sendGaEventForHomeClick('open database github')"
        @sendGaEvent:portfolio="
          $sendGaEventForHomeClick('open database portfolio')
        "
        @sendGaEvent:loadMore="
          $sendGaEventForHomeClick('open database load more')
        "
      />

      <RdButtonDonate
        class="home__donate-btn"
        @sendGaEvent="$sendGaEventForHomeClick('donate-opendata')"
      />
    </section>

    <section ref="collaboration" class="collaboration-container">
      <div class="container container--quote">
        <RdSectionHeading
          v-intersect="scrollDepthObserver"
          title="協作專區"
          color="#f5ebff"
          fill="#04295e"
          class="home__section-heading"
        />
        <RdQuoteSlide :quotes="quotes" />
      </div>
      <div class="container container--wall">
        <RdCollaboratorWall
          v-if="countOfCollaboratorWall"
          :count="countOfCollaboratorWall"
          :names="namesOfCollaboratorWall"
          :loadNames="loadCollaboratorNames"
          @sendGaEvent="sendGaEventForCollaboratorWall"
        />
      </div>
      <RdCollaborativeList
        class="home__collaborative-list"
        :items="allCollaborations"
        @sendGaEvent="$sendGaEventForHomeClick('collaboration')"
      />
    </section>

    <section
      v-if="hasAnyMorePosts"
      v-show="shouldShowMoreSection"
      class="more-section yellow-bg"
    >
      <div class="container">
        <RdSectionHeading
          v-intersect="scrollDepthObserver"
          title="更多專題"
          linkHref="/category/"
          class="home__section-heading"
        />
        <div id="more-list-container">
          <RdListMore
            v-for="morePosts in displayedAllMorePosts"
            :key="morePosts.tag"
            :topic="morePosts.tag"
            :posts="morePosts.posts"
            class="home__list-more"
            @sendGaEvent="sendGaEventForMoreList(morePosts.tag)"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { get as axiosGet } from 'axios'

import RdHeader from '~/components/shared/Header/RdHeader.vue'
import RdMarquee from '~/components/shared/RdMarquee.vue'
import RdCarousel from '~/components/app/RdCarousel.vue'
import RdSectionHeading from '~/components/shared/RdSectionHeading.vue'
import RdListLatest from '~/components/shared/List/RdListLatest.vue'
import RdDatabaseList from '~/components/app/RdDatabaseList.vue'
import RdQuoteSlide from '~/components/app/RdQuoteSlide.vue'
import RdCollaboratorWall from '~/components/app/RdCollaboratorWall.vue'
import RdCollaborativeList from '~/components/app/RdCollaborativeList.vue'
import RdButtonDonate from '~/components/shared/Button/RdButtonDonate.vue'
import RdListMore from '~/components/shared/List/RdListMore.vue'

import intersect from '~/components/helpers/directives/intersect.js'

import { allEditorChoices } from '~/apollo/queries/editor-choices.gql'
import { allCollaborations } from '~/apollo/queries/collaborations.gql'
import { databases } from '~/apollo/queries/data.gql'
import { quotes } from '~/apollo/queries/quotes.gql'

import {
  setupIntersectionObserver,
  cleanupIntersectionObserver,
} from '~/components/helpers/index.js'
import { viewportWidth } from '~/composition/store/viewport.js'
import styleVariables from '~/scss/_variables.scss'
import { onDemand } from '~/helpers/integrations/index.js'
import { isProdEnv } from '~/helpers/index.js'

import SvgArrowMore from '~/assets/arrow-more.svg?inline'

const DATABASES_PAGE_SIZE = 3

const NUM_OF_COLLABORATOR_NAMES_SHOULD_FETCH = 80

const MORE_POSTS_TAGS = [
  { ID: isProdEnv ? 1184 : 103, NAME: '時事' },
  { ID: isProdEnv ? 1185 : 104, NAME: '教育' },
  { ID: isProdEnv ? 1186 : 14, NAME: '政治' },
  { ID: isProdEnv ? 1187 : 105, NAME: '人權' },
  { ID: isProdEnv ? 1188 : 106, NAME: '環境' },
  { ID: isProdEnv ? 1189 : 107, NAME: '新鮮事' },
]

export default {
  name: 'Home',
  components: {
    RdHeader,
    RdMarquee,
    RdCarousel,
    RdSectionHeading,
    RdListLatest,
    RdDatabaseList,
    RdQuoteSlide,
    RdCollaboratorWall,
    RdCollaborativeList,
    RdButtonDonate,
    RdListMore,

    SvgArrowMore,
  },

  directives: {
    intersect,
  },

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
    this.latestPosts = await this.$fetchLatestPosts()
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

      allMorePosts: MORE_POSTS_TAGS.map(({ NAME }) => ({
        tag: NAME,
        posts: [],
      })),
      isLoadingMacy: false,
      macyInstance: undefined,
      unwatchIsViewportWidthUpMd: undefined,
      shouldShowMoreSection: !this.isViewportWidthUpMd,

      scrollDepthObserver: undefined,
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
      return (
        (this.databases.meta.count > 3 && this.currentNumOfDatabases < 9) ||
        this.isDatabasesLoading
      )
    },
    isDatabasesLoading() {
      return this.$apollo.queries.databases.loading
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

    hasAnyMorePosts() {
      return this.allMorePosts.some(this.hasPosts)
    },
    displayedAllMorePosts() {
      return this.allMorePosts.filter(this.hasPosts)
    },
  },
  mounted() {
    this.handleAllMorePosts()
    this.loadCollaboratorsCount()
    this.scrollTo(this.$route.hash)
    this.setupScrollDepthObserver()
  },

  beforeDestroy() {
    cleanupIntersectionObserver(this, 'scrollDepthObserver')
  },

  methods: {
    async loadCollaboratorsCount() {
      try {
        const response =
          (await axiosGet('/api/google-sheets', {
            params: {
              spreadsheetId: '1vEuoCAAXR8NMoh6qiOnj6kNdLv0lc-CaInLnWUuvySo',
              range: '名稱列表!F1',
            },
          })) || {}

        this.countOfCollaboratorWall = Number(response.data?.values?.[0]?.[0])
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err)
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
        const response = await axiosGet('/api/google-sheets', {
          params: {
            spreadsheetId: '1vEuoCAAXR8NMoh6qiOnj6kNdLv0lc-CaInLnWUuvySo',
            range: `名稱列表!B${theBeginningRowNum}:B${theEndRowNum}`,
            majorDimension: 'COLUMNS',
          },
        })

        return response.data.values[0].join(' ')
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
      }
    },

    async handleAllMorePosts() {
      await Promise.all(
        MORE_POSTS_TAGS.map(({ ID }, idx) => this.loadMorePosts(ID, idx))
      )

      this.unwatchIsViewportWidthUpMd = this.$watch(
        'isViewportWidthUpMd',
        this.handleMacy,
        { immediate: true }
      )
    },
    async loadMorePosts(tagId, idx) {
      try {
        const posts = (await this.$fetchPostsByTag(tagId)) || []
        this.allMorePosts[idx].posts = posts
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err)
      }
    },
    async handleMacy(isViewportWidthUpMd) {
      if (this.macyInstance) {
        this.unwatchIsViewportWidthUpMd()
        return
      }

      if (isViewportWidthUpMd && this.hasAnyMorePosts && !this.isLoadingMacy) {
        const loadMacy = onDemand('https://cdn.jsdelivr.net/npm/macy@2')
        this.isLoadingMacy = true

        try {
          await loadMacy()
          this.initMacy()

          this.shouldShowMoreSection = true
        } catch (error) {
          // eslint-disable-next-line no-console
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
    hasPosts(item) {
      return item.posts.length > 0
    },

    loadMoreDatabases() {
      if (this.isDatabasesLoading) {
        return
      }

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

    scrollTo(hash) {
      if (hash) {
        const scrollIntoView = require('scroll-into-view')
        const [, name] = hash.split('#')
        const ele = this.$refs[name]

        scrollIntoView(ele, {
          time: 300,
          align: { top: 0 },
          ease: (t) => t * t * t,
        })
      }
    },

    sendGaEventForCollaboratorWall(doesUnfold) {
      this.$sendGaEventForHomeClick(`credit-${doesUnfold ? 'open' : 'close'}`)
    },
    sendGaEventForMoreList(topic) {
      this.$sendGaEventForHomeClick(`category ${topic}`)
    },
    async setupScrollDepthObserver() {
      const footerId = 'default-footer'

      this.scrollDepthObserver = await setupIntersectionObserver((entries) => {
        entries.forEach(({ isIntersecting, target }) => {
          if (isIntersecting) {
            if (target.id === footerId) {
              this.$sendGaEventForHomeScroll('scroll 到 footer')
            } else {
              this.$sendGaEventForHomeScroll(
                `scroll 到${target.textContent.trim()}`
              )
            }
            this.scrollDepthObserver.unobserve(target)
          }
        })
      })
      this.scrollDepthObserver.observe(document.getElementById(footerId))
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
  &__collaborative-list {
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
  &__list-more {
    padding-bottom: 30px;
    @include media-breakpoint-up(md) {
      padding-bottom: 60px;
    }
  }

  &__marquee {
    flex: 1 1 auto;
    @include media-breakpoint-up(lg) {
      ::v-deep p {
        animation-name: none;
      }
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

.marquee-container {
  display: flex;
  align-items: center;
  padding-top: 11px;
  padding-bottom: 11px;
  padding-right: 23px;
  box-shadow: 0 0 2px rgba(#000, 0.2);
  @include media-breakpoint-up(md) {
    padding-left: 26px;
    padding-right: 29px;
  }

  a {
    flex: 0 0 auto;
    user-select: none;
    @include media-breakpoint-up(lg) {
      display: flex;
      align-items: center;
    }
  }

  span {
    display: none;
    @include media-breakpoint-up(lg) {
      display: inline;
      font-weight: 700;
      font-size: 15px;
      line-height: 1.5;
      letter-spacing: 2.5px;
    }
  }

  svg {
    padding-left: 19px;
    box-sizing: content-box;
    @include media-breakpoint-up(lg) {
      padding-left: 16px;
    }
  }
}

.home__carousel,
.container--latest,
.container--database,
.collaboration-container {
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
