<template>
  <div class="summary">
    <div class="deco" />
    <div class="summary__main">
      <h4>報導重點摘要</h4>
      <div class="summary__main__content">
        <RdArticleContentHandler
          v-for="paragraph in summary"
          :key="paragraph.id"
          :paragraph="paragraph"
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
  .deco {
    height: 16px;
    background-color: #04295e;
  }
  &__main {
    border: 2px solid #04295e;
    border-radius: 0 0 2px 2px;
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
            color: rgba(0, 9, 40, 0.87);
          }
          &-list {
            li {
              color: rgba(0, 9, 40, 0.87);
              line-height: 1.6;
            }
            li + li {
              margin: 4px 0 0;
            }
          }
        }
        > * + * {
          margin: 12px 0 0;
        }
      }
    }
  }
}
</style>
