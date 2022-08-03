<template>
  <div class="g-page-wrapper frame">
    <section class="frame__content">
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
  </div>
</template>

<script>
import RdArticleContentHandler from '~/components/shared/RdArticleContentHandler.vue'

import { latestPosts } from '~/apollo/queries/posts.js'

import {
  getHref,
  formatReadTime,
  isReport,
  handleApiData,
  formatPostDate,
} from '~/helpers/index.js'

export default {
  name: 'RdBlank',

  components: {
    RdArticleContentHandler,
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

    content() {
      const data = this.post?.contentApiData ?? ''
      const formatedData = data ? handleApiData(data) : []
      return this.insertRecommend(formatedData)
    },

    isContentString() {
      return typeof this.content === 'string'
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
}
</style>
