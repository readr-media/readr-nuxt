<template>
  <div class="default">
    <nuxt />
    <readr-footer
      id="default-footer"
      @aboutLinkClick="sendGaClickFooterEvent('aboutus')"
      @contactLinkClick="sendGaClickFooterEvent('contact')"
      @privacyLinkClick="sendGaClickFooterEvent('privacy')"
    />

    <RdGdpr />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import rafThrottle from 'raf-throttle'

import RdGdpr from '~/components/app/RdGdpr.vue'

export default {
  components: {
    RdGdpr,
  },

  computed: {
    ...mapState({
      isReadr2User: (state) => state.user.isReadr2,
    }),
  },

  beforeMount() {
    this.initViewport()
  },

  mounted() {
    this.sendGaEvent(
      'users',
      'visit',
      `readr ${this.isReadr2User ? '2.0' : '3.0'}`
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
