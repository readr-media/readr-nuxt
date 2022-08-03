<template>
  <div class="header">
    <img class="header__logo" src="~/assets/imgs/mesh/logo.svg" />
    <div class="header__right">
      <div class="header__right--button android">Android 下載</div>
      <div class="header__right--button ios">iOS 下載</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MsHeader',
}
</script>

<style lang="scss" scoped>
.header {
  background: #fff;
  display: flex;
  padding-left: 20px;
  align-items: center;
  justify-content: space-between;
  @include media-breakpoint-up(md) {
    padding-left: 40px;
  }
  @include media-breakpoint-up(xl) {
    padding-left: 60px;
  }

  &__logo {
    width: 80px;
    @include media-breakpoint-up(md) {
      width: 100px;
    }
  }

  &__right {
    display: flex;
    &--button {
      font-size: 16px;
      line-height: 24px;
      text-align: center;
      letter-spacing: 0.01em;
      padding: 20px 12px;
      @include media-breakpoint-up(md) {
        padding: 24px 40px;
        font-size: 24px;
        line-height: 32px;
      }
      @include media-breakpoint-up(xl) {
        padding: 24px 60px;
      }

      &.android {
        background: #ebf02c;
        color: #000928;
      }
      &.ios {
        background: #000928;
        color: #ffffff;
      }
    }
  }
}
</style>
