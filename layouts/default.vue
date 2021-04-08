<template>
  <div class="default">
    <nuxt />

    <readr-footer
      id="default-footer"
      v-intersect="gaEventObserver"
      @aboutLinkClick="sendGaClickFooterEvent('aboutus')"
      @contactLinkClick="sendGaClickFooterEvent('contact')"
      @privacyLinkClick="sendGaClickFooterEvent('privacy')"
    />

    <ClientOnly>
      <RdGdpr v-if="shouldOpenGdpr" @cancel="closeGdpr" />
    </ClientOnly>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import rafThrottle from 'raf-throttle'

import RdGdpr from '~/components/shared/RdGdpr.vue'

import intersect from '~/components/helpers/directives/intersect.js'
import {
  setupIntersectionObserver,
  cleanupIntersectionObserver,
} from '~/components/helpers/index.js'

if (process.browser) {
  // eslint-disable-next-line no-var
  var {
    state: { isReadr2User, shouldOpenGdpr },
    closeGdpr,
  } = require('~/composition/store/local-storage.js')
}

export default {
  directives: {
    intersect,
  },

  components: {
    RdGdpr,
  },

  setup() {
    return {
      shouldOpenGdpr,
      closeGdpr,
    }
  },

  data() {
    return {
      gaEventObserver: undefined,
      canSendGaEventFooter: true,
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
    this.setupGaEventObserver()
  },

  beforeDestroy() {
    this.cleanupViewportListeners()
    this.cleanupGaEventObserver()
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

    async setupGaEventObserver() {
      this.gaEventObserver = await setupIntersectionObserver((entries) => {
        if (!this.canSendGaEventFooter) {
          return
        }

        entries.forEach(({ isIntersecting }) => {
          if (isIntersecting) {
            this.canSendGaEventFooter = false
            this.$ga.event('projects', 'scroll', 'scroll to footer')
            this.cleanupGaEventObserver()
          }
        })
      })
    },
    cleanupGaEventObserver() {
      cleanupIntersectionObserver(this, 'gaEventObserver')
    },
  },
}
</script>
