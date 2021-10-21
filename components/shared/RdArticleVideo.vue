<template>
  <video
    preload="metadata"
    :autoplay="shouldAutoPlay"
    controls
    :loop="shouldLoop"
    playsinline
    muted
  >
    <source :src="video.url" />
  </video>
</template>

<script>
export default {
  name: 'RdArticleVideo',

  props: {
    video: {
      type: Object,
      required: true,
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
video {
  width: 100%;
}
</style>
