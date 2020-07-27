<template>
  <picture>
    <source :srcset="images.urlOriginal" :media="breakpointUp('lg')" />
    <source :srcset="images.urlDesktopSized" :media="breakpointUp('md')" />
    <source :srcset="images.urlTabletSized" :media="breakpointUp('sm')" />
    <img :src="images.urlMobileSized" alt="" />
  </picture>
</template>

<script>
import styleVariables from '~/scss/_variables.scss'

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
    breakpointUp(size) {
      const minWidth = styleVariables[`breakpoint-${size}`]
      return `(min-width: ${minWidth})`
    },
  },
}
</script>
