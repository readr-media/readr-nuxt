<template>
  <div ref="cards" class="spacer" :style="cssProps">
    <div class="slide-card" :class="{ enterFull: enterFull }">
      <div class="slide-card__pin">
        <div class="slide-container">
          <section v-for="(card, i) in cards" :key="i" class="card">
            <img :src="getPictureUrl(card.pictureId)" />
          </section>
        </div>
      </div>
    </div>
    <div v-show="enterFull" class="background" />
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
    loadScrollMagicScriptTimes: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      loadScriptTimes: 0,
      wrapperWidth: 600,
      enterFull: false,
    }
  },
  computed: {
    progressBarHeight() {
      return this.viewportWidth > 768 ? 100 : 60
    },
    viewportWidth() {
      return this.$store.getters['viewport/viewportWidth']
    },
    viewportHeight() {
      return this.$store.getters['viewport/viewportHeight']
    },
    sideWidth() {
      return this.viewportWidth > 600 ? (this.viewportWidth - 600) / 2 : 20
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
          0.5 * this.viewportHeight +
          (this.cardHeight - this.progressBarHeight) / 2
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
  watch: {
    loadScrollMagicScriptTimes(times) {
      if (times !== 4) return
      const cardWithGap = this.cardWitdh + this.gap
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
        triggerElement: '.slide-card',
        triggerHook: 0.5,
        duration: `${allWidth}px`,
        // offset: `${(this.cardHeight - this.progressBarHeight) / 2}px`,
        offset: `${this.cardHeight / 2}px`,
      })
        .setPin('.slide-card__pin')
        .setTween(wipeAnimation)
        .on('enter leave', (e) => this.handleEnterLeave(e))
        // .addIndicators() // add indicators (requires plugin)
        .addTo(controller)
    },
  },
  mounted() {
    this.wrapperWidth = this.$refs.cards.clientWidth
  },
  methods: {
    getPictureUrl(id) {
      const img = require(`~/assets/imgs/report/follow-rule/report-slide-${id}.png`)
      return img
    },
    handleEnterLeave(e) {
      this.enterFull = e.type === 'enter'
    },
  },
}
</script>

<style lang="scss" scoped>
.spacer {
  position: relative;
  height: var(--space-height);
  padding-top: 32px;
  max-width: 600px;
  margin: 0 auto;
}
.enterFull {
  z-index: 50;
}
.slide-card {
  position: absolute;
  width: 100vw;
  left: -20px;
  // display: flex;
  @include media-breakpoint-up(md) {
    left: calc(-1 * var(--side-width));
  }
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

.background {
  background: #feeade;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 30;
}
</style>
