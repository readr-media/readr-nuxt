<template>
  <div ref="article" class="spacer" :style="cssProps">
    <div class="slide-card">
      <div class="slide-card__pin">
        <div class="slide-container">
          <section v-for="card in cards" :key="card.pictureId" class="card">
            <img :src="getPictureUrl(card.pictureId)" />
          </section>
        </div>
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
    processBarHeight: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      loadScriptTimes: 0,
      wrapperWidth: 600,
    }
  },
  computed: {
    viewportWidth() {
      return this.$store.getters['viewport/viewportWidth']
    },
    viewportHeight() {
      return this.$store.getters['viewport/viewportHeight']
    },
    sideWidth() {
      return this.viewportWidth > 600 ? (this.viewportWidth - 600) / 2 : 0
    },
    cssProps() {
      const countCard = this.cards.length
      const cardWithGap = this.cardWitdh + this.gap
      return {
        '--side-width': `${this.sideWidth}px`,
        '--count-card': countCard,
        '--all-width': `${
          this.sideWidth + this.cards.length * cardWithGap - this.gap
        }px`,
        '--space-height': `${
          this.sideWidth +
          this.cards.length * cardWithGap -
          this.gap +
          this.cardHeight
        }px`,
        '--card-width': `${this.cardWitdh}px`,
        '--card-height': `${this.cardHeight}px`,
        '--gap': `${this.gap}px`,
      }
    },
    cardWitdh() {
      if (this.wrapperWidth > 400) return 400
      return this.wrapperWidth
    },
    cardHeight() {
      return this.cardWitdh * 1.5
    },
    gap() {
      return this.cardWitdh * 0.15
    },
  },
  mounted() {
    this.wrapperWidth = this.$refs.article.clientWidth
  },
  methods: {
    scrollSlide() {
      if (this.loadScriptTimes !== 4) return
      const cardWithGap = this.cardWitdh + this.gap
      // 設定卡片斷點
      const allWidth =
        this.sideWidth + this.cards.length * cardWithGap - this.gap
      // const next = (460 / allWidth) * 100
      const controller = new ScrollMagic.Controller()
      let wipeAnimation = new TimelineMax()

      for (let i = 1; i < this.cards.length; i++) {
        const x =
          i === this.cards.length - 1
            ? `-${cardWithGap * i - this.wrapperWidth + this.cardWitdh}px`
            : `-${cardWithGap * i}px`
        wipeAnimation = wipeAnimation.to('.slide-container', 1, {
          x,
          delay: 1,
        })
      }

      new ScrollMagic.Scene({
        triggerElement: '.slide-card__pin',
        triggerHook: 0.5,
        duration: `${allWidth}px`,
        offset: `${(this.cardHeight - this.processBarHeight) / 2}px`,
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
}
</script>

<style lang="scss" scoped>
.spacer {
  position: relative;
  height: var(--space-height);
  overflow: hidden;
  // padding: 50px 0;
}
.slide-card {
  width: 100vw;
  position: absolute;
  left: calc(-1 * var(--side-width));
  // display: flex;

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
  height: var(--card-height);
}

.card {
  height: 100%;
  height: var(--card-height);
  width: var(--card-width);
  float: left;
  background: #ffffff;
  border: 0.5px solid #000000;
  padding: 24px;
  white-space: normal;
  overflow: auto;
  &:first-child {
    margin: 0 0 0 var(--side-width);
  }
  & + & {
    margin: 0 0 0 var(--gap);
  }

  img {
    width: 380px;
    height: 380px;
  }
}
</style>
