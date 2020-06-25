<template>
  <div class="quote-slide">
    <div class="quote-wrapper">
      <div
        v-for="(quote, idx) in quotes"
        :key="quote.id"
        class="quote"
        :class="{ active: shouldActive(idx) }"
      >
        <p>{{ quote.title }}</p>
        <div class="author">by 讀者 {{ quote.author }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DumbQuoteSlide',
  props: {
    quotes: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      activeQuoteIdx: 0,
    }
  },
  methods: {
    shouldActive(idx) {
      return idx === this.activeQuoteIdx
    },
  },
}
</script>

<style lang="scss" scoped>
.quote-slide {
  background-color: #f5ebff;
  color: #000928;
  line-height: 1.5;
  text-align: center;
  padding: 32px 10px 28px 10px;
  @include media-breakpoint-up(md) {
    padding: 48px 8.94% 32px 8.94%;
  }
}
.quote-wrapper {
  position: relative;
}
.quote {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  &.active {
    position: relative;
    opacity: 1;
  }
}
p {
  font-weight: 900;
  font-size: 24px;
  margin-bottom: 22px;
  letter-spacing: 2.8px;
  // to offset letter-spacing at the rightmost
  margin-left: 1.4px;
  @include media-breakpoint-up(md) {
    font-size: 36px;
    margin-bottom: 25px;
  }
}
.author {
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 2.5px;
  // to offset letter-spacing at the rightmost
  margin-left: 1.25px;
  @include media-breakpoint-up(md) {
    font-size: 18px;
  }
}
</style>
