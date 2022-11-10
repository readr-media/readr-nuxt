<template>
  <div class="g-page-wrapper home">
    <RdNavbar />

    <ElectionMayor
      v-if="polling.length"
      :polling="polling"
      :updatedAt="updatedAt"
    />

    <RdEditorChoice
      v-if="shouldOpenEditorChoices"
      :posts="transformedEditorChoice"
      class="home__editor-choice"
    />

    <RdHomeCategory
      v-if="shouldOpenHomeCategory"
      :categories="transformedCategories"
      :latest="transformedCategoryLatest"
      class="container container--category"
    />

    <RdFeature
      v-if="shouldOpenFeature"
      :posts="transformedFeatures"
      class="home__feature"
    />

    <section
      v-if="shouldOpenCollaboration"
      ref="collaboration"
      class="collaboration-container"
    >
      <div class="container container--quote">
        <RdListHeading title="協作專區" color="#ebf02c" class="quote-heading" />
        <!-- banner of open-relation project -->
        <a
          href="https://whoareyou.readr.tw/"
          target="_blank"
          rel="noreferrer noopenner"
        >
          <picture>
            <source
              srcset="~/assets/imgs/open-relation/desktop_1096x241.png"
              media="(min-width: 1200px)"
            />
            <source
              srcset="~/assets/imgs/open-relation/tablet_710x215.png"
              media="(min-width: 768px)"
            />
            <img
              src="~/assets/imgs/open-relation/mobile_280x172.png"
              alt="open-relation-banner"
            /> </picture
        ></a>
        <!-- original component, replaced by banner of open-relation -->
        <!-- <RdQuoteSlide :quotes="quotes" /> -->
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

    <section v-if="shouldOpenDatabase" class="container container--database">
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
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import { get as axiosGet } from 'axios'
import gqlCombineQuery from 'graphql-combine-query'

import RdNavbar from '~/components/shared/RdNavbar.vue'
import RdEditorChoice from '~/components/shared/RdEditorChoice.vue'
import RdHomeCategory from '~/components/shared/RdHomeCategory.vue'
import RdFeature from '~/components/shared/RdFeature.vue'
import RdListHeading from '~/components/shared/RdListHeading.vue'
import RdDatabaseList from '~/components/app/RdDatabaseList.vue'
// import RdQuoteSlide from '~/components/app/RdQuoteSlide.vue'
import RdCollaboratorWall from '~/components/app/RdCollaboratorWall.vue'
import RdCollaborativeList from '~/components/app/RdCollaborativeList.vue'
import RdButtonDonate from '~/components/shared/Button/RdButtonDonate.vue'
import ElectionMayor from '~/components/report/elections-2022mayor/election-mayor.vue'

import { intersect } from '~/helpers/vue/directives/index.js'

import { editorChoices } from '~/apollo/queries/editor-choices.js'
import { latestPosts } from '~/apollo/queries/posts.js'
import { feature } from '~/apollo/queries/feature.js'
import { databaseList } from '~/apollo/queries/datas.js'
import { quotes } from '~/apollo/queries/quotes.js'
import { collaborations } from '~/apollo/queries/collaborations.js'
import { categories } from '~/apollo/queries/categories.js'

import styleVariables from '~/assets/css/variables.module.scss'
import {
  setupIntersectionObserver,
  cleanupIntersectionObserver,
  getHref,
  formatPostDate,
  formatReadTime,
  isReport,
} from '~/helpers/index.js'

