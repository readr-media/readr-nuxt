<template>
  <div class="progress-bar" :style="cssProps">
    <div class="progress-bar__mobile mobile">
      <div class="animate">
        <RdStalkerAnimation
          :stalkerStatus="stalkerStatus"
          :location="stalkerLocation"
        />
        <RdTrackedAnimation
          :trackedStatus="trackedStatus"
          :location="trackedLocation"
        />
      </div>
      <div v-show="isScrollingDown" class="mobile__title">
        <div v-for="(row, i) in tagsGroup" :key="i" class="mobile__title_row">
          <div v-for="tag in row" :key="tag.id" class="mobile__title_row_item">
            {{ tag.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import rafThrottle from 'raf-throttle'
import RdStalkerAnimation from './RdStalkerAnimation.vue'
import RdTrackedAnimation from './RdTrackedAnimation.vue'
export default {
  components: {
    RdStalkerAnimation,
    RdTrackedAnimation,
  },
  props: {
    tagsArray: {
      type: Array,
      require: true,
      default: () => [],
    },
    isScrollingDown: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      trackedLocation: 77,
      stalkerLocation: 0,
      trackedStatus: 'stand',
      stalkerStatus: 'stand',
      stalkerMoveId: 0,
      trackedMoveId: 0,
      target: null,
      percent: 0,
      hasFinishedReading: false,
    }
  },
  computed: {
    ...mapGetters('viewport', ['viewportHeight', 'viewportWidth']),
    cssProps() {
      return {
        '--spacing': `${this.spacing}px`,
        '--tracked-location': `${this.trackedLocation}px`,
        '--stalker-location': `${this.stalkerLocation}px`,
      }
    },
    distance() {
      return this.trackedLocation - this.stalkerLocation
    },
    tagsGroup() {
      return [this.tagsArray.slice(0, 3), this.tagsArray.slice(3, 6)]
    },
  },

  watch: {
    distance(d) {
      if (d <= 77 && this.trackedStatus === 'stand') {
        this.trackedStatus = 'afraid'
      }
      if (d === 78) {
        if (this.trackedStatus !== 'move') this.trackedStatus = 'stand'
      }
      if (d < 77) {
        this.handleScroll()
      }
    },
  },

  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },

  methods: {
    stalkerMove(destination, status, time, cb) {
      this.stalkerMoveId++
      const id = this.stalkerMoveId
      this.stalkerStatus = status
      const interval = setInterval(() => {
        if (id !== this.stalkerMoveId) clearInterval(interval)
        if (this.stalkerLocation === parseInt(destination)) {
          clearInterval(interval)
          cb()
        } else {
          this.stalkerLocation > parseInt(destination)
            ? this.stalkerLocation--
            : this.stalkerLocation++
        }
      }, time)
    },
    trackedMove(destination, status, time, cb) {
      this.trackedMoveId++
      const id = this.trackedMoveId
      this.trackedStatus = status
      const interval = setInterval(() => {
        if (id !== this.trackedMoveId) clearInterval(interval)
        if (this.trackedLocation === parseInt(destination)) {
          clearInterval(interval)
          cb()
        } else {
          this.trackedLocation > parseInt(destination)
            ? this.trackedLocation--
            : this.trackedLocation++
        }
      }, time)
    },
    stalkerForword() {
      this.stalkerMove(this.trackedLocation - 77, 'moving', 20, () => {
        this.stalkerStatus = 'stand'
      })
    },
    handleScroll() {
      this.stalkerMove(0, 'back', 10, () => {
        this.stalkerStatus = 'stand'
        this.stalkerForword()
      })
      rafThrottle(() => {
        if (!this.target) {
          this.target = document.getElementsByTagName('article')[0]
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

        const totalWidth = this.viewportWidth - 77
        const newLocation = Math.round(totalWidth * this.percent * 0.01) + 77
        this.trackedMove(newLocation, 'moving', 10, () => {
          this.trackedStatus = 'stand'
          this.stalkerForword()
        })
      })()
    },
  },
}
</script>

<style lang="scss" scoped>
.progress-bar {
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 20;
  background: #feeade;
  white-space: nowrap;
  &__wrapper {
    width: 712px;
    margin: auto;
  }
}

.animate {
  display: flex;
  position: relative;
  height: 90px;
  overflow: hidden;
  & > div {
    width: 52px;
    height: 79px;
    transform: translate(-50%, 0);
  }

  &::before {
    content: '';
    background: #28ddb1;
    height: 100%;
    width: var(--tracked-location);
    position: absolute;
  }
}

.mobile {
  color: rgba(255, 233, 214, 1);
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;

  &__title {
    background: #000000;
    padding: 11px 28px;
    &_row {
      display: flex;
      justify-content: space-between;
      &:not(:first-child) {
        margin-top: 11px;
      }
    }
  }
}
</style>
