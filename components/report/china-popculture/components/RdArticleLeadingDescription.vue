<template>
  <div class="article-leading-description">
    <picture>
      <source
        :media="`(min-width: ${styleVariables['breakpoint-sm']})`"
        srcset="
          ~/assets/report/china-popculture/cp-article-leading-description-large.png
        "
      />
      <img
        class="article-leading-description__img img"
        src="~/assets/report/china-popculture/cp-article-leading-description-small.png"
        alt="article-leading-description-img"
      />
    </picture>
    <div class="article-leading-description__description description">
      <p v-text="description" />
    </div>
  </div>
</template>

<script>
import styleVariables from '~/assets/css/variables.module.scss'

export default {
  props: {
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
}
</script>

<style lang="scss" scoped>
.article-leading-description {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: -120px;
  &__description {
    position: relative;
    bottom: 120px;
    @include media-breakpoint-up(md) {
      bottom: 100px;
    }
  }
  @include media-breakpoint-up(md) {
    margin-bottom: -100px;
    max-width: 608px;
  }
  @include media-breakpoint-up(xl) {
    max-width: 640px;
  }
}

.description {
  padding: 16px 24px;
  background-color: white;
  width: 90%;
  text-align: justify;
  @include media-breakpoint-up(md) {
    width: 74%;
  }
}
</style>
