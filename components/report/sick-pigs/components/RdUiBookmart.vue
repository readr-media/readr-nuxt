<template>
  <div class="bookmart" :class="{ active: isActive }">
    {{ bookmart.name }}
  </div>
</template>

<script>
export default {
  props: {
    bookmart: {
      type: Object,
      default: () => {},
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.bookmart {
  padding: 8px 16px;
  background: rgba(191, 109, 40, 0.6);
  border-radius: 4px;
  font-weight: bold;
  font-size: 18px;
  line-height: 26px;
  color: #ffffff;
  width: fit-content;
  font-size: 14px;
  line-height: 20px;
  @include media-breakpoint-up(md) {
    font-size: 18px;
    line-height: 26px;
  }
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
