<template>
  <div class="post-page">
    <UiHeaderProgress />

    <article id="post">
      <div class="date">{{ $getFormattedDate(post.publishedAt) }}</div>
      <h1>{{ post.title }}</h1>
      <div class="container container--post">
        <picture class="hero-img">
          <img :src="$getImage(post)" alt="" />
        </picture>
        <div class="content" v-html="post.content" />
      </div>
    </article>

    <ClientOnly>
      <UiRecordBox
        v-if="shouldOpenRecordWord"
        class="post-page__record-box container"
        :class="{ hidden: !hasWordPerSecond }"
        @cancel="deactivateRecordWord"
      >
        <template #record>
          <div class="record-word">
            你閱讀了 <span>{{ wordCount }}</span> 字，平均每字
            <span>{{ wordReadingPerSecond }}</span> 秒鐘
          </div>
        </template>
        <template #feedback>
          <UiRecordFeedback
            :options="[
              '這訊息沒意義',
              '你知道太多了',
              '看了壓力很大',
              '沒有特別原因',
            ]"
          />
        </template>
      </UiRecordBox>
    </ClientOnly>

    <ClientOnly>
      <section class="post-feedback container">
        <div class="post-feedback__title">這篇報導如何？</div>
        <UiStarRating
          class="post-feedback__star-rating"
          @userGiveRating="setRating"
        />
        <UiButtonPrimary
          subtype="feedback"
          :text="starRatingBtnText"
          :disabled="!hasRating"
          class="post-feedback__btn"
          @click.native="handleClickRatingBtn"
        />
      </section>
    </ClientOnly>

    <section class="latest-posts container">
      <h2>
        <div>最新報導</div>
      </h2>
      <UiPostList :posts="latestPosts" />
    </section>
  </div>
</template>

<script>
import {
  ref,
  computed,
  watch,
  useFetch,
  useContext,
  onMounted,
} from 'nuxt-composition-api'
import { post as axiosPost } from 'axios'

import { state as userState } from '~/composition/store/user.js'

if (process.browser) {
  // eslint-disable-next-line no-var
  var {
    state: { shouldActivateRecordWord },
    deactivateRecordWord,
  } = require('~/composition/store/local-storage.js')
}

export default {
  name: 'Post',
  setup() {
    const post = ref({})
    const latestPosts = ref([])

    useFetch(async () => {
      await fetchPost()
      await fetchLatestPosts()
    })
    const { $fetchPost, route, $fetchPosts } = useContext()
    const postId = route.value.params.id
    async function fetchPost() {
      const response = await $fetchPost(postId)
      post.value = response?.items?.[0] ?? {}
    }
    async function fetchLatestPosts() {
      const response = await $fetchPosts({
        publishStatus: '{"$in":[2]}',
        type: '{"$in":[1,4]}',
        maxResult: 3,
        page: 1,
        sort: '-published_at',
        showAuthor: false,
        showUpdater: false,
        showTag: false,
        showComment: false,
        showProject: false,
      })
      latestPosts.value = response?.items ?? []
    }

    const wordCount = 100
    const userReadingTime = useUserReadingTime(userState.hasUserFinishedReading)
    const wordReadingPerSecond = computed(() => {
      if (userReadingTime.value !== undefined) {
        return (userReadingTime.value / 1000 / wordCount).toFixed(2)
      }
    })
    const hasWordPerSecond = computed(
      () => wordReadingPerSecond.value !== undefined
    )

    const shouldOpenRecordWord = ref(false)
    onMounted(() => {
      setShouldOpenRecordWord()
    })
    function setShouldOpenRecordWord() {
      shouldOpenRecordWord.value = shouldActivateRecordWord.value === true
    }

    const rating = ref(0)
    const hasRating = computed(() => rating.value > 0)
    function setRating(val) {
      rating.value = val
    }
    const starRatingBtnText = computed(() =>
      hasRating.value ? `確定給 ${rating.value} 顆星` : '傳送給 READr'
    )
    function handleClickRatingBtn() {
      sendRatingToGoogleSheet()
    }
    function sendRatingToGoogleSheet() {
      axiosPost('/google-sheets/append', {
        spreadsheetId: '1q9t4tpDlEPiiSAb2TU9rn6G2MnKI1QjpYL_07xnUyGA',
        range: '評分!A2:C',
        valueInputOption: 'RAW',
        resource: {
          values: [[Date.now(), null, postId, rating.value]],
        },
      })
    }

    return {
      post,
      latestPosts,

      wordCount,
      wordReadingPerSecond,
      hasWordPerSecond,

      shouldOpenRecordWord,
      deactivateRecordWord,

      rating,
      hasRating,
      starRatingBtnText,
      setRating,
      handleClickRatingBtn,
    }
  },
}

