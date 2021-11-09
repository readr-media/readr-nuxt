<template>
  <a :href="href" target="_blank">
    <picture>
      <img v-lazy="img" :alt="title" />
      <label v-if="isReport">專題</label>
    </picture>
    <div class="text">
      <h4>
        <span>{{ title }}</span>
      </h4>
    </div>
  </a>
</template>

<script>
export default {
  name: 'RdHeaderListCard',

  props: {
    href: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    img: {
      type: String,
      default: require('~/assets/imgs/default/post.svg'),
    },
    isReport: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
a {
  display: flex;
  @include media-breakpoint-up(sm) {
    display: block;
  }
  picture {
    position: relative;
    display: inline-block;
    align-self: flex-start;
    min-width: calc((100% - 16px) * 0.2727);
    max-width: calc((100% - 16px) * 0.2727);
    background-color: #d8d8d8;
    margin: 0 16px 0 0;
    overflow: hidden;
    @include media-breakpoint-up(sm) {
      min-width: none;
      max-width: none;
      width: 100%;
      margin: 0 0 12px;
    }
    img {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      transition: all 0.6s ease-in-out;
      &:hover {
        transform: scale(1.1);
      }
    }
    label {
      position: absolute;
      top: 4px;
      right: 4px;
      font-size: 13px;
      line-height: 19px;
      color: #fff;
      background-color: rgba(0, 9, 40, 0.5);
      border-radius: 2px;
      padding: 2px 4px;
      @include media-breakpoint-up(sm) {
        top: 8px;
        right: 8px;
      }
    }
    &::after {
      content: '';
      display: block;
      padding-top: 100%;
      @include media-breakpoint-up(sm) {
        padding-top: 60%;
      }
    }
  }
  .text {
    h4 {
      text-align: justify;
      margin: 0 0 4px;
      @include media-breakpoint-up(sm) {
        margin: 0 0 8px;
      }
      span {
        display: inline;
        font-size: 16px;
        font-weight: 700;
        line-height: 24px;
        letter-spacing: 0.03em;
        color: #000928;
        @include media-breakpoint-up(md) {
          font-size: 18px;
          line-height: 27px;
        }
        &:hover {
          border-bottom: 1.5px solid #000928;
        }
      }
    }
  }
}
</style>
