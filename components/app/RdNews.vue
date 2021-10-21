<template>
  <div class="news">
    <RdHeaderProgress @sendGaEvent="sendGaScrollEvent('end')" />

    <RdCoverImage
      :imgSrc="transformedNews.heroImg.src"
      :imgCap="transformedNews.heroCap"
      class="news__cover"
    />

    <section class="news__content">
      <RdArticleHeading
        :title="transformedNews.title"
        :date="transformedNews.date"
        :readTime="transformedNews.readTime"
        :category="transformedNews.category"
        :creditList="credits"
        class="news__heading"
      />
      <RdArticleSummary :summary="summary" class="news__summary" />

      <article id="post" class="news__article">
        <template v-if="isContentString">
          {{ content }}
        </template>
        <template v-else>
          <RdArticleContentHandler
            v-for="paragraph in content"
            :key="paragraph.id"
            :paragraph="paragraph"
          />
        </template>
      </article>
    </section>

    <ClientOnly>
      <section class="post-feedback container">
        <div v-if="postFeedback.step === 'rating'" class="post-feedback__step">
          <div class="post-feedback__title">這篇報導如何？</div>

          <RdStarRating
            class="post-feedback__star-rating"
            @userGiveRating="setRating"
          />

          <RdFeedbackButton
            v-if="doesHaveRating"
            :text="ratingBtnText"
            class="post-feedback__btn"
            @click.native="handleClickRatingBtn"
            @sendGaEvent="sendGaClickEvent('rate')"
          />
        </div>

        <div
          v-else-if="postFeedback.step === 'opinion'"
          class="post-feedback__step"
        >
          <div class="post-feedback__title">可以的話，給我們一些回饋吧</div>

          <RdFeedbackForm @userGiveFeedback="setOpinion" />

          <RdFeedbackButton
            v-if="doesHaveOpinionContent"
            text="傳送給 READr"
            class="post-feedback__btn"
            @click.native="handleClickOpinionBtn"
          />
        </div>

        <RdFeedbackThanks v-else />
      </section>
    </ClientOnly>

    <ClientOnly>
      <section class="latest-posts container">
        <h2>
          <div>最新報導</div>
        </h2>
        <RdList
          :posts="latestPosts"
          @sendGaEvent="sendGaClickEvent('related articles')"
        />
      </section>
    </ClientOnly>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { post as axiosPost } from 'axios'
import dayjs from 'dayjs'

import RdHeaderProgress from '~/components/shared/Header/RdHeaderProgress.vue'
import RdFeedbackForm from '~/components/shared/Feedback/RdFeedbackForm.vue'
import RdFeedbackThanks from '~/components/shared/Feedback/RdFeedbackThanks.vue'
import RdFeedbackButton from '~/components/shared/Feedback/RdFeedbackButton.vue'
import RdStarRating from '~/components/shared/RdStarRating.vue'
import RdCoverImage from '~/components/shared/RdCoverImage.vue'
import RdArticleHeading from '~/components/shared/RdArticleHeading.vue'
import RdArticleSummary from '~/components/shared/RdArticleSummary.vue'
import RdArticleContentHandler from '~/components/shared/RdArticleContentHandler.vue'
import RdList from '~/components/shared/List/RdList.vue'

import { latestPosts } from '~/apollo/queries/posts.js'

