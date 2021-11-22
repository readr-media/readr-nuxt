<template>
  <div class="wrapper">
    <img src="~/assets/imgs/report/follow-rule/cover.png" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
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
