<template>
  <div class="news">
    <RdHeaderProgress @sendGaEvent="sendGaScrollEvent('end')" />

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
        :category="transformedNews.category"
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

    <RdButtonDonate class="news__donate" />

    <section class="news__list-wrapper">
      <RdArticleList
        v-if="doesHaveRelatedPosts"
        title="相關報導"
        :posts="transformedRelatedPosts"
        class="list"
      />
      <RdArticleList
        v-if="doesHaveLatestPosts"
        title="最新報導"
        :posts="transformedLatestPosts"
        class="list"
      />
    </section>
  </div>
</template>

<script>
import dayjs from 'dayjs'

import RdHeaderProgress from '~/components/shared/Header/RdHeaderProgress.vue'
import RdButtonDonate from '~/components/shared/Button/RdButtonDonate.vue'
import RdArticleVideo from '~/components/shared/RdArticleVideo.vue'
import RdCoverImage from '~/components/shared/RdCoverImage.vue'
import RdArticleHeading from '~/components/shared/RdArticleHeading.vue'
import RdArticleSummary from '~/components/shared/RdArticleSummary.vue'
import RdArticleContentHandler from '~/components/shared/RdArticleContentHandler.vue'
import RdArticleList from '~/components/shared/RdArticleList.vue'

import { latestPosts } from '~/apollo/queries/posts.js'

// import { getHref, formatDate, handleApiData } from '~/helpers/index.js'
import { handleApiData } from '~/helpers/index.js'

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
    RdHeaderProgress,
    RdButtonDonate,
    RdArticleVideo,
    RdCoverImage,
    RdArticleHeading,
    RdArticleSummary,
    RdArticleContentHandler,
    RdArticleList,
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
      nowYear: new Date().getFullYear(),
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
      } = this.news

      return {
        title,
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
        heroCaption,
        category: categories?.[0]?.name,
        readTime: this.formatReadTime(wordCount, this.imageCount),
        date: this.formatPostDate(publishTime),
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
          }) => {
            return {
              id,
              title: name,
              type: 'recommend',
              href: `/post/${id}`,
              date: this.formatPostDate(publishTime),
              readTime: this.formatReadTime(wordCount, 2),
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
        } = post || {}

        return {
          id,
          title,
          href: `/post/${id}`,
          date: this.formatPostDate(publishTime),
          readTime: this.formatReadTime(wordCount, 2),
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
      return this.summary?.length > 0
    },
    doesHaveRelatedPosts() {
      return this.transformedRelatedPosts?.length > 0
    },
    doesHaveLatestPosts() {
      return this.transformedLatestPosts?.length > 0
    },
  },
  methods: {
    formatReadTime(wordCount = 0, imageCount = 0) {
      const min = Math.round((wordCount / 8 + imageCount * 10) / 60)
      return min ? `閱讀時間 ${min} 分鐘` : ''
    },
    formatPostDate(datetime) {
      const formatStr =
        this.nowYear === new Date(datetime).getFullYear()
          ? 'MM/DD'
          : 'YYYY/MM/DD'
      return dayjs(datetime).format(formatStr)
    },
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
.news {
  padding: 68.63px 0 0;
  overflow: hidden;
  &__cover {
    width: 100%;
    max-width: 960px;
    margin: 0 auto 24px;
    @include media-breakpoint-up(xl) {
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
  &__donate {
    margin: 48px 20px 52px;
    max-width: 396px;
    @media (min-width: 436px) {
      margin: 60px auto 64px;
    }
  }
  &__list-wrapper {
    width: 100%;
    background-color: #ebf02c;
    padding: 48px 20px;
    @include media-breakpoint-up(md) {
      padding: 48px 0;
    }
    @include media-breakpoint-up(xl) {
      padding: 60px 0;
    }
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
    > * + * {
      margin-top: 48px;
      @include media-breakpoint-up(xl) {
        margin-top: 60px;
      }
    }
  }
}
</style>
