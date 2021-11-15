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
      <RdDateWithReadTime
        :date="date"
        :readTimeText="readTimeText"
        class="info"
      />
    </div>
  </a>
</template>

<script>
import RdDateWithReadTime from '~/components/shared/RdDateWithReadTime.vue'

export default {
  name: 'RdEditorChoiceCard',

  components: {
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
    max-width: 296px;
    margin-right: auto;
  }
  picture {
    position: relative;
    display: block;
    width: 100%;
    background-color: #d8d8d8;
    margin: 0 0 16px;
    overflow: hidden;
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
    }
    &::after {
      content: '';
      display: block;
      padding-top: 52.25%;
    }
  }
  .text {
    h4 {
      text-align: left;
      margin: 0 0 8px;
      span {
        display: inline;
        font-size: 20px;
        font-weight: 700;
        line-height: 1.5;
        letter-spacing: 0.03em;
        color: #000928;
        @include media-breakpoint-up(md) {
          font-size: 24px;
          word-wrap: break-word;
          -webkit-line-clamp: 3;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        @include media-breakpoint-up(xl) {
          font-size: 20px;
        }
        &:hover {
          text-decoration: underline;
          text-decoration-thickness: 1.5px;
          text-underline-offset: 4px;
        }
      }
    }
  }
}
</style>
