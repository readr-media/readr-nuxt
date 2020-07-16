<template>
  <h1>
    <nuxt-link to="/">
      <SvgReadrLogo />
    </nuxt-link>
  </h1>
</template>

<script>
import SvgReadrLogo from '~/assets/readr-logo.svg?inline'

export default {
  name: 'ReadrLogoOfHeader',
  components: {
    SvgReadrLogo,
  },
}
</script>
