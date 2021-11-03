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

    <!-- <RdArticleConcern :items="mockConcernList" class="news__concern" /> -->
    <RdArticleConcern class="news__concern" />

    <RdButtonDonate class="news__donate" />

    <RdArticleSocialList class="news__social-list" />

    <!-- <RdArticleCitation
      :infoList="mockCitation.infoList"
      :linkList="mockCitation.linkList"
      class="news__citation"
    /> -->
    <RdArticleCitation class="news__citation" />

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
import RdHeaderProgress from '~/components/shared/Header/RdHeaderProgress.vue'
import RdButtonDonate from '~/components/shared/Button/RdButtonDonate.vue'
import RdArticleVideo from '~/components/shared/RdArticleVideo.vue'
import RdCoverImage from '~/components/shared/RdCoverImage.vue'
import RdArticleHeading from '~/components/shared/RdArticleHeading.vue'
import RdArticleSummary from '~/components/shared/RdArticleSummary.vue'
import RdArticleContentHandler from '~/components/shared/RdArticleContentHandler.vue'
import RdArticleConcern from '~/components/shared/RdArticleConcern.vue'
import RdArticleCitation from '~/components/shared/RdArticleCitation.vue'
import RdArticleTagList from '~/components/shared/RdArticleTagList.vue'
import RdArticleSocialList from '~/components/shared/RdArticleSocialList.vue'
import RdListHeading from '~/components/shared/RdListHeading.vue'
import RdArticleList from '~/components/shared/RdArticleList.vue'
import RdNewsLetter from '~/components/shared/RdNewsLetter.vue'

import { latestPosts } from '~/apollo/queries/posts.js'

// import { getHref, formatDate, handleApiData } from '~/helpers/index.js'
import {
  formatReadTime,
  formatPostDate,
  isReport,
  handleApiData,
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
    RdHeaderProgress,
    RdButtonDonate,
    RdArticleVideo,
    RdCoverImage,
    RdArticleHeading,
    RdArticleSummary,
    RdArticleContentHandler,
    RdArticleConcern,
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
      // mockConcernList: [
      //   '兼任教師薪資計算公式由<a href="https://www.ttsb.gov.tw/1133/1178/1179/30146/post" target="_blank" rel="noreferrer noopener">高教工會提供</a>，測試測試',
      //   '兼任教師薪資計算公式由高教工會提供，利用教育部公，兼任教師薪資計算公式由高教工會提供',
      //   '兼任教師薪資計算公式由高教工會提供，利用教育部公',
      // ],
      // mockCitation: {
      //   infoList: [
      //     {
      //       id: 'asuid',
      //       text:
      //         '兼任教師薪資計算公式由高教工會提供，利用教育部公開資料大專院校課程表及大專院校教師專長彙整表，總計有 3,942,121 筆，再經過比較並排除無法辨識之資料，計算出預估薪資。',
      //     },
      //     {
      //       id: 'asuisssd',
      //       text:
      //         '第二段測試，測試測試測試測試測試測試測試測試測試，測試測試測試測試，測試。',
      //     },
      //   ],
      //   linkList: [
      //     {
      //       title: '雙北租屋資訊',
      //       href: 'https://www.ttsb.gov.tw/1133/1178/1179/30146/post',
      //     },
      //     {
      //       title: '2020五一連假交通部1968人潮示警資料',
      //       href: 'https://www.ttsb.gov.tw/1133/1178/1179/30146/post',
      //     },
      //     {
      //       title: '一般資料標題',
      //       href: 'https://www.ttsb.gov.tw/1133/1178/1179/30146/post',
      //     },
      //     {
      //       title: '長資料標題，超過此長度就直接斷行',
      //       href: 'https://www.ttsb.gov.tw/1133/1178/1179/30146/post',
      //     },
      //   ],
      // },
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
        category: {
          name: categories?.[0]?.name,
          slug: categories?.[0]?.slug,
        },
        heroCaption,
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
              readTime: formatReadTime(wordCount, 2),
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
          readTime: formatReadTime(wordCount, 2),
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
      const validateArray = this.summary?.map((summaryContent) => {
        return (
          summaryContent?.content?.length > 1 ||
          summaryContent?.content[0]?.length > 0
        )
      })
      return validateArray.find((item) => {
        return item
      })
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
  min-height: 100vh;
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
  &__concern {
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
