<template>
  <div>
    <RdHeader />

    <section class="marquee-container">
      <RdMarquee class="home__marquee" />
      <NuxtLink to="/landing" @click.native="sendGaClickEvent('landing')">
        <span>了解更多</span>
        <SvgArrowMore />
      </NuxtLink>
    </section>

    <section>
      <RdCarousel
        v-if="shouldOpenEditorChoices"
        :posts="editorChoices"
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
        :items="databaseList.items"
        :loadMore="loadMoreDatabaseItems"
        :shouldLoadMore="shouldLoadMoreDatabaseItems"
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
        :items="collaborations"
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
import gql from 'graphql-tag'
import gqlCombineQuery from 'graphql-combine-query'

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
import SvgArrowMore from '~/assets/imgs/arrow-more.svg?inline'

import intersect from '~/components/helpers/directives/intersect.js'

import { editorChoices } from '~/apollo/queries/editor-choices.js'
import { latestPosts } from '~/apollo/queries/posts.js'
import { databaseList } from '~/apollo/queries/data.js'
import { quotes } from '~/apollo/queries/quotes.js'
import { collaborations } from '~/apollo/queries/collaborations.js'
import { categories } from '~/apollo/queries/categories.js'

import {
  setupIntersectionObserver,
  cleanupIntersectionObserver,
} from '~/components/helpers/index.js'
import styleVariables from '~/assets/css/variables.module.scss'
import { getHref, formatDate } from '~/helpers/index.js'

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
    homePageOnServer: {
      query: gqlCombineQuery('homePageOnServer')
        .add(editorChoices)
        .add(latestPosts).document,
      variables: {
        first: 5,
      },
      manual: true,
      result({ data, loading }) {
        if (!loading) {
          this.editorChoices = data.editorChoices || []
          this.latestPosts =
            data.latestPosts?.map(function transformContent(post) {
              const {
                id = '',
                title = '',
                heroImage = {},
                ogImage = {},
                publishTime = '',
              } = post || {}

              return {
                id,
                title,
                href: getHref(post),
                img: {
                  src:
                    heroImage?.urlTabletSized ||
                    ogImage?.urlTabletSized ||
                    require('~/assets/imgs/default/post.svg'),
                },
                date: formatDate(publishTime),
              }
            }) || []
        }
      },
    },

    databaseList: {
      query: databaseList,
      prefetch: false,
      update(result) {
        const { items, meta } = result

        return {
          ...this.databaseList,
          items: items.map(this.transformDatabaseItem),
          meta,
        }
      },
    },
    quotes: {
      query: quotes,
      prefetch: false,
    },
    collaborations: {
      query: collaborations,
      prefetch: false,
    },
    categories: {
      query: categories,
      prefetch: false,
      manual: true,
      result: async function handleCategoryLists({ data, loading }) {
        if (!loading && !this.doesHaveCategoryLists) {
          await this.loadCategoryLists(data.categories)

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
      editorChoices: [],

      latestPosts: [],

      databaseList: {
        items: [],
        meta: {
          count: 0,
        },
        isLoading: false,
      },

      quotes: [],

      collaborations: [],
      collaboratorWall: {
        count: 0,
        names: '',
      },

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
      return this.editorChoices && this.editorChoices.length > 0
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

    shouldLoadMoreDatabaseItems() {
      return this.databaseList.meta.count > 3 && this.totalDatabaseItems < 9
    },
    totalDatabaseItems() {
      return this.databaseList.items.length
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
    transformDatabaseItem(item) {
      const { id = '', title = '', link = '', relatedGallery: galleries = [] } =
        item || {}
      const names = galleries?.[0]?.writers?.map(function getName(writer) {
        return writer.name
      })

      return {
        id,
        title,
        href: link,
        writerName: names?.[0],
        galleries: galleries?.map(function transformContent(gallery) {
          const { id = '', link = '', heroImage = {} } = gallery || {}

          return {
            id,
            href: link,
            img:
              heroImage?.urlTinySized ||
              require('~/assets/imgs/default/database.svg'),
          }
        }),
      }
    },
    async loadMoreDatabaseItems() {
      if (this.databaseList.isLoading) {
        return
      }
      this.databaseList.isLoading = true

      try {
        await this.$apollo.queries.databaseList.fetchMore({
          variables: {
            skip: this.totalDatabaseItems,
            shouldQueryMeta: false,
          },
          updateQuery: (prevResult, { fetchMoreResult }) => {
            return {
              items: [...prevResult.items, ...fetchMoreResult.items],
              meta: this.databaseList.meta,
            }
          },
        })
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err)
      } finally {
        this.databaseList.isLoading = false
      }
    },

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
      const endRow = this.countOfCollaboratorWall + 1
      const numOfCollaboratorNamesShouldFetch = 80
      const beginningRow = endRow - numOfCollaboratorNamesShouldFetch + 1
      try {
        const response = await axiosGet('/api/google-sheets', {
          params: {
            spreadsheetId: '1vEuoCAAXR8NMoh6qiOnj6kNdLv0lc-CaInLnWUuvySo',
            range: `名稱列表!B${beginningRow}:B${endRow}`,
            majorDimension: 'COLUMNS',
          },
        })

        return response.data.values[0].join(' ')
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
      }
    },

    async loadCategoryLists(categories) {
      try {
        const { data = {} } =
          (await this.$apollo.query({
            query: gql`query {
            ${categories.map(function buildField(category) {
              const { slug } = category
              return `${slug}: allPosts(
                first: 3
                where: { categories_some: { slug: "${slug}" } }
                sortBy: [publishTime_DESC]
              ) {
                id
                title: name
                style
                heroImage {
                  urlMobileSized
                }
                ogImage {
                  urlMobileSized
                }
                publishTime
              }`
            })}
          }`,
          })) || {}

        categories.forEach((category) => {
          // to ensure the order of the categoryLists
          this.pushCategoryList(data, category)
        })
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err)
      }
    },
    pushCategoryList(data = {}, category = {}) {
      const { slug, name } = category
      const items = data[slug] || []
      this.categoryLists.push({
        name,
        items: items.map(function transformContent(post) {
          const {
            id = '',
            title = '',
            heroImage = {},
            ogImage = {},
            publishTime = '',
          } = post || {}

          return {
            id,
            title,
            href: getHref(post),
            img: {
              src:
                heroImage?.urlMobileSized ||
                ogImage?.urlMobileSized ||
                require('~/assets/imgs/default/post.svg'),
            },
            date: formatDate(publishTime),
          }
        }),
      })
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

    scrollTo(hash) {
      if (hash) {
        const scrollIntoView = require('scroll-into-view')
        const [, name] = hash.split('#')
        const ele = this.$refs[name]

        scrollIntoView(ele, {
          time: 300,
          align: { top: 0 },

          // The ease function was copied from https://gist.github.com/gre/1650294
          ease: function easeInCubic(t) {
            return t * t * t
          },
        })
      }
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
