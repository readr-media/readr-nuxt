<template>
  <header>
    <UiReadrLogoOfHeader @sendGaEvt="$emit('sendGaEvt:logo')" />
    <a href="/donate" target="_blank" @click="$emit('sendGaEvt:donate')"
      >贊助我們</a
    >
  </header>
</template>

<script>
export default {
  name: 'Header',
}
</script>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 9px 20px;
  letter-spacing: 2.5px;
  color: #000928;
  font-size: 15px;
  font-weight: 700;
  line-height: 1.5;
  @include media-breakpoint-up(md) {
    padding-left: 26px;
    padding-right: 26px;
    font-size: 18px;
  }
  ::v-deep svg {
    width: 48px;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
