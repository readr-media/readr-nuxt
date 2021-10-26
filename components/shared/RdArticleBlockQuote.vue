<template>
  <div v-if="quote" class="block-quote">
    <div class="block-quote__icon">
      <SvgBlockQuoteIcon />
    </div>
    <span v-if="quote" class="block-quote__quote">{{ quote }} </span>
    <span v-if="quoteBy" class="block-quote__quote-by">{{ quoteBy }}</span>
  </div>
</template>

<script>
import SvgBlockQuoteIcon from '~/assets/imgs/block-quote.svg?inline'

export default {
  name: 'RdArticleBlockQuote',

  components: {
    SvgBlockQuoteIcon,
  },
  props: {
    content: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    quoteBy() {
      return this.content?.quoteBy ?? ''
    },
    quote() {
      return this.content?.quote ?? ''
    },
  },
}
</script>

<style lang="scss" scoped>
.block-quote {
  width: 100%;
  padding: 0 12px;
  text-align: right;
  @include media-breakpoint-up(md) {
    width: 448px;
    padding: 0;
  }
  @include media-breakpoint-up(md) {
    width: 480px;
  }
  &__icon {
    width: 32px;
    height: 18px;
    margin: 0 auto 16px;
  }
  &__quote {
    display: block;
    font-weight: 700;
    font-size: 20px;
    line-height: 1.5;
    text-align: justify;
    color: rgba(0, 9, 40, 0.87);
    margin: 0 0 16px;
    @include media-breakpoint-up(md) {
      font-size: 24px;
    }
  }
  &__quote-by {
    position: relative;
    display: inline-block;
    font-size: 14px;
    line-height: 1.5;
    text-align: left;
    color: rgba(0, 9, 40, 0.5);
    padding: 0 0 0 30px;
    @include media-breakpoint-up(md) {
      font-size: 16px;
      padding: 0 0 0 34px;
    }
    &::before {
      content: '';
      position: absolute;
      top: 10px;
      left: 0px;
      width: 24px;
      height: 1px;
      background-color: rgba(0, 9, 40, 0.5);
      @include media-breakpoint-up(md) {
        top: 12px;
        width: 30px;
      }
    }
  }
}
</style>