import { getHref, formatDate, handleApiData } from '~/helpers/index.js'

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
    RdFeedbackForm,
    RdFeedbackThanks,
    RdFeedbackButton,
    RdStarRating,
    RdCoverImage,
    RdArticleHeading,
    RdArticleSummary,
    RdArticleContentHandler,
    RdList,
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
      update(result) {
        return result.latestPosts.map(function transformContent(post) {
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
        })
      },
    },
  },

  data() {
    return {
      postFeedback: {
        step: 'rating',

        rating: 0,
        opinion: {
          nickname: '',
          email: '',
          content: '',
        },
      },

      latestPosts: [],
    }
  },

  computed: {
    ...mapState({
      userUuid: (state) => state.user.uuid,
    }),
    postId() {
      return this.$route.params.id
    },

    transformedNews() {
      const {
        title = '',
        heroImage = {},
        heroCaption = '',
        categories = [],
        contentHtml = '',
        wordCount = 0,
        publishTime = '',
      } = this.news

      return {
        title,
        heroImg: {
          src: {
            xs: heroImage?.urlMobileSized,
            sm: heroImage?.urlDesktopSized,
          },
        },
        heroCap: heroCaption,
        category: categories?.[0]?.name,
        readTime: wordCount * 0.6,
        date: this.formatHeadingDate(publishTime),
        contentHtml,
      }
    },
    credits() {
      return Object.keys(this.news || {})
        .filter(
          (key) => CREDIT_KEYS.includes(key) && this.news?.[key]?.length > 0
        )
        .map((key) => ({ key, data: this.news[key] }))
    },

    content() {
      const data = this.news?.contentApiData ?? ''
      return data ? handleApiData(data) : []
    },
    summary() {
      const data = this.news?.summaryApiData ?? ''
      return data ? handleApiData(data) : []
    },
    isContentString() {
      return typeof this.content === 'string'
    },

    feedbackRanting: {
      get() {
        return this.postFeedback.rating
      },
      set(value) {
        this.postFeedback.rating = value
      },
    },
    ratingBtnText() {
      return `確定給 ${this.feedbackRanting} 顆星`
    },
    doesHaveRating() {
      return this.feedbackRanting > 0
    },

    doesHaveOpinionContent() {
      return this.postFeedback.opinion.content !== ''
    },
  },

  methods: {
    setRating(value) {
      this.feedbackRanting = value
    },
    handleClickRatingBtn() {
      this.sendRatingToGoogleSheet()
      this.gotoFeedbackStep('opinion')
    },
    formatHeadingDate(datetime) {
      return dayjs(datetime).format('M/DD')
    },
    sendRatingToGoogleSheet() {
      axiosPost('/api/google-sheets/append', {
        spreadsheetId: '1q9t4tpDlEPiiSAb2TU9rn6G2MnKI1QjpYL_07xnUyGA',
        range: '評分!A2:D',
        valueInputOption: 'RAW',
        resource: {
          values: [
            [Date.now(), this.userUuid, this.postId, this.feedbackRanting],
          ],
        },
      })
    },
    gotoFeedbackStep(name) {
      this.postFeedback.step = name
    },

    setOpinion(value) {
      this.postFeedback.opinion = value
    },
    handleClickOpinionBtn() {
      this.sendOpinionToGoogleSheet()
      this.gotoFeedbackStep('thanks')
    },
    sendOpinionToGoogleSheet() {
      const { nickname, email, content } = this.postFeedback.opinion
      axiosPost('/api/google-sheets/append', {
        spreadsheetId: '1q9t4tpDlEPiiSAb2TU9rn6G2MnKI1QjpYL_07xnUyGA',
        range: '回饋!A2:F',
        valueInputOption: 'RAW',
        resource: {
          values: [
            [Date.now(), this.userUuid, this.postId, nickname, email, content],
          ],
        },
      })
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
    margin: 0 auto;
    padding: 0 20px;
    @include media-breakpoint-up(md) {
      width: 568px;
      padding: 0;
    }
    @include media-breakpoint-up(xl) {
      width: 600px;
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
      > * + * {
        margin: 32px 0 0;
      }
    }
  }
}

article {
  padding-top: 14px;
}

