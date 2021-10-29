<template>
  <div class="progress-bar" :style="cssProps">
    <div class="progress-bar__wrapper">
      <div class="animate">
        <RdStalkerAnimation
          v-if="nowTagId !== '1'"
          :stalkerStatus="stalkerStatus"
          :location="stalkerLocation"
        />
        <RdTrackedAnimation
          :trackedStatus="trackedStatus"
          :location="trackedLocation"
        />
      </div>
      <div class="bar">
        <div class="bar__dot"></div>
        <div
          v-for="tag in tagsArray"
          :key="tag.id"
          class="bar__dot anchor"
          :class="{ anchor__light: isArrived(tag.id) }"
        >
          <div class="anchor__title" :class="{ light: isArrived(tag.id) }">
            {{ tag.title }}
          </div>
        </div>
        <div class="bar__proccess">
          <div class="bar__proccess_finish"></div>
        </div>
      </div>
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
  },

  data() {
    return {
      trackedLocation: 77,
      stalkerLocation: 0,
      mobileTrackedLocation: 77,
      trackedStatus: 'stand',
      stalkerStatus: 'stand',
      stalkerId: 1,
      stalkerMoveId: 0,
      trackedMoveId: 0,
      isAnimateFinishTime: 0,
    }
  },
  computed: {
    countTags() {
      return this.tagsArray.length
    },
    spacing() {
      return (712 - 50 - 18 * (this.countTags + 1)) / (this.countTags - 1)
    },
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
  },

  watch: {
    nowTagId(id) {
      const newLocation = 77 + (parseInt(id) - 1) * (this.spacing + 18)
      console.log(id)
      this.trackedMove(newLocation, 'moving', 10, () => {
        this.trackedStatus = 'stand'
        this.stalkerForword()
      })
    },
    distance(d) {
      if (d <= 77 && this.trackedStatus === 'stand') {
        this.trackedStatus = 'afraid'
      }
      if (d === 78) {
        if (this.trackedStatus !== 'moving') this.trackedStatus = 'stand'
      }
      if (d < 77) {
        this.handleScroll()
      }
    },
    isScrollEnd() {
      this.endAnimate()
    },
  },
  mounted() {
    console.log(this.nowTagId)
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    isArrived(id) {
      return this.trackedLocation > 77 + (id - 1) * (this.spacing + 18) - 9
    },
    stalkerMove(destination, status, time, cb) {
      if (this.isAnimateFinishTime === 2) return
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
      if (this.isAnimateFinishTime === 2) return
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
      if (this.isAnimateFinishTime === 2) return
      this.stalkerMove(this.trackedLocation - 77, 'moving', 100, () => {
        this.stalkerStatus = 'stand'
      })
    },
    handleScroll() {
      if (this.isAnimateFinishTime === 2) return
      this.stalkerMove(0, 'back', 10, () => {
        this.stalkerStatus = 'stand'
        this.stalkerForword()
      })
    },
    endAnimate() {
      this.stalkerMove(-77, 'back', 10, () => {
        console.log('hohohoho')
        this.stalkerStatus = 'stand'
        this.isAnimateFinishTime++
      })
      this.trackedMove(800, 'moving', 10, () => {
        this.trackedStatus = 'stand'
        this.isAnimateFinishTime++
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
  padding: 30px 0 70px 0;
  &__wrapper {
    width: 712px;
    margin: auto;
  }
}

.animate {
  display: flex;
  position: relative;
  margin-bottom: 10px;
  overflow: hidden;
  height: 90px;
  & > div {
    width: 52px;
    height: 79px;
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
  margin-left: 50px;
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
    top: 32px;
    font-size: 18px;
    line-height: 36px;
    letter-spacing: 0.01em;
  }
  .light {
    color: #28ddb1;
  }
}
</style>
