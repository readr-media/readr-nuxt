<template>
  <div class="quote-slide">
    <div class="quote-wrapper">
      <div
        v-for="(quote, idx) in quotes"
        :key="quote.id"
        class="quote"
        :class="{ appeared: shouldAppear(idx) }"
      >
        <p>{{ quote.title }}</p>
        <div class="byline">{{ byline(quote) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuoteSlide',
  props: {
    quotes: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      appearedQuoteIdx: 0,
    }
  },
  computed: {
    doesReachTheEnd() {
      return this.appearedQuoteIdx >= this.totalQuotes - 1
    },
    totalQuotes() {
      return this.quotes.length
    },
    hasOnlyOneQuote() {
      return this.totalQuotes === 1
    },
  },
  mounted() {
    if (!this.hasOnlyOneQuote) {
      this.startAutoToNextQuote()
    }
  },
  methods: {
    toNextQuote() {
      if (!this.doesReachTheEnd) {
        this.appearedQuoteIdx += 1
      } else {
        this.appearedQuoteIdx = 0
      }
    },
    startAutoToNextQuote() {
      const intervalId = setInterval(this.toNextQuote, 3500)

      this.$once('hook:beforeDestroy', function stopAutoToNextQuote() {
        clearInterval(intervalId)
      })
    },
    shouldAppear(idx) {
      return idx === this.appearedQuoteIdx
    },
    byline({ byline }) {
      return `by ${byline ?? '匿名讀者'}`
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
    padding: 48px 98px 32px 98px;
  }
}
.quote-wrapper {
  position: relative;
}
.quote {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  transition: none;
  &.appeared {
    position: relative;
    opacity: 1;
    transition: opacity 1.5s;
    z-index: 1;
  }
}
p {
  font-weight: 900;
  font-size: 24px;
  letter-spacing: 2.8px;
  // to offset letter-spacing at the rightmost
  margin-left: 2.8px;
  // 108 = 24 * 1.5 * 3 = 36 * 1.5 * 2
  height: 108px;

  overflow-y: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  @include media-breakpoint-up(md) {
    font-size: 36px;
  }
}
.byline {
  font-size: 15px;
  font-weight: 700;
  margin-top: 22px;
  letter-spacing: 2.5px;
  // to offset letter-spacing at the rightmost
  margin-left: 2.5px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @include media-breakpoint-up(md) {
    font-size: 18px;
    margin-top: 25px;
  }
}
</style>