.date {
  text-align: center;
  font-size: 13px;
  line-height: 1.4;
  color: rgba(#000, 0.87);
  margin-bottom: 12px;
  @include media-breakpoint-up(md) {
    font-size: 15px;
    margin-bottom: 20px;
  }
}

.content {
  padding-top: 20px;
  padding-bottom: 70px;
  font-size: 15px;
  line-height: 2;
  letter-spacing: 0.6px;
  color: rgba(#000, 0.87);
  @include media-breakpoint-up(md) {
    font-size: 18px;
    line-height: 1.89;
    padding-top: 30px;
  }

  &::v-deep {
    p,
    h2 {
      max-width: 600px;
      margin-left: 30px;
      margin-right: 30px;
      @media (min-width: 660px) {
        margin-left: auto;
        margin-right: auto;
      }
    }

    h2 {
      font-weight: 900;
      font-size: 24px;
      line-height: 1.5;
      margin-top: 60px;
      margin-bottom: 40px;
      letter-spacing: 0;
      @include media-breakpoint-up(md) {
        font-size: 26px;
        margin-bottom: 30px;
        line-height: 1.46;
      }
    }

    p {
      margin-top: 30px;
      margin-bottom: 30px;
      @include word-wrap;
      @include media-breakpoint-up(md) {
        margin-top: 34px;
        margin-bottom: 34px;
      }
    }

    blockquote {
      background-color: rgba(245, 235, 255, 0.2);
      font-weight: 500;
      font-size: 15px;
      line-height: 2;
      letter-spacing: 0.6px;
      padding: 20px 30px 30px 30px;
      margin: 30px auto;
      max-width: 600px;
      @media (min-width: 600px) {
        border-radius: 2px;
      }
      @include media-breakpoint-up(md) {
        font-size: 18px;
        line-height: 1.8;
        letter-spacing: 2.5px;
        padding-left: 50px;
        padding-right: 50px;
        padding-bottom: 35px;
      }

      &::before {
        content: url(~assets/imgs/quotation-mark.svg);
        display: block;
        text-align: center;
        margin-bottom: 11px; /* 11 = 30 - 19 */
        @include media-breakpoint-up(md) {
          margin-bottom: 13px;
        }
      }
    }

    a {
      color: #04295e;
      border-bottom: 1px solid #04295e;
    }

    .readme-image,
    .readme-embed {
      margin: 40px auto;
      max-width: 600px;
      @include media-breakpoint-up(md) {
        margin-top: 30px;
        margin-bottom: 30px;
      }
    }

    .readme-image {
      img {
        width: 100%;
        background-color: rgba(216, 216, 216, 0.15);
        @include media-breakpoint-up(md) {
          border-radius: 4px;
        }
      }

      &::after {
        display: block;
        content: attr(text);
        font-size: 13px;
        line-height: 1.46;
        letter-spacing: 1px;
        color: rgba(#000, 0.66);
        margin-left: 30px;
        margin-right: 30px;
        margin-top: 10px;
        @media (min-width: 600px) {
          margin-left: calc(30px - (100vw - 600px) / 2);
          margin-right: calc(30px - (100vw - 600px) / 2);
        }
        @media (min-width: 660px) {
          margin-left: 1px;
          margin-right: 1px;
        }
        @include media-breakpoint-up(md) {
          font-size: 15px;
          line-height: 1.27;
        }
      }

      &[text='undefined']::after {
        content: none;
      }
    }

    ul,
    ol {
      font-weight: 500;
      font-size: 15px;
      line-height: 1.8;
      letter-spacing: 0.6px;
      margin: 40px 30px;
      max-width: 500px;
      @media (min-width: 560px) {
        margin-left: auto;
        margin-right: auto;
      }
      @include media-breakpoint-up(md) {
        font-size: 18px;
        letter-spacing: 2.5px;
      }

      li {
        position: relative;
        padding-left: 30px;
        margin-top: 12px;
        margin-bottom: 12px;
        @include media-breakpoint-up(md) {
          padding-left: 40px;
        }

        &::before {
          display: block;
          position: absolute;
        }
      }
    }

    ul {
      li::before {
        content: '';
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: #04295e;
        left: 9px;
        top: 10.5px; /* (15 * 1.8 - 6) / 2 */
        @include media-breakpoint-up(md) {
          width: 8px;
          height: 8px;
          left: 14px;
          top: 12.2px; /* (18 * 1.8 - 8) / 2 */
        }
      }
    }

    ol {
      counter-reset: num;

      li::before {
        top: 0;
        left: 0;
        counter-increment: num;
        content: counter(num) '.';
        width: 24px;
        text-align: center;
        @include media-breakpoint-up(md) {
          width: 36px;
        }
      }
    }

    hr {
      display: none;
    }
  }
}

.post-feedback {
  background-color: rgba(#f5ebff, 0.2);
  border-radius: 2px;
  margin-bottom: 20px;
  text-align: center;
  color: rgba(#000, 0.87);
  @include media-breakpoint-up(md) {
    margin-bottom: 30px;
  }

  &__step {
    padding: 30px;
    @include media-breakpoint-up(md) {
      padding: 22px 50px;
    }
  }

  &__title {
    font-weight: 500;
    font-size: 15px;
    line-height: 1;
    letter-spacing: 1.5px;
    padding-left: 1.5px; /* to offset letter-spacing at the rightmost */

    margin-bottom: 20px;
    @include media-breakpoint-up(md) {
      margin-bottom: 22px;
      font-size: 18px;
      letter-spacing: 2.5px;
      padding-left: 2.5px; /* to offset letter-spacing at the rightmost */
    }
  }

  &__btn {
    max-width: 240px;
    width: 100%;
    margin-top: 20px;
    @include media-breakpoint-up(md) {
      margin-top: 22px;
    }
  }

  &__star-rating {
    max-width: 260px;
    margin-left: auto;
    margin-right: auto;
  }
}

.latest-posts {
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: 50px;
  @media (min-width: 620px) {
    padding-left: 0;
    padding-right: 0;
  }
  @include media-breakpoint-up(md) {
    margin-bottom: 22px;
  }

  h2 {
    background-color: #f5ebff;
    border-radius: 2px;
    text-align: center;
    color: #04295e;
    font-weight: 900;
    font-size: 18px;
    line-height: 1.5;
    padding: 8px 24px;
    margin-bottom: 14px;
  }

  div {
    letter-spacing: 5px;
    margin-left: 2.5px; /* to offset letter-spacing at the rightmost */
  }
}

.container {
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  &--post {
    max-width: 660px;
  }
}
</style>
