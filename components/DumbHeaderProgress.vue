<template>
  <header :class="{ hidden: doesScrollDown }">
    <div class="logo-wrapper">
      <DumbReadrLogoOfHeader />
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
import { ref, onMounted, onBeforeUnmount } from 'nuxt-composition-api'

import { viewportHeight } from '~/store/composition/viewport.js'
import { rAFWithDebounce } from '~/utils/index.js'

export default {
  name: 'DumbHeaderProgress',
  setup() {
    const percent = useProgress('post')
    const doesScrollDown = useScrollDirection()

    return {
      percent,
      doesScrollDown,
    }
  },
}

function useProgress(elemId) {
  const percent = ref(0)
  let elem

  onMounted(() => {
    elem = document.getElementById(elemId)

    window.addEventListener('scroll', calculateProgressPercent)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', calculateProgressPercent)
  })

  function calculateProgressPercent() {
    rAFWithDebounce(() => {
      const { bottom } = elem.getBoundingClientRect()
      const { pageYOffset } = window
      const elemBottomDistance = bottom + pageYOffset

      if (bottom - viewportHeight.value < 0) {
        percent.value = 100
        return
      }

      percent.value = Math.round(
        (pageYOffset / (elemBottomDistance - viewportHeight.value)) * 100
      )
    })
  }

  return percent
}

function useScrollDirection() {
  const doesScrollDown = ref(false)
  let beforeScrollHeight = 0

  onMounted(() => {
    window.addEventListener('scroll', detectScrollDirection)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', detectScrollDirection)
  })

  function detectScrollDirection() {
    const { pageYOffset: currentScrollHeight } = window
    const diffScrollHeight = currentScrollHeight - beforeScrollHeight
    doesScrollDown.value = diffScrollHeight >= 0

    beforeScrollHeight = currentScrollHeight
  }

  return doesScrollDown
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
  z-index: 999;
  &.hidden {
    transform: translateY(-62.63px);
  }
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
