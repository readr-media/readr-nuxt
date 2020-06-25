<template>
  <div class="default">
    <nuxt />

    <DumbFooter class="default__footer" />
  </div>
</template>

<script>
import { onBeforeMount, onBeforeUnmount } from 'nuxt-composition-api'

import { setViewport } from '~/utils/viewport.js'

export default {
  setup() {
    useUpdateViewport()
  },
}

function useUpdateViewport() {
  onBeforeMount(() => {
    updateViewport()

    window.addEventListener('resize', updateViewport)
    window.addEventListener('orientationChange', updateViewport)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('resize', updateViewport)
    window.removeEventListener('orientationChange', updateViewport)
  })

  function updateViewport() {
    const { clientWidth, clientHeight } = document.documentElement
    setViewport({
      width: clientWidth,
      height: clientHeight,
    })
  }
}
</script>

<style lang="scss">
html {
  font-family: Inter, 'Noto Sans CJK TC', sans-serif;
}
.default {
  &__footer {
    max-width: 1096px;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
