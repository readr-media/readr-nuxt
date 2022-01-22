<template>
  <section class="section" style="background-color: black;">
    <AnimationVideo v-if="shouldShowVideo" />
    <div v-show="!shouldShowVideo" class="layer">
      <button @click="handleClickButton">
        點我看影片
      </button>
    </div>
  </section>
</template>

<script>
import AnimationVideo from './AnimationVideo.vue'
export default {
  components: {
    AnimationVideo,
  },
  data() {
    return {
      shouldShowVideo: false,
    }
  },
  methods: {
    handleClickButton() {
      this.shouldShowVideo = true
      this.$ga.event('projects', 'click', '立院 - 展開影片')
    },
  },
}
</script>

<style lang="scss" scoped>
.section {
  position: relative;
}
.layer {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: black;
}
button {
  background-color: white;
  padding: 5px 11px;
  border-radius: 5px;
  font-weight: 900;
  font-size: 16px;
  line-height: 23px;
  color: #1b1b1b;
}
.video-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
</style>
