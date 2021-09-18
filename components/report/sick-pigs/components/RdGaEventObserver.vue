<template>
  <div class="ga"></div>
</template>

<script>
import intersect from '~/components/helpers/directives/intersect.js'

import {
  setupIntersectionObserver,
  cleanupIntersectionObserver,
} from '~/components/helpers/index.js'

export default {
  directives: {
    intersect,
  },
  props: {
    label: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      gaEventObserver: undefined,
    }
  },
  mounted() {
    this.setupGaEventObserver()
  },
  beforeDestroy() {
    this.cleanupGaEventObserver()
  },
  methods: {
    async setupGaEventObserver() {
      console.log('into the function')
      this.gaEventObserver = await setupIntersectionObserver((entries) => {
        console.log(entries)
        entries.forEach(({ isIntersecting }) => {
          if (isIntersecting) {
            this.$ga.event('projects', 'scroll', this.label)
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
