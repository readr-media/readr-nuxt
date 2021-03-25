<template>
  <nav class="nav">
    <button
      v-for="(nav, i) in navs"
      :key="nav"
      :class="['button', { 'button--active': activeIndex === i }]"
      @click="$emit('navigateToIndex', i)"
      v-text="nav"
    />
  </nav>
</template>

<script>
export default {
  props: {
    navs: {
      type: Array,
      default: () => [],
    },
    activeIndex: {
      type: Number,
      default: -1,
    },
  },
}
</script>

<style lang="scss" scoped>
.nav {
  background-color: #ebebeb;
  display: flex;
  justify-content: center;
}

.button {
  padding: 12px 22px;
  flex: 1 1 auto;
  max-width: 246px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #6a6a6a;
  border-bottom: 2px solid transparent;
  &--active {
    font-weight: 500;
    color: #111111;
    border-bottom: 2px solid #111111;
  }
}
</style>
