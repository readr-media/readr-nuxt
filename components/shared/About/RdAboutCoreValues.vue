<template>
  <section class="core-values">
    <div class="core-values__landing landing">
      <picture>
        <source
          srcset="~/assets/imgs/about/基本價值-web.svg"
          media="(min-width: 768px)"
        />
        <img
          class="landing__img"
          src="~/assets/imgs/about/基本價值-mobile.svg"
          alt="intro"
        />
      </picture>
    </div>
  </section>
</template>

<script>
export default {
  name: 'RdAboutCoreValues',
}
</script>

<style lang="scss" scoped>
.landing {
  display: flex;
  justify-content: center;
  padding: 0 10px;
  @include media-breakpoint-up(md) {
    padding: 0;
  }

  &__img {
    width: 90vw;
    position: relative;
    top: -10px;
    @include media-breakpoint-up(md) {
      width: 50vw;
    }
  }
}
</style>
