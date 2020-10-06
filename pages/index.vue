<template>
  <div>
    <UiHeader @sendGaEvt="$sendGaEvtForHeaderClick('logo')" />

    <section class="marquee-container">
      <UiMarquee class="home__marquee" />
      <nuxt-link
        to="/landing"
        @click.native="$sendGaEvtForHomeClick('landing')"
      >
        <span>了解更多</span>
        <SvgArrowMore />
      </nuxt-link>
    </section>

    <section>
      <UiCarousel
        v-if="shouldOpenEditorChoices"
        :posts="allEditorChoices"
        class="home__carousel"
        @sendGaEvt="$sendGaEvtForHomeClick('editor choices')"
      >
        <template #heading>
          <UiSectionHeading title="編輯精選" />
        </template>
      </UiCarousel>
    </section>

    <section ref="latest" class="container container--latest">
      <UiSectionHeading
        title="最新文章"
        fill="#ebf02c"
        class="home__section-heading"
      />
      <UiPostLatestList
        v-if="shouldOpenLatestList"
        :postMain="latestPostMain"
        :postsSub="latestPostsSub"
        @sendGaEvt="$sendGaEvtForHomeClick('latest articles')"
      />
    </section>

    <section ref="database" class="container container--database">
      <div class="database-heading">
        <h2>開放資料庫</h2>
      </div>
      <UiDatabaseList
        :list="databases.all"
        :shouldLoadMore="shouldLoadMoreDatabases"
        class="home__database-list"
        @loadMore="loadMoreDatabases"
        @sendGaEvt:database="$sendGaEvtForHomeClick('open database github')"
        @sendGaEvt:portfolio="$sendGaEvtForHomeClick('open database portfolio')"
        @sendGaEvt:loadMore="$sendGaEvtForHomeClick('open database load more')"
      />

      <UiButtonDonate
        class="home__donate-btn"
        @sendGaEvt="$sendGaEvtForHomeClick('donate-opendata')"
      />
    </section>

    <section ref="collaboration" class="horizontal-container">
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
          @sendGaEvt="sendGaEvtForCollaboratorWall"
        />
      </div>
      <UiHorizontalList
        class="home__horizontal-list"
        :items="allCollaborations"
        @sendGaEvt="$sendGaEvtForHomeClick('collaboration')"
      />
    </section>

    <section
      v-if="hasAnyCategoryPosts"
      v-show="shouldShowCategorySection"
      ref="category"
      class="category-section yellow-bg"
    >
      <div class="container">
        <UiSectionHeading title="更多專題" class="home__section-heading" />
        <div id="category-list-container">
          <UiCategoryList
            v-for="categoryPosts in displayedCategoriesPosts"
            :key="categoryPosts.name"
            :category="categoryPosts.name"
            :posts="categoryPosts.posts"
            :shouldLoadMore="shouldLoadMoreCategoryPosts(categoryPosts.slug)"
            class="home__category-list"
            @loadMore="loadMoreCategoryPosts(categoryPosts.slug)"
            @sendGaEvt:post="
              $sendGaEvtForHomeClick(`category ${categoryPosts.name}`)
            "
            @sendGaEvt:loadMore="
              $sendGaEvtForHomeClick(`category ${categoryPosts.name} load more`)
            "
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { get as axiosGet } from 'axios'

import { allEditorChoices } from '~/apollo/queries/editor-choices.gql'
import { latestPosts, categoryPosts } from '~/apollo/queries/posts.gql'
import { allCollaborations } from '~/apollo/queries/collaborations.gql'
import { databases } from '~/apollo/queries/data.gql'
import { quotes } from '~/apollo/queries/quotes.gql'

import { viewportWidth } from '~/composition/store/viewport.js'
import styleVariables from '~/scss/_variables.scss'
import { onDemand } from '~/utils/integrations/index.js'

import SvgArrowMore from '~/assets/arrow-more.svg?inline'

const PAGE_SIZE_DATABASES = 3
const PAGE_SIZE_CATEGORY_POSTS = 3

const NUM_OF_COLLABORATOR_NAMES_SHOULD_FETCH = 80

const categories = [
  { slug: 'breakingnews', name: '時事' },
  { slug: 'education', name: '教育' },
  { slug: 'politics', name: '政治' },
  { slug: 'humanrights', name: '人權' },
  { slug: 'environment', name: '環境' },
  { slug: 'omt', name: '新鮮事' },
]
const categoryPostsQueries = {}

categories.forEach(function createCategoryPostsQueries({ slug }) {
  setProp(categoryPostsQueries, `categoryPosts${capitalize(slug)}`, {
    query: categoryPosts,
    variables: () => ({ categorySlug: slug }),
    prefetch: false,
    manual: true,
    result({ data, loading }) {
      if (!loading) {
        const posts = this.categoryPostsOf(slug)

        setProp(posts, 'posts', data.posts)
        setProp(posts, 'meta', data.meta)
      }
    },
  })
})

