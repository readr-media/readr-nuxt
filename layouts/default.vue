<template>
  <div class="default">
    <nuxt />

    <ClientOnly v-if="shouldOpenFeedbackRedesign">
      <div class="feedback-wrapper">
        <FeedbackCollapsed
          class="default__feedback-collapsed"
          @close="closeFeedbackRedesign"
        />
      </div>
    </ClientOnly>

    <UiFooter
      id="default-footer"
      class="default__footer"
      @sendGaEvt:about="$sendGaEvtForFooterClick('aboutus')"
      @sendGaEvt:contact="$sendGaEvtForFooterClick('contact')"
      @sendGaEvt:privacy="$sendGaEvtForFooterClick('privacy')"
    />

    <ClientOnly>
      <TheGdpr v-if="shouldOpenGdpr" @cancel="closeGdpr" />
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

import { setViewport } from '~/composition/store/viewport.js'
import { rafWithDebounce } from '~/utils/index.js'

if (process.browser) {
  // eslint-disable-next-line no-var
  var {
    state: { isReadr2User, shouldOpenGdpr, shouldOpenFeedbackRedesign },
    closeGdpr,
    closeFeedbackRedesign,
  } = require('~/composition/store/local-storage.js')
}

export default {
  setup() {
    const { $sendGaEvtForUsersVisit } = useContext()

    useUpdateViewport()

    onMounted(() => {
      $sendGaEvtForUsersVisit(`readr ${isReadr2User.value ? '2.0' : '3.0'}`)
    })

    return {
      shouldOpenGdpr,
      closeGdpr,

      shouldOpenFeedbackRedesign,
      closeFeedbackRedesign,
    }
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
    rafWithDebounce(() => {
      const { clientWidth, clientHeight } = document.documentElement
      setViewport(clientWidth, clientHeight)
    })
  }
}
</script>

<style lang="scss">
.default {
  &__feedback-collapsed {
    box-shadow: 0 0 2px rgba(#000, 0.15);
    max-width: 320px;
    margin-left: auto;
    margin-right: auto;
    @include media-breakpoint-up(sm) {
      margin-left: 0;
      margin-right: 0;
    }
  }

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

.feedback-wrapper {
  position: fixed;
  width: 100%;
  bottom: 0;
  right: 0;
  z-index: 549;
  padding-left: 10px;
  padding-right: 10px;
  @include media-breakpoint-up(sm) {
    right: 34px;
    padding-left: 0;
    padding-right: 0;
    max-width: 320px;
  }
}
</style>
