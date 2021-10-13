<template>
  <div class="wrapper"></div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.wrapper {
  padding-top: 77px;
  margin: 0 auto;
  width: 90%;
  height: 220px;
  background-color: rgba(105, 105, 105, 0.233);
  @include media-breakpoint-up(md) {
    width: 700px;
  }
}
</style>
