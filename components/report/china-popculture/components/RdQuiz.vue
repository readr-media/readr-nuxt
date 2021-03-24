<template>
  <section class="quiz">
    <RdQuizInfo
      v-show="shouldShowQuizInfo"
      :title="cmsData.contentApiData.quizInfo.title"
      :description="cmsData.contentApiData.quizInfo.description"
      :textSubmit="cmsData.contentApiData.quizInfo.textSubmit"
      @close="hideQuizInfoAndMemoize"
    />
    <RdQuizHeader
      class="quiz__header"
      :class="{ upper: shouldHideHeader }"
      :texts="headerTexts"
      :textHighlight="headerTextsCount"
    />
    <RdQuizArticle
      class="quiz__article"
      :authorProfile="currentQuiz.authorProfile"
      :title="currentQuiz.title"
      :info="currentQuiz.info"
      :contents="currentQuiz.contents"
      :shouldDisableAnswerClick="shouldDisableAnswerClick"
      @answerClick="handleAnswerClick"
    />
  </section>
</template>

<script>
import RdQuizInfo from './RdQuizInfo.vue'
import RdQuizHeader from './RdQuizHeader.vue'
import RdQuizArticle from './RdQuizArticle.vue'
import scrollDirection from '~/components/helpers/mixins/scroll-direction'

export default {
  name: 'RdQuiz',
  components: {
    RdQuizHeader,
    RdQuizInfo,
    RdQuizArticle,
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
      shouldShowQuizInfo: false,
      quizInfoCookieName: 'chinaPopcultureReadQuizInfo',
      currentQuizIndex: 0,
      currentAnswerClickCount: 0,
    }
  },
  computed: {
    shouldHideHeader() {
      return this.isScrollingDown
    },

    quizzes() {
      return this.cmsData?.contentApiData?.quiz ?? []
    },
    quizzesLength() {
      return this.quizzes.length
    },
    currentQuiz() {
      return this.quizzes?.[this.currentQuizIndex] ?? {}
    },
    currentQuizAnswerCorrectCount() {
      return this.currentQuiz?.contents.reduce(function countAllTypeAnswerText(
        acc,
        curr
      ) {
        const currentParagraphAnswerCount = (curr?.texts ?? []).filter(
          function filterTypeAnswerCorrectText(text) {
            return text.type === 'answerCorrect'
          }
        ).length
        return acc + currentParagraphAnswerCount
      },
      0)
    },
    shouldDisableAnswerClick() {
      return this.currentAnswerClickCount === this.currentQuizAnswerCorrectCount
    },
    headerTextsCount() {
      return `${this.currentAnswerClickCount} / ${this.currentQuizAnswerCorrectCount} 個`
    },
    headerTexts() {
      const numberZhtw = ['一', '二', '三']
      return [
        `第${numberZhtw[this.currentQuizIndex]}題：`,
        '已選擇',
        ' ',
        this.headerTextsCount,
        ' ',
        '字詞',
      ]
    },
  },
  beforeMount() {
    if (!getCookie(this.quizInfoCookieName)) {
      this.showQuizInfo()
    }
  },
  methods: {
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
    handleAnswerClick({ text, isToggle }) {
      this.currentAnswerClickCount += isToggle ? 1 : -1
    },
  },
}

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
</script>

<style lang="scss" scoped>
.quiz {
  padding: 48px 0 0 0;
  &__header {
    position: fixed;
    top: 117px;
    transition: transform 0.3s ease-out;
    @include media-breakpoint-up(md) {
      top: 134px;
    }
    &.upper {
      transform: translateY(-67px);
      @include media-breakpoint-up(md) {
        transform: translateY(-84px);
      }
    }
  }
}
</style>
