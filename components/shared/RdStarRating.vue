<template>
  <div class="star-rating">
    <div
      v-for="(value, idx) in totalRating"
      :key="value"
      class="star"
      :class="{ selected: currentRating >= value }"
      @click="handleClickStar(value, idx)"
    >
      <SvgStarIcon class="star-icon" />

      <transition name="pulse" @after-enter="hidePulsedStar(idx)">
        <SvgStarIcon v-show="shouldShowPulsedStars[idx]" class="star-icon" />
      </transition>
    </div>
  </div>
</template>

<script>
import SvgStarIcon from '~/assets/imgs/star-icon.svg?inline'

export default {
  name: 'RdStarRating',

  components: {
    SvgStarIcon,
  },

  data() {
    const totalRating = 5

    return {
      totalRating,
      currentRating: 0,
      shouldShowPulsedStars: new Array(totalRating).fill(false),
    }
  },

  methods: {
    handleClickStar(value, idx) {
      this.setRating(value)
      this.PulseStar(idx)
    },
    setRating(value) {
      this.currentRating = value
      this.$emit('userGiveRating', this.currentRating)
    },
    PulseStar(idx) {
      this.shouldShowPulsedStars.splice(idx, 1, true)
    },
    hidePulsedStar(idx) {
      this.shouldShowPulsedStars.splice(idx, 1, false)
    },
  },
}
</script>

<style lang="scss" scoped>
.star-rating {
  display: flex;
  justify-content: space-between;
}

.star {
  position: relative;
  cursor: pointer;
  user-select: none;
  &.selected {
    animation: stretch-bounce 0.5s ease-in-out;
    .star-icon:first-child path {
      fill: #ffc107;
      fill-opacity: 1;
    }
  }
}

.star-icon:last-child {
  position: absolute;
  top: 0;
  left: 0;
  transform: scale(3);
  opacity: 0;
  &.pulse {
    &-enter-active {
      transition: transform 1s ease-out, opacity 1s ease-out;
      path {
        fill: #ffc107;
        fill-opacity: 1;
      }
    }
    &-enter {
      transform: scale(1);
      opacity: 1;
    }
  }
}

@keyframes stretch-bounce {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(1.5);
  }
  50% {
    transform: scale(0.9);
  }
  75% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
