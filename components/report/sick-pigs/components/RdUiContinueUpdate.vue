<template>
  <div class="continue-update">
    <span class="continue-update__dot" />
    <h5>持續更新</h5>
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
.continue-update {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  background: #29abe2;
  border-radius: 4px;
  font-weight: bold;
  font-size: 18px;
  line-height: 26px;
  color: #fff;
  padding: 8px 16px;
  width: 120px;
  height: 42px;

  &__dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #fff;
    margin-right: 8px;
    animation-name: blink;
    animation-duration: 2s;
    animation-iteration-count: infinite;
  }

  h5 {
    font-weight: bold;
  }
}

@keyframes blink {
  0% {
    opacity: 1;
  }
  25% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}
</style>
