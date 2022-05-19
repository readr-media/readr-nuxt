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
      <RdArticleHeading
        :title="transformedNews.title"
        :date="transformedNews.date"
        :categories="transformedNews.categories"
        :readTimeText="transformedNews.readTime"
        :creditList="credits"
        class="frame__heading"
      />
      <RdArticleSummary
        v-if="doesHaveSummary"
        :summary="summary"
        class="frame__summary"
      />

      <article id="post" class="frame__article">
        <template v-if="isContentString">
          {{ 123 }}
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

    <RdArticleSocialList class="frame__social-list" />

    <RdArticleCitation
      v-if="doesHaveCitation"
      :citation="citation"
      class="frame__citation"
    />
    <section class="frame__tag-list-wrapper">
      <RdArticleTagList :tags="tags" class="tag" />
      <RdArticleSocialList class="social" />
    </section>
  </div>
</template>

<script>
import RdFrameHeader from './RdFrameHeader.vue'
import RdArticleVideo from '~/components/shared/RdArticleVideo.vue'
import RdCoverImage from '~/components/shared/RdCoverImage.vue'
import RdArticleHeading from '~/components/shared/RdArticleHeading.vue'
import RdArticleSummary from '~/components/shared/RdArticleSummary.vue'
import RdArticleContentHandler from '~/components/shared/RdArticleContentHandler.vue'
import RdArticleActionList from '~/components/shared/RdArticleActionList.vue'
import RdArticleCitation from '~/components/shared/RdArticleCitation.vue'
import RdArticleTagList from '~/components/shared/RdArticleTagList.vue'

import RdArticleSocialList from '~/components/shared/RdArticleSocialList.vue'
import { latestPosts } from '~/apollo/queries/posts.js'

import {
  getHref,
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
    RdFrameHeader,
    RdArticleVideo,
    RdCoverImage,
    RdArticleHeading,
    RdArticleSummary,
    RdArticleContentHandler,
    RdArticleActionList,
    RdArticleCitation,
    RdArticleTagList,
    RdArticleSocialList,
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
        title = '',
        heroVideo = {},
        heroImage = {},
        heroCaption = '',
        categories = [],
        readingTime = 0,
        publishTime = '',
        style = '',
      } = this.post

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
        readTime: formatReadTime(readingTime),
        date: formatPostDate(publishTime),
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
    transformedLatestPosts() {
      return this.latestPosts?.map((post) => {
        const {
          id = '',
          title = '',
          heroImage = {},
          readingTime = 0,
          publishTime = '',
          style = '',
        } = post || {}

        return {
          id,
          title,
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
        }
      })
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
  mounted() {
    const { contentApiData, relatedPosts } = this.post
    console.log(this.post)
    console.log(contentApiData)
    console.log(relatedPosts)
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
