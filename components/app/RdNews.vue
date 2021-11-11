<template>
  <div class="g-page-wrapper news">
    <RdNavbar />
    <RdArticleVideo
      v-if="doesHaveHeroVideo"
      :videoSrc="transformedNews.heroVideo.src"
      :videoCap="transformedNews.heroCaption"
      :poster="videoPoster"
      :shouldAutoPlay="false"
      :shouldLoop="false"
      class="news__cover"
    />
    <RdCoverImage
      v-else
      :imgSrc="transformedNews.heroImg.src"
      :imgCap="transformedNews.heroCaption"
      class="news__cover"
    />

    <section class="news__content">
      <RdArticleHeading
        :title="transformedNews.title"
        :date="transformedNews.date"
        :categories="transformedNews.categories"
        :readTimeText="transformedNews.readTime"
        :creditList="credits"
        class="news__heading"
      />
      <RdArticleSummary
        v-if="doesHaveSummary"
        :summary="summary"
        class="news__summary"
      />

      <article id="post" class="news__article">
        <template v-if="isContentString">
          {{ content }}
        </template>
        <template v-else>
          <RdArticleContentHandler
            v-for="paragraph in content"
            :key="paragraph.id"
            :paragraph="paragraph"
            :isSummary="false"
          />
        </template>
      </article>
    </section>

    <RdArticleActionList
      v-if="doesHaveActionList"
      :actionList="actionList"
      class="news__action-list"
    />

    <RdButtonDonate class="news__donate" />

    <RdArticleSocialList class="news__social-list" />

    <RdArticleCitation
      v-if="doesHaveCitation"
      :citation="citation"
      class="news__citation"
    />

    <section class="news__tag-list-wrapper">
      <RdArticleTagList :tags="tags" class="tag" />
      <RdArticleSocialList class="social" />
    </section>

    <RdNewsLetter class="new__news-letter" />

    <section class="news__related-list-wrapper">
      <template v-if="doesHaveRelatedPosts">
        <RdListHeading title="相關報導" color="#fff" class="heading" />
        <RdArticleList
          :posts="transformedRelatedPosts"
          :shouldReverseInMobile="false"
          :shouldShowSkeleton="false"
          :shouldHighLightReport="false"
          :filterNum="4"
          class="list"
        />
      </template>
      <template v-if="doesHaveLatestPosts">
        <RdListHeading title="最新報導" color="#fff" class="heading" />
        <RdArticleList
          :posts="transformedLatestPosts"
          :shouldReverseInMobile="false"
          :shouldShowSkeleton="false"
          :shouldHighLightReport="false"
          :filterNum="4"
          class="list"
        />
      </template>
    </section>
  </div>
</template>

<script>
import RdNavbar from '~/components/shared/RdNavbar.vue'
import RdButtonDonate from '~/components/shared/Button/RdButtonDonate.vue'
import RdArticleVideo from '~/components/shared/RdArticleVideo.vue'
import RdCoverImage from '~/components/shared/RdCoverImage.vue'
import RdArticleHeading from '~/components/shared/RdArticleHeading.vue'
import RdArticleSummary from '~/components/shared/RdArticleSummary.vue'
import RdArticleContentHandler from '~/components/shared/RdArticleContentHandler.vue'
import RdArticleActionList from '~/components/shared/RdArticleActionList.vue'
import RdArticleCitation from '~/components/shared/RdArticleCitation.vue'
import RdArticleTagList from '~/components/shared/RdArticleTagList.vue'
import RdArticleSocialList from '~/components/shared/RdArticleSocialList.vue'
import RdListHeading from '~/components/shared/RdListHeading.vue'
import RdArticleList from '~/components/shared/RdArticleList.vue'
import RdNewsLetter from '~/components/shared/RdNewsLetter.vue'

import { latestPosts } from '~/apollo/queries/posts.js'

import {
  formatReadTime,
  formatPostDate,
  isReport,
  handleApiData,
  doesHaveApiDataContent,
} from '~/helpers/index.js'

const CREDIT_KEYS = [
  'writers',
  'photographers',
  'cameraOperators',
  'designers',
  'engineers',
  'dataAnalysts',
  'otherByline',
]

