<template>
  <div class="slide-card">
    <div id="pinContainer">
      <div id="slideContainer">
        <section class="panel blue">
          <b>ONE</b>
        </section>
        <section class="panel turqoise">
          <b>TWO</b>
        </section>
        <section class="panel green">
          <b>THREE</b>
        </section>
        <section class="panel bordeaux">
          <b>FOUR</b>
        </section>
      </div>
    </div>
    <div class="slide-card__container">
      <div class="sudo-card card"></div>
      <div v-for="card in cards" :key="card" class="card">
        <div class="card__title">{{ card.title }}</div>
        <img :src="getPictureUrl(card.pictureId)" />
        <div class="card__content">{{ card.content }}</div>
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
  methods: {
    scrollSlide() {
      if (this.loadScriptTimes < 4) return
      const controller = new ScrollMagic.Controller()

      // define movement of panels
      const wipeAnimation = new TimelineMax()
        // animate to second panel
        .to('#slideContainer', 0.5, { z: -150 }) // move back in 3D space
        .to('#slideContainer', 1, { x: '-25%' }) // move in to first panel
        .to('#slideContainer', 0.5, { z: 0 }) // move back to origin in 3D space
        // animate to third panel
        .to('#slideContainer', 0.5, { z: -150, delay: 1 })
        .to('#slideContainer', 1, { x: '-50%' })
        .to('#slideContainer', 0.5, { z: 0 })
        // animate to forth panel
        .to('#slideContainer', 0.5, { z: -150, delay: 1 })
        .to('#slideContainer', 1, { x: '-75%' })
        .to('#slideContainer', 0.5, { z: 0 })

      // create scene to pin and link animation
      new ScrollMagic.Scene({
        triggerElement: '#pinContainer',
        triggerHook: 'onLeave',
        duration: '500%',
      })
        .setPin('#pinContainer')
        .setTween(wipeAnimation)
        .addIndicators() // add indicators (requires plugin)
        .addTo(controller)
      /*
      const controller = new ScrollMagic.Controller()
      // define movement of panels
      const wipeAnimation = new TimelineMax()
        // animate to second panel
        .to('.slide-card__container', 0.5, { z: -150 }) // move back in 3D space
        .to('.slide-card__container', 1, { x: '-25%' }) // move in to first panel
        .to('.slide-card__container', 0.5, { z: 0 }) // move back to origin in 3D space
        // animate to third panel
        .to('.slide-card__container', 0.5, { z: -150, delay: 1 })
        .to('.slide-card__container', 1, { x: '-50%' })
        .to('.slide-card__container', 0.5, { z: 0 })
        // animate to forth panel
        .to('.slide-card__container', 0.5, { z: -150, delay: 1 })
        .to('.slide-card__container', 1, { x: '-75%' })
        .to('.slide-card__container', 0.5, { z: 0 })

      // create scene to pin and link animation
      new ScrollMagic.Scene({
        triggerElement: '.slide-card',
        triggerHook: 'onLeave',
        duration: '500%',
      })
        .setPin('.slide-card')
        .setTween(wipeAnimation)
        .addIndicators() // add indicators (requires plugin)
        .addTo(controller)
        */
    },
    getPictureUrl(id) {
      const img = require(`~/assets/imgs/report/follow-rule/report-slide-${id}.png`)
      return img
    },
  },
}
</script>

<style lang="scss" scoped>
#pinContainer {
  width: 100%;
  height: 100%;
  overflow: hidden;
  -webkit-perspective: 1000;
  perspective: 1000;
}
#slideContainer {
  width: 400%; /* to contain 4 panels, each with 100% of window width */
  height: 100%;
}
.panel {
  height: 100%;
  width: 100vw; /* relative to parent -> 25% of 400% = 100% of window width */
  float: left;
  height: 50vh;
}
.blue {
  background: blue;
}
.turqoise {
  background: red;
}

.slide-card {
  /*display: flex;
  width: 100vw;
  white-space: nowrap;
  overflow: hidden;
  transform: translate(calc((600px - 100vw) / 2), 0);
  */
  width: 100%;
  height: 100%;
  overflow: hidden;
  -webkit-perspective: 1000;
  perspective: 1000;

  &__container {
    width: 400%; /* to contain 4 panels, each with 100% of window width */
    height: 100%;
  }
}

.card {
  min-width: 400px;
  height: 600px;
  background: #ffffff;
  border: 0.5px solid #000000;
  padding: 24px;
  white-space: normal;
  overflow: auto;
  float: left;
  height: 100%;
  width: 25%;

  // & + .card {
  //   margin-left: 60px;
  // }

  img {
    width: 380px;
    height: 380px;
  }

  &__title {
    margin: 0 0 26px 0;
    font-weight: 600;
    font-size: 24px;
    line-height: 36px;
  }

  &__content {
    margin: 28px 0 0;
    font-size: 15px;
    line-height: 30px;
  }
}

.sudo-card {
  min-width: calc(((100vw - 600px) / 2));
}
</style>
