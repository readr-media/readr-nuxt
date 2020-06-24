<template>
  <div class="default">
    <nuxt />

    <DumbFooter class="default__footer" />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  beforeMount() {
    this.updateViewport()

    window.addEventListener('resize', this.updateViewport)
    window.addEventListener('orientationChange', this.updateViewport)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateViewport)
    window.removeEventListener('orientationChange', this.updateViewport)
  },
  methods: {
    ...mapMutations(['setViewport']),
    updateViewport() {
      const { clientWidth, clientHeight } = document.documentElement
      this.setViewport({
        width: clientWidth,
        height: clientHeight,
      })
    },
  },
}
</script>

<style lang="scss">
html {
  font-family: Inter, 'Noto Sans CJK TC', sans-serif;
}
.default {
  &__footer {
    max-width: 1096px;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
