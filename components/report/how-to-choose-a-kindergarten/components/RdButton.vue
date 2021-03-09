<template>
  <button type="button" :disabled="shouldDisable">
    <div>{{ text }}</div>
  </button>
</template>

<script>
export default {
  name: 'RdButton',

  props: {
    text: {
      type: String,
      required: true,
      default: '',
    },

    shouldDisable: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
$letter-spacing: 2.5px;

button {
  text-align: center;
  letter-spacing: 2.5px;
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
  width: 100%;
  position: relative;

  &:disabled {
    cursor: not-allowed;

    div {
      background-color: #e0e0e0;
      color: rgba(#161616, 0.2);
    }
  }

  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 4px;
    left: 4px;
    width: 100%;
    height: 100%;
    background-color: #2b2b2b;
    border-radius: 2px;
  }
}

div {
  background-color: var(--primary-color);
  color: #161616;
  border: 1px solid #fffcf5;
  border-radius: 2px;
  padding: 12px 48px 12px #{$letter-spacing + 48px};
  z-index: 9;
  position: relative;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #161616;
    color: var(--primary-color);
  }

  &:active {
    color: #fffcf5;
    transition: none;
  }
}
</style>
