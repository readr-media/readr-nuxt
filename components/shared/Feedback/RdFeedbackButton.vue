<template>
  <button type="button" @click="$emit('sendGaEvent')">
    {{ text }}
  </button>
</template>

<script>
export default {
  name: 'RdFeedbackButton',

  props: {
    text: {
      type: String,
      default: '',
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
button {
  background-color: #04295e;
  letter-spacing: 2.5px;
  color: #fff;
  font-weight: 700;
  border-radius: 2px;
  box-shadow: 0 0 0 1px #fff;
  font-size: 15px;
  line-height: 1.5;
  padding: 10px;

  &:focus {
    box-shadow: 0 0 0 2px #fff;
  }

  &--feedback:disabled {
    background-color: #f5ebff;
    text-decoration: line-through;
    font-weight: 400;
    cursor: not-allowed;
  }
}
</style>
