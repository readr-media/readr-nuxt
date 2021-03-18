<template>
  <div class="cp">
    <RdCover
      v-show="shouldShowCover"
      :coverImgs="coverImgs"
      :title="cmsData.contentApiData.cover.title"
      :description="cmsData.contentApiData.cover.description"
      :textGoToArticle="cmsData.contentApiData.cover.textGoToArticle"
      :textGoToQuiz="cmsData.contentApiData.cover.textGoToQuiz"
      @goToQuiz="handleGoToQuiz"
      @goToArticle="handleGoToArticle"
    />
    <RdQuizInfo
      v-show="shouldShowQuizInfo"
      :title="cmsData.contentApiData.quizInfo.title"
      :description="cmsData.contentApiData.quizInfo.description"
      :textSubmit="cmsData.contentApiData.quizInfo.textSubmit"
      @close="hideQuizInfoAndMemoize"
    />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import RdCover from './components/RdCover.vue'
import RdQuizInfo from './components/RdQuizInfo.vue'

export default {
  components: {
    RdCover,
    RdQuizInfo,
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
      shouldShowCover: true,
      shouldShowQuizInfo: false,
      quizInfoCookieName: 'chinaPopcultureReadQuizInfo',
    }
  },
  computed: {
    coverImgs() {
      return {
        large: this.getImageSrcByType('cp-cover-large'),
        small: this.getImageSrcByType('cp-cover-small'),
      }
    },
  },
  beforeMount() {
    this.unmountArticle()
    this.unmountExtras()
    this.unmountDonateButton()
    this.unmountLatestCoverages()
    this.unobserveCredit()
  },
  methods: {
    ...mapMutations('report', [
      'unmountArticle',
      'hideArticle',
      'showArticle',

      'unmountExtras',
      'hideExtras',
      'showExtras',

      'unmountDonateButton',
      'showDonateButton',

      'unmountLatestCoverages',
      'hideLatestCoverages',
      'showLatestCoverages',

      'unobserveCredit',
      'observeCredit',
    ]),
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

    getImageSrcByType(type) {
      return (this.cmsData?.contentApiData?.images ?? []).find(
        function findObjectByType(object) {
          return object.type === type
        }
      )?.value?.urlMobileSized
    },
    handleGoToQuiz() {
      this.hideCover()
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
      this.showArticle()
      this.showExtras()
      this.showDonateButton()
      this.showLatestCoverages()
      // this.observeCredit()
      this.hideCover()
      window.scrollTo(0, 0)
    },
  },
}
</script>

<style lang="scss">
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

<style lang="scss" scoped></style>
