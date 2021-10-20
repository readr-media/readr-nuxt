<template>
  <div class="time">
    <span class="date">{{ date }}</span>
    <span class="read">{{ readTimeText }}</span>
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
    readTime: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    readTimeText() {
      const min = Math.round(this.readTime / 60)
      return `閱讀時間 ${min} 分鐘`
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
  .date {
    position: relative;
    padding: 0 14px 0 0;
    @include media-breakpoint-up(md) {
      padding: 0 20px 0 0;
    }
    &::after {
      content: '';
      position: absolute;
      top: 9px;
      right: 3px;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background-color: rgba(0, 9, 40, 0.2);
      @include media-breakpoint-up(md) {
        top: 11px;
        right: 5px;
      }
    }
  }
}
</style>
