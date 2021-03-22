<template>
  <div class="cp">
    <RdReportHeader class="header" :class="{ hidden: shouldHideHeader }" />
    <RdSectionNav
      class="section-nav"
      :class="{ upper: shouldHideHeader }"
      :navs="cmsData.contentApiData.sectionNav"
      :activeIndex="sectionIndex"
      @navigateToIndex="handleNavigateToIndex"
    />
    <RdCover
      v-show="shouldShowCover"
      :coverImgs="coverImgs"
      :title="cmsData.contentApiData.cover.title"
      :description="cmsData.contentApiData.cover.description"
      :textGoToArticle="cmsData.contentApiData.cover.textGoToArticle"
      :textGoToQuiz="cmsData.contentApiData.cover.textGoToQuiz"
      @goToQuiz="handleNavigateToIndex(0)"
      @goToArticle="handleNavigateToIndex(1)"
    />
    <RdQuizInfo
      v-show="shouldShowQuizInfo"
      :title="cmsData.contentApiData.quizInfo.title"
      :description="cmsData.contentApiData.quizInfo.description"
      :textSubmit="cmsData.contentApiData.quizInfo.textSubmit"
      @close="hideQuizInfoAndMemoize"
    />
    <section v-show="shouldShowArticle" class="article">
      <RdReportArticle
        :contents="cmsData.contentApiData.article.contents"
        @sendGaEvent="sendGaEvent"
      />
      <RdReportExtras
        :contents="cmsData.contentApiData.extras.contents"
        @sendGaEvent="sendGaEvent"
      />
      <div class="donate-button">
        <readr-donate-button
          @clickButton="sendGaClickEvent({ label: 'donate' })"
        />
      </div>
    </section>
    <RdReportCredit
      :authors="cmsData.contentApiData.credit"
      :publishedAt="cmsData.contentApiData.publishedAt"
      :canSendGaEvent="cmsData.canSendCreditGaEvent"
    />
    <LazyRenderer v-show="shouldShowLatestCoverages" class="latest-coverages">
      <readr-latest-coverages />
    </LazyRenderer>
  </div>
</template>

<script>
import LazyRenderer from 'vue-lazy-renderer'

import RdSectionNav from './components/RdSectionNav.vue'
import RdCover from './components/RdCover.vue'
import RdQuizInfo from './components/RdQuizInfo.vue'
import RdReportHeader from '~/components/app/Report/RdReportHeader.vue'

import RdReportArticle from '~/components/app/Report/RdReportArticle.vue'
import RdReportExtras from '~/components/app/Report/RdReportExtras.vue'
import RdReportCredit from '~/components/app/Report/RdReportCredit.vue'

import scrollDirection from '~/components/helpers/mixins/scroll-direction.js'

