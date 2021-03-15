<template>
  <header>
    <div class="logo-wrapper">
      <RdHeaderWithLogo />
      <div class="progress-percent">
        閱讀進度<span>{{ percent }}%</span>
      </div>
    </div>
    <div class="progress-bar">
      <div :style="{ width: `${percent}%` }" />
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
import rafThrottle from 'raf-throttle'

import RdHeaderWithLogo from '~/components/shared/Header/RdHeaderWithLogo.vue'

export default {
  name: 'RdHeaderProgress',

  components: {
    RdHeaderWithLogo,
  },

  data() {
    return {
      target: undefined,
      percent: 0,
      hasFinishedReading: false,
    }
  },

  computed: {
    ...mapGetters('viewport', ['viewportHeight']),
  },

  watch: {
    hasFinishedReading(hasFinished) {
      if (hasFinished === true) {
        this.$emit('sendGaEvent')
      }
    },
  },

  mounted() {
    this.initProgress()
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.calculateProgress)
  },

  methods: {
    initProgress() {
      this.calculateProgress()
      window.addEventListener('scroll', this.calculateProgress)
    },
    calculateProgress() {
      rafThrottle(() => {
        if (!this.target) {
          this.target = document.getElementById('post')
        }

        const { bottom } = this.target.getBoundingClientRect()
        if (bottom - this.viewportHeight < 0) {
          this.percent = 100

          if (this.hasFinishedReading === false) {
            this.hasFinishedReading = true
          }
          return
        }

        const { pageYOffset } = window
        this.percent = Math.round(
          (pageYOffset / (bottom + pageYOffset - this.viewportHeight)) * 100
        )
      })()
    },
  },
}
</script>

<style lang="scss" scoped>
header {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  background-color: #fff;
  box-shadow: 0 0 2px rgba(#000, 0.15);
  transition: transform 0.3s;
  z-index: 499;

  ::v-deep svg {
    width: 48px;
  }
}
.logo-wrapper {
  padding: 9px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.progress-percent {
  color: rgba(#000, 0.87);
  font-size: 13px;
  line-height: 1.4;
  display: flex;
  align-items: center;
  span {
    font-size: 18px;
    line-height: 1.5;
    font-weight: 700;
    margin-left: 6px;
  }
}
.progress-bar {
  background-color: rgba(#d8d8d8, 0.5);
  div {
    transition: width 0.15s linear;
    height: 6px;
    background-image: linear-gradient(180deg, #ebf02c 0%, #cef3ee 497.8%);
  }
}
</style>
