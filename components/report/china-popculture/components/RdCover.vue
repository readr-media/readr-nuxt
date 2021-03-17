<template>
  <section class="cover">
    <picture>
      <source
        :media="`(min-width: ${styleVariables['breakpoint-sm']})`"
        :srcset="coverImgs.large"
      />
      <img
        class="cover__cover-img cover-img"
        :src="coverImgs.small"
        alt="cover-img"
      />
    </picture>
    <h1 class="cover__title title">
      <!-- eslint-disable-next-line vue/no-v-html -->
      <span v-html="titleHtml" />
    </h1>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <p class="cover__description description" v-html="descriptionHtml"></p>
  </section>
</template>

<script>
import styleVariables from '~/scss/_variables.scss'
import { newline2br } from '~/components/helpers/index.js'

export default {
  props: {
    coverImgs: {
      type: Object,
      default: () => ({}),
    },
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      styleVariables,
    }
  },
  computed: {
    titleHtml() {
      return newline2br(this.title)
    },
    descriptionHtml() {
      return newline2br(this.description)
    },
  },
}
</script>

<style lang="scss" scoped>
.cp {
  .cover {
    padding: 0 20px;
    &__title {
      margin: 12px 0 0 0;
      @include media-breakpoint-up(md) {
        margin: 48px 0 0 0;
      }
      @include media-breakpoint-up(xl) {
        margin: 60px 0 0 0;
      }
    }
    &__description {
      margin: 24px 0 0 0;
    }
    @include media-breakpoint-up(md) {
      padding: 0;
      max-width: 568px;
      margin: 0 auto;
    }
    @include media-breakpoint-up(xl) {
      max-width: 600px;
    }
  }

  .cover-img {
    width: 100%;
  }

  .title {
    font-weight: 500;
    font-size: 28px;
    line-height: 36px;
    text-align: center;
    letter-spacing: 0.04em;
    color: #161616;
    @include media-breakpoint-up(md) {
      font-size: 32px;
      line-height: 44px;
    }
    span {
      box-shadow: inset 0 -0.175em white, inset 0 -0.55em rgba(255, 63, 63, 0.8);
    }
  }

  .description {
    font-weight: 300;
    font-size: 18px;
    line-height: 36px;
    text-align: center;
    letter-spacing: 0.01em;
    color: #161616;
    ::v-deep br {
      display: block;
      content: '';
      margin: 26px 0 0 0;
    }
    @include media-breakpoint-up(md) {
      text-align: left;
    }
  }
}
</style>