export default {
  components: {
    LazyRenderer,

    RdReportHeader,

    RdSectionNav,
    RdCover,
    RdQuizInfo,

    RdReportArticle,
    RdReportExtras,
    RdReportCredit,
  },
  mixins: [scrollDirection],
  props: {
    cmsData: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  data() {
    return {
      shouldShowCover: true,
      shouldShowQuizInfo: false,
      shouldShowArticle: false,
      shouldShowLatestCoverages: false,
      quizInfoCookieName: 'chinaPopcultureReadQuizInfo',
      sectionIndex: -1,
    }
  },
  computed: {
    coverImgs() {
      return {
        large: require('~/assets/report/china-popculture/cp-cover-large.png'),
        small: require('~/assets/report/china-popculture/cp-cover-small.png'),
      }
    },
    shouldHideHeader() {
      return this.isScrollingDown
    },
  },
  watch: {
    sectionIndex(value) {
      if (value === 0) {
        this.handleGoToQuiz()
      } else if (value === 1) {
        this.handleGoToArticle()
      }
    },
  },
  methods: {
    showArticle() {
      this.shouldShowArticle = true
    },
    hideArticle() {
      this.shouldShowArticle = false
    },
    hideCover() {
      this.shouldShowCover = false
    },
    showQuizInfo() {
      this.shouldShowQuizInfo = true
    },
    hideQuizInfo() {
      this.shouldShowQuizInfo = false
    },
    hideQuizInfoAndMemoize() {
      this.hideQuizInfo()
      document.cookie = `${this.quizInfoCookieName}=true`
    },
    showLatestCoverages() {
      this.shouldShowLatestCoverages = true
    },
    hideLatestCoverages() {
      this.shouldShowLatestCoverages = false
    },
    handleGoToQuiz() {
      this.hideCover()

      this.hideArticle()
      this.hideLatestCoverages()

      if (!getCookie(this.quizInfoCookieName)) {
        this.showQuizInfo()
      }
      window.scrollTo(0, 0)

      function getCookie(cname) {
        const name = cname + '='
        const ca = document.cookie.split(';')
        for (let i = 0; i < ca.length; i++) {
          let c = ca[i]
          // eslint-disable-next-line eqeqeq
          while (c.charAt(0) == ' ') {
            c = c.substring(1)
          }
          // eslint-disable-next-line eqeqeq
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length)
          }
        }
        return ''
      }
    },
    handleGoToArticle() {
      this.hideCover()

      this.hideQuizInfo()

      this.showArticle()
      // this.observeCredit()
      this.showLatestCoverages()
      window.scrollTo(0, 0)
    },
    handleNavigateToIndex(index) {
      this.sectionIndex = index
    },
  },
}
</script>

<style lang="scss">
.report-article {
  background-color: #f1f1f1 !important;
  .report-article__title {
    span {
      box-shadow: inset 0 -0.175em white, inset 0 -0.55em rgba(255, 63, 63, 0.8);
    }
  }

  .toggle {
    border: 1px solid #ff3f3f;
    background-color: white;
    svg path {
      fill: #ff3f3f !important;
    }
  }

  .annotation {
    background-color: #ffeded;
  }
}

.report-extras {
  background-color: white !important;
}

.report-credit {
  color: #111111 !important;
  background-color: #ebebeb !important;
}

a.sc-readr-donate-button {
  &::before {
    background-color: #111111;
  }

  div.sc-readr-donate-button {
    background-color: #ff3f3f;
    color: white;
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

.default__footer {
  background-color: #ebebeb !important;
  position: relative;
  &:before {
    display: none;
    @include media-breakpoint-up(xl) {
      z-index: -1;
      position: absolute;
      left: calc((100vw - 1096px) / 2 * -1);
      display: block;
      content: '';
      width: 100vw;
      height: 100%;
      background-color: #ebebeb !important;
    }
  }
}
</style>

<style lang="scss" scoped>
.cp {
  padding: 118px 0 0 0;
  @include media-breakpoint-up(md) {
    padding: 135px 0 0 0;
  }
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  transition: transform 0.3s ease-out;
  visibility: visible;
  background-color: #ebebeb;

  &.hidden {
    transform: translateY(-100%);
  }

  &::v-deep {
    h1 svg * {
      fill: #2b2b2b;
    }
  }
}

.section-nav {
  position: fixed;
  top: 67px;
  left: 0;
  width: 100%;
  z-index: 998;
  transition: transform 0.3s ease-out;
  &.upper {
    transform: translateY(-67px);
    @include media-breakpoint-up(md) {
      transform: translateY(-84px);
    }
  }
  @include media-breakpoint-up(md) {
    top: 84px;
  }
}

.donate-button {
  padding: 0 20px;
  margin: 72px 0;
  @include media-breakpoint-up(md) {
    max-width: 476px;
    margin: 96px auto;
  }
  @include media-breakpoint-up(xl) {
    margin: 120px auto;
  }
}

.latest-coverages {
  padding: 24px 8px;
  background-color: #ebebeb;
  ::v-deep h2 {
    background-color: #111111;
    color: white;
  }
  @include media-breakpoint-up(md) {
    padding: 48px 84px;
  }
  @include media-breakpoint-up(xl) {
    padding: 60px 0;
    ::v-deep readr-latest-coverages {
      max-width: 600px;
      margin: 0 auto;
    }
  }
}
</style>
