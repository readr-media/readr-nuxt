<template>
  <div class="citation">
    <div class="citation__title">
      <span>引用數據</span>
    </div>
    <div class="citation__content">
      <RdArticleCitationHandler
        v-for="paragraph in citation"
        :key="paragraph.id"
        :paragraph="paragraph"
      />
    </div>
  </div>
</template>

<script>
import RdArticleCitationHandler from '~/components/shared/RdArticleCitationHandler.vue'

export default {
  name: 'RdArticleCitation',

  components: {
    RdArticleCitationHandler,
  },
  props: {
    citation: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="scss" scoped>
.citation {
  width: 100%;
  border-radius: 2px;
  &__title {
    text-align: center;
    background-color: #04295e;
    padding: 8px 0;
    span {
      font-size: 18px;
      font-weight: 700;
      line-height: 27px;
      letter-spacing: 0.03em;
      color: #ebf02c;
      @include media-breakpoint-up(md) {
        font-size: 20px;
        line-height: 30px;
      }
    }
  }
  &__content {
    background-color: rgba(245, 235, 255, 0.5);
    padding: 12px 24px;
    @include media-breakpoint-up(md) {
      padding: 16px 32px;
    }
    &::v-deep {
      p + p {
        margin: 12px 0 0;
        @include media-breakpoint-up(md) {
          margin: 16px 0 0;
        }
      }
    }
  }
}
</style>
