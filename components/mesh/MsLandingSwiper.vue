<template>
  <div class="slides__wrapper">
    <div class="slides__image image">
      <div class="slides__image--background" />
      <div class="slides__image--wrapper" :style="imageCssProps">
        <div
          v-for="(slide, index) in slides"
          :key="index"
          class="slides__image--item"
        >
          <img
            :src="require(`../../assets/imgs/mesh/preview_${index + 1}.png`)"
          />
        </div>
      </div>
      <div class="slides__image--pagination pagination">
        <div
          v-for="(slide, index) in slides"
          :key="index"
          class="pagination__dot"
          :class="{ active: index === currentSlide }"
          @click="setSlide(index)"
        />
      </div>
    </div>
    <div class="slides__desc desc">
      <img
        :src="require(`../../assets/imgs/mesh/arrow.svg`)"
        class="slides__desc--arrow left"
        @click="addCurrentSlide(-1)"
      />
      <img
        :src="require(`../../assets/imgs/mesh/arrow.svg`)"
        class="slides__desc--arrow right"
        @click="addCurrentSlide(1)"
      />
      <div class="slides__desc--wrapper" :style="descCssProps">
        <div
          v-for="(slide, index) in slides"
          :key="index"
          class="slides__desc--item"
        >
          <img :src="require(`../../assets/imgs/mesh/Icon_${index + 1}.svg`)" />
          <section>
            <h2 class="title">{{ slide.title }}</h2>
            <p class="subtitle">{{ slide.subtitle }}</p>
          </section>
        </div>
      </div>
      <div class="slides__desc--pagination pagination">
        <div
          v-for="(slide, index) in slides"
          :key="index"
          class="pagination__dot"
          :class="{ active: index === currentSlide }"
          @click="setSlide(index)"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MsLandingSwiper',
  data() {
    return {
      slides: [
        {
          title: '朋友推哪篇新聞',
          subtitle: '工人智慧挑的更有感',
        },
        {
          title: '精選喜愛的報導',
          subtitle: '這篇不能只有我看到',
        },
        {
          title: '一站式閱讀新聞',
          subtitle: '你只需要這個新聞 app',
        },
        {
          title: '隨時來點討論吧',
          subtitle: '看看大家都在想什麼',
        },
        {
          title: '集錦功能好分類',
          subtitle: '輕鬆製作自己的懶人包',
        },
      ],
      currentSlide: 0,
    }
  },
  computed: {
    slidesLength() {
      return this.slides?.length || 1
    },
    imageCssProps() {
      return {
        '--translateY': `-${this.currentSlide * 100}%`,
      }
    },
    descCssProps() {
      return {
        '--translateX': `-${this.currentSlide * 100}%`,
      }
    },
  },
  mounted() {
    setInterval(this.autoChangeSlide, 3000)
  },
  methods: {
    autoChangeSlide() {
      this.currentSlide++
      if (this.currentSlide > this.slidesLength - 1) {
        this.currentSlide = 0
      }
    },
    addCurrentSlide(value) {
      this.currentSlide += value
      if (this.currentSlide > this.slidesLength - 1) {
        this.currentSlide = 0
      } else if (this.currentSlide < 0) {
        this.currentSlide = this.slidesLength - 1
      }
    },
    setSlide(value) {
      this.currentSlide = value
    },
  },
}
</script>

