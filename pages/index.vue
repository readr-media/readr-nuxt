<template>
  <div>
    <RdHeader />

    <section class="marquee-container">
      <RdMarquee class="home__marquee" />
      <nuxt-link to="/landing" @click.native="sendGaClickEvent('landing')">
        <span>了解更多</span>
        <SvgArrowMore />
      </nuxt-link>
    </section>

    <section>
      <RdCarousel
        v-if="shouldOpenEditorChoices"
        :posts="allEditorChoices"
        class="home__carousel"
        @sendGaEvent="sendGaClickEvent('editor choices')"
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
        @sendGaEvent="sendGaClickEvent('latest articles')"
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
        @sendGaEvent:database="sendGaClickEvent('open database github')"
        @sendGaEvent:portfolio="sendGaClickEvent('open database portfolio')"
        @sendGaEvent:loadMore="sendGaClickEvent('open database load more')"
      />

      <RdButtonDonate
        class="home__donate-btn"
        @sendGaEvent="sendGaClickEvent('donate-opendata')"
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
        @sendGaEvent="sendGaClickEvent('collaboration')"
      />
    </section>

    <section
      v-show="shouldShowCategorySection"
      class="category-section yellow-bg"
    >
      <div class="container">
        <RdSectionHeading
          v-intersect="scrollDepthObserver"
          title="更多專題"
          linkHref="/category/"
          class="home__section-heading"
        />
        <div id="category-list-container">
          <RdListCategory
            v-for="categoryList in displayedCategoryLists"
            :key="categoryList.name"
            :category="categoryList.name"
            :posts="categoryList.items"
            class="home__list-category"
            @sendGaEvent="sendGaClickEvent(`category ${categoryList.name}`)"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
import RdListCategory from '~/components/shared/List/RdListCategory.vue'

import intersect from '~/components/helpers/directives/intersect.js'

import { allEditorChoices } from '~/apollo/queries/editor-choices.gql'
import { latestPosts, categoryPosts } from '~/apollo/queries/posts.gql'
import { allCollaborations } from '~/apollo/queries/collaborations.gql'
import { databases } from '~/apollo/queries/data.gql'
import { quotes } from '~/apollo/queries/quotes.gql'
import { categories } from '~/apollo/queries/categories.gql'

import {
  setupIntersectionObserver,
  cleanupIntersectionObserver,
} from '~/components/helpers/index.js'
import styleVariables from '~/scss/_variables.module.scss'
import { getHref, formatDate } from '~/helpers/index.js'

import SvgArrowMore from '~/assets/arrow-more.svg?inline'

const DATABASES_PAGE_SIZE = 3

const NUM_OF_COLLABORATOR_NAMES_SHOULD_FETCH = 80

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
    RdListCategory,

    SvgArrowMore,
  },

  directives: {
    intersect,
  },

  apollo: {
    allEditorChoices: {
      query: allEditorChoices,
    },
    latestPosts: {
      query: latestPosts,
      variables: {
        first: 5,
      },
      update(result) {
        return result.items.map(function transformContent(post) {
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
              alt: heroImage?.name || ogImage?.name || '',
            },
            date: formatDate(publishTime),
          }
        })
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
    categories: {
      query: categories,
      prefetch: false,
      manual: true,
      async result({ data, loading }) {
        if (!loading && !this.doesHaveCategoryLists) {
          await Promise.allSettled(data.categories.map(this.loadCategoryList))

          this.unwatchIsViewportWidthUpMd = this.$watch(
            'isViewportWidthUpMd',
            this.handleCategorySectionLayout,
            { immediate: true }
          )
        }
      },
    },
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

      categoryLists: [],
      isInitializingMacy: false,
      macyInstance: undefined,
      unwatchIsViewportWidthUpMd: undefined,

      scrollDepthObserver: undefined,
    }
  },
  computed: {
    ...mapGetters('viewport', ['viewportWidth']),

    isViewportWidthUpMd() {
      return this.viewportWidth >= this.breakpointMd
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

    shouldShowCategorySection() {
      return (
        (!this.isViewportWidthUpMd || this.macyInstance) &&
        this.doesHaveCategoryLists
      )
    },
    doesHaveCategoryLists() {
      return this.displayedCategoryLists.length > 0
    },
    displayedCategoryLists() {
      return this.categoryLists.filter(function doesHaveItems(list) {
        return list.items.length > 0
      })
    },
  },
  mounted() {
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

    async loadCategoryList(category, idx) {
      try {
        const { data = {} } =
          (await this.$apollo.query({
            query: categoryPosts,
            variables: {
              categorySlug: category.slug,
            },
            prefetch: false,
          })) || {}
        this.$set(this.categoryLists, idx, {
          name: category.name,
          items:
            data?.items.map(function transformContent(post) {
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
                    heroImage?.urlMobileSized ||
                    ogImage?.urlMobileSized ||
                    require('~/assets/default/post.svg'),
                  alt: heroImage?.name || ogImage?.name || '',
                },
                date: formatDate(publishTime),
              }
            }) || [],
        })
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err)
      }
    },
    async handleCategorySectionLayout(isViewportWidthUpMd) {
      if (this.macyInstance) {
        this.unwatchIsViewportWidthUpMd()
        return
      }

      if (
        isViewportWidthUpMd &&
        this.doesHaveCategoryLists &&
        !this.isInitializingMacy
      ) {
        this.isInitializingMacy = true

        try {
          const initMacy = (await import('macy')).default
          this.macyInstance = initMacy({
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
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error(err)
        }

        this.isInitializingMacy = false
      }
    },
    doesHavePosts(item) {
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
      this.sendGaClickEvent(`credit-${doesUnfold ? 'open' : 'close'}`)
    },
    sendGaClickEvent(label, value) {
      this.sendGaEvent('click', label, value)
    },
    sendGaScrollEvent(label, value) {
      this.sendGaEvent('scroll', label, value)
    },
    sendGaEvent(action, label, value) {
      this.$ga.event('Home', action, label, value)
    },

    async setupScrollDepthObserver() {
      const footerId = 'default-footer'

      this.scrollDepthObserver = await setupIntersectionObserver((entries) => {
        entries.forEach(({ isIntersecting, target }) => {
          if (isIntersecting) {
            if (target.id === footerId) {
              this.sendGaScrollEvent('scroll 到 footer')
            } else {
              this.sendGaScrollEvent(`scroll 到${target.textContent.trim()}`)
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
  &__list-category {
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
