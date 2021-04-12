<template>
  <span
    class="underline"
    :class="{
      toggled: isToggled,
      highlight: shouldShowClickHint && !isToggled,
    }"
    @click="handleClick"
    v-text="text"
  />
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '',
    },
    shouldDisableAnswerClick: {
      type: Boolean,
      default: false,
    },
    shouldShowClickHint: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isToggled: false,
    }
  },
  methods: {
    handleClick() {
      if (!this.isToggled && this.shouldDisableAnswerClick) {
        return
      }
      this.isToggled = !this.isToggled
      this.$emit('toggle', this.isToggled)
    },
  },
}
</script>

<style lang="scss" scoped>
.underline {
  border-bottom: 1px solid #6a6a6a;
  cursor: pointer;
  transition: background-color 0.1s ease-out, border-bottom 0.1s ease-out,
    color 0.1s ease-out, font-weight 0.1s ease-out;
  &:hover {
    @include media-breakpoint-up(xl) {
      font-weight: 500;
      background-color: #ffeded;
      color: black;
      border-bottom: 1px solid transparent;
    }
  }
}

.toggled {
  font-weight: 500;
  background-color: #f50e0e !important;
  color: white !important;
  border-bottom: 1px solid transparent !important;
}

.highlight {
  position: relative;
  &:after {
    content: '';
    display: inline-block;
    position: absolute;
    left: calc(50% - 10px);
    top: calc(50% - 10px);
    width: 20px;
    height: 20px;
    background-color: rgba(255, 63, 63, 0.3);
    border-radius: 50%;
    transition: all 0.2s ease-in-out;
    animation: ripple 2s 0.2s infinite;
    -webkit-animation: ripple 2s 0.2s infinite;
  }

  @-webkit-keyframes ripple {
    50% {
      box-shadow: 0px 0px 0px 10px rgba(255, 63, 63, 0.05),
        0px 0px 0px 10px rgba(255, 63, 63, 0.05);
    }

    100% {
      box-shadow: 0px 0px 0px 10px rgba(255, 63, 63, 0.05),
        0px 0px 0px 10px rgba(255, 63, 63, 0.05),
        0px 0px 0px 20px rgba(255, 63, 63, 0.05),
        0px 0px 0px 20px rgba(255, 63, 63, 0.05);
    }
  }
}
</style>
