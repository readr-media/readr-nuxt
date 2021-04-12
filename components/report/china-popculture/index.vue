<template>
  <div class="cp">
    <RdReportHeader class="header" :class="{ hidden: shouldHideHeader }" />
    <RdSectionNav
      class="section-nav"
      :class="{ upper: shouldHideHeader }"
      :navs="cmsData.contentApiData.sectionNav"
      :activeIndex="sectionIndex"
      :forceNavActiveAt="forceSectionNavActiveIndex"
      @navigateToIndex="handleNavigateToIndex"
    />
    <RdCover
      v-show="shouldShowCover"
      :coverImgs="coverImgs"
      :coverImgsAnimation="coverImgsAnimation"
      :title="cmsData.contentApiData.cover.title"
      :description="cmsData.contentApiData.cover.description"
      :textGoToArticle="cmsData.contentApiData.cover.textGoToArticle"
      :textGoToQuiz="cmsData.contentApiData.cover.textGoToQuiz"
      @goToQuiz="handleNavigateToIndex(0)"
      @goToArticle="handleNavigateToIndex(1)"
    />
    <RdQuiz
      v-if="shouldShowQuiz"
      :cmsData="cmsData"
      @articleVisible="handleScoreArticleVisible"
      @scoreboardVisible="handleScoreBoardVisible"
    />
    <RdArticle v-if="shouldShowArticle" :cmsData="cmsData" />
    <RdReportCredit
      :authors="cmsData.contentApiData.credit"
      :publishedAt="cmsData.contentApiData.publishedAt"
      :canSendGaEvent="shouldShowArticle || forceSectionNavActiveIndex === 1"
    />
    <LazyRenderer v-show="shouldShowLatestCoverages" class="latest-coverages">
      <readr-latest-coverages />
    </LazyRenderer>
  </div>
</template>

<script>
import LazyRenderer from 'vue-lazy-renderer'

import scrollIntoView from 'scroll-into-view'
import RdSectionNav from './components/RdSectionNav.vue'
import RdCover from './components/RdCover.vue'
import RdQuiz from './components/RdQuiz.vue'
import RdArticle from './components/RdArticle.vue'

import RdReportHeader from '~/components/app/Report/RdReportHeader.vue'
import RdReportCredit from '~/components/app/Report/RdReportCredit.vue'

import scrollDirection from '~/components/helpers/mixins/scroll-direction.js'

export default {
  components: {
    LazyRenderer,

    RdReportHeader,

    RdSectionNav,
    RdCover,
    RdQuiz,
    RdArticle,

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
      shouldShowQuiz: false,
      shouldShowArticle: false,
      shouldShowLatestCoverages: false,
      sectionIndex: -1,
      forceSectionNavActiveIndex: -1,
    }
  },
  computed: {
    coverImgs() {
      return {
        large: require('~/assets/report/china-popculture/cp-cover-large.png'),
        small: require('~/assets/report/china-popculture/cp-cover-small.png'),
      }
    },
    coverImgsAnimation() {
      return {
        large: require('~/assets/report/china-popculture/cp-cover-large-texts-animation.svg'),
        small: require('~/assets/report/china-popculture/cp-cover-small-texts-animation.svg'),
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
    showQuiz() {
      this.shouldShowQuiz = true
    },
    hideQuiz() {
      this.shouldShowQuiz = false
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

      this.showQuiz()
      window.scrollTo(0, 0)
    },
    handleGoToArticle() {
      this.hideCover()

      this.hideQuiz()

      this.showArticle()
      // this.observeCredit()
      this.showLatestCoverages()
      window.scrollTo(0, 0)
    },
    handleNavigateToIndex(index) {
      if (this.sectionIndex === 0 && this.forceSectionNavActiveIndex === 1) {
        scrollIntoView(document.querySelector('.score-board-wrapper'), {
          align: { topOffset: 135 },
        })
      }
      this.sectionIndex = index
    },

    handleScoreArticleVisible() {
      this.forceSectionNavActiveIndex = 1
    },
    handleScoreBoardVisible() {
      this.forceSectionNavActiveIndex = 0
    },
  },
}
</script>

<style lang="scss">
.report-article {
  background-color: #f1f1f1 !important;
  .report-article__title {
    &:first-child {
      font-size: 28px;
      span {
        box-shadow: inset 0 -0.175em #f1f1f1,
          inset 0 -0.55em rgba(255, 63, 63, 0.8);
      }
      @include media-breakpoint-up(md) {
        font-size: 32px;
      }
    }
    font-size: 24px;
    @include media-breakpoint-up(md) {
      font-size: 28px;
    }
  }

  .toggle {
    border: 1px solid #ff3f3f !important;
    background-color: white !important;
    svg path {
      fill: #ff3f3f !important;
    }
  }

  .annotation {
    background-color: #ffeded !important;
  }
}

.report-article__flourish {
  margin: -30px 0 !important;
}

.report-extras {
  background-color: white !important;
}

.report-credit {
  color: #111111 !important;
  background-color: #ebebeb !important;
}

#default-footer {
  background-color: #ebebeb !important;
}
</style>

<style lang="scss" scoped>
.cp {
  //padding: 118px 0 0 0;
  //@include media-breakpoint-up(md) {
  //  padding: 135px 0 0 0;
  //}
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100000000;
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
