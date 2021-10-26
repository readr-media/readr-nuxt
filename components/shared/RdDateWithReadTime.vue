<template>
  <div class="time">
    <span v-if="date" class="date">{{ date }}</span>
    <span v-if="readTimeText" class="read">{{ readTimeText }}</span>
  </div>
</template>

<script>
export default {
  name: 'RdDateWithReadTime',

  props: {
    date: {
      type: String,
      default: '',
    },
    readTimeText: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.time {
  font-size: 14px;
  line-height: 1.5;
  color: rgba(0, 9, 40, 0.66);
  @include media-breakpoint-up(md) {
    font-size: 16px;
  }
  .read {
    position: relative;
    padding: 0 0 0 14px;
    @include media-breakpoint-up(md) {
      padding: 0 0 0 20px;
    }
    &::before {
      content: '';
      position: absolute;
      top: 9px;
      left: 4px;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background-color: rgba(0, 9, 40, 0.2);
      @include media-breakpoint-up(md) {
        top: 11px;
        left: 8px;
      }
    }
  }
}
</style>
