<template>
  <div class="bookmart">
    <a :href="`#${bookmart.slug}`">
      <div class="container" :class="{ active: isActive }">
        {{ bookmart.name }}
      </div>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    bookmart: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    isActive() {
      return '#' + this.bookmart.slug === this.$route.hash
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  padding: 8px 16px;
  background: rgba(191, 109, 40, 0.6);
  border-radius: 4px;
  font-weight: bold;
  font-size: 18px;
  line-height: 26px;
  color: #ffffff;
  &:hover {
    background: #bf6d28;
    color: #dddddd;
  }
  &.active {
    color: #ffffff;
    background: #bf6d28;
  }
}
</style>
