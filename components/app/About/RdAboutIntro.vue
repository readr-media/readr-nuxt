<template>
  <section class="intro">
    <div class="intro__landing landing">
      <picture>
        <source
          srcset="~/assets/imgs/about/關於我們-web.svg"
          media="(min-width: 768px)"
        />
        <img
          class="landing__img"
          src="~/assets/imgs/about/關於我們-mobile.svg"
          alt="intro"
        />
      </picture>
    </div>

    <footer class="intro__footer footer">
      <p class="footer__description description">
        <span>
          提供有趣、多元的新聞報導，例如
        </span>
        <span class="description__highlight">
          資料分析
        </span>
        <span>
          、
        </span>
        <span class="description__highlight">
          多媒體互動
        </span>
        <span>
          ，
        </span>
        <span class="description__highlight">
          理想的閱讀體驗
        </span>
        <span>
          都會是我們提供的服務
        </span>
      </p>
    </footer>
  </section>
</template>

<script>
export default {
  name: 'RdAboutIntro',
}
</script>

<style lang="scss" scoped>
.landing {
  background-color: #69cad3;
  padding: 50px 10px;
  @include media-breakpoint-up(md) {
    padding: 50px 100px;
  }
}

.footer {
  background-color: #363c5c;
  display: flex;
  justify-content: center;
  padding: 20px 10px;
  @include media-breakpoint-up(md) {
    height: 100px;
    padding: 20px 0 50px 0;
  }
}

.description {
  color: #fff;
  font-size: 16px;
  line-height: 1.5;
  text-align: justify;
  @include media-breakpoint-up(lg) {
    font-size: 20px;
  }

  &__highlight {
    color: #ddd01f;
  }
}
</style>
