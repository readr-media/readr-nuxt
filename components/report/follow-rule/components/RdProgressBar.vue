<template>
  <div class="progress-bar" :style="cssProps" :class="{ hide: !shouldShowBar }">
    <div class="progress-bar__wrapper">
      <div class="animate">
        <RdStalkerAnimation
          :stalkerStatus="stalkerStatus"
          :location="stalkerLocation"
        />
        <RdTrackedAnimation
          v-show="isAnimateFinish < 2"
          :trackedStatus="trackedStatus"
          :location="trackedLocation"
          :isMobile="false"
        />
      </div>
      <div class="bar">
        <div class="bar__dot"></div>
        <div
          v-for="tag in tagsArray"
          :key="tag.id"
          class="bar__dot anchor"
          :class="{ anchor__light: isArrived(tag.id) }"
          @click="handleClick(tag.id)"
        >
          <div
            v-show="isScrollingUp"
            class="anchor__title"
            :class="{ light: isArrived(tag.id) }"
          >
            {{ tag.title }}
          </div>
        </div>
        <div class="bar__proccess">
          <div class="bar__proccess_finish"></div>
        </div>
      </div>
      <div class="title-space" :class="{ 'hide-title': !isScrollingUp }" />
    </div>
  </div>
</template>

<script>
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
    nowTagId: {
      type: Number,
      default: 1,
    },
    isScrollEnd: {
      type: Boolean,
      default: false,
    },
    isScrollingUp: {
      type: Boolean,
      default: true,
    },
    shouldShowBar: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      scale: 0.5,
      trackedLocation: 40,
      stalkerLocation: -50,
      stalkerCanIn: false,
      trackedStatus: 'stand',
      stalkerStatus: 'stand',
      stalkerId: 1,
      stalkerMoveId: 0,
      trackedMoveId: 0,
      isAnimateFinish: 0,
    }
  },
  computed: {
    countTags() {
      return this.tagsArray.length
    },
    firstMargin() {
      return this.minDistance - 18
    },
    spacing() {
      return (
        (712 - this.firstMargin - 18 * this.countTags) / (this.countTags - 1)
      )
    },
    cssProps() {
      return {
        '--spacing': `${this.spacing}px`,
        '--tracked-location': `${this.trackedLocation}px`,
        '--stalker-location': `${this.stalkerLocation}px`,
        '--scale': this.scale,
        '--first-margin': `${this.firstMargin}px`,
      }
    },
    distance() {
      return this.trackedLocation - this.stalkerLocation
    },
    minDistance() {
      return parseInt(77 * this.scale + 15)
    },
  },

  watch: {
    nowTagId(id) {
      const newLocation = this.firstMargin + 18 + (id - 1) * (this.spacing + 18)
      if (id > 1 && !this.stalkerCanIn) {
        this.stalkerCanIn = true
      }
      const speed = this.isAnimateFinish < 2 ? 10 : 5
      this.trackedMove(newLocation, 'moving', speed, () => {
        this.trackedStatus = 'stand'
        this.stalkerForword()
      })
    },
    distance(d) {
      if (d <= this.minDistance && this.trackedStatus === 'stand') {
        this.trackedStatus = 'afraid'
      }
      if (d === this.minDistance + 1) {
        if (this.trackedStatus !== 'moving') this.trackedStatus = 'stand'
      }
      if (d < this.minDistance - 1) {
        this.handleScroll()
      }
    },
    isScrollEnd() {
      this.endAnimate()
    },
  },
  mounted() {
    this.trackedLocation = this.minDistance
    window.addEventListener('scroll', this.throttle(this.handleScroll, 2000))
  },
  methods: {
    throttle(callback, limit) {
      let wait = false
      return function () {
        if (!wait) {
          callback()
          wait = true
          setTimeout(function () {
            wait = false
          }, limit)
        }
      }
    },
    handleClick(id) {
      this.$emit('scroll-to-section', id)
    },
    isArrived(id) {
      return (
        this.trackedLocation >
        this.minDistance + (id - 1) * (this.spacing + 18) - 9
      )
    },
    stalkerMove(destination, status, time, cb) {
      const CorrectionDestination = destination > 712 ? -50 : destination
      if (
        this.isAnimateFinish === 2 ||
        !this.stalkerCanIn ||
        this.stalkerLocation === parseInt(CorrectionDestination)
        // (this.stalkerStatus === 'back' && status === 'back') ||
        // (status === 'back' && this.stalkerLocation < 10 && !this.isScrollEnd)
      )
        return
      this.stalkerMoveId++
      const id = this.stalkerMoveId
      this.stalkerStatus = status
      const interval = setInterval(() => {
        if (id !== this.stalkerMoveId) clearInterval(interval)
        if (this.stalkerLocation === parseInt(CorrectionDestination)) {
          clearInterval(interval)
          cb()
        } else {
          this.stalkerLocation > parseInt(CorrectionDestination)
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
      if (this.isAnimateFinish === 2) return
      this.stalkerMove(
        this.trackedLocation - this.minDistance,
        'moving',
        100,
        () => {
          this.stalkerStatus = 'stand'
        }
      )
    },
    handleScroll() {
      if (this.isScrollEnd) return
      this.stalkerMove(0, 'back', 10, () => {
        this.stalkerForword()
      })
    },
    endAnimate() {
      this.trackedMove(800, 'moving', 10, () => {
        this.trackedStatus = 'stand'
        this.isAnimateFinish++
      })
      this.stalkerMove(-100, 'back', 10, () => {
        this.stalkerStatus = 'stand'
        this.isAnimateFinish++
      })
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
  padding: 15px 0 5px 0;
  margin-bottom: 40px;
  &__wrapper {
    width: 712px;
    margin: auto;
  }
}

.title-space {
  background: #feeade;
  height: 40px;
  width: 100%;
  position: absolute;
  bottom: -40px;
  left: 0;
}

.hide-title {
  opacity: 0;
  cursor: default;
  z-index: -100;
}

.animate {
  display: flex;
  position: relative;
  margin-bottom: 10px;
  width: 800px;
  overflow: hidden;

  & > div {
    width: calc(150px * 0.5 * var(--scale));
    height: calc(230px * 0.5 * var(--scale));
    transform: translate(-50%, 0);
  }
}

.bar {
  display: flex;
  position: relative;
  &__dot {
    min-width: 18px;
    height: 18px;
    background: #28ddb1;
    border-radius: 50%;
    z-index: 2;
  }
  &__proccess {
    height: 3px;
    width: 100%;
    background: rgba(111, 111, 111, 1);
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    display: flex;
    &_finish {
      height: 100%;
      width: var(--tracked-location);
      background: #28ddb1;
    }
  }
}

.anchor {
  margin-left: var(--first-margin);
  background: rgba(111, 111, 111, 1);
  & + & {
    margin-left: var(--spacing);
  }
  &__light {
    background: #28ddb1;
  }
  &__title {
    position: absolute;
    transform: translate(-50%, 0);
    top: 24px;
    font-size: 18px;
    line-height: 36px;
    letter-spacing: 0.01em;
    cursor: pointer;
  }
  .light {
    color: #28ddb1;
  }
}

.hide {
  opacity: 0;
  cursor: default;
  z-index: -100;
}
</style>
