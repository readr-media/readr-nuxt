<template>
  <section class="quiz-result">
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
            />
          </li>
        </ol>
      </RdCollapsible>
    </section>
  </section>
</template>

<script>
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
  },
  methods: {
    handleSubmitButtonClick() {
      this.$emit('submit')
    },
    handleAgainButtonClick() {
      this.$emit('again')
    },
  },
}
</script>

<style lang="scss" scoped>
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
