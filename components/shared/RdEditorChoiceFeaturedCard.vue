<template>
  <a :href="href" target="_blank">
    <picture>
      <img :src="img" :alt="title" />
      <label v-if="isReport">專題</label>
    </picture>
    <div class="text">
      <div class="label">
        <SvgEditorChoice class="label-icon" />
        <span>編輯精選</span>
      </div>
      <h4>
        <span>{{ title }}</span>
      </h4>
      <RdDateWithReadTime
        :date="date"
        :readTimeText="readTimeText"
        class="info"
      />
    </div>
  </a>
</template>

<script>
import SvgEditorChoice from '~/assets/imgs/editor-choice-label.svg?inline'
import RdDateWithReadTime from '~/components/shared/RdDateWithReadTime.vue'

export default {
  name: 'RdEditorChoiceFeaturedCard',

  components: {
    SvgEditorChoice,
    RdDateWithReadTime,
  },
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
    date: {
      type: String,
      default: '',
    },
    readTimeText: {
      type: String,
      default: '',
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
  display: block;
  @include media-breakpoint-up(xl) {
    max-width: 720px;
    margin-left: auto;
  }
  picture {
    position: relative;
    display: block;
    width: 100%;
    background-color: #d8d8d8;
    margin: 0 0 24px;
    overflow: hidden;
    @include media-breakpoint-up(md) {
      margin: 0 0 40px;
    }
    @include media-breakpoint-up(xl) {
      margin: 0 0 32px;
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
      top: 8px;
      right: 8px;
      font-size: 13px;
      line-height: 19px;
      color: #fff;
      background-color: rgba(0, 9, 40, 0.5);
      border-radius: 2px;
      padding: 2px 4px;
      @include media-breakpoint-up(md) {
        top: 16px;
        right: 16px;
        font-size: 14px;
        line-height: 21px;
        padding: 2px 8px;
      }
    }
    &::after {
      content: '';
      display: block;
      padding-top: 52.25%;
    }
  }
  .text {
    position: relative;
    padding: 0 16px 0 24px;
    @include media-breakpoint-up(md) {
      padding: 0 0 0 36px;
    }
    .label {
      display: inline-flex;
      align-items: center;
      background-color: #000928;
      border-radius: 2px;
      padding: 4px 8px;
      margin: 0 0 12px;
      &-icon {
        width: 16px;
        height: 16px;
        @include media-breakpoint-up(md) {
          width: 18px;
          height: 18px;
        }
      }
      span {
        font-size: 16px;
        font-weight: 700;
        line-height: 24px;
        letter-spacing: 0.03em;
        color: #fff;
        margin: 0 0 0 4px;
        @include media-breakpoint-up(md) {
          font-size: 18px;
          line-height: 27px;
        }
      }
    }
    h4 {
      text-align: left;
      margin: 0 0 12px;
      span {
        font-size: 24px;
        font-weight: 900;
        line-height: 1.5;
        letter-spacing: 0.03em;
        color: #000928;
        @include media-breakpoint-up(md) {
          font-size: 36px;
          word-wrap: break-word;
          -webkit-line-clamp: 3;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        @include media-breakpoint-up(xl) {
          -webkit-line-clamp: 2;
        }
        &:hover {
          text-decoration: underline;
          text-decoration-thickness: 2px;
          text-underline-offset: 6px;
        }
      }
    }
    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 8px;
      background-color: #fff;
      @include media-breakpoint-up(md) {
        width: 12px;
      }
    }
  }
}
</style>
