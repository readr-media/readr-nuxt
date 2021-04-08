<template>
  <header class="header">
    <RdSubmitButton
      class="header__submit-button"
      :state="!shouldDisableAnswerClick ? 'disable' : 'normal'"
      :text="textSubmitButton"
      @click.native="handleSubmitButtonClick"
    />
    <p class="header__info">
      <span
        v-for="(text, i) in texts"
        :key="i"
        :class="{ highlight: isCurrentTextHighlighted(text) }"
        v-text="text"
      />
    </p>
  </header>
</template>

<script>
import RdSubmitButton from './RdSubmitButton.vue'

export default {
  name: 'RdQuizHeader',
  components: {
    RdSubmitButton,
  },
  props: {
    texts: {
      type: Array,
      default: () => [],
    },
    textHighlight: {
      type: String,
      default: '',
    },
    textSubmitButton: {
      type: String,
      default: '',
    },
    shouldDisableAnswerClick: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    isCurrentTextHighlighted(text) {
      return text === this.textHighlight
    },
    handleSubmitButtonClick() {
      if (!this.shouldDisableAnswerClick) {
        return
      }
      this.$emit('submit')
    },
  },
}
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  background-color: #f1f1f1;
  padding: 12px 20px 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #6a6a6a;
  &__submit-button {
    @include media-breakpoint-up(md) {
      display: none;
    }
  }
  &__info {
    margin: 8px 0 0 0;
    @include media-breakpoint-up(md) {
      margin: 0;
    }
  }
  @include media-breakpoint-up(md) {
    height: 48px;
    padding: 0;
    background-color: #ffeded;
  }
}

.highlight {
  color: #f50e0e;
}
</style>
