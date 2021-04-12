<template>
  <div class="news">
    <RdHeaderProgress @sendGaEvent="sendGaScrollEvent('end')" />

    <article id="post">
      <div class="date">{{ transformedNews.date }}</div>
      <h1>{{ transformedNews.title }}</h1>
      <div class="container container--post">
        <picture v-if="heroImg.src.xs" class="hero-img">
          <source
            :media="`(min-width: ${breakpointSm})`"
            :srcset="heroImg.src.sm"
          />
          <img :src="heroImg.src.xs" alt="" />
        </picture>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div class="content" v-html="transformedNews.contentHtml" />
      </div>
    </article>

    <ClientOnly>
      <section class="post-feedback container">
        <div v-if="postFeedbackStep === 'rating'" class="post-feedback__step">
          <div class="post-feedback__title">這篇報導如何？</div>

          <RdStarRating
            class="post-feedback__star-rating"
            @userGiveRating="setRating"
          />

          <RdFeedbackButton
            v-if="hasRating"
            :text="starRatingBtnText"
            class="post-feedback__btn"
            @click.native="handleClickRatingBtn"
            @sendGaEvent="sendGaClickEvent('rate')"
          />
        </div>

        <div
          v-else-if="postFeedbackStep === 'opinion'"
          class="post-feedback__step"
        >
          <div class="post-feedback__title">可以的話，給我們一些回饋吧</div>

          <RdFeedbackForm @userGiveFeedback="setOpinion" />

          <RdFeedbackButton
            v-if="hasOpinionContent"
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
import { ref, reactive, computed, useContext } from '@nuxtjs/composition-api'
import { post as axiosPost } from 'axios'

import RdHeaderProgress from '~/components/shared/Header/RdHeaderProgress.vue'
import RdFeedbackForm from '~/components/shared/Feedback/RdFeedbackForm.vue'
import RdFeedbackThanks from '~/components/shared/Feedback/RdFeedbackThanks.vue'
import RdFeedbackButton from '~/components/shared/Feedback/RdFeedbackButton.vue'
import RdStarRating from '~/components/shared/RdStarRating.vue'
import RdList from '~/components/shared/List/RdList.vue'

import { latestPosts } from '~/apollo/queries/posts.gql'

import { getHref, formatDate } from '~/helpers/index.js'
import styleVariables from '~/assets/css/variables.module.scss'

export default {
  name: 'RdNews',

  components: {
    RdHeaderProgress,
    RdFeedbackForm,
    RdFeedbackThanks,
    RdFeedbackButton,
    RdStarRating,
    RdList,
  },

  props: {
    news: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },

  setup() {
    const { route, store } = useContext()
    const postId = route.value.params.id
    const userUuid = store.state.user.uuid

    const postFeedback = reactive({
      rating: 0,
      opinion: {
        nickname: '',
        email: '',
        content: '',
      },
    })

    const hasRating = computed(() => postFeedback.rating > 0)
    function setRating(val) {
      postFeedback.rating = val
    }
    const starRatingBtnText = computed(() =>
      hasRating.value ? `確定給 ${postFeedback.rating} 顆星` : '傳送給 READr'
    )
    function handleClickRatingBtn() {
      sendRatingToGoogleSheet()
      goToPostFeedbackStep('opinion')
    }
    function sendRatingToGoogleSheet() {
      axiosPost('/api/google-sheets/append', {
        spreadsheetId: '1q9t4tpDlEPiiSAb2TU9rn6G2MnKI1QjpYL_07xnUyGA',
        range: '評分!A2:D',
        valueInputOption: 'RAW',
        resource: {
          values: [[Date.now(), userUuid, postId, postFeedback.rating]],
        },
      })
    }

    const hasOpinionContent = computed(
      () => postFeedback.opinion.content !== ''
    )
    function setOpinion(val) {
      postFeedback.opinion = val
    }
    function handleClickOpinionBtn() {
      sendOpinionToGoogleSheet()
      goToPostFeedbackStep('thanks')
    }
    function sendOpinionToGoogleSheet() {
      const { nickname, email, content } = postFeedback.opinion
      axiosPost('/api/google-sheets/append', {
        spreadsheetId: '1q9t4tpDlEPiiSAb2TU9rn6G2MnKI1QjpYL_07xnUyGA',
        range: '回饋!A2:F',
        valueInputOption: 'RAW',
        resource: {
          values: [[Date.now(), userUuid, postId, nickname, email, content]],
        },
      })
    }

    const postFeedbackStep = ref('rating')
    function goToPostFeedbackStep(name) {
      postFeedbackStep.value = name
    }

    return {
      hasRating,
      starRatingBtnText,
      setRating,
      handleClickRatingBtn,

      hasOpinionContent,
      setOpinion,
      handleClickOpinionBtn,

      postFeedbackStep,
    }
  },

  apollo: {
    latestPosts: {
      query: latestPosts,
      prefetch: false,
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
            },
            date: formatDate(publishTime),
          }
        })
      },
    },
  },

  data() {
    return {
      latestPosts: [],
      breakpointSm: styleVariables['breakpoint-sm'],
    }
  },

  computed: {
    transformedNews() {
      const {
        title = '',
        heroImage = {},
        contentHtml = '',
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
        date: formatDate(publishTime),
        contentHtml,
      }
    },
    heroImg() {
      return this.transformedNews.heroImg
    },
  },

  methods: {
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
  padding-top: 68.63px;
  overflow: hidden;
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

h1 {
  font-weight: 900;
  font-size: 30px;
  line-height: 1.47;
  padding-left: 20px;
  padding-right: 20px;
  color: #000928;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
  @include media-breakpoint-up(md) {
    text-align: center;
    font-size: 36px;
    line-height: 1.33;
    margin-bottom: 30px;
  }
  @media (min-width: 840px) {
    padding-left: 0;
    padding-right: 0;
  }
}

.hero-img {
  position: relative;
  padding-top: 50%;
  background-color: #d8d8d8;
  @include media-breakpoint-up(md) {
    border-radius: 2px;
    overflow: hidden;
  }

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
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
        content: url(~assets/quotation-mark.svg);
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
