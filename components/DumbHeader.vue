<template>
  <header>
    <DumbReadrLogoOfHeader />
  </header>
</template>

<script>
export default {
  name: 'DumbHeader',
}
</script>

<style lang="scss" scoped>
header {
  padding-top: 9px;
  padding-bottom: 9px;
  ::v-deep svg {
    width: 48px;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
