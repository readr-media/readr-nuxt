<template>
  <span
    class="underline"
    :class="{ toggled: isToggled }"
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
    font-weight: 500;
    background-color: #ffeded;
    color: black;
    border-bottom: 1px solid transparent;
  }
}

.toggled {
  font-weight: 500;
  background-color: #f50e0e !important;
  color: white !important;
  border-bottom: 1px solid transparent !important;
}
</style>
