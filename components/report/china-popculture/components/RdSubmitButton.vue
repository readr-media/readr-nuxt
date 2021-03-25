<template>
  <button
    :class="[
      'submit-button',
      { 'submit-button--disable': state === 'disable' },
    ]"
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
    state: {
      type: String,
      default: 'normal',
      validator(value) {
        return ['normal', 'disable'].includes(value)
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.submit-button {
  width: 100%;
  height: 48px;
  background: #ff3f3f;
  border: 1px solid #ffffff;
  border-radius: 2px;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  letter-spacing: 2.5px;
  color: #ffffff;
  transition: background 0.25s ease-out;
  &:hover {
    background: #111111;
  }
  &--disable {
    background: #e0e0e0;
    color: rgba(17, 17, 17, 0.2);
    cursor: not-allowed;
    &:hover {
      background: #e0e0e0;
    }
  }
}
</style>
