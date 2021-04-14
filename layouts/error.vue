<template>
  <div class="error-page">
    <RdHeader />

    <div class="container">
      <section class="error-info" :class="{ 'not-404': !is404 }">
        <div class="status">
          <Svg404 v-if="is404" class="code" />
          <Svg500 v-else class="code" />
          <div class="message">{{ errorMessage }}</div>
        </div>
        <RdFeedbackButton
          class="home-btn"
          text="回首頁"
          @click.native="backToHome"
        />
      </section>

      <RdListJoined
        v-if="is404"
        :posts="latestPosts"
        class="error-page__list-joined"
      />
    </div>
  </div>
</template>

<script>
import RdHeader from '~/components/shared/Header/RdHeader.vue'
import RdFeedbackButton from '~/components/shared/Feedback/RdFeedbackButton.vue'

import { latestPosts } from '~/apollo/queries/error.gql'

import { getHref, SITE_TITLE } from '~/helpers/index.js'

export default {
  name: 'Error',
  components: {
    RdHeader,
    RdFeedbackButton,
    RdListJoined: () => import('~/components/shared/List/RdListJoined.vue'),

    Svg404: () => import('~/assets/imgs/404.svg?inline'),
    Svg500: () => import('~/assets/imgs/500.svg?inline'),
  },
  props: {
    error: {
      type: Object,
      default: undefined,
    },
  },

  apollo: {
    latestPosts: {
      query: latestPosts,
      update(result) {
        return result.latestPosts.map(function transformContent(post) {
          const { id = '', title = '', heroImage = {}, ogImage = {} } =
            post || {}

          return {
            id,
            title,
            href: getHref(post),
            img: {
              src:
                heroImage?.urlMobileSized ||
                ogImage?.urlMobileSized ||
                require('~/assets/imgs/default/post.svg'),
            },
          }
        })
      },
    },
  },

  data() {
    return {
      latestPosts: [],
    }
  },

  computed: {
    errorMessage() {
      return this.is404 ? '抱歉，找不到這個網址' : '系統忙碌中，請稍後再試'
    },
    is404() {
      return this.error.statusCode === 404
    },
  },

  methods: {
    backToHome() {
      this.$router.replace('/')
    },
  },

  head() {
    const metaTitle = `頁面不存在 - ${SITE_TITLE}`

    return {
      title: metaTitle,
      meta: [{ hid: 'og:title', property: 'og:title', content: metaTitle }],
    }
  },
}
</script>

<style lang="scss" scoped>
.error-page {
  &__list-joined {
    padding-left: 20px;
    margin-top: 40px;
    // 840 = 200 * 4 + 20 * 2
    max-width: 840px;
    margin-left: auto;
    margin-right: auto;
    @include media-breakpoint-up(sm) {
      margin-top: 122px;
    }
    @include media-breakpoint-up(md) {
      // 1096 = 274 * 4 + 20* 2
      max-width: 1136px;
    }

    ::v-deep {
      a:last-child {
        padding-right: 20px;
        box-sizing: content-box;
      }
    }
  }
}

.container {
  background-color: #ebf02c;
  padding-top: 50px;
  padding-bottom: 48px;
  @include media-breakpoint-up(sm) {
    padding-top: 130px;
    padding-bottom: 130px;
  }
}

.error-info {
  line-height: 1.5;
  max-width: 320px;
  margin-right: auto;
  margin-left: auto;
  @include media-breakpoint-up(sm) {
    max-width: 452px;
    position: relative;
  }

  &.not-404 {
    @include media-breakpoint-up(sm) {
      max-width: 462px;
    }

    .message {
      padding-right: 13.5px;
      @include media-breakpoint-up(sm) {
        padding-right: 1px;
        bottom: -8px;
      }

      &::after {
        width: 248px;
        @include media-breakpoint-up(sm) {
          width: 333px;
        }
      }
    }

    .home-btn {
      top: 23px;
      right: 16px;
    }
  }
}

.status {
  position: relative;
  padding-left: 30px;
  padding-right: 30px;
  margin-bottom: 40px;
  @include media-breakpoint-up(sm) {
    padding-left: 0;
    padding-right: 0;
    margin-bottom: 0;
  }
}

@include media-breakpoint-up(sm) {
  .code {
    width: 290px;
    height: auto;
  }
}

.message {
  letter-spacing: 2.5px;
  color: #04295e;
  font-weight: 900;
  font-size: 18px;
  position: absolute;
  padding-right: 19px;
  bottom: -5px;
  right: 0;
  z-index: 1;
  @include media-breakpoint-up(sm) {
    font-size: 24px;
    letter-spacing: 5px;
    padding-right: 12px;
    bottom: -10px;
  }

  &::after {
    content: '';
    display: block;
    position: absolute;
    height: 0;
    width: 235px;
    border-bottom: 36px solid #ebf02c;
    border-left: 5px solid transparent;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
    z-index: -1;
    @include media-breakpoint-up(sm) {
      width: 315px;
      border-bottom-width: 40px;
    }
  }
}

.home-btn {
  width: 100%;
  max-width: 173px;
  position: relative;
  z-index: 1;
  display: block;
  margin-left: auto;
  margin-right: auto;
  @include media-breakpoint-up(sm) {
    position: absolute;
    top: 20px;
    right: 8px;
    max-width: 118px;
  }
}
</style>
