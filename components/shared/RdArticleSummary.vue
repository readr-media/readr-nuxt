<template>
  <div class="summary">
    <div class="summary__main">
      <h4>報導重點摘要</h4>
      <div class="summary__main__content">
        <RdArticleContentHandler
          v-for="paragraph in summary"
          :key="paragraph.id"
          :paragraph="paragraph"
          :isSummary="true"
        />
      </div>
    </div>
  </div>
</template>

<script>
import RdArticleContentHandler from '~/components/shared/RdArticleContentHandler.vue'

export default {
  name: 'RdArticleSummary',

  components: {
    RdArticleContentHandler,
  },
  props: {
    summary: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="scss" scoped>
.summary {
  width: 100%;
  position: relative;
  padding: 16px 0 0;
  border: 2px solid #04295e;
  border-radius: 2px;
  &__main {
    padding: 20px 24px;
    @include media-breakpoint-up(md) {
      padding: 32px 48px;
    }
    h4 {
      font-size: 14px;
      line-height: 21px;
      color: #04295e;
      margin: 0 0 4px;
    }
    &__content {
      ::v-deep {
        .g-article {
          &-paragraph {
            font-size: 16px;
            line-height: 1.6;
          }
          &-list {
            li {
              font-size: 16px;
              line-height: 1.6;
            }
          }
        }
        > * + * {
          margin: 12px 0 0;
        }
      }
    }
  }
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 16px;
    background-color: #04295e;
  }
}
</style>
