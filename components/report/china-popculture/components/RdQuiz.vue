<template>
  <section class="quiz">
    <template v-if="!shouldShowQuizScoreBoard">
      <RdQuizInfo
        v-show="shouldShowQuizInfo"
        :title="cmsData.contentApiData.quizInfo.title"
        :description="cmsData.contentApiData.quizInfo.description"
        :textSubmit="cmsData.contentApiData.quizInfo.textSubmit"
        @close="hideQuizInfoAndMemoize"
      />
      <RdQuizHeader
        v-show="!shouldShowQuizResult"
        class="quiz__header"
        :class="{ upper: shouldHideHeader }"
        :texts="headerTexts"
        :textHighlight="headerTextsCount"
        :textSubmitButton="textSubmitButton"
        :shouldDisableAnswerClick="shouldDisableAnswerClick"
        @submit="handleSubmit"
      />
      <RdQuizArticle
        v-if="!shouldShowQuizResult"
        class="quiz__article"
        :authorProfile="currentQuiz.authorProfile"
        :title="currentQuiz.title"
        :info="currentQuiz.info"
        :contents="currentQuiz.contents"
        :textSubmitButton="textSubmitButton"
        :shouldDisableAnswerClick="shouldDisableAnswerClick"
        :isInTutorialMode="isInTutorialMode"
        @answerClick="handleAnswerClick"
        @submit="handleSubmit"
        @exitTutorialMode="handleExitTutorialMode"
      />
      <RdQuizResult
        v-else
        :textInfoCardTitle="textResultInfoCardTitle"
        :textInfoCardSubtitle="textResultInfoCardSubtitle"
        :textsInfoCardDescriptions="textResultInfoCardDescriptions"
        :textSubmitButton="textResultSubmitButton"
        :textAgainButton="cmsData.contentApiData.quizCommon.textQuizAgain"
        :textSolutionButton="cmsData.contentApiData.quizCommon.textSolution"
        :solutions="currentQuiz.solutions"
        :currentAnswerCollection="currentAnswerCollection"
        :currentQuizIndex="currentQuizIndex"
        @submit="handleSubmitResult"
        @again="handleAgain"
      />
    </template>
    <template v-else>
      <RdQuizScoreBoard
        :cmsData="cmsData"
        :answerScore="answerScore"
        :answerCollectionCorrects="answerCollectionCorrects"
        :textGoToArticle="cmsData.contentApiData.scoreBoard.textGoToArticle"
        :textQuizAgain="cmsData.contentApiData.scoreBoard.textQuizAgain"
        :textMethodology="cmsData.contentApiData.scoreBoard.textMethodology"
        :methodologies="cmsData.contentApiData.scoreBoard.methodologies"
        @quizAgain="handleScoreBoardQuizAgain"
        @articleVisible="$emit('articleVisible')"
        @scoreboardVisible="$emit('scoreboardVisible')"
      />
    </template>
  </section>
</template>

<script>
import { post as axiosPost } from 'axios'
import RdQuizInfo from './RdQuizInfo.vue'
import RdQuizHeader from './RdQuizHeader.vue'
import RdQuizArticle from './RdQuizArticle.vue'
import RdQuizResult from './RdQuizResult.vue'
import RdQuizScoreBoard from './RdQuizScoreBoard.vue'
import scrollDirection from '~/components/helpers/mixins/scroll-direction'