export default {
  name: 'Home',
  components: {
    SvgArrowMore,
  },
  apollo: {
    allEditorChoices: {
      query: allEditorChoices,
    },
    latestPosts: {
      query: latestPosts,
      variables() {
        return { first: 5 }
      },
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
    ...categoryPostsQueries,
  },
  data() {
    return {
      allEditorChoices: [],
      latestPosts: [],
      allCollaborations: [],

      databases: {
        all: [],
        meta: {},
      },
      databasesPage: 0,

      collaboratorWall: {
        count: 0,
        names: '',
      },
      quotes: [],

      categoriesPosts: categories.map((category) => ({
        ...category,
        posts: [],
        meta: {},
      })),

      isLoadingMacy: false,
      macyInstance: undefined,
      unwatchIsViewportWidthUpMd: undefined,

      shouldShowCategorySection: !this.isViewportWidthUpMd,
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
      return PAGE_SIZE_DATABASES * this.databasesPage
    },
    currentNumOfDatabases() {
      return this.prevNumOfDatabases + PAGE_SIZE_DATABASES
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

    hasAnyCategoryPosts() {
      return this.categoriesPosts.some(this.hasPosts)
    },
    displayedCategoriesPosts() {
      return this.categoriesPosts.filter(this.hasPosts)
    },
    areCategoriesPostsLoading() {
      const {
        categoryPostsBreakingnews,
        categoryPostsEducation,
        categoryPostsPolitics,
        categoryPostsHumanrights,
        categoryPostsEnvironment,
        categoryPostsOmt,
      } = this.$apollo.queries

      return (
        categoryPostsBreakingnews.loading ||
        categoryPostsEducation.loading ||
        categoryPostsPolitics.loading ||
        categoryPostsHumanrights.loading ||
        categoryPostsEnvironment.loading ||
        categoryPostsOmt.loading
      )
    },
  },
  async mounted() {
    this.unwatchIsViewportWidthUpMd = this.$watch(
      () => [this.isViewportWidthUpMd, this.areCategoriesPostsLoading].join(),
      this.handleMacy,
      { immediate: true }
    )

    this.countOfCollaboratorWall =
      (await this.fetchCountOfCollaboratorWall()) || 0

    this.scrollTo(this.$route.hash)

    this.addListenerToScrollDepthForGaEvt()
  },
  methods: {
    async fetchCountOfCollaboratorWall() {
      try {
        const response = await axiosGet('/api/google-sheets', {
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
        const response = await axiosGet('/api/google-sheets', {
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

    hasPosts(item) {
      return item.posts.length > 0
    },

    async handleMacy() {
      if (this.macyInstance) {
        this.unwatchIsViewportWidthUpMd()
        return
      }

      if (
        this.isViewportWidthUpMd &&
        !this.areCategoriesPostsLoading &&
        !this.isLoadingMacy
      ) {
        const loadMacy = onDemand('https://cdn.jsdelivr.net/npm/macy@2')
        this.isLoadingMacy = true

        try {
          await loadMacy()
          this.initMacy()

          this.shouldShowCategorySection = true
        } catch (error) {
          console.error(error)
        }

        this.isLoadingMacy = false
      }
    },
    initMacy() {
      this.macyInstance = window.Macy({
        container: '#category-list-container',
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
      if (this.isDatabasesLoading) {
        return
      }

      this.databasesPage += 1
      this.$apollo.queries.databases.fetchMore({
        variables: {
          first: PAGE_SIZE_DATABASES,
          skip: this.prevNumOfDatabases,
          hasMeta: true,
        },
        updateQuery: (prevResult, { fetchMoreResult }) => ({
          all: [...prevResult.all, ...fetchMoreResult.all],
          meta: this.databases.meta,
        }),
      })
    },

    loadMoreCategoryPosts(slug) {
      const name = `categoryPosts${capitalize(slug)}`

      if (this.$apollo.queries[name].loading) {
        return
      }

      const { posts } = this.categoryPostsOf(slug)

      this.$apollo.queries[name].fetchMore({
        variables: {
          first: PAGE_SIZE_CATEGORY_POSTS,
          skip: posts.length,
          shouldQueryMeta: false,
        },
        updateQuery: (_, { fetchMoreResult }) => {
          posts.push(...fetchMoreResult.posts)

          this.relayout()
        },
      })
    },
    shouldLoadMoreCategoryPosts(slug) {
      const { posts, meta } = this.categoryPostsOf(slug)

      return meta.count > PAGE_SIZE_CATEGORY_POSTS && posts.length < 9
    },
    categoryPostsOf(categorySlug) {
      return this.categoriesPosts.find(function doesSlugMatch(postsByCategory) {
        return postsByCategory.slug === categorySlug
      })
    },
    relayout() {
      if (this.macyInstance) {
        this.macyInstance.runOnImageLoad(() => {
          this.macyInstance.recalculate()
        })
      }
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

    sendGaEvtForCollaboratorWall(doesUnfold) {
      this.$sendGaEvtForHomeClick(`credit-${doesUnfold ? 'open' : 'close'}`)
    },
    addListenerToScrollDepthForGaEvt() {
      const { latest, database, collaboration, category } = this.$refs
      const triggers = [
        { elem: latest, evtFields: ['scroll 到最新文章', 1] },
        { elem: database, evtFields: ['scroll 到開放資料庫', 2] },
        { elem: collaboration, evtFields: ['scroll 到協作專區', 3] },
        { elem: category, evtFields: ['scroll 到更多專題', 4] },
        {
          elem: document.getElementById('default-footer'),
          evtFields: ['scroll 到 footer ', 5],
        },
      ]

      this.$listenScrollDepthForGaEvt(triggers, this.$sendGaEvtForHomeScroll)
    },
  },
}

function setProp(obj, name, val) {
  obj[name] = val
}

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1)
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
  &__category-list {
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

.category-section {
  padding-top: 20px;
  @include media-breakpoint-up(md) {
    padding-top: 30px;
  }
}

.yellow-bg {
  background-color: #ebf02c;
}
</style>
