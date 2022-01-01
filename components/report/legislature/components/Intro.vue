<template>
  <div class="container">
    <img
      src="~/assets/imgs/report/legislature/intro/01.png"
      class="intro__background rellax"
      data-rellax-speed="100"
    />
    <img
      src="~/assets/imgs/report/legislature/intro/02.png"
      class="intro__background rellax"
      data-rellax-speed="70"
    />
    <img
      src="~/assets/imgs/report/legislature/intro/03.png"
      class="intro__background rellax"
      data-rellax-speed="30"
    />
    <img
      src="~/assets/imgs/report/legislature/intro/04.png"
      class="intro__background rellax"
      data-rellax-speed="10"
    />
    <div class="examples">
      <IntroExample
        v-for="item in example"
        :key="item.id"
        :pictureId="item.id"
        :description="item.description"
        :lawName="item.lawName"
        :color="item.color"
      />
    </div>
    <div class="intro">
      <div class="intro__title">{{ intro.title1 }}<br />{{ intro.title2 }}</div>
      <div class="intro__desc">{{ intro.description }}</div>
      <ul class="intro__anchor">
        <li @click="handleAnchorClick('story')">
          {{ intro.anchor.story }}
        </li>
        <li @click="handleAnchorClick('dashboard')">
          {{ intro.anchor.dashboard }}
        </li>
        <li @click="handleAnchorClick('article')">
          {{ intro.anchor.article }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
/* global Rellax */
/* eslint no-undef: "error" */
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
  mounted() {
    const rellax = new Rellax('.rellax')
    console.log(rellax)
  },
  methods: {
    handleAnchorClick(section) {
      scrollIntoView(document.querySelector(`#${section}`))
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  background: #1b1b1b;
  height: 293.47vw;
  position: relative;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  img {
    position: absolute;
    top: 0;
    width: 100vw;
  }
}
.examples {
  flex: 1;
}
.intro {
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 30px;
  position: relative;
  height: 100vh;
  margin: 0 auto;
  * {
    max-width: 669px;
  }
  &__title {
    font-weight: 900;
    font-size: 32px;
    line-height: 46px;
    margin-bottom: 48px;
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
}
</style>
