<template>
  <readr-header @readrLogoLinkClick="$emit('sendGaEvt')" />
</template>

<script>
export default {
  name: 'Header',
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
