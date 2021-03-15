<template>
  <h1>
    <nuxt-link to="/" @click.native="$ga.event('header', 'click', 'logo')">
      <SvgReadrLogo />
    </nuxt-link>
  </h1>
</template>

<script>
import SvgReadrLogo from '~/assets/readr-logo.svg?inline'

export default {
  name: 'RdHeaderWithLogo',
  components: {
    SvgReadrLogo,
  },
}
</script>

<style lang="scss" scoped>
a {
  display: block;
}
</style>
