<template>
  <div class="container">
    <div class="container__words words">
      <h1 class="words__title">做自己的新聞編輯台</h1>
      <p class="words__description">發覺那些被演算法淹沒的好報導</p>
    </div>
    <div class="container__download">
      <img
        src="~/assets/imgs/mesh/download-google.png"
        class="container__download--btn"
      />
      <img
        src="~/assets/imgs/mesh/download-apple.png"
        class="container__download--btn"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'MsLandingTitle',
}
</script>

<style lang="scss" scoped>
.container {
  .words {
    color: #04295e;
    letter-spacing: 0.01em;
    text-align: center;
    &__title {
      font-size: 24px;
      line-height: 130%;
      @include media-breakpoint-up(md) {
        font-size: 60px;
      }
    }
    &__description {
      margin-top: 8px;
      color: rgba(0, 9, 40, 0.5);
      font-size: 16px;
      line-height: 24px;
      @include media-breakpoint-up(md) {
        font-size: 24px;
        line-height: 32px;
      }
    }
  }

  &__download {
    margin-top: 40px;
    margin-bottom: 60px;
    @include media-breakpoint-up(md) {
      display: flex;
      width: fit-content;
      margin: 40px auto;
    }
    &--btn {
      margin: 0 auto;
      width: fit-content;
      transform: scale(0.8);
      @include media-breakpoint-up(md) {
        transform: scale(1);
      }
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
    }
  }
}
</style>
