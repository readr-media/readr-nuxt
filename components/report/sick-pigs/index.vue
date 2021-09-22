<template>
  <div class="sick-pigs">
    <RdReportHeader class="header" />

    <RdCover :contents="cmsData.contentApiData.cover" :latestNews="news[0]" />
    <div ref="bookmarts" class="bookmarts">
      <div v-for="bookmart in bookmarts" :key="bookmart.slug">
        <RdUiBookmart
          :bookmart="bookmart"
          @click.native="clickBookmart(bookmart.slug)"
        />
      </div>
    </div>
    <div id="animation">
      <RdAnimation />
    </div>

    <div id="news">
      <RdFlashNews :flashNewsList="news" />
    </div>
    <div id="report">
      <RdReportArticle
        :contents="cmsData.contentApiData.article"
        :slug="'sick-pigs'"
        @sendGaEvent="sendGaEvent"
      />
      <div v-intersect="gaEventObserver" />
    </div>
    <RdQuiz
      :quizTitle="cmsData.contentApiData.articleQuiz.title"
      :quizDescription="cmsData.contentApiData.articleQuiz.description"
      :quizOptions="cmsData.contentApiData.articleQuiz.options"
      :quizDetailTitleCorrect="
        cmsData.contentApiData.articleQuiz.answerDetailTitleCorrect
      "
      :quizDetailTitleWrong="
        cmsData.contentApiData.articleQuiz.answerDetailTitleWrong
      "
      :quizDetailDescription="
        cmsData.contentApiData.articleQuiz.answerDetailDescription
      "
    />
    <RdReportExtras
      :contents="cmsData.contentApiData.extras.contents"
      @sendGaEvent="sendGaEvent"
    />
    <RdReportCredit
      :authors="cmsData.contentApiData.credit"
      :publishedAt="cmsData.contentApiData.publishedAt"
      :canSendGaEvent="true"
    />
    <div class="donate-button">
      <readr-donate-button
        @clickButton="$ga.event('projects', 'click', 'donate')"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import RdCover from './components/RdCover.vue'
import RdAnimation from './components/RdAnimation.vue'
import RdQuiz from './components/RdQuiz.vue'
import RdFlashNews from './components/RdFlashNews.vue'
import RdUiBookmart from './components/RdUiBookmart.vue'
import RdReportArticle from '~/components/app/Report/RdReportArticle.vue'
import RdReportExtras from '~/components/app/Report/RdReportExtras.vue'
import RdReportHeader from '~/components/app/Report/RdReportHeader.vue'
import RdReportCredit from '~/components/app/Report/RdReportCredit.vue'
import scrollDirection from '~/components/helpers/mixins/scroll-direction.js'

import intersect from '~/components/helpers/directives/intersect.js'

import {
  setupIntersectionObserver,
  cleanupIntersectionObserver,
} from '~/components/helpers/index.js'

export default {
  directives: {
    intersect,
  },
  components: {
    RdReportHeader,
    RdReportCredit,
    RdReportExtras,
    RdCover,
    RdAnimation,
    RdQuiz,
    RdReportArticle,
    RdFlashNews,
    RdUiBookmart,
  },
  props: {
    cmsData: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  data() {
    return {
      news: [],
      bookmarts: [
        { name: '豬瘟如何入侵', slug: 'animation' },
        { name: '最新消息', slug: 'news' },
        { name: '專題報導', slug: 'report' },
      ],
      gaEventObserver: undefined,
    }
  },
  mounted() {
    axios
      .get('https://storage.googleapis.com/projects.readr.tw/deadpig.json')
      .then((res) => {
        this.news = res.data
        this.isLoadingData = false
      })
    this.setupGaEventObserver()
    this.$ga.event('projects', 'scroll', '滑到第一屏')
  },
  beforeDestroy() {
    this.cleanupGaEventObserver()
  },
  mixins: [scrollDirection],
  methods: {
    clickBookmart(slug) {
      switch (slug) {
        case 'animation':
          this.$ga.event('projects', 'click', '區塊索引一')
          break
        case 'news':
          this.$ga.event('projects', 'click', '區塊索引二')
          break
        default:
          this.$ga.event('projects', 'click', '區塊索引三')
      }
    },
    sendGaEvent({ action, label }) {
      this.$ga.event('projects', action, label)
    },
    async setupGaEventObserver() {
      this.gaEventObserver = await setupIntersectionObserver((entries) => {
        entries.forEach(({ intersectionRatio }) => {
          if (intersectionRatio > 0) {
            this.$ga.event('projects', 'scroll', '滑到文章內文結尾')
            this.cleanupGaEventObserver()
          }
        })
      })
    },
    cleanupGaEventObserver() {
      cleanupIntersectionObserver(this, 'gaEventObserver')
    },
  },
}
</script>

<style lang="scss" scoped>
.sick-pigs {
  background: #dddddd;

  .donate-button::v-deep {
    display: flex;
    justify-content: center;
    padding: 24px 0 28px 0;
    font-weight: bold;
    background: #dddddd;
    @include media-breakpoint-up(md) {
      padding: 60px 0;
    }
    readr-donate-button {
      width: 100%;
      @include media-breakpoint-up(md) {
        width: 476px;
      }
    }
    a.sc-readr-donate-button {
      &::before {
        background-color: #111111;
      }

      div.sc-readr-donate-button {
        background-color: rgba(191, 109, 40, 1);
        color: rgba(0, 9, 40, 1);
        border-color: white;

        &:hover {
          background-color: #111111;
          color: white;
        }

        &:active {
          color: white;
        }
      }
    }
  }

  &::v-deep {
    readr-header {
      visibility: inherit;
    }
    .report-extras {
      background: #dddddd;
    }
    a {
      font-weight: 300;
      font-size: 18px;
      line-height: 34px;
      letter-spacing: 0.006em;
      color: #161616;
      &:hover {
        font-weight: bold;
        color: #bf6d28;
      }
      &:active {
        font-weight: normal !important;
      }
    }
    .report-article {
      background: #dddddd;
      .toggle {
        background: rgba(191, 109, 40, 1);
        path {
          fill: #ffffff;
        }
      }
      .annotation {
        background: rgba(191, 109, 40, 1);
        color: #ffffff;
      }
    }
  }
  .bookmarts {
    padding: 24px 14px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    z-index: 2;
    position: -webkit-sticky;
    position: sticky;
    top: 0px;
    bottom: 0px;
    background: #dddddd;
    div + div {
      margin-left: 8px;
    }
  }

  #animation {
    z-index: 999;
    background: #dddddd;
    position: relative;
  }
}
</style>

<style lang="scss">
#default-footer {
  background-color: #dddddd;
}
</style>