export default {
  name: 'Home',

  components: {
    RdNavbar,
    RdEditorChoice,
    RdHomeCategory,
    RdFeature,
    RdListHeading,
    RdDatabaseList,
    // RdQuoteSlide,
    RdCollaboratorWall,
    RdCollaborativeList,
    RdButtonDonate,
    ElectionMayor,
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
        first: 15,
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
                readingTime = 0,
                style = '',
              } = post || {}

              return {
                id,
                title,
                style,
                href: getHref(post),
                img: {
                  src:
                    heroImage?.urlTabletSized ||
                    ogImage?.urlTabletSized ||
                    require('~/assets/imgs/default/post.svg'),
                },
                readTime: formatReadTime(readingTime),
                date: formatPostDate(publishTime),
                isReport: isReport(style),
              }
            }) || []
        }
      },
    },

    databaseList: {
      query: databaseList,
      variables: {
        first: 3,
        shouldQueryMeta: true,
      },
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
      variables() {
        return {
          relatedPostFirst: 8,
          relatedReportFirst: 1,
          shouldQueryRelatedPost: true,
          shouldQueryRelatedReport: true,
          relatedPostTypes: ['news'],
          relatedReportTypes: ['embedded', 'project3', 'report'],
        }
      },
    },
    feature: {
      query: feature,
    },
  },

  async asyncData({ $config }) {
    if ($config.electionMayorFeatureToggle !== 'on') {
      return { polling: [] }
    }
    const data = await axios.get(
      // 'https://whoareyou-gcs.readr.tw/elections-dev/2022/mayor/special_municipality.json'
      'https://whoareyou-gcs.readr.tw/elections-dev/2022/mayor/special_municipality.json'
    )

    return {
      polling: data.data?.polling || [],
      updatedAt: data.data?.updatedAt || '',
    }
  },

  data() {
    return {
      editorChoices: [],
      latestPosts: [],
      quotes: [],
      collaborations: [],
      databaseList: {
        items: [],
        meta: {
          count: 0,
        },
        isLoading: false,
      },
      collaboratorWall: {
        count: 0,
        names: '',
      },

      isLoadingCategoryLists: false,
      scrollDepthObserver: undefined,
      polling: [],
      updatedAt: '',
    }
  },

  computed: {
    ...mapGetters('viewport', ['viewportWidth']),

    isViewportWidthUpMd() {
      console.log(this.polling)
      return this.viewportWidth >= this.breakpointMd
    },
    breakpointMd() {
      return parseInt(styleVariables['breakpoint-md'], 10)
    },
    transformedEditorChoice() {
      return this.editorChoices?.map((post) => {
        const EditorHeroImage = post?.heroImage
        const {
          id = '',
          title = '',
          slug = '',
          readingTime = 0,
          style = '',
          heroImage = {},
          ogImage = {},
          publishTime = '',
        } = post?.choice || {}

        const image = EditorHeroImage || heroImage

        return {
          id,
          title,
          href: getHref({ style, id, slug }),
          date: formatPostDate(publishTime),
          readTime: formatReadTime(readingTime),
          isReport: isReport(style),
          img: {
            src:
              image?.urlTabletSized ||
              image?.urlMobileSized ||
              ogImage?.urlTabletSized ||
              ogImage?.urlMobileSized ||
              require('~/assets/imgs/default/post.svg'),
          },
        }
      })
    },
    transformedCategories() {
      return this.categories?.map((item) => {
        const reports = item.reports?.map((report) =>
          this.transformCategoryItem(report)
        )
        const postList =
          item.posts?.length && !reports?.length
            ? item.posts
            : item.posts?.filter((item, i) => i < 4)
        const posts = postList?.map((post) => this.transformCategoryItem(post))

        return {
          name: item?.name ?? '',
          slug: item?.slug ?? '',
          posts,
          reports,
        }
      })
    },

    transformedCategoryLatest() {
      let count = 0
      const report = this.latestPosts.find((item, i) => item.style !== 'news')
      const posts = this.latestPosts.filter((item) => {
        if (count < 4 && item.style === 'news') {
          count++
          return item
        }
      })
      return {
        slug: 'all',
        name: '',
        posts,
        reports: [report],
      }
    },
    transformedFeatures() {
      const randomArray = this.arrayRandomFilter(4, this.feature || [])
      return randomArray?.map((post) => {
        const { description = '' } = post || {}
        const {
          id = '',
          title = '',
          subtitle = '',
          slug = '',
          style = '',
          heroImage = {},
          ogImage = {},
        } = post?.featuredPost || {}

        return {
          id,
          title,
          subtitle,
          description,
          href: getHref({ style, id, slug }),
          img: {
            src:
              heroImage?.urlTabletSized ||
              heroImage?.urlMobileSized ||
              ogImage?.urlTabletSized ||
              ogImage?.urlMobileSized ||
              require('~/assets/imgs/default/post.svg'),
          },
        }
      })
    },

    shouldOpenEditorChoices() {
      return (
        this.transformedEditorChoice && this.transformedEditorChoice?.length > 0
      )
    },
    shouldOpenHomeCategory() {
      return (
        this.transformedCategories && this.transformedCategories?.length > 0
      )
    },
    shouldOpenFeature() {
      return this.transformedFeatures && this.transformedFeatures?.length > 0
    },
    shouldOpenCollaboration() {
      return this.collaborations && this.collaborations?.length > 0
    },
    shouldOpenDatabase() {
      return this.databaseList?.items && this.databaseList?.items?.length > 0
    },
    shouldLoadMoreDatabaseItems() {
      return (
        this.databaseList.meta.count > 3 &&
        this.databaseList.meta.count > this.totalDatabaseItems
      )
    },
    totalDatabaseItems() {
      return this.databaseList.items?.length
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
  mounted() {
    this.loadCollaboratorsCount()
    this.scrollTo(this.$route.hash)
    this.setupScrollDepthObserver()
  },

  beforeDestroy() {
    cleanupIntersectionObserver(this, 'scrollDepthObserver')
  },

  methods: {
    transformCategoryItem(post = {}) {
      const {
        id = '',
        title = '',
        heroImage = {},
        ogImage = {},
        style = '',
        publishTime = '',
        readingTime = 0,
      } = post
      return {
        id,
        title,
        href: getHref(post),
        isReport: isReport(style),
        img: {
          src:
            heroImage?.urlMobileSized ||
            ogImage?.urlMobileSized ||
            require('~/assets/imgs/default/post.svg'),
        },
        readTime: formatReadTime(readingTime),
        date: formatPostDate(publishTime),
      }
    },
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
    // this is not actually random, but can fit the need for now
    // see: https://stackoverflow.com/questions/19269545/how-to-get-a-number-of-random-elements-from-an-array
    arrayRandomFilter(resultNum = 0, arr = []) {
      const shuffledArr = arr.sort(() => 0.5 - Math.random())
      return shuffledArr.slice(0, resultNum)
    },

    async loadMoreDatabaseItems() {
      if (this.databaseList.isLoading) {
        return
      }
      this.databaseList.isLoading = true

      try {
        await this.$apollo.queries.databaseList.fetchMore({
          variables: {
            first: 3,
            skip: this.totalDatabaseItems,
            shouldQueryMeta: false,
          },
          updateQuery: (prevResult, { fetchMoreResult }) => {
            return {
              ...this.databaseList,
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
.g-page-wrapper {
  min-height: 100vh;
  padding: 64px 0 0;
  overflow: hidden;
  @include media-breakpoint-up(sm) {
    padding: 80px 0 0;
  }
}
.home {
  &__editor-choice,
  &__feature {
    margin: 0 0 48px;
    @include media-breakpoint-up(md) {
      margin: 0 0 60px;
    }
    @include media-breakpoint-up(xl) {
      margin: 0 0 80px;
    }
  }
  &__feature {
    @include media-breakpoint-up(xxl) {
      margin: 0 0 120px;
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
  &--category {
    @include media-breakpoint-up(sm) {
      padding: 0 48px;
    }
    @include media-breakpoint-up(xl) {
      padding: 0;
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
  &--quote {
    margin-bottom: 20px;
    @include media-breakpoint-up(md) {
      margin-bottom: 24px;
    }
    .quote-heading {
      margin: 0 0 20px;
      @include media-breakpoint-up(md) {
        margin: 0 0 40px;
      }
    }
  }
  &--wall {
    margin-bottom: 14px;
    max-width: 1096px;
    @include media-breakpoint-up(md) {
      margin-bottom: 20px;
    }
  }
}

.container--database,
.collaboration-container {
  margin: 0 auto 48px;
  @include media-breakpoint-up(md) {
    margin: 0 auto 60px;
  }
  @include media-breakpoint-up(xl) {
    margin: 0 auto 80px;
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
