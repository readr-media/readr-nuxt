<template>
  <section class="report-quiz">
    <div class="container">
      <h1 class="report-quiz__quiz-title" v-text="quizTitle" />
      <p class="report-quiz__quiz-description" v-text="quizDescription" />
      <div class="report-quiz__quiz-options">
        <div
          v-for="option in quizOptions"
          :key="option.text"
          class="report-quiz__quiz-options_option"
        >
          <label
            ><input
              v-model="optionClicked"
              type="radio"
              name="size"
              :disabled="shouldShowAnswerDetail"
              :value="option"
            />
            <div class="radio-button"></div>
            {{ option.text }}</label
          >
        </div>
        <button
          class="report-quiz__quiz-options_button"
          :disabled="shouldShowAnswerDetail || !optionClicked.type"
          @click="handleQuizButtonClick"
        >
          看答案
        </button>
      </div>
      <div
        v-show="shouldShowAnswerDetail"
        class="report-quiz__quiz-answer-detail quiz-answer-detail"
      >
        <h1
          class="quiz-answer-detail__title"
          :class="{ wrong: !isCurrentOptionCorrect }"
          v-text="
            isCurrentOptionCorrect
              ? quizDetailTitleCorrect
              : quizDetailTitleWrong
          "
        />
        <p
          class="quiz-answer-detail__description"
          v-text="quizDetailDescription"
        />
      </div>
    </div>
  </section>
</template>

<script>
export default {
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
    handleQuizButtonClick() {
      this.shouldShowAnswerDetail = true
      const optionArray = this.quizOptions.map((option) => option.text)
      const index = optionArray.indexOf(this.optionClicked.text)
      this.$ga.event(
        'projects',
        'click',
        `閱讀測驗${['A', 'B', 'C', 'D'][index]}`
      )
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
  background: rgba(243, 229, 225, 1);
  padding: 36px 46px;
  font-size: 18px;
  line-height: 36px;
  letter-spacing: 0.01em;
  color: #111111;
  @include media-breakpoint-up(md) {
    padding: 60px;
    margin: 0 auto;
  }

  .container {
    max-width: 600px;
    margin: 0 auto;
  }

  &__quiz-title {
    text-align: center;
    font-weight: 900;
    letter-spacing: 0.04em;
    font-size: 28px;
    line-height: 36px;
    @include media-breakpoint-up(md) {
      font-size: 32px;
      line-height: 44px;
    }
  }

  &__quiz-description {
    margin: 24px 0 0 0;
    @include media-breakpoint-up(md) {
      margin: 40px 0 0 0;
    }
  }
  &__quiz-options {
    margin: 20px 0 0 0;
    display: flex;
    flex-direction: column;
    @include media-breakpoint-up(md) {
      margin: 12px 0 0 -12px;
    }

    label {
      display: flex;
      align-items: center;
      cursor: pointer;
      input {
        display: none;
        &:checked ~ .radio-button::after {
          content: '';
          display: block;
          border-radius: 50%;
          position: absolute;
          background-color: green;
          width: 14px;
          height: 14px;
          background: #28ddb1;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .radio-button {
        display: inline-block;
        position: relative;
        width: 20px;
        height: 20px;
        background: #ffffff;
        border: 1px solid #000000;
        border-radius: 50%;
        margin: 0 15px 0 0;
      }
    }

    &_button {
      background: rgba(40, 221, 177, 0.6);
      border: 1px solid #000000;
      width: 280px;
      height: 48px;
      font-weight: 900;
      align-self: center;
      margin: 35px 0 0;
      &:hover {
        background: #28ddb1;
      }
      &:active {
        background: #000000;
        color: rgba(40, 221, 177, 1);
      }
    }
  }
  &__quiz-answer-detail {
    margin: 36px 0 0 0;
  }

  .quiz-answer-detail {
    &__title {
      font-weight: 900;
      text-align: center;
      letter-spacing: 0.01em;
      color: #28ddb1;
    }

    .wrong {
      color: red;
    }

    &__description {
      margin: 16px 0 0 0;
      font-weight: 300;
      letter-spacing: 0.01em;
    }
  }
}
</style>
