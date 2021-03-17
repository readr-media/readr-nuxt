<template>
  <header>
    <RdHeaderWithLogo />
  </header>
</template>

<script>
import RdHeaderWithLogo from '~/components/shared/Header/RdHeaderWithLogo.vue'

export default {
  name: 'RdHeader',

  components: {
    RdHeaderWithLogo,
  },
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