export default {
  name: 'RdNews',

  components: {
    RdNavbar,
    RdButtonDonate,
    RdArticleVideo,
    RdCoverImage,
    RdArticleHeading,
    RdArticleSummary,
    RdArticleContentHandler,
    RdArticleActionList,
    RdArticleCitation,
    RdArticleTagList,
    RdArticleSocialList,
    RdListHeading,
    RdArticleList,
    RdNewsLetter,
  },

  props: {
    news: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },

  apollo: {
    latestPosts: {
      query: latestPosts,
      prefetch: false,
      variables() {
        return {
          first: 4,
        }
      },
    },
  },

  data() {
    return {
      latestPosts: [],
    }
  },

  computed: {
    postId() {
      return this.$route.params.id
    },
    transformedNews() {
      const {
        title = '',
        heroVideo = {},
        heroImage = {},
        heroCaption = '',
        categories = [],
        wordCount = 0,
        publishTime = '',
        style = '',
      } = this.news

      return {
        title,
        categories,
        heroCaption,
        heroVideo: {
          src: heroVideo?.url,
          desc: heroVideo?.description,
          coverPhoto: {
            sm: heroVideo?.coverPhote?.urlMobileSized,
            xl: heroVideo?.coverPhote?.urlDesktopSized,
          },
        },
        heroImg: {
          src: {
            xs: heroImage?.urlMobileSized,
            sm: heroImage?.urlDesktopSized,
          },
        },
        readTime: formatReadTime(wordCount, this.imageCount),
        date: formatPostDate(publishTime),
        isReport: isReport(style),
      }
    },
    transformedRelatedPosts() {
      return (
        this.news?.relatedPosts?.map(
          ({
            id = '',
            name = '',
            publishTime = '',
            wordCount = 0,
            heroImage = {},
            style = '',
          }) => {
            return {
              id,
              title: name,
              type: 'recommend',
              href: `/post/${id}`,
              date: formatPostDate(publishTime),
              readTime: formatReadTime(wordCount, 5),
              isReport: isReport(style),
              img: {
                src:
                  heroImage?.urlMobileSized ||
                  heroImage?.urlTabletSized ||
                  require('~/assets/imgs/default/post.svg'),
              },
              content: [
                {
                  name,
                  href: `/post/${id}`,
                },
              ],
            }
          }
        ) ?? []
      )
    },
    transformedLatestPosts() {
      return this.latestPosts?.map((post) => {
        const {
          id = '',
          title = '',
          heroImage = {},
          wordCount = 0,
          publishTime = '',
          style = '',
        } = post || {}

        return {
          id,
          title,
          href: `/post/${id}`,
          date: formatPostDate(publishTime),
          readTime: formatReadTime(wordCount, 5),
          isReport: isReport(style),
          img: {
            src:
              heroImage?.urlMobileSized ||
              heroImage?.urlTabletSized ||
              require('~/assets/imgs/default/post.svg'),
          },
        }
      })
    },

    credits() {
      return Object.keys(this.news || {})
        .filter(
          (key) => CREDIT_KEYS.includes(key) && this.news?.[key]?.length > 0
        )
        .map((key) => {
          return key === 'otherByline' && typeof this.news[key] === 'string'
            ? {
                key,
                data: this.news[key].split('、').map((d) => ({ name: d })),
              }
            : {
                key,
                data: this.news[key],
              }
        })
    },
    tags() {
      return this.news?.tags ?? []
    },
    videoPoster() {
      return (
        this.transformedNews?.heroVideo?.coverPhoto?.sm ||
        this.transformedNews?.heroImg?.src?.sm ||
        require('~/assets/imgs/default/post.svg')
      )
    },

    content() {
      const data = this.news?.contentApiData ?? ''
      const formatedData = data ? handleApiData(data) : []
      return this.insertRecommend(formatedData)
    },
    summary() {
      const data = this.news?.summaryApiData ?? ''
      return data ? handleApiData(data) : []
    },
    actionList() {
      const data = this.news?.actionListApiData ?? ''
      return data ? handleApiData(data) : []
    },
    citation() {
      const data = this.news?.citationApiData ?? ''
      const formatedData = data ? handleApiData(data) : []
      return this.filterCitation(formatedData)
    },
    isContentString() {
      return typeof this.content === 'string'
    },
    imageCount() {
      const images =
        this.content?.filter((item) => item?.type === 'image') ?? []
      return images.length
    },

    doesHaveHeroVideo() {
      return this.transformedNews?.heroVideo?.src
    },
    doesHaveSummary() {
      return doesHaveApiDataContent(this.summary)
    },
    doesHaveActionList() {
      return doesHaveApiDataContent(this.actionList)
    },
    doesHaveCitation() {
      return doesHaveApiDataContent(this.citation)
    },
    doesHaveRelatedPosts() {
      return this.transformedRelatedPosts?.length > 0
    },
    doesHaveLatestPosts() {
      return this.transformedLatestPosts?.length > 0
    },
  },

  methods: {
    insertRecommend(data) {
      let i = 0
      let count = 0
      if (this.doesHaveRelatedPosts && data?.length) {
        while (i < data.length) {
          if (
            (data[i]?.type === 'unstyled' || data[i]?.type === 'annotation') &&
            data[i]?.content?.[0]
          ) {
            count++
            const item = this.transformedRelatedPosts[count / 5 - 1]
            if (count % 5 === 0 && item) {
              data.splice(i + 1, 0, item)
            }
          }
          i++
        }
      }
      return data
    },
    doseInsideList(data) {
      let firstListIndex
      return data.map((item, i) => {
        if (item.type === 'unordered-list-item') {
          firstListIndex = i
        }

        const isInList = firstListIndex !== undefined

        return {
          ...item,
          isInList,
        }
      })
    },
    filterCitation(data) {
      return data.filter((item) => {
        const type = item.type ?? ''
        const content = item?.content?.[0] ?? ''
        if (type === 'unstyled' || type === 'blockquote') {
          return item
        }
        if (type === 'unordered-list-item') {
          if (
            typeof content === 'string' &&
            this.isValidCitationString(content)
          ) {
            return item
          } else {
            const formatedContent = content?.filter((item) =>
              this.isValidCitationString(item)
            )
            if (
              formatedContent?.length &&
              formatedContent?.length === content?.length
            ) {
              return item
            }
          }
        }
      })
    },
    isValidCitationString(rawStr = '') {
      return rawStr.includes('<a') && rawStr.includes('</a>')
    },
    sendGaClickEvent(label, value) {
      this.sendGaEvent('click', label, value)
    },
    sendGaScrollEvent(label, value) {
      this.sendGaEvent('scroll', label, value)
    },
    sendGaEvent(action, label, value) {
      this.$ga.event('Article', action, label, value)
    },
  },
}
</script>

