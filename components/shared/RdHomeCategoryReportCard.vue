<template>
  <a :href="href" target="_blank">
    <picture>
      <img v-lazy="img" :src="'/post.svg'" :alt="title" />
    </picture>
    <label v-if="isReport" class="report-label">專題</label>
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
  name: 'RdHomeCategoryReportCard',

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
  position: relative;
  background-color: rgba(245, 235, 255, 0.5);
  border-radius: 2px;
  padding: 0 0 16px;
  @include media-breakpoint-up(sm) {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    padding: 0;
  }
  @include media-breakpoint-up(xl) {
    display: block;
    padding: 0 0 24px;
    margin-bottom: auto;
  }
  picture {
    position: relative;
    display: block;
    width: 100%;
    overflow: hidden;
    border-radius: 2px 2px 0 0;
    margin: 0 0 16px;
    @include media-breakpoint-up(sm) {
      margin: 0;
      border-radius: 0 2px 2px 0;
    }
    @include media-breakpoint-up(xl) {
      margin: 0 0 24px;
      border-radius: 2px 2px 0 0;
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
      display: block;
      padding-top: 75%;
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
    position: relative;
    padding: 0 12px 0 24px;
    @include media-breakpoint-up(sm) {
      min-width: 62%;
      padding: 45px 32px 45px 28px;
    }
    @include media-breakpoint-up(xl) {
      padding: 0 24px 0 28px;
    }
    h4 {
      text-align: left;
      margin: 0 0 8px;
      @include media-breakpoint-up(sm) {
        margin: 0 0 12px;
      }
      span {
        font-size: 18px;
        font-weight: 700;
        line-height: 27px;
        letter-spacing: 0.03em;
        color: #000928;
        word-wrap: break-word;
        -webkit-line-clamp: 2;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        @include media-breakpoint-up(sm) {
          font-size: 24px;
          line-height: 36px;
        }
        &:hover {
          text-decoration: underline;
          text-decoration-thickness: 1.5px;
          text-underline-offset: 4px;
        }
      }
    }
    .info {
      @include media-breakpoint-up(sm) {
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
    &::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: 8px;
      background-color: #ebf02c;
      @include media-breakpoint-up(sm) {
        top: 45px;
        bottom: 45px;
      }
      @include media-breakpoint-up(xl) {
        top: 0;
        bottom: 0;
      }
    }
  }
}
</style>
