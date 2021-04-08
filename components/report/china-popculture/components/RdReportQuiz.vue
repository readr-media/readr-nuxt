<template>
  <section class="report-quiz">
    <h1 class="report-quiz__quiz-title quiz-title" v-text="quizTitle" />
    <p class="report-quiz__quiz-description" v-text="quizDescription" />
    <div class="report-quiz__quiz-options quiz-options">
      <RdReportQuizButton
        v-for="(option, i) in quizOptions"
        :key="option.text"
        :order="i"
        class="quiz-options__option"
        :text="option.text"
        :state="getQuizButtonState(option)"
        @click.native="handleQuizButtonClick(option, i)"
      />
    </div>
    <div
      v-show="shouldShowAnswerDetail"
      class="report-quiz__quiz-answer-detail quiz-answer-detail"
    >
      <h1
        class="quiz-answer-detail__title title"
        v-text="
          isCurrentOptionCorrect ? quizDetailTitleCorrect : quizDetailTitleWrong
        "
      />
      <p
        class="quiz-answer-detail__description description"
        v-text="quizDetailDescription"
      />
    </div>
  </section>
</template>

<script>
import RdReportQuizButton from './RdReportQuizButton.vue'
export default {
  components: {
    RdReportQuizButton,
  },
  props: {
    quizTitle: {
      type: String,
      default: '',
    },
    quizDescription: {
      type: String,
      default: '',
    },
    quizOptions: {
      type: Array,
      default: () => [],
    },
    quizDetailTitleCorrect: {
      type: String,
      default: '',
    },
    quizDetailTitleWrong: {
      type: String,
      default: '',
    },
    quizDetailDescription: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      shouldShowAnswerDetail: false,
      optionClicked: {},
    }
  },
  computed: {
    isCurrentOptionCorrect() {
      return this.optionClicked.type === 'optionCorrect'
    },
  },
  methods: {
    handleQuizButtonClick(option, i) {
      this.shouldShowAnswerDetail = true
      this.optionClicked = option
      this.$ga.event('projects', 'click', `閱讀測驗${['A', 'B', 'C', 'D'][i]}`)
    },
    getQuizButtonState(option) {
      if (!this.shouldShowAnswerDetail) {
        return 'normal'
      }

      const isCurrentOptionClickedByUser =
        option.text === this.optionClicked.text
      if (isCurrentOptionClickedByUser) {
        if (option.type === 'optionCorrect') {
          return 'normalCorrect'
        } else if (option.type === 'optionWrong') {
          return 'normalWrong'
        }
      } else if (option.type === 'optionCorrect') {
        return 'disableCorrect'
      } else if (option.type === 'optionWrong') {
        return 'disable'
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.report-quiz {
  background: #ffffff;
  box-shadow: 0 2px 12px -4px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  padding: 20px 24px;
  font-weight: 300;
  font-size: 18px;
  line-height: 36px;
  letter-spacing: 0.01em;
  color: #111111;
  &__quiz-description {
    margin: 4px 0 0 0;
  }
  &__quiz-options {
    margin: 20px 0 0 0;
    @include media-breakpoint-up(md) {
      margin: 12px 0 0 -12px;
    }
  }
  &__quiz-answer-detail {
    margin: 20px 0 0 0;
    @include media-breakpoint-up(md) {
      margin: 24px 0 0 0;
    }
  }

  @include media-breakpoint-up(md) {
    padding: 32px 40px;
    max-width: 568px;
    margin: 0 auto;
  }

  @include media-breakpoint-up(xl) {
    max-width: 600px;
  }
}

.quiz-title {
  font-weight: 500;
  font-size: 20px;
  line-height: 30px;
  text-align: center;
  letter-spacing: 0.02em;
  color: #111111;
}

.quiz-options {
  display: flex;
  flex-direction: column;
  &__option {
    @include media-breakpoint-up(md) {
      width: calc((100% - 24px) / 2) !important;
      margin: 12px 0 0 12px;
    }
    & + & {
      margin: 8px 0 0 0;
      @include media-breakpoint-up(md) {
        margin: 12px 0 0 12px;
      }
    }
  }

  @include media-breakpoint-up(md) {
    flex-direction: row;
    flex-wrap: wrap;
  }
}

.title {
  font-weight: 500;
}
</style>
