<template>
  <header>
    <h1>
      <nuxt-link to="/">
        <DumbReadrLogo />
      </nuxt-link>
    </h1>
  </header>
</template>

<script>
export default {
  name: 'DumbHeader',
}
</script>

<style lang="scss" scoped>
header {
  background-color: #fff;
  padding-top: 9px;
  padding-bottom: 9px;
  svg {
    width: 48px;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
