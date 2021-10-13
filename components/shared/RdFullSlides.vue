<template>
  <div class="slide-card" :style="cssProps">
    qweee
    <div class="slide-card__pin">
      <div class="slide-container">
        <section v-for="card in cards" :key="card" class="card">
          <img :src="getPictureUrl(card.pictureId)" />
        </section>
      </div>
    </div>
  </div>
</template>

<script>
/* global ScrollMagic, TimelineMax */
/* eslint no-undef: "error" */
export default {
  props: {
    cards: {
      type: Array,
      default: () => {},
      require: true,
    },
  },
  data() {
    return {
      loadScriptTimes: 0,
    }
  },
  head() {
    return {
      script: [
        {
          defer: true,
          src:
            'https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.8/ScrollMagic.min.js',
          callback: () => {
            this.loadScriptTimes++
            this.scrollSlide()
          },
        },
        {
          defer: true,
          src:
            'https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/plugins/animation.gsap.min.js',
          callback: () => {
            this.loadScriptTimes++
            this.scrollSlide()
          },
        },
        {
          defer: true,
          src:
            'https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/plugins/debug.addIndicators.min.js',
          callback: () => {
            this.loadScriptTimes++
            this.scrollSlide()
          },
        },
        {
          defer: true,
          src:
            'https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/TweenMax.min.js',
          callback: () => {
            this.loadScriptTimes++
            this.scrollSlide()
          },
        },
      ],
    }
  },
  methods: {
    scrollSlide() {
      if (this.loadScriptTimes < 4) return
      // 設定卡片斷點
      const allWidth = this.sideWidth + this.cards.length * 460 - 60
      const next = (460 / allWidth) * 100
      const controller = new ScrollMagic.Controller()

      // define movement of panels
      let wipeAnimation = new TimelineMax()

      for (let i = 1; i < this.cards.length; i++) {
        wipeAnimation = wipeAnimation.to('.slide-container', 1, {
          x: `-${next * i}%`,
          delay: 1,
        })
      }

      // create scene to pin and link animation
      new ScrollMagic.Scene({
        triggerElement: '.slide-card__pin',
        triggerHook: 0,
        duration: `370%`,
        offset: -(this.viweportHeight - 620),
      })
        .setPin('.slide-card__pin')
        .setTween(wipeAnimation)
        .addIndicators() // add indicators (requires plugin)
        .addTo(controller)
    },
    getPictureUrl(id) {
      const img = require(`~/assets/imgs/report/follow-rule/report-slide-${id}.png`)
      return img
    },
  },
  computed: {
    viweportWidth() {
      return this.$store.getters['viewport/viewportWidth']
    },
    viweportHeight() {
      return this.$store.getters['viewport/viewportHeight']
    },
    sideWidth() {
      return (this.viweportWidth - 600) / 2 > 0
        ? (this.viweportWidth - 600) / 2
        : 0
    },
    cssProps() {
      const countCard = this.cards.length
      return {
        '--side-width': `${this.sideWidth}px`,
        '--count-card': countCard,
        '--all-width': `${this.sideWidth + this.cards.length * 460 - 60}px`,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.slide-card {
  width: 100vw;
  position: absolute;
  left: calc(-1 * var(--side-width));
  display: flex;

  &__pin {
    width: 100vw;
    height: 600px;
    overflow: hidden;
    -webkit-perspective: 1000;
    perspective: 1000;
  }
}
.slide-container {
  width: var(--all-width);
  height: 600px;
}

.card {
  height: 600px;
  width: 400px; /* relative to parent -> 25% of 400% = 100% of window width */
  float: left;
  min-width: 400px;
  height: 600px;
  background: #ffffff;
  border: 0.5px solid #000000;
  padding: 24px;
  white-space: normal;
  overflow: auto;
  &:first-child {
    margin: 0 0 0 var(--side-width);
  }
  & + & {
    margin: 0 0 0 60px;
  }

  img {
    width: 380px;
    height: 380px;
  }
}
</style>
