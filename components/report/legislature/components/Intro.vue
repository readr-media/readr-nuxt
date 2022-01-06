<template>
  <section>
    <div
      v-show="showHint"
      v-observe-visibility="handleHintVisibilityChange"
      class="hint"
    >
      <picture>
        <source
          srcset="~/assets/imgs/report/legislature/intro/hint_desktop.svg"
          media="(min-width: 768px)"
        />
        <img
          class="landing__img"
          src="~/assets/imgs/report/legislature/intro/hint_mobile.svg"
          alt="hint"
        />
      </picture>
      <div class="hint__word">往下滑動，提示或引言提示或引言</div>
    </div>
    <div class="container">
      <div class="background rellax" data-rellax-speed="50">
        <img
          v-for="number in 5"
          :key="number"
          :src="
            require(`~/assets/imgs/report/legislature/intro/seed${
              Math.floor(Math.random() * 5) + 1
            }.png`)
          "
          :style="{
            transform: `translateX(
              ${random(number * 80 * -1, number * 80)}px
            )`,
          }"
        />
      </div>
      <div class="background rellax" data-rellax-speed="35">
        <img
          v-for="number in 5"
          :key="number"
          :src="
            require(`~/assets/imgs/report/legislature/intro/seed${
              Math.floor(Math.random() * 5) + 1
            }.png`)
          "
          :style="{
            transform: `translateX(
              ${random(number * 80 * -1, number * 80)}px
            )`,
          }"
        />
      </div>
      <div class="background rellax" data-rellax-speed="15">
        <img
          v-for="number in 5"
          :key="number"
          :src="
            require(`~/assets/imgs/report/legislature/intro/seed${
              Math.floor(Math.random() * 5) + 1
            }.png`)
          "
          :style="{
            transform: `translateX(
              ${random(number * 80 * -1, number * 80)}px
            )`,
          }"
        />
      </div>
      <div class="background rellax" data-rellax-speed="5">
        <img
          v-for="number in 5"
          :key="number"
          :src="
            require(`~/assets/imgs/report/legislature/intro/seed${
              Math.floor(Math.random() * 5) + 1
            }.png`)
          "
          :style="{
            transform: `translateX(
              ${random(number * 80 * -1, number * 80)}px
            )`,
          }"
        />
      </div>
      <div class="examples">
        <IntroExample
          v-for="item in example"
          :id="`example${item.id}`"
          :key="item.id"
          :pictureId="item.id"
          :description="item.description"
          :lawName="item.lawName"
          :color="item.color"
        />
      </div>
      <div class="intro">
        <div class="intro__title">
          {{ intro.title1 }}<br />{{ intro.title2 }}
        </div>
        <div class="intro__desc">{{ intro.description }}</div>
        <ul class="intro__anchor">
          <li @click="handleAnchorClick('dashboard')">
            {{ intro.anchor.dashboard }}
          </li>
          <li @click="handleAnchorClick('article')">
            {{ intro.anchor.article }}
          </li>
        </ul>
        <div class="intro__more">
          <div>往下滑看我們發現了什麼</div>
          <img
            src="../../../../assets/imgs/report/legislature/intro/scroll-more.svg"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
/* global Rellax */
/* eslint no-undef: "error" */
import { mapGetters } from 'vuex'
import scrollIntoView from 'scroll-into-view'
import IntroExample from './IntroExample.vue'

export default {
  components: {
    IntroExample,
  },
  props: {
    intro: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      showHint: true,
      example: [
        {
          id: '01',
          description: '當大火悲劇不斷重演，消防安全立法卻持續卡關',
          lawName: '《消防設備人員法》',
          color: '#62AD61',
        },
        {
          id: '02',
          description:
            '太陽花學運抗爭者訴訟官司打 7 年，關乎民眾抗議權利的集會遊行自由修法仍原地踏步',
          lawName: '《集會遊行法》',
          color: '#33ABA4',
        },
        {
          id: '03',
          description: '當開發案不斷入侵傳統領域，原住民的土地正義在哪裡？',
          lawName: '《原住民族土地及海域法》',
          color: '#5C18B1',
        },
      ],
    }
  },
  computed: {
    ...mapGetters('viewport', ['viewportWidth', 'viewportHeight']),
    isMobile() {
      return this.viewportWidth < 768
    },
  },
  mounted() {
    const rellax = new Rellax('.rellax')
    console.log(rellax)
  },
  methods: {
    handleAnchorClick(section) {
      const label = section === 'dashboard' ? '動畫選項A' : '動畫選項B'
      this.$ga.event('projects', 'click', label)
      scrollIntoView(document.querySelector(`#${section}`), {
        align: {
          topOffset: 200,
        },
      })
    },
    handleHintVisibilityChange(isVisible) {
      if (!isVisible) {
        this.showHint = false
        window.scroll(0, -this.viewportHeight * 0.66)
      }
    },

    random(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min
    },
  },
}
</script>

<style lang="scss" scoped>
.hint {
  background: #1b1b1b;
  height: 66vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__word {
    color: #fff;
    margin-top: 23px;
  }
}
.container {
  background: #1b1b1b;
  height: 400vh;
  position: relative;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
  @include media-breakpoint-up(md) {
    height: 350vh;
  }
  .background {
    width: 100vw;
    height: 100%;
    position: absolute;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    img {
      width: 100vw;
      object-fit: contain;
    }
  }
}
.mobile {
  @include media-breakpoint-up(md) {
    display: none;
  }
}
.desktop {
  display: none;
  @include media-breakpoint-up(md) {
    display: inherit;
  }
}
.examples {
  flex: 1;
  width: 100vw;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  @include media-breakpoint-up(md) {
    position: absolute;
    display: block;
    top: 0;
    left: 0;
  }
  #example01 {
    @include media-breakpoint-up(md) {
      transform: translate(10vw, 40vh);
    }
  }
  #example02 {
    @include media-breakpoint-up(md) {
      transform: translate(60vw, 50vh);
    }
  }
  #example03 {
    @include media-breakpoint-up(md) {
      transform: translate(40vw, 90vh);
    }
  }
}
.intro {
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 30px;
  position: relative;
  min-height: 100vh;
  margin: 0 auto;
  * {
    max-width: 669px;
  }
  &__title {
    font-weight: 900;
    font-size: 32px;
    line-height: 46px;
    margin-bottom: 48px;
    text-align: center;
    @include media-breakpoint-up(md) {
      margin-bottom: 24px;
    }
  }
  &__desc {
    font-weight: 300;
    font-size: 18px;
    line-height: 26px;
    @include media-breakpoint-up(md) {
      font-size: 20px;
      line-height: 29px;
    }
  }
  &__anchor {
    margin-top: 42px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @include media-breakpoint-up(md) {
      flex-direction: row;
    }
    li {
      background: #ffffff;
      padding: 4px;
      font-weight: 900;
      font-size: 18px;
      line-height: 26px;
      color: #1b1b1b;
      width: fit-content;

      &:hover {
        cursor: pointer;
        background: #cccccc;
      }
    }
    li + li {
      margin-top: 22px;
      @include media-breakpoint-up(md) {
        margin: 0 0 0 20px;
      }
    }
  }
  &__more {
    color: white;
    margin-top: 48px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-weight: 300;
    font-size: 16px;
    line-height: 23px;
    @include media-breakpoint-up(md) {
      margin-top: 100px;
    }
    img {
      margin-top: 16px;
      width: 35px;
      height: 35px;
    }
  }
}
</style>
