<template>
  <div class="g-page-wrapper frame">
    <RdFrameHeader />
    <RdArticleVideo
      v-if="doesHaveHeroVideo"
      :videoSrc="transformedNews.heroVideo.src"
      :videoCap="transformedNews.heroCaption"
      :poster="videoPoster"
      :shouldAutoPlay="true"
      :shouldLoop="true"
      :shouldShowControls="false"
      class="frame__cover"
    />
    <RdCoverImage
      v-else
      :imgSrc="transformedNews.heroImg.src"
      :imgCap="transformedNews.heroCaption"
      class="frame__cover"
    />

    <section class="frame__content">
      <RdFrameHeading
        :categories="transformedNews.categories"
        class="frame__heading"
      />
      <RdArticleSummary
        v-if="doesHaveSummary"
        :summary="summary"
        class="frame__summary"
      />

      <article id="post" class="frame__article">
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
      class="frame__action-list"
    />

    <RdButtonDonate class="frame__donate" />

    <RdArticleCitation
      v-if="doesHaveCitation"
      :citation="citation"
      class="frame__citation"
    />
    <section class="frame__tag-list-wrapper">
      <RdArticleTagList :tags="tags" class="tag" />
    </section>

    <RdNewsLetterBtn />
    <RdNewsLetter v-if="shouldShowNewsLetter" class="frame__news-letter" />
    <section v-if="doesHaveRelatedPosts" class="frame__related-list-wrapper">
      <RdListHeading title="相關報導" color="#fff" class="heading" />
      <RdArticleList
        :posts="transformedRelatedPosts"
        :shouldReverseInMobile="false"
        :shouldShowSkeleton="false"
        :shouldHighLightReport="false"
        :filterNum="4"
        class="list"
      />
    </section>

    <RdFrameCredit :credits="credits" :publishedAt="transformedNews.date" />
  </div>
</template>

<script>
import RdFrameHeader from './RdFrameHeader.vue'
import RdFrameHeading from './RdFrameHeading.vue'
import RdFrameCredit from './RdFrameCredit.vue'
import RdArticleVideo from '~/components/shared/RdArticleVideo.vue'
import RdCoverImage from '~/components/shared/RdCoverImage.vue'
import RdArticleSummary from '~/components/shared/RdArticleSummary.vue'
import RdArticleContentHandler from '~/components/shared/RdArticleContentHandler.vue'
import RdArticleActionList from '~/components/shared/RdArticleActionList.vue'
import RdButtonDonate from '~/components/shared/Button/RdButtonDonate.vue'

import RdArticleCitation from '~/components/shared/RdArticleCitation.vue'
import RdArticleTagList from '~/components/shared/RdArticleTagList.vue'
import RdNewsLetterBtn from '~/components/shared/RdNewsLetterBtn.vue'
import RdNewsLetter from '~/components/shared/RdNewsLetter.vue'
import RdListHeading from '~/components/shared/RdListHeading.vue'
import RdArticleList from '~/components/shared/RdArticleList.vue'

import { latestPosts } from '~/apollo/queries/posts.js'

import {
  getHref,
  formatReadTime,
  isReport,
  handleApiData,
  doesHaveApiDataContent,
  formatDate,
  formatPostDate,
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
  name: 'RdFrame',

  components: {
    RdFrameHeader,
    RdArticleVideo,
    RdCoverImage,
    RdFrameHeading,
    RdArticleSummary,
    RdArticleContentHandler,
    RdArticleActionList,
    RdButtonDonate,
    RdArticleCitation,
    RdArticleTagList,
    RdNewsLetterBtn,
    RdNewsLetter,
    RdListHeading,
    RdArticleList,
    RdFrameCredit,
  },

  props: {
    post: {
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
      shouldShowNewsLetter: false,
    }
  },

  computed: {
    postId() {
      return this.$route.params.id
    },
    transformedNews() {
      const {
        heroVideo = {},
        heroImage = {},
        heroCaption = '',
        categories = [],
        readingTime = 0,
        publishTime = '',
        style = '',
      } = this.post

      return {
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
        readTime: formatReadTime(readingTime),
        date: formatDate(publishTime),
        isReport: isReport(style),
      }
    },
    transformedRelatedPosts() {
      return (
        this.post?.relatedPosts?.map((post) => {
          const {
            id = '',
            name = '',
            publishTime = '',
            readingTime = 0,
            heroImage = {},
            style = '',
          } = post

          return {
            id,
            title: name,
            type: 'recommend',
            href: getHref(post),
            date: formatPostDate(publishTime),
            readTime: formatReadTime(readingTime),
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
                href: getHref(post),
              },
            ],
          }
        }) ?? []
      )
    },
    credits() {
      return Object.keys(this.post || {})
        .filter(
          (key) => CREDIT_KEYS.includes(key) && this.post?.[key]?.length > 0
        )
        .map((key) => {
          return key === 'otherByline' && typeof this.post[key] === 'string'
            ? {
                key,
                data: this.post[key].split('、').map((d) => ({ name: d })),
              }
            : {
                key,
                data: this.post[key],
              }
        })
    },
    tags() {
      return this.post?.tags ?? []
    },
    videoPoster() {
      return (
        this.transformedNews?.heroVideo?.coverPhoto?.sm ||
        this.transformedNews?.heroImg?.src?.sm ||
        require('~/assets/imgs/default/post.svg')
      )
    },

    content() {
      const data = this.post?.contentApiData ?? ''
      const formatedData = data ? handleApiData(data) : []
      return this.insertRecommend(formatedData)
    },
    summary() {
      const data = this.post?.summaryApiData ?? ''
      return data ? handleApiData(data) : []
    },
    actionList() {
      const data = this.post?.actionListApiData ?? ''
      return data ? handleApiData(data) : []
    },
    citation() {
      const data = this.post?.citationApiData ?? ''
      const formatedData = data ? handleApiData(data) : []
      return this.filterCitation(formatedData)
    },
    isContentString() {
      return typeof this.content === 'string'
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
    shouldOpenRelatedPart() {
      return this.doesHaveLatestPosts || this.doesHaveRelatedPosts
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
    filterCitation(data = []) {
      let hasInvalid = false
      return data?.filter((item, i) => {
        const type = item.type ?? ''
        let content = []
        if (typeof item?.content?.[0]?.[0] === 'string') {
          content = item?.content?.[0]
        }
        if (typeof item?.content?.[0] === 'string') {
          content = item?.content
        }
        if (!hasInvalid && (type === 'unstyled' || type === 'blockquote')) {
          return item
        }
        if (type === 'unordered-list-item') {
          const formatedContent = content?.filter((d) =>
            this.isValidCitationString(d)
          )
          if (
            formatedContent?.length &&
            formatedContent?.length === content?.length
          ) {
            hasInvalid = false
            return item
          } else {
            hasInvalid = true
            return undefined
          }
        }
        return undefined
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
.frame {
  background-color: #f6f6f5;
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
    padding: 0 auto 20px;
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
