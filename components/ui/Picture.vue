<template>
  <picture>
    <source :srcset="getImage()" :media="breakpointUp('lg')" />
    <source :srcset="getImage('urlDesktopSized')" :media="breakpointUp('md')" />
    <source :srcset="getImage('urlTabletSized')" :media="breakpointUp('sm')" />
    <img :src="getImage('urlMobileSized')" alt="" />
  </picture>
</template>

<script>
import styleVariables from '~/scss/_variables.scss'

import defaultImage from '~/assets/og-img.jpg'

export default {
  name: 'Picture',
  props: {
    images: {
      type: Object,
      required: true,
      default: () => ({
        urlOriginal: '',
        urlDesktopSized: '',
        urlTabletSized: '',
        urlMobileSized: '',
      }),
    },
  },
  methods: {
    getImage(sized = 'urlOriginal') {
      return this.images?.[sized] || defaultImage
    },
    breakpointUp(size) {
      const minWidth = styleVariables[`breakpoint-${size}`]
      return `(min-width: ${minWidth})`
    },
  },
}
</script>
