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
}

.toggled {
  background-color: #f50e0e;
  color: white;
  border-bottom: 1px solid transparent !important;
}
</style>
