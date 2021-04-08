<template>
  <section class="quiz-result">
    <button
      class="quiz-result__to-top-button to-top-button"
      @click="handleToTopButtonClick"
    >
      <img
        src="~/assets/report/china-popculture/cp-to-top-icon.svg"
        alt="to-top"
      />
    </button>
    <section class="quiz-result__info-basic info-basic">
      <RdQuizResultInfoCard
        :title="textInfoCardTitle"
        :subtitle="textInfoCardSubtitle"
        :descriptions="textsInfoCardDescriptions"
        class="info-basic__info-card"
      />
      <RdSubmitButton
        class="info-basic__submit-button"
        :text="textSubmitButton"
        @click.native="handleSubmitButtonClick"
      />
      <button
        class="info-basic__again-button again-button"
        @click="handleAgainButtonClick"
        v-text="textAgainButton"
      />
    </section>
    <section class="quiz-result__info-detail info-detail">
      <RdCollapsible
        class="info-detail__collapsible"
        :textButton="textSolutionButton"
        :currentQuizIndex="currentQuizIndex"
      >
        <ol class="info-detail__solution-list solution-list">
          <li
            v-for="(solution, i) in solutions"
            :key="i"
            class="solution-list__solution solution"
          >
            <RdQuizResultSolution
              :order="i + 1"
              :contents="solution.texts"
              :description="solution.description"
              :isMiss="isAnswerMiss(solution)"
            />
          </li>
        </ol>
      </RdCollapsible>
    </section>
  </section>
</template>

<script>
import scrollIntoView from 'scroll-into-view'
import RdQuizResultInfoCard from './RdQuizResultInfoCard.vue'
import RdSubmitButton from './RdSubmitButton.vue'
import RdCollapsible from './RdCollapsible'
import RdQuizResultSolution from './RdQuizResultSolution'

export default {
  components: {
    RdQuizResultInfoCard,
    RdSubmitButton,
    RdCollapsible,
    RdQuizResultSolution,
  },
  props: {
    textInfoCardTitle: {
      type: String,
      default: '',
    },
    textInfoCardSubtitle: {
      type: String,
      default: '',
    },
    textsInfoCardDescriptions: {
      type: Array,
      default: () => [],
    },
    textSubmitButton: {
      type: String,
      default: '',
    },
    textAgainButton: {
      type: String,
      default: '',
    },
    textSolutionButton: {
      type: String,
      default: '',
    },
    solutions: {
      type: Array,
      default: () => [],
    },
    currentAnswerCollection: {
      type: Array,
      default: () => [],
    },
    currentQuizIndex: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    handleSubmitButtonClick() {
      this.$emit('submit')

      if (this.currentQuizIndex !== 2) {
        this.$ga.event(
          'projects',
          'click',
          `挑戰下一關${this.currentQuizIndex + 1}`
        )
      } else {
        this.$ga.event('projects', 'click', '看總成績')
      }
    },
    handleAgainButtonClick() {
      this.$emit('again')

      if (this.currentQuizIndex !== 2) {
        this.$ga.event(
          'projects',
          'click',
          `再挑戰一次${this.currentQuizIndex + 1}`
        )
      }
    },
    handleToTopButtonClick() {
      scrollIntoView(document.querySelector('.info-basic'))
    },
    isAnswerMiss(solution) {
      const value = (solution?.texts ?? []).find(function findTypeAnswerCorrect(
        text
      ) {
        return text.type === 'answerCorrect'
      })?.value
      return (
        this.currentAnswerCollection.findIndex(function compareValue(answer) {
          return answer.value === value
        }) === -1
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.quiz-result {
  &__to-top-button {
    position: fixed;
    right: 16px;
    bottom: 27px;
  }
}

.to-top-button {
  width: 56px;
  height: 56px;
  border-radius: 100%;
  background: #ffffff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.14), 0 2px 1px -2px rgba(0, 0, 0, 0.12),
    0px 1px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  @include media-breakpoint-up(md) {
    display: none;
  }
}

.info-basic {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 20px 48px 20px;
  background-color: #f1f1f1;
  &__info-card {
    @include media-breakpoint-up(md) {
      max-width: 568px;
    }
    @include media-breakpoint-up(md) {
      max-width: 600px;
    }
  }
  &__submit-button {
    margin: 24px 0 0 0;
    @include media-breakpoint-up(md) {
      max-width: 280px;
      margin: 48px 0 0 0;
    }
  }
  &__again-button {
    margin: 16px 0 0 0;
  }

  @include media-breakpoint-up(md) {
    padding: 48px 0;
  }
  @include media-breakpoint-up(xl) {
    padding: 60px 0;
  }
}

.again-button {
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 2.5px;
  text-decoration-line: underline;
  color: #2b2b2b;
}

.info-detail {
  padding: 32px 20px;
  background-color: white;
  &__collapsible {
    @include media-breakpoint-up(md) {
      max-width: 560px;
      margin: 0 auto;
    }
  }
  @include media-breakpoint-up(md) {
    padding: 48px 0;
  }
  @include media-breakpoint-up(xl) {
    padding: 60px 0;
  }
}

.solution-list {
  padding: 16px 0 6px 0;
  &__solution {
    & + & {
      margin: 24px 0 0 0;
    }
  }
}
</style>
