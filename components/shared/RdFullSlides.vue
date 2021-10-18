<template>
  <div class="full-slide" :style="cssProps">
    <div
      v-for="slide in slides"
      :id="slide.id"
      :key="slide.id"
      v-intersect="slidesObserver"
      class="slide"
    >
      <img :src="getPictureUrl(slide.pictureId)" />
      {{ slide.description }}
    </div>
    <div v-show="nowId" class="full-slide__cover">
      <div class="inner">
        <div
          v-for="slide in slides"
          v-show="slide.id === nowId"
          :key="slide.id"
          class="full-slide__cover_item"
        >
          <img :src="getPictureUrl(slide.pictureId)" />
          <div>{{ slide.description }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { intersect } from '~/helpers/vue/directives/index.js'
import {
  setupIntersectionObserver,
  cleanupIntersectionObserver,
} from '~/helpers/index.js'

export default {
  directives: {
    intersect,
  },
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
      enterFull: false,
      slidesObserver: null,
      nowId: 0,
    }
  },
  computed: {
    ...mapGetters('viewport', ['viewportWidth']),
    slidesLength() {
      return this.slides?.length
    },
    cssProps() {
      return {
        '--count-slide': this.slidesLength,
      }
    },
  },
  mounted() {
    this.setupSlidesObserver()
  },
  beforeDestroy() {
    cleanupIntersectionObserver(this, 'slidesObserver')
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
    async setupSlidesObserver() {
      this.slidesObserver = await setupIntersectionObserver(
        (entries) => {
          this.nowId = 0
          entries.forEach(({ isIntersecting, target }) => {
            if (isIntersecting) {
              this.nowId = target.id
            }
          })
        },
        {
          threshold: 0.5,
        }
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.full-slide {
  height: calc(var(--count-slide) * 100vh);
  .slide {
    height: 100vh;
  }
  &__cover {
    width: 100vw;
    height: 100vh;
    z-index: 100;
    background: rgba(254, 234, 223, 1);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .inner {
      max-width: 712px;
    }
    &_item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      div {
        padding-top: 24px;
        border-top: 2px dashed;
        text-align: center;
      }
    }
  }
}
</style>
