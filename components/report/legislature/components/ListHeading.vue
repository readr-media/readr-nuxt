<template>
  <div v-if="title" class="highlight">
    <span class="title">{{ title }}</span>
    <div
      v-if="shouldShowReadMoreText"
      class="read-more"
      @click="handleReadMoreClicked"
    >
      <span class="read-more__title">{{ readMoreText }}</span>
      <SvgRightArrow class="read-more__icon" />
    </div>
  </div>
</template>

<script>
import SvgRightArrow from '~/assets/imgs/right-arrow.svg?inline'

export default {
  name: 'RdListHeading',

  components: {
    SvgRightArrow,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    readMoreText: {
      type: String,
      default: '',
    },
    categorySlug: {
      type: String,
      default: '',
    },
    categoryName: {
      type: String,
      default: '',
    },
  },
  computed: {
    shouldShowReadMoreText() {
      return this.readMoreText && this.categorySlug
    },
  },
  methods: {
    handleReadMoreClicked() {
      this.$router.push({
        name: 'category',
        params: { name: this.categoryName, slug: this.categorySlug },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.highlight {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 3px solid #fff;
  padding: 0 0 12px;
  margin-bottom: 16px;
  @include media-breakpoint-up(sm) {
    margin-bottom: 32px;
  }
  @include media-breakpoint-up(xl) {
    margin-bottom: 40px;
  }
  .title {
    position: relative;
    font-size: 24px;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0.05em;
    color: #fff;
    z-index: 1;
    &::before {
      content: '';
      position: absolute;
      bottom: 7px;
      left: 0;
      right: 0;
      height: 10px;
      background-color: #33aba4;
      z-index: -1;
    }
  }
  .read-more {
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 0 16px 0 0;
    &__title {
      font-size: 18px;
      font-weight: 700;
      line-height: 1;
      letter-spacing: 0.03em;
      color: #000928;
    }
    &__icon {
      position: absolute;
      bottom: 1px;
      right: 0;
      width: 10px;
      height: 13px;
      transition: all 0.35s ease;
    }
    &:hover,
    &:focus {
      .read-more__icon {
        right: -5px;
      }
    }
  }
}
</style>
