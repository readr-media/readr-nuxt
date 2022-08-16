<template>
  <div class="title-container">
    <div class="container__words words">
      <h1 class="words__title">做自己的新聞編輯台</h1>
      <p class="words__description">發覺那些被演算法淹沒的好報導</p>
    </div>
    <div class="container__download">
      <img
        src="~/assets/imgs/mesh/download-google.png"
        class="container__download--btn google"
        @click="handleClickGoogleBtn"
      />
      <img
        src="~/assets/imgs/mesh/download-apple.png"
        class="container__download--btn apple"
        @click="handleClickAppleBtn"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'MsLandingTitle',
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
.title-container {
  z-index: 100;
  position: relative;
  .words {
    color: #04295e;
    letter-spacing: 0.01em;

    &__title {
      font-size: 24px;
      line-height: 130%;
      text-align: center;
      @include media-breakpoint-up(md) {
        font-size: 60px;
      }
    }
    &__description {
      margin-top: 8px;
      color: rgba(0, 9, 40, 0.5);
      font-size: 16px;
      line-height: 24px;
      text-align: center;
      @include media-breakpoint-up(md) {
        font-size: 24px;
        line-height: 32px;
      }
      @include media-breakpoint-up(xl) {
        text-align: left;
      }
    }
  }

  .container__download {
    margin-top: 40px;
    margin-bottom: 60px;
    @include media-breakpoint-up(md) {
      display: flex;
      width: fit-content;
      margin: 40px auto;
    }
    @include media-breakpoint-up(xl) {
      margin: 40px 0;
    }
    &--btn {
      margin: 0 auto;
      width: fit-content;
      &:not(:first-child) {
        margin-top: 20px;
        @include media-breakpoint-up(md) {
          margin-top: 0;
          margin-left: 20px;
        }
      }
      &:hover {
        cursor: pointer;
      }
      &.google {
        width: 162.1px;
        @include media-breakpoint-up(md) {
          width: 202.63px;
        }
      }
      &.apple {
        width: 128.24px;
        @include media-breakpoint-up(md) {
          width: 160.29px;
        }
      }
    }
  }
}
</style>
