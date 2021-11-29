<template>
  <div class="wrapper">
    <img
      v-if="isMobile"
      src="~/assets/imgs/report/follow-rule/cover_mobile.png"
    />
    <img v-else src="~/assets/imgs/report/follow-rule/cover.png" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    isMobile: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapGetters('viewport', ['viewportWidth']),
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  padding-top: 77px;
  margin: 0 auto;
  width: 90%;
  img {
    margin: 0 auto;
  }
}
</style>
