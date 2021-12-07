<template>
  <a :href="href" target="_blank" :class="{ 'first-item': isFirst }">
    <picture>
      <img v-lazy="img" :src="'/post.svg'" :alt="title" />
    </picture>
    <div v-if="title" class="text">
      <label v-if="description" class="label-intext">
        {{ description }}
      </label>
      <h4>
        <span>{{ title }}</span>
      </h4>
      <span v-if="subtitle && isFirst" class="subtitle">
        {{ subtitle }}
      </span>
    </div>
    <label v-if="description" class="label-upper">
      {{ description }}
    </label>
  </a>
</template>

<script>
export default {
  name: 'RdFeatureCard',

  props: {
    href: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
    img: {
      type: String,
      default: require('~/assets/imgs/default/post.svg'),
    },
    description: {
      type: String,
      default: '',
    },
    isFirst: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    console.log('aa', this.description)
  },
}
</script>

<style lang="scss" scoped>
a {
  position: relative;
  display: block;
  picture {
    position: relative;
    display: block;
    width: 100%;
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
      background-color: #d8d8d8;
      z-index: 5;
      transition: all 0.3s ease;
      &:hover {
        transform: scale(1.1);
      }
    }
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 50;
      background: linear-gradient(
        180deg,
        rgba(0, 9, 40, 0) 0%,
        rgba(0, 9, 40, 0.3) 100%
      );
    }
    &::after {
      content: '';
      display: block;
      padding-top: 52.5%;
    }
  }
  // for properly render emoji color in windows
  .label-intext,
  .label-upper {
    font-family: Segoe UI Emoji;
  }
  .text {
    position: absolute;
    bottom: 8px;
    left: 8px;
    right: 8px;
    text-align: left;
    z-index: 70;
    @include media-breakpoint-up(md) {
      bottom: 16px;
      left: 24px;
      right: 24px;
    }
    .label-intext {
      display: none;
    }
    h4 {
      span {
        font-size: 20px;
        font-weight: 700;
        line-height: 1.5;
        letter-spacing: 0.03em;
        color: #fff;
        text-shadow: 0 2px 2px rgba(0, 0, 0, 0.5);
        word-wrap: break-word;
        -webkit-line-clamp: 2;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        @include media-breakpoint-up(md) {
          font-size: 24px;
        }
        &:hover {
          text-decoration: underline;
          text-decoration-thickness: 1.5px;
          text-underline-offset: 4px;
        }
      }
    }
    .subtitle {
      display: none;
      @include media-breakpoint-up(xl) {
        font-size: 18px;
        line-height: 1.5;
        color: #fff;
        text-shadow: 0 2px 2px rgba(0, 0, 0, 0.5);
        word-wrap: break-word;
        -webkit-line-clamp: 1;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        margin: 8px 0 0;
        padding: 0 80px;
        &:hover {
          text-decoration: underline;
          text-decoration-thickness: 1px;
          text-underline-offset: 4px;
        }
      }
    }
  }
  .label-upper {
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    z-index: 70;
    font-size: 16px;
    font-weight: 700;
    line-height: 1.5;
    letter-spacing: 0.03em;
    color: #000928;
    background-color: #ebf02c;
    padding: 4px 8px;
    @include media-breakpoint-up(md) {
      font-size: 18px;
    }
  }
  &.first-item {
    @include media-breakpoint-up(xl) {
      picture {
        &::before {
          top: 66.66%;
        }
      }
      .text {
        text-align: center;
        bottom: 22px;
        left: 200px;
        right: 200px;
        .label-intext {
          display: inline-block;
          font-size: 18px;
          font-weight: 700;
          line-height: 1.5;
          letter-spacing: 0.03em;
          color: #000928;
          background-color: #ebf02c;
          padding: 4px 8px;
          margin: 16px;
        }
        h4 {
          span {
            font-size: 36px;
            font-weight: 900;
            &:hover {
              text-decoration-thickness: 2px;
              text-underline-offset: 8px;
            }
          }
        }
      }
      .label-upper {
        display: none;
      }
    }
  }
}
</style>
