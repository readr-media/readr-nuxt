<template>
  <a
    :href="href"
    target="_blank"
    :class="[
      { 'reverse-row': shouldReverseInMobile },
      { 'report-highlight': isReport && shouldHighLightReport },
    ]"
  >
    <picture :class="{ 'reverse-picture': shouldReverseInMobile }">
      <img v-if="shouldNotLazyload" :src="img" :alt="title" />
      <img v-else v-lazy="img" :src="'./post.svg'" :alt="title" />
    </picture>
    <label v-if="isReport" class="report-label">專題</label>
    <div class="text">
      <h4>
        <span>{{ title }}</span>
      </h4>
      <RdDateWithReadTime
        v-if="!shouldHideBottomInfos"
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
    isReport: {
      type: Boolean,
      default: false,
    },
    shouldReverseInMobile: {
      type: Boolean,
      default: false,
    },
    shouldHighLightReport: {
      type: Boolean,
      default: false,
    },
    shouldHideBottomInfos: {
      type: Boolean,
      default: false,
    },
    shouldNotLazyload: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
a {
  display: flex;
  border-radius: 2px;
  position: relative;
  @include media-breakpoint-up(sm) {
    display: block;
  }
  &.reverse-row {
    flex-direction: row-reverse;
    justify-content: space-between;
    @include media-breakpoint-up(sm) {
      flex-direction: row;
      justify-content: center;
    }
  }
  picture {
    position: relative;
    display: inline-block;
    align-self: flex-start;
    min-width: calc((100% - 16px) * 0.2727);
    max-width: calc((100% - 16px) * 0.2727);
    margin: 0 16px 0 0;
    overflow: hidden;
    border-radius: 2px;
    @include media-breakpoint-up(sm) {
      min-width: none;
      max-width: none;
      width: 100%;
      margin: 0 0 12px;
    }
    &.reverse-picture {
      margin: 0 0 0 16px;
      @include media-breakpoint-up(sm) {
        margin: 0 0 12px;
      }
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
      background-color: #d8d8d8;
      transition: all 0.3s ease;
      &:hover {
        transform: scale(1.1);
      }
    }
    &::after {
      content: '';
      width: 100%;
      display: block;
      padding-top: 100%;
      @include media-breakpoint-up(sm) {
        padding-top: 52.5%;
      }
    }
  }
  .report-label {
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
  .text {
    h4 {
      text-align: left;
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
  &.report-highlight {
    background-color: rgba(245, 235, 255, 0.5);
    padding: 12px 8px 12px 0;
    @include media-breakpoint-up(sm) {
      padding: 0 0 12px;
    }
    picture {
      margin: 0 8px 0 0;
      &.reverse-picture {
        margin: 0 0 0 8px;
        @include media-breakpoint-up(sm) {
          margin: 0 0 12px;
        }
      }
      @include media-breakpoint-up(sm) {
        margin: 0 0 12px;
      }
    }
    .text {
      position: relative;
      padding: 0 0 0 20px;
      @include media-breakpoint-up(sm) {
        padding: 0 12px 0 24px;
      }
      &::before {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 8px;
        background-color: #ebf02c;
      }
    }
  }
}
</style>
