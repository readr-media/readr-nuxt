<template>
  <a
    :href="href"
    target="_blank"
    :class="{ 'reverse-row': shouldReverseInMobile }"
  >
    <picture :class="{ 'reverse-picture': shouldReverseInMobile }">
      <img v-lazy="img" :alt="title" />
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
  name: 'RdArticleListCard',

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
    shouldReverseInMobile: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
a {
  display: flex;
  @include media-breakpoint-up(md) {
    display: block;
  }
  &.reverse-row {
    flex-direction: row-reverse;
    justify-content: space-between;
    @include media-breakpoint-up(md) {
      flex-direction: none;
      justify-content: none;
    }
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
    @include media-breakpoint-up(md) {
      min-width: none;
      max-width: none;
      width: 100%;
      margin: 0 0 16px;
    }
    @include media-breakpoint-up(xl) {
      margin: 0 0 12px;
    }
    &.reverse-picture {
      margin: 0 0 0 16px;
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
    &::after {
      content: '';
      display: block;
      padding-top: 100%;
      @include media-breakpoint-up(md) {
        padding-top: 60%;
      }
    }
  }
  .text {
    h4 {
      text-align: justify;
      margin: 0 0 4px;
      @include media-breakpoint-up(md) {
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
  .info {
    @include media-breakpoint-up(md) {
      &::v-deep {
        &.time {
          font-size: 14px;
          line-height: 21px;
          .read {
            padding: 0 0 0 14px;
            &::before {
              top: 9px;
              left: 4px;
            }
          }
        }
      }
    }
  }
}
</style>
