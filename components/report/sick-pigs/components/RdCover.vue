<template>
  <div class="cover">
    <div class="cover__wrapper">
      <RdCoverNews
        :contents="contents"
        :latestNews="latestNews"
        @to-news="handleToNews"
      />
      <div class="cover__description">{{ contents.description }}</div>
    </div>
  </div>
</template>

<script>
import RdCoverNews from './RdCoverNews.vue'

import intersect from '~/components/helpers/directives/intersect.js'

import {
  setupIntersectionObserver,
  cleanupIntersectionObserver,
} from '~/components/helpers/index.js'

export default {
  directives: {
    intersect,
  },
  components: {
    RdCoverNews,
  },
  props: {
    contents: {
      type: Object,
      default: () => {},
    },
    latestNews: {
      type: Object,
      default: () => {},
    },
    bookmarts: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      gaEventObserver: undefined,
    }
  },
  mounted() {
    this.setupGaEventObserver()
  },
  beforeDestroy() {
    this.cleanupGaEventObserver()
  },
  methods: {
    handleToNews() {
      this.$emit('to-news')
    },
    async setupGaEventObserver() {
      this.gaEventObserver = await setupIntersectionObserver((entries) => {
        entries.forEach(
          ({ intersectionRatio }) => {
            if (intersectionRatio) {
              this.$ga.event('projects', 'scroll', '滑到第一屏')
              this.cleanupGaEventObserver()
            }
          },
          { threshold: [0, 0.5, 1] }
        )
      })
    },
    cleanupGaEventObserver() {
      cleanupIntersectionObserver(this, 'gaEventObserver')
    },
  },
}
</script>

<style lang="scss" scoped>
.cover {
  padding: 24px 0 0 0;
  @include media-breakpoint-up(md) {
    padding: 60px 0 16px 0;
  }
  &__wrapper {
    max-width: 1120px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__description {
    padding: 24px 16px;
    font-size: 18px;
    line-height: 200%;
    width: 100%;
    color: #000928;
    @include media-breakpoint-up(md) {
      color: #333333;
      padding: 0 16px;
      margin-top: 24px;
    }
  }
}
</style>
