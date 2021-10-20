<template>
  <div class="cover-image">
    <picture v-if="imgSrc.xs" class="cover-image__img">
      <source :media="`(min-width: ${breakpointSm})`" :srcset="imgSrc.sm" />
      <img :src="imgSrc.xs" alt="" />
    </picture>
    <span v-if="imgCap" class="cover-image__caption">{{ imgCap }}</span>
  </div>
</template>

<script>
import styleVariables from '~/assets/css/variables.module.scss'

export default {
  name: 'RdCoverImage',

  props: {
    imgSrc: {
      type: Object,
      default: () => {},
    },
    imgCap: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      breakpointSm: styleVariables['breakpoint-sm'],
    }
  },
}
</script>

<style lang="scss" scoped>
.cover-image {
  &__img {
    position: relative;
    padding-top: 50%;
    background-color: #d8d8d8;
    margin: 0 0 8px;
    @include media-breakpoint-up(md) {
      border-radius: 2px;
      overflow: hidden;
      margin: 0 0 12px;
    }

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &__caption {
    font-size: 14px;
    line-height: 21px;
    color: rgba(0, 9, 40, 0.5);
    padding: 0 20px;
    @include media-breakpoint-up(md) {
      display: block;
      width: 568px;
      padding: 0;
      margin: 0 auto;
    }
    @include media-breakpoint-up(xl) {
      width: 960px;
    }
  }
}
</style>
