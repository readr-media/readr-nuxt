<template>
  <div class="star-rating">
    <div
      v-for="(val, idx) in total"
      :key="val"
      class="star"
      :class="{ selected: rating >= val }"
      @click="handleClickStar(val, idx)"
    >
      <SvgStarIcon class="star-icon" />

      <transition name="pulse" @after-enter="hidePulsedStar(idx)">
        <SvgStarIcon v-show="shouldShowPulsedStars[idx]" class="star-icon" />
      </transition>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from '@nuxtjs/composition-api'

import SvgStarIcon from '~/assets/star-icon.svg?inline'

export default {
  name: 'StarRating',
  components: {
    SvgStarIcon,
  },
  setup(props, { emit }) {
    const total = 5
    const rating = ref(0)

    const shouldShowPulsedStars = reactive(new Array(total).fill(false))

    function handleClickStar(val, idx) {
      setRating(val, idx)
      PulseStar(idx)
    }

    function setRating(val, idx) {
      rating.value = val

      emit('userGiveRating', rating.value)
    }

    function PulseStar(idx) {
      shouldShowPulsedStars.splice(idx, 1, true)
    }
    function hidePulsedStar(idx) {
      shouldShowPulsedStars.splice(idx, 1, false)
    }

    return {
      total,
      rating,
      handleClickStar,

      shouldShowPulsedStars,
      hidePulsedStar,
    }
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
