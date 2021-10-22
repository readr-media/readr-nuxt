<template>
  <div class="full-slide" :style="cssProps">
    <!-- <div class="full-slide__pin">
      <div class="slide-container">

      </div>
    </div> -->
    <div id="trigger1" class="spacer s0">
      <div id="pin1" class="box2 blue">
        <section v-for="slide in slides" :key="slide.id" class="card">
          <img :src="getPictureUrl(slide.pictureId)" />
          {{ slide.description }}
        </section>
      </div>
    </div>
  </div>
</template>

<script>
/* global ScrollMagic */
/* eslint no-undef: "error" */
import { mapGetters } from 'vuex'
export default {
  props: {
    slides: {
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
  computed: {
    ...mapGetters('viewport', ['viewportWidth']),
  },
  methods: {
    getPictureUrl(id) {
      const img = require(`~/assets/imgs/report/follow-rule/report-slide-${id}.png`)
      return img
    },
    scrollSlide() {
      const controller = new ScrollMagic.Controller()
      // const viweportHeight = this.viewportWidth
      new ScrollMagic.Scene({
        triggerElement: '#trigger1',
        duration: 300,
      })
        .setPin('#pin1')
        .addIndicators({ name: '1 (duration: 300)' }) // add indicators (requires plugin)
        .addTo(controller)
      // show pin state
      // function updateBox(e) {
      //   if (e.type === 'enter') {
      //     document.getElementById('#pin1').text('Pinned.')
      //   } else {
      //     document.getElementById('#pin1').text('Unpinned.')
      //   }
      // }

      // build scenes
      // new ScrollMagic.Scene({
      //   triggerElement: '#trigger1',
      //   duration: viweportHeight,
      // })
      //   .setPin('#pin1')
      //   // .on('enter leave', updateBox)
      //   .addIndicators({ name: '1 (duration: 300)' }) // add indicators (requires plugin)
      //   .addTo(controller)

      // new ScrollMagic.Scene({
      //   triggerElement: '#trigger1',
      //   duration: viweportHeight,
      //   offset: viweportHeight,
      // })
      //   .setPin('#pin1')
      //   // .on('enter leave', updateBox)
      //   .addIndicators() // add indicators (requires plugin)
      //   .addTo(controller)
    },
  },
}
</script>

<style lang="scss" scoped>
.full-slide {
  height: 2000px;
}
</style>
