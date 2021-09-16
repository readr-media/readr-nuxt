<template>
  <div class="button">
    <span class="button__title">{{ title }}</span>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      isRequired: true,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.button {
  background: #fff;
  border: 1px solid #bf6d28;
  box-sizing: border-box;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1), 0 2px 2px -1px rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  padding: 12px 26px;
  width: 240px;
  text-align: center;
  cursor: pointer;

  &:hover {
    background: linear-gradient(
        0deg,
        rgba(0, 9, 40, 0.05),
        rgba(0, 9, 40, 0.05)
      ),
      #fff;
    border: 1px solid #bf6d28;
  }
  &:active {
    background: linear-gradient(0deg, rgba(0, 9, 40, 0.1), rgba(0, 9, 40, 0.1)),
      #fff;
    border: 1px solid #bf6d28;
    border-radius: 2px;
  }

  &__title {
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 27px;
    color: #bf6d28;
    user-select: none;
    outline: none;
  }
}
</style>
