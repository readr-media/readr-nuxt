<template>
  <div class="default">
    <nuxt />

    <RdFooter
      id="default-footer"
      class="default__footer"
      @sendGaEvent:about="$sendGaEventForFooterClick('aboutus')"
      @sendGaEvent:contact="$sendGaEventForFooterClick('contact')"
      @sendGaEvent:privacy="$sendGaEventForFooterClick('privacy')"
    />

    <ClientOnly>
      <RdGdpr v-if="shouldOpenGdpr" @cancel="closeGdpr" />
    </ClientOnly>
  </div>
</template>

<script>
import {
  onBeforeMount,
  onMounted,
  onBeforeUnmount,
  useContext,
} from '@nuxtjs/composition-api'
import rafThrottle from 'raf-throttle'

import RdFooter from '~/components/shared/RdFooter.vue'
import RdGdpr from '~/components/shared/RdGdpr.vue'

import { setViewport } from '~/composition/store/viewport.js'

if (process.browser) {
  // eslint-disable-next-line no-var
  var {
    state: { isReadr2User, shouldOpenGdpr },
    closeGdpr,
  } = require('~/composition/store/local-storage.js')
}

export default {
  components: {
    RdFooter,
    RdGdpr,
  },

  setup() {
    const { $sendGaEventForUsersVisit } = useContext()

    useUpdateViewport()

    onMounted(() => {
      $sendGaEventForUsersVisit(`readr ${isReadr2User.value ? '2.0' : '3.0'}`)
    })

    return {
      shouldOpenGdpr,
      closeGdpr,
    }
  },
}

function useUpdateViewport() {
  const updateViewportThrottle = rafThrottle(updateViewport)
  onBeforeMount(() => {
    updateViewport()

    window.addEventListener('resize', updateViewportThrottle)
    window.addEventListener('orientationChange', updateViewportThrottle)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('resize', updateViewportThrottle)
    window.removeEventListener('orientationChange', updateViewportThrottle)
  })

  function updateViewport() {
    const { clientWidth, clientHeight } = document.documentElement
    setViewport(clientWidth, clientHeight)
  }
}
</script>

<style lang="scss">
.default {
  &__footer {
    max-width: 1096px;
    margin-left: auto;
    margin-right: auto;
    @include media-breakpoint-up(md) {
      padding-left: 20px;
      padding-right: 20px;
    }
    // 1136 = 1096 + 20 * 2
    @media (min-width: 1136px) {
      padding-left: 0;
      padding-right: 0;
    }
  }
}
</style>
