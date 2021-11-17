<template>
  <div ref="cards" class="spacer" :style="cssProps">
    <div class="slide-card">
      <div class="slide-card__pin">
        <div class="slide-container">
          <section v-for="(card, i) in cards" :key="i" class="card">
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
import { mapGetters } from 'vuex'

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
      wrapperWidth: 600,
    }
  },
  computed: {
    ...mapGetters('viewport', ['viewportWidth', 'viewportHeight']),
    sideWidth() {
      return this.viewportWidth > 600 ? (this.viewportWidth - 600) / 2 : 20
    },
    allHeight() {
      return (
        this.sideWidth +
        this.cards.length * this.cardWithGap -
        this.gap +
        this.cardHeight / 2
      )
    },
    cardWithGap() {
      return this.cardWitdh + this.gap
    },
    cssProps() {
      const countCard = this.cards.length
      return {
        '--side-width': `${this.sideWidth}px`,
        '--count-card': countCard,
        '--all-width': `${this.allHeight - this.cardHeight / 2}px`,
        '--space-height': `${this.allHeight}px`,
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
      const controller = new ScrollMagic.Controller()
      let wipeAnimation = new TimelineMax()

      for (let i = 1; i < this.cards.length; i++) {
        const x =
          i === this.cards.length - 1
            ? `-${this.cardWithGap * i - this.wrapperWidth + this.cardWitdh}px`
            : `-${this.cardWithGap * i}px`
        wipeAnimation = wipeAnimation.to('.slide-container', 1, {
          x,
          delay: 1,
        })
      }
      new ScrollMagic.Scene({
        triggerElement: '.slide-card',
        triggerHook: 0.5,
        duration: `${this.allHeight - this.cardHeight}px`,
        offset: `${this.cardHeight / 2}px`,
      })
        .setPin('.slide-card__pin')
        .setTween(wipeAnimation)
        // .addIndicators() // add indicators (requires plugin)
        .addTo(controller)
      new ScrollMagic.Scene({
        triggerElement: '.slide-card',
        triggerHook: this.triggerHook,
        duration: `${this.allHeight}px`,
      })
        .on('enter leave', this.handleEnterLeave)
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
      this.toggleFull(e.type)
    },
  },
}
</script>

<style lang="scss" scoped>
.spacer {
  position: relative;
  height: var(--space-height);
  padding: 32px 0;
  max-width: 600px;
  margin: 0 auto;
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
