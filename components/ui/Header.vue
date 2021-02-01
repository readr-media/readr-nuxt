<template>
  <header>
    <UiReadrLogoOfHeader @sendGaEvt="$emit('sendGaEvt')" />
  </header>
</template>

<script>
export default {
  name: 'Header',
}
</script>

<style lang="scss" scoped>
header {
  background-color: #fff;
  padding-top: 9px;
  padding-bottom: 9px;
  ::v-deep svg {
    width: 48px;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