<style lang="scss" scoped>
.g-page-wrapper {
  min-height: 100vh;
  padding: 70px 0 0;
  @include media-breakpoint-up(sm) {
    padding: 86px 0 0;
  }
}
.news {
  &__cover {
    width: 100%;
    max-width: 960px;
    margin: 0 auto 24px;
    @include media-breakpoint-up(lg) {
      margin: 24px auto 60px;
    }
  }
  &__content {
    width: 100%;
    max-width: 568px;
    margin: 0 auto;
    padding: 0 20px;
    @include media-breakpoint-up(md) {
      width: 568px;
      padding: 0;
    }
    @include media-breakpoint-up(xl) {
      width: 600px;
      max-width: 600px;
    }
  }
  &__heading {
    margin: 0 0 24px;
    @include media-breakpoint-up(xl) {
      margin: 0 0 48px;
    }
  }
  &__summary {
    margin: 0 0 24px;
    @include media-breakpoint-up(xl) {
      margin: 0 0 32px;
    }
  }
  &__article {
    margin: 0 0 32px;
    ::v-deep {
      .g-article {
        &-image {
          width: calc(100% + 40px);
          transform: translateX(-20px);
        }
      }
      > * + * {
        margin: 32px 0 0;
      }
      > .g-article-heading + * {
        margin: 16px 0 0;
      }
      .g-quote-by {
        margin: 40px auto 64px;
      }
    }
  }
  &__action-list {
    width: 100%;
    margin: 0 auto 48px;
    max-width: 568px;
    @include media-breakpoint-up(xl) {
      width: 600px;
      max-width: 600px;
      margin: 0 auto 60px;
    }
  }
  &__donate {
    margin: 48px 20px 52px;
    max-width: 396px;
    @media (min-width: 436px) {
      margin: 60px auto 64px;
    }
  }
  &__social-list {
    display: block;
    width: 180px;
    margin: 0 auto 48px;
    ::v-deep {
      ul {
        li + li {
          margin: 0 0 0 14px;
        }
      }
    }
    @include media-breakpoint-up(md) {
      display: none;
    }
  }
  &__citation {
    width: 100%;
    margin: 0 auto 48px;
    max-width: 568px;
    @include media-breakpoint-up(xl) {
      width: 600px;
      max-width: 600px;
    }
  }
  &__tag-list-wrapper {
    width: 100%;
    padding: 0 20px;
    margin: 0 auto 40px;
    @include media-breakpoint-up(md) {
      width: 568px;
      display: flex;
      justify-content: space-between;
      padding: 0;
      margin: 0 auto 52px;
    }
    @include media-breakpoint-up(xl) {
      width: 600px;
    }
    .tag {
      width: 100%;
      @include media-breakpoint-up(md) {
        max-width: 336px;
      }
    }
    .social {
      display: none;
      @include media-breakpoint-up(md) {
        min-width: 192px;
        max-width: 192px;
        display: block;
      }
    }
  }
  &__related-list-wrapper {
    width: 100%;
    background-color: #ebf02c;
    padding: 48px 20px;
    @include media-breakpoint-up(md) {
      padding: 48px 0;
    }
    @include media-breakpoint-up(xl) {
      padding: 60px 0;
    }
    .heading,
    .list {
      width: 100%;
      margin-left: auto;
      margin-right: auto;
      @include media-breakpoint-up(md) {
        width: 672px;
      }
      @include media-breakpoint-up(xl) {
        width: 1096px;
      }
    }
    .heading {
      margin-bottom: 16px;
      @include media-breakpoint-up(md) {
        margin-bottom: 40px;
      }
    }
    > .list + .heading {
      margin-top: 32px;
      @include media-breakpoint-up(md) {
        margin-top: 16px;
      }
      @include media-breakpoint-up(xl) {
        margin-top: 0;
      }
    }
  }
}
</style>
