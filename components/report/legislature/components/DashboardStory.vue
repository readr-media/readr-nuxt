<template>
  <div
    ref="animation"
    v-observe-visibility="handleDashboardVisibilityChange"
    class="container"
  >
    <div id="start-of-the-dashboard-story"></div>
    <div id="animation" ref="animation">
      <Animation />
    </div>
    <button
      v-show="shouldShowScroller"
      class="scroller-button"
      @click="handleScrollerButtonClick"
    >
      <img
        src="~/assets/imgs/report/legislature/arrow-dashboard-scroller.svg"
        alt="scroller-icon"
        :style="{
          transition: 'transform 0.25s ease-out',
          transform: `rotate(${
            scrollerIconDirection === 'down' ? '180deg' : '0'
          })`,
        }"
      />
    </button>
    <div
      id="bottom-of-the-dashboard-story"
      v-observe-visibility="handleBottomVisibilityChange"
    ></div>
  </div>
</template>

<script>
import scrollIntoView from 'scroll-into-view'
import { mapGetters } from 'vuex'
import Animation from './Animation.vue'

export default {
  layout: 'empty',
  components: {
    Animation,
  },

  data() {
    return {
      isScrollDown: false,
      scrollerIconDirection: 'down',
      shouldShowScroller: false,
      hasUnfold: false,
      isWatching: false,
    }
  },

  computed: {
    ...mapGetters('viewport', ['viewportHeight']),
    shouldShowAnimation() {
      return this.isWatching || this.hasUnfold
    },
  },

  mounted() {},

  methods: {
    handleBottomVisibilityChange(isVisible) {
      this.scrollerIconDirection = isVisible ? 'up' : 'down'
    },
    handleDashboardVisibilityChange(isVisible) {
      this.shouldShowScroller = isVisible
      this.isWatching = isVisible
      if (!isVisible && !this.hasUnfold) {
        this.$nextTick(function () {
          this.hasUnfold =
            this.$refs.animation.clientHeight > this.viewportHeight
        })
      }
    },
    handleScrollerButtonClick() {
      this.$ga.event(
        'projects',
        'click',
        `捲動式影片箭頭${this.scrollerIconDirection}`
      )
      const element = this.scrollerIconDirection === 'down' ? 'bottom' : 'start'
      scrollIntoView(
        document.querySelector(`#${element}-of-the-dashboard-story`)
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: grey;
}
#animation {
  background-color: rgb(0 0 0 / 18%);
  z-index: 3000;
  position: relative;
}

.scroller-button {
  position: fixed;
  z-index: 4000;
  bottom: 20px;
  right: 20px;
}
</style>
