<template>
  <div class="plus-icon">
    <span />
    <span />
  </div>
</template>

<script>
export default {
  name: 'RdPlusIcon',
}
</script>

<style lang="scss" scoped>
.plus-icon {
  position: relative;
  width: 16px;
  height: 16px;
  display: inline-block;
  @include media-breakpoint-up(md) {
    width: 20px;
    height: 20px;
  }
}
span {
  content: '';
  display: block;
  background-color: #000928;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  &:first-child {
    width: 100%;
    height: 4px;
  }
  &:last-child {
    width: 4px;
    height: 100%;
  }
}
</style>
