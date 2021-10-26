<template>
  <div class="video">
    <div class="video__wrapper">
      <video
        :autoplay="shouldAutoPlay"
        :loop="shouldLoop"
        :poster="poster"
        controls
        preload="metadata"
        controlsList="nodownload"
        playsinline
        muted
      >
        <source :src="videoSrc" />
      </video>
    </div>
    <span v-if="videoCap" class="video__caption">{{ videoCap }}</span>
  </div>
</template>

<script>
export default {
  name: 'RdArticleVideo',

  props: {
    videoSrc: {
      type: String,
      required: true,
    },
    poster: {
      type: String,
      default: require('~/assets/imgs/default/post.svg'),
    },
    videoCap: {
      type: String,
      default: '',
    },
    shouldAutoPlay: {
      type: Boolean,
      default: false,
    },
    shouldLoop: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.video {
  &__wrapper {
    position: relative;
    width: 100%;
    padding-top: 50%;
    background-color: #d8d8d8;
    video {
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
    margin: 8px 0 0;
    @include media-breakpoint-up(md) {
      display: block;
      width: 568px;
      padding: 0;
      margin: 12px auto 0;
    }
    @include media-breakpoint-up(xl) {
      width: 960px;
    }
  }
}
</style>
