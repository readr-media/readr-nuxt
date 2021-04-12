<template>
  <div class="solution">
    <p class="solution__paragraph paragraph">
      <span v-if="isMiss" class="miss">miss</span>
      <template v-for="text in contents">
        <RdQuizArticleAnswerText
          v-if="isTextTypeAnswer(text)"
          :key="text.value"
          class="paragraph__answer-text toggled"
          :text="text.value"
          :shouldDisableAnswerClick="true"
        />
        <span v-else :key="text.value" v-text="text.value" />
      </template>
    </p>
    <div
      class="solution__description description"
      v-text="`${order}. ${correctAnswer}： ${description}`"
    />
  </div>
</template>

<script>
import RdQuizArticleAnswerText from './RdQuizArticleAnswerText'

export default {
  components: {
    RdQuizArticleAnswerText,
  },
  props: {
    order: {
      type: Number,
      default: 0,
    },
    contents: {
      type: Array,
      default: () => [],
    },
    description: {
      type: String,
      default: '',
    },
    isMiss: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    correctAnswer() {
      return this.contents.find(this.isTextTypeAnswer)?.value
    },
  },
  methods: {
    isTextTypeAnswer(text) {
      return (text?.type ?? '') === 'answerCorrect'
    },
  },
}
</script>

<style lang="scss" scoped>
.solution {
  &__description {
    margin: 8px 0 0 0;
  }
}

.paragraph {
  font-weight: 300;
  font-size: 18px;
  line-height: 36px;
  letter-spacing: 1px;
  color: #111111;
  &__answer-text {
    margin: 0 1px;
  }
}

.miss {
  font-style: italic;
  font-weight: 300;
  font-size: 16px;
  color: #f50e0e;
  vertical-align: top;
}

.description {
  padding: 12px 20px;
  background-color: #ffeded;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #111111;
}
</style>
