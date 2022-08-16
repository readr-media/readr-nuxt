<template>
  <div class="header">
    <img class="header__logo" src="~/assets/imgs/mesh/logo.svg" />
    <div class="header__right">
      <div class="header__right--button android" @click="handleClickGoogleBtn">
        Android 下載
      </div>
      <div class="header__right--button ios" @click="handleClickAppleBtn">
        iOS 下載
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MsHeader',
  methods: {
    handleClickGoogleBtn() {
      window.open(
        'https://play.google.com/store/apps/details?id=com.readr.news',
        '_blank'
      )
    },
    handleClickAppleBtn() {
      window.open(
        'https://apps.apple.com/tw/app/readr-mesh/id1596246729',
        '_blank'
      )
    },
  },
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
      transition: 0.6s;
      overflow: hidden;
      position: relative;
      @include media-breakpoint-up(md) {
        padding: 24px 40px;
        font-size: 24px;
        line-height: 32px;
      }
      @include media-breakpoint-up(xl) {
        padding: 24px 60px;
      }
      &:before {
        content: '';
        display: block;
        position: absolute;
        background: rgba(255, 255, 255, 0.5);
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        opacity: 0.5;
        filter: blur(30px);
        transform: translateX(-100px) skewX(-15deg);
      }
      &:after {
        content: '';
        display: block;
        position: absolute;
        background: rgba(255, 255, 255, 0.2);
        width: 100%;
        height: 100%;
        left: 30px;
        top: 0;
        opacity: 0;
        filter: blur(5px);
        transform: translateX(-100px) skewX(-15deg);
      }
      &:hover {
        cursor: pointer;
        cursor: pointer;
        &:before {
          transform: translateX(300px) skewX(-15deg);
          opacity: 0.6;
          transition: 0.7s;
        }
        &:after {
          transform: translateX(300px) skewX(-15deg);
          opacity: 1;
          transition: 0.7s;
        }
      }

      &.android {
        background: #ebf02c;
        color: #000928;
        &:hover {
          background: #000928;
          color: #ffffff;
        }
      }
      &.ios {
        background: #000928;
        color: #ffffff;
        &:hover {
          background: #ebf02c;
          color: #000928;
        }
      }
    }
  }
}
</style>