<style lang="scss" scoped>
.slides {
  &__wrapper {
    @include media-breakpoint-up(xl) {
      display: flex;
    }
  }

  &__image {
    display: flex;
    overflow: hidden;
    position: relative;
    @include media-breakpoint-up(xl) {
      width: 50%;
    }
    .pagination {
      width: 120px;
      background: #007aff;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      @include media-breakpoint-up(xl) {
        display: none;
      }
      &__dot {
        width: 12px;
        height: 12px;
        background: #fff;
        border-radius: 50%;
        &:not(:first-child) {
          margin-top: 20px;
        }
        &:hover {
          cursor: pointer;
        }
        &.active {
          background: #ebf02c;
        }
      }
    }
    &--background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: url('../../assets/imgs/mesh/preview-background.svg');
      background-size: cover;
      background-color: #ebf02c;
      @include media-breakpoint-up(xl) {
        width: 100%;
        height: 758px;
      }
    }
    &--wrapper {
      flex: 1;
      transition: transform 0.5s ease-in-out;
      height: calc((100vw - 120px) * 1.3);
      transform: translateY(var(--translateY));
      @include media-breakpoint-up(md) {
        height: calc((100vw - 120px) * 1.04);
      }
      @include media-breakpoint-up(xl) {
        height: 758px;
      }
    }
    &--item {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: calc((100vw - 120px) * 1.3);
      overflow: hidden;
      @include media-breakpoint-up(md) {
        height: calc((100vw - 120px) * 1.04);
      }
      @include media-breakpoint-up(xl) {
        height: 758px;
      }
      img {
        z-index: 5;
        position: relative;
        max-height: calc(100% - 40px);
        @include media-breakpoint-up(md) {
          max-height: calc(100vw - 80px);
        }
        @include media-breakpoint-up(xl) {
          max-height: calc(100vw - 160px);
        }
      }
    }
  }
  &__desc {
    display: flex;
    overflow: hidden;
    position: relative;
    @include media-breakpoint-up(xl) {
      width: 50%;
    }
    .pagination {
      height: 150px;
      width: 100%;
      background: #007aff;
      align-items: center;
      justify-content: center;
      display: none;
      @include media-breakpoint-up(xl) {
        display: flex;
        position: absolute;
        bottom: 0;
      }
      &__dot {
        width: 12px;
        height: 12px;
        background: #fff;
        border-radius: 50%;
        &:not(:first-child) {
          margin-left: 20px;
        }
        &:hover {
          cursor: pointer;
        }
        &.active {
          background: #ebf02c;
        }
      }
    }
    &--wrapper {
      flex: 1;
      transition: transform 0.5s ease-in-out;
      width: 100vw;
      display: flex;
      flex-wrap: nowrap;
      transform: translateX(var(--translateX));
      @include media-breakpoint-up(xl) {
        width: 50vw;
      }
    }
    &--item {
      min-width: 100vw;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100vw;
      background: #000928;
      padding: 20px;
      display: flex;
      flex-direction: column-reverse;
      @include media-breakpoint-up(md) {
        flex-direction: column;
        padding: 40px;
      }
      @include media-breakpoint-up(xl) {
        width: 50vw;
        min-width: 50vw;
        height: calc(100% - 150px);
      }
      .title {
        color: #ebf02c;
        font-size: 20px;
        line-height: 130%;
        text-align: center;
        @include media-breakpoint-up(md) {
          font-size: 44px;
          line-height: 64px;
          margin-top: 12px;
        }
      }
      .subtitle {
        font-size: 16px;
        line-height: 24px;
        text-align: center;
        color: #f6f6fb;
        margin-top: 4px;
        margin-bottom: 12px;
        @include media-breakpoint-up(md) {
          font-size: 24px;
          line-height: 32px;
          margin-bottom: 0;
        }
      }
      img {
        max-width: 32px;
        @include media-breakpoint-up(md) {
          max-width: 60px;
        }
      }
    }

    &--arrow {
      position: absolute;
      z-index: 20;
      max-width: 27px;
      top: 23px;
      @include media-breakpoint-up(md) {
        top: auto;
        bottom: 42.5px;
        max-width: 54px;
      }
      @include media-breakpoint-up(xl) {
        bottom: auto;
        top: 295px;
      }
      &:hover {
        cursor: pointer;
      }
      &.left {
        transform: rotate(180deg);
        left: 20px;
        @include media-breakpoint-up(md) {
          left: 40px;
        }
      }
      &.right {
        right: 20px;
        @include media-breakpoint-up(md) {
          right: 40px;
        }
      }
    }
  }
}
</style>
