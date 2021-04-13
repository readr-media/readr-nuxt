<template>
  <button
    :class="[
      'button',
      { disablePointerEvents: shouldDisablePointerEvents },
      state,
    ]"
  >
    <img :src="reportQuizButtonIconImgSrc" alt="report-quiz-button-icon" />
    <span class="button__text" v-text="text" />
  </button>
</template>

<script>
export default {
  props: {
    order: {
      type: Number,
      default: 0,
    },
    text: {
      type: String,
      default: '',
    },
    state: {
      type: String,
      default: 'normal',
      validator(value) {
        return [
          'normal',
          'normalWrong',
          'normalCorrect',
          'disable',
          'disableWrong',
          'disableCorrect',
        ].includes(value)
      },
    },
  },
  computed: {
    shouldDisablePointerEvents() {
      return this.state !== 'normal'
    },
    reportQuizButtonIconImgSrc() {
      if (this.state === 'normal') {
        const orderToAlphabet = ['A', 'B', 'C', 'D']
        return require(`~/assets/imgs/article-quiz-icon-${
          orderToAlphabet[this.order]
        }.svg`)
      }

      if (this.state.includes('Wrong')) {
        return require('~/assets/imgs/article-quiz-icon-wrong.svg')
      } else if (this.state.includes('Correct')) {
        return require('~/assets/imgs/article-quiz-icon-correct.svg')
      }

      return require('~/assets/imgs/article-quiz-icon-cross.svg')
    },
  },
}
</script>

<style lang="scss" scoped>
.button {
  background: #ffffff;
  border: 1px solid #d0cfcf;
  border-radius: 6px;
  padding: 0 12px;
  height: 51px;
  font-weight: 300;
  font-size: 18px;
  line-height: 27px;
  text-align: justify;
  letter-spacing: 0.006em;
  color: #111111;
  display: flex;
  align-items: center;
  transition: border 0.1s ease-out, font-weight 0.1s ease-out,
    background-color 0.1s ease-out;
  &__text {
    margin: 0 0 0 8px;
  }
  &:hover {
    border: 1px solid #111111;
    font-weight: 500;
  }
  &:active {
    background-color: rgba(0, 0, 0, 0.05);
  }
}

.disablePointerEvents {
  pointer-events: none;
}

// TODO: could refactor
.disable {
  opacity: 0.2;
}
.normalWrong {
  background-color: #ff3f3f;
  border: 1px solid #ffeded;
  color: white;
}
.disableWrong {
  background-color: #ff3f3f;
  border: 1px solid #ffeded;
  color: white;
  opacity: 0.2;
}
.normalCorrect {
  background-color: #2abc34;
  border: 1px solid #e0ffe2;
  color: white;
}
.disableCorrect {
  background-color: #2abc34;
  border: 1px solid #e0ffe2;
  color: white;
  opacity: 0.2;
}
</style>
