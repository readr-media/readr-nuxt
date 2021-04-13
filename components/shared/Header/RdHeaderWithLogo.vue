<template>
  <h1>
    <NuxtLink to="/" @click.native="$ga.event('header', 'click', 'logo')">
      <SvgReadrLogo />
    </NuxtLink>
  </h1>
</template>

<script>
import SvgReadrLogo from '~/assets/imgs/readr-logo.svg?inline'

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
