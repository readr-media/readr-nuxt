<template>
  <div class="recommend">
    <div class="recommend__main">
      <h4>推薦閱讀</h4>
      <a :href="href" target="_blank" rel="noreferrer noopener">
        {{ title }}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RdArticleRecommend',

  props: {
    content: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    title() {
      return this.content?.name ?? ''
    },
    href() {
      return this.content?.href ?? ''
    },
  },
}
</script>

<style lang="scss" scoped>
.recommend {
  width: 100%;
  position: relative;
  padding: 0 0 0 12px;
  border: 2px solid #04295e;
  border-radius: 2px;
  &__main {
    padding: 16px 24px 16px 16px;
    @include media-breakpoint-up(md) {
      padding: 24px 32px 24px 24px;
    }
    h4 {
      font-size: 14px;
      line-height: 21px;
      color: #04295e;
      margin: 0 0 4px;
    }
    a {
      display: inline;
      font-size: 18px;
      line-height: 1.8;
      text-align: justify;
      color: rgba(0, 9, 40, 0.87);
      border-bottom: 2px solid #ebf02c;
      &:hover {
        color: #000928;
        border-bottom: 2px solid #04295e;
      }
    }
  }
  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 12px;
    background-color: #04295e;
  }
}
</style>
