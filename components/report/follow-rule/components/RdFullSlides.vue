<template>
  <div ref="slide" class="full-slide" :class="slideId" :style="cssProps">
    <div class="full-slide__pin" :class="slideId">
      <div class="full-slide__container" :class="slideId">
        <div
          v-for="slide in slides"
          :id="slide.id"
          :key="slide.id"
          class="slide"
          :class="slideId"
        >
          <div class="slide__top">
            <img :src="getPictureUrl(slide.topId)" />
          </div>
          <div class="slide__bottom">
            <img v-if="slide.bottomId" :src="getPictureUrl(slide.bottomId)" />
            <div v-else class="slide__bottom_description">
              {{ slide.description }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global ScrollMagic, TimelineMax */
/* eslint no-undef: "error" */
import { mapGetters } from 'vuex'

export default {
  props: {
    slides: {
      type: Array,
      default: () => {},
      require: true,
    },
    loadScrollMagicScriptTimes: {
      type: Number,
      default: 0,
    },
    triggerHook: {
      type: Number,
      default: 0.2,
    },
    toggleFull: {
      type: Function,
      default: () => {},
    },
  },

  data() {
    return {
      loadScriptTimes: 0,
      slidesObserver: null,
      nowId: 0,
      slideWidth: 0,
      slideId: 'a',
      hasSendGa: false,
    }
  },

  computed: {
    ...mapGetters('viewport', ['viewportWidth', 'viewportHeight']),
    slidesLength() {
      return this.slides?.length
    },
    cssProps() {
      const sideWidth = (this.viewportWidth - this.slideWidth) / 2
      return {
        '--count-slide': this.slidesLength,
        '--slide-width': `${this.slideWidth}px`,
        '--side-width': `${sideWidth}px`,
      }
    },
  },

  watch: {
    loadScrollMagicScriptTimes(times) {
      if (times !== 4) return
      const allWidth = this.slideWidth * this.slidesLength
      const controller = new ScrollMagic.Controller()
      let wipeAnimation = new TimelineMax()

      for (let i = 1; i < this.slidesLength; i++) {
        const x = `-${this.slideWidth * i}px`
        wipeAnimation = wipeAnimation.to(
          `.full-slide__container.${this.slideId}`,
          1,
          {
            x,
            delay: 3,
          }
        )
      }

      new ScrollMagic.Scene({
        triggerElement: `.full-slide.${this.slideId}`,
        triggerHook: 0.5,
        duration: `${allWidth}px`,
        offset: this.viewportHeight / 2,
      })
        .setPin(`.full-slide__pin.${this.slideId}`)
        .setTween(wipeAnimation)
        // .addIndicators() // add indicators (requires plugin)
        .addTo(controller)

      new ScrollMagic.Scene({
        triggerElement: `.full-slide.${this.slideId}`,
        triggerHook: this.triggerHook,
        duration: `${this.$refs.slide.clientHeight}px`,
      })
        .on('enter leave', this.handleEnterLeave)
        // .addIndicators() // add indicators (requires plugin)
        .addTo(controller)
    },
    viewportHeight(height) {
      this.getSlideWidth(height)
    },
  },

  mounted() {
    this.getSlideWidth(this.viewportHeight)
    this.slideId = this.slides[0]?.topId[0]
  },

  methods: {
    getPictureUrl(id) {
      try {
        const img = require(`~/assets/imgs/report/follow-rule/${id}.png`)
        return img
      } catch (e) {
        return ''
      }
    },
    handleEnterLeave(e) {
      if (e.type === 'enter' && !this.hasSendGa) {
        this.hasSendGa = true
        const idArray = ['b', 'c', 'a']
        const id = idArray.indexOf(this.slideId) + 1
        this.$ga.event('projects', 'click', `主互動區${id}`)
      }
      this.toggleFull(e.type)
    },
    getSlideWidth(height) {
      this.slideWidth =
        this.$refs.slide.clientWidth > height
          ? height
          : this.$refs.slide.clientWidth
    },
  },
}
</script>

<style lang="scss" scoped>
.full-slide {
  position: relative;
  background: #feeade;
  max-width: 712px;
  margin: 0 auto;
  overflow: hidden;

  &__pin {
    overflow: hidden;
  }

  &__container {
    display: flex;
    height: 100vh;
    align-items: center;
  }

  .slide {
    min-width: var(--slide-width);
    max-width: 712px;
    max-height: 100vh;
    &__top {
      max-height: 67vh;
    }
    &__bottom {
      height: 232px;
      max-height: 33vh;
      &_description {
        padding: 30px;
        border-top: 2px dashed #000;
        font-size: 14px;
        line-height: 30px;
        @include media-breakpoint-up(md) {
          font-size: 20px;
        }
      }
    }
  }
}
</style>
