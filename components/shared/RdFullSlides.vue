<template>
  <div class="full-slide" :style="cssProps" ref="slide">
    <div v-show="enterFull" class="mask left" />
    <div class="full-slide__pin" :class="{ 'on-the-top': enterFull }">
      <div class="full-slide__container">
        <div
          v-for="slide in slides"
          :id="slide.id"
          :key="slide.id"
          class="slide"
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
    <div v-show="enterFull" class="mask right" />
    <div v-show="enterFull" class="background" />
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
  },

  data() {
    return {
      loadScriptTimes: 0,
      enterFull: false,
      slidesObserver: null,
      nowId: 0,
      slideWidth: 0,
    }
  },

  computed: {
    ...mapGetters('viewport', ['viewportWidth', 'viewportHeight']),
    slidesLength() {
      return this.slides?.length
    },
    cssProps() {
      return {
        '--count-slide': this.slidesLength,
        '--slide-width': `${this.slideWidth}px`,
      }
    },
  },

  mounted() {
    this.slideWidth = this.$refs.slide.clientWidth
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
      this.enterFull = e.type === 'enter'
      console.log(this.enterFull)
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
        wipeAnimation = wipeAnimation.to('.full-slide__container', 1, {
          x,
          delay: 10,
        })
      }

      new ScrollMagic.Scene({
        triggerElement: '.full-slide',
        triggerHook: 0.5,
        duration: `${allWidth}px`,
        offset: this.viewportHeight / 2,
      })
        .setPin('.full-slide__pin')
        .setTween(wipeAnimation)
        .on('enter leave', this.handleEnterLeave)
        .addIndicators() // add indicators (requires plugin)
        .addTo(controller)
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

  &__container {
    display: flex;
    height: 100vh;
    align-items: center;
    z-index: 100;
  }

  .slide {
    min-width: var(--slide-width);
    max-width: 712px;
    z-index: 100;
    &__bottom {
      height: 232px;
      &_description {
        margin: 50px 20px;
        padding: 10px;
        border-top: 2px dashed #000;
        font-size: 20px;
        line-height: 30px;
      }
    }
  }

  .on-the-top {
    z-index: 100;
  }

  .background {
    background: #feeade;
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 30;
  }

  .mask {
    z-index: 25;
    background: #feeade;
    position: fixed;
    top: 0;
    left: 0;
    width: 500px;
    height: 100vh;
  }
}
</style>
