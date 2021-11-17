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
  // height: 220px;
  // background-color: rgba(105, 105, 105, 0.233);
  // @include media-breakpoint-up(md) {
  //   width: 700px;
  // }
}
</style>