function useUserReadingTime(hasUserFinishedReading) {
  let userStartReadingTime
  const userFinishedReadingTime = ref(undefined)

  onMounted(setUserStartReadingTime)

  const stopWatchingHasUserFinishedReading = watch(
    hasUserFinishedReading,
    setUserFinishedReadingTime
  )

  const userReadingTime = computed(() => {
    if (userFinishedReadingTime.value !== undefined) {
      return userFinishedReadingTime.value - userStartReadingTime
    }
  })

  function setUserStartReadingTime() {
    userStartReadingTime = Date.now()
  }
  function setUserFinishedReadingTime(hasFinished) {
    if (hasFinished === true) {
      userFinishedReadingTime.value = Date.now()
      stopWatchingHasUserFinishedReading()
    }
  }

  return userReadingTime
}
</script>

<style lang="scss" scoped>
.post-page {
  padding-top: 68.63px;
  overflow: hidden;
  &__record-box {
    margin-bottom: 20px;
    transition: opacity 0.3s, transform 0.3s;
    @include media-breakpoint-up(md) {
      margin-bottom: 30px;
    }
    &.hidden {
      opacity: 0;
      transform: translateY(20px);
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
  ::v-deep {
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
        // 11 = 30 - 19
        margin-bottom: 11px;
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
      li {
        &::before {
          content: '';
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #04295e;
          left: 9px;
          // (15 * 1.8 - 6) / 2
          top: 10.5px;
          @include media-breakpoint-up(md) {
            width: 8px;
            height: 8px;
            left: 14px;
            // (18 * 1.8 - 8) / 2
            top: 12.2px;
          }
        }
      }
    }
    ol {
      counter-reset: num;
      li {
        &::before {
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
    }
    hr {
      display: none;
    }
  }
}

.record-word {
  font-size: 15px;
  text-align: center;
  line-height: 2;
  letter-spacing: 0.6px;
  @include media-breakpoint-up(md) {
    font-size: 18px;
    line-height: 1.8;
    letter-spacing: 2.5px;
    font-weight: 500;
  }
  span {
    font-weight: 900;
    font-size: 24px;
    line-height: 1.5;
    color: #04295e;
    @include media-breakpoint-up(md) {
      font-size: 26px;
      line-height: 1.8;
    }
  }
}

.post-feedback {
  background-color: rgba(#f5ebff, 0.2);
  border-radius: 2px;
  margin-bottom: 20px;
  padding: 30px;
  text-align: center;
  color: rgba(#000, 0.87);
  @include media-breakpoint-up(md) {
    margin-bottom: 30px;
    padding: 22px 50px;
  }
  &__title {
    font-weight: 500;
    font-size: 15px;
    line-height: 1;
    letter-spacing: 1.5px;
    // to offset letter-spacing at the rightmost
    padding-left: 1.5px;

    margin-bottom: 20px;
    @include media-breakpoint-up(md) {
      margin-bottom: 22px;
      font-size: 18px;
      letter-spacing: 2.5px;
      // to offset letter-spacing at the rightmost
      padding-left: 2.5px;
    }
  }
  &__star-rating {
    max-width: 260px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;
    @include media-breakpoint-up(md) {
      margin-bottom: 22px;
    }
  }
  &__btn {
    max-width: 240px;
    width: 100%;
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
    // to offset letter-spacing at the rightmost
    margin-left: 2.5px;
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
