<template>
  <div class="default">
    <nuxt />

    <RdFooter
      id="default-footer"
      class="default__footer"
      @sendGaEvent:about="sendGaClickFooterEvent('aboutus')"
      @sendGaEvent:contact="sendGaClickFooterEvent('contact')"
      @sendGaEvent:privacy="sendGaClickFooterEvent('privacy')"
    />

    <ClientOnly>
      <RdGdpr v-if="shouldOpenGdpr" @cancel="closeGdpr" />
    </ClientOnly>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import rafThrottle from 'raf-throttle'

import RdFooter from '~/components/shared/RdFooter.vue'
import RdGdpr from '~/components/shared/RdGdpr.vue'

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
    return {
      shouldOpenGdpr,
      closeGdpr,
    }
  },

  beforeMount() {
    this.initViewport()
  },

  mounted() {
    this.sendGaEvent(
      'users',
      'visit',
      `readr ${isReadr2User.value ? '2.0' : '3.0'}`
    )
  },

  beforeDestroy() {
    this.cleanupViewportListeners()
  },

  methods: {
    ...mapMutations('viewport', ['setViewport']),

    initViewport() {
      this.updateViewport()
      window.addEventListener('resize', this.updateViewport)
      window.addEventListener('orientationChange', this.updateViewport)
    },
    cleanupViewportListeners() {
      window.removeEventListener('resize', this.updateViewport)
      window.removeEventListener('orientationChange', this.updateViewport)
    },
    updateViewport() {
      rafThrottle(() => {
        const { innerWidth, innerHeight } = window
        this.setViewport({ width: innerWidth, height: innerHeight })
      })()
    },

    sendGaEvent(category, action, label, value) {
      this.$ga.event(category, action, label, value)
    },
    sendGaClickFooterEvent(label) {
      this.sendGaEvent('footer', 'click', label)
    },
  },
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