export default {
  name: 'RdQuiz',
  components: {
    RdQuizHeader,
    RdQuizInfo,
    RdQuizArticle,
    RdQuizResult,
    RdQuizScoreBoard,
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
      currentAnswerCollection: [],
      answerCollection: [],
      shouldShowQuizResult: false,
      numberZhtw: ['一', '二', '三'],
      shouldShowQuizScoreBoard: false,
      isInTutorialMode: false,
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
    isCurrentQuizLast() {
      return this.currentQuizIndex + 1 === this.quizzesLength
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
      if (this.isInTutorialMode) {
        return '點擊字詞'
      }
      return `${this.currentAnswerClickCount} / ${this.currentQuizAnswerCorrectCount} 個`
    },
    headerTexts() {
      if (this.isInTutorialMode) {
        return ['點擊字詞', ' ', '來選擇或取消選擇']
      }
      return [
        `第${this.numberZhtw[this.currentQuizIndex]}題：`,
        '已選擇',
        ' ',
        this.headerTextsCount,
        ' ',
        '字詞',
      ]
    },
    textResultSubmitButton() {
      const quizNext = this.cmsData?.contentApiData?.quizCommon?.textQuizNext
      const scoreBoard = this.cmsData?.contentApiData?.quizCommon
        ?.textScoreBoard
      return this.isCurrentQuizLast ? scoreBoard : quizNext
    },

    textResultInfoCardTitle() {
      return `第${this.numberZhtw[this.currentQuizIndex]}題挑戰成果`
    },
    currentAnswerCollectionState() {
      const types = this.currentAnswerCollection.map(function getType(answer) {
        return answer.type
      })
      const allCorrect = types.reduce(function assertAllCorrect(acc, curr) {
        return acc && curr === 'answerCorrect'
      }, true)
      const allWrong = types.reduce(function assertAllWrong(acc, curr) {
        return acc && curr === 'answerWrong'
      }, true)
      if (allCorrect) {
        return 'allCorrect'
      } else if (allWrong) {
        return 'allWrong'
      } else {
        return 'partial'
      }
    },
    textResultInfoCardSubtitle() {
      const results = {
        allCorrect: '全部答對',
        allWrong: '全部答錯',
        partial: '部分答對，部分答錯',
      }

      return results[this.currentAnswerCollectionState]
    },
    textResultInfoCardDescriptions() {
      switch (this.currentAnswerCollectionState) {
        case 'allCorrect': {
          const howManyQuizLast =
            this.quizzesLength - (this.currentQuizIndex + 1)
          return howManyQuizLast !== 0
            ? ['恭喜你全部答對！', `還有 ${howManyQuizLast} 題等你挑戰完成！`]
            : ['恭喜你全答對，好有毅力完成所有試券！']
        }
        case 'allWrong': {
          return ['太可惜了，你選的詞彙都不是中國流行語！']
        }
        case 'partial': {
          const answerCorrectCount = this.currentAnswerCollection
            .map(function getType(answer) {
              return answer.type
            })
            .filter(function filterCorrect(type) {
              return type === 'answerCorrect'
            }).length
          return [
            `有點可惜，你找出了 ${answerCorrectCount} 個詞彙，`,
            `還有 ${
              this.currentQuizAnswerCorrectCount - answerCorrectCount
            } 個詞彙沒有選出來！`,
          ]
        }
        default:
          return []
      }
    },

    answerCollectionCorrects() {
      return this.answerCollection.filter(function typeAnswerCorrect(answer) {
        return answer.type === 'answerCorrect'
      })
    },
    answerScore() {
      return this.answerCollectionCorrects.length * 5
    },
    cmsDataAnswerCorrects() {
      return this.cmsData.contentApiData.quiz
        .map((quiz) =>
          quiz.contents.map((content) =>
            content.texts.filter((text) => text.type === 'answerCorrect')
          )
        )
        .flat(Infinity)
    },

    textSubmitButton() {
      let state = 'init'
      if (this.shouldDisableAnswerClick) {
        state = 'submit'
      } else if (this.currentAnswerClickCount <= 0) {
        state = 'init'
      } else {
        state = 'progress'
      }
      switch (state) {
        case 'init': {
          return this.cmsData.contentApiData.quizCommon.textSubmitInit
        }
        case 'progress': {
          return this.cmsData.contentApiData.quizCommon.textSubmitProgress
        }
        case 'submit': {
          return this.cmsData.contentApiData.quizCommon.textSubmit
        }
        default: {
          return ''
        }
      }
    },
  },
  beforeMount() {
    if (!getCookie(this.quizInfoCookieName)) {
      this.showQuizInfo()
      this.isInTutorialMode = true
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

      if (isToggle) {
        this.currentAnswerCollection.push(text)
      } else {
        // remove answer from currentAnswerCollection
        const index = this.currentAnswerCollection.findIndex(function findValue(
          answer
        ) {
          return text.value === answer.value
        })
        this.currentAnswerCollection.splice(index, 1)
      }
    },
    handleSubmit() {
      this.answerCollection.push(...this.currentAnswerCollection)
      this.shouldShowQuizResult = true
      window.scrollTo(0, 0)

      if (this.isCurrentQuizLast) {
        this.postAnswerCollectionCorrects()
      }

      this.$ga.event(
        'projects',
        'click',
        `送出看答案${this.currentQuizIndex + 1}`
      )
    },
    postAnswerCollectionCorrects() {
      const answerCollectionCorrect = this.answerCollection.filter(
        function filterAnswerCorrect(answer) {
          return answer.type === 'answerCorrect'
        }
      )
      const answers = answerCollectionCorrect
        .map((answer) => {
          return this.cmsDataAnswerCorrects.findIndex(function findWithValue(
            cmsDataAnswer
          ) {
            return cmsDataAnswer.value === answer.value
          })
        })
        .join(',')
      axiosPost('/api/google-sheets/append', {
        spreadsheetId: '1biBjkrWXzHFcL36G3MUjyMnAD8GxyZoDrNCjAvTBy_g',
        range: 'A2:B',
        valueInputOption: 'RAW',
        resource: {
          values: [['record', answers]],
        },
      })
    },
    goToScoreBoard() {
      this.shouldShowQuizScoreBoard = true
    },
    goToNextQuiz() {
      this.currentQuizIndex += 1
      // this.resetQuiz()
      this.shouldShowQuizResult = false
      this.currentAnswerCollection = []
      this.currentAnswerClickCount = 0
      window.scrollTo(0, 0)
    },
    handleSubmitResult() {
      if (this.isCurrentQuizLast) {
        this.goToScoreBoard()
      } else {
        this.goToNextQuiz()
      }
    },
    resetQuiz() {
      this.shouldShowQuizResult = false
      this.currentAnswerCollection = []
      this.answerCollection = []
      this.currentAnswerClickCount = 0
      window.scrollTo(0, 0)
    },
    handleAgain() {
      this.resetQuiz()
    },

    handleScoreBoardQuizAgain() {
      this.shouldShowQuizScoreBoard = false
      this.currentQuizIndex = 0
      this.resetQuiz()
      this.$ga.event('projects', 'click', '再挑戰一次All')
    },

    handleExitTutorialMode() {
      this.isInTutorialMode = false
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
  padding: 118px 0 0 0;
  background-color: #f1f1f1;
  @include media-breakpoint-up(md) {
    padding: 135px 0 0 0;
  }
  &__header {
    position: fixed;
    bottom: 0;
    transition: transform 0.3s ease-out;
    @include media-breakpoint-up(md) {
      top: 134px;
    }
    &.upper {
      @include media-breakpoint-up(md) {
        transform: translateY(-84px);
      }
    }
  }
}
</style>
