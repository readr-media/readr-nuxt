<template>
  <section>
    <div class="intro">
      <div class="intro__title">{{ intro.title1 }}<br />{{ intro.title2 }}</div>
      <div class="intro__desc">{{ intro.description }}</div>
      <ul class="intro__anchor">
        <li>
          {{ intro.anchor.story }}
        </li>
        <li>
          {{ intro.anchor.dashboard }}
        </li>
        <li>
          {{ intro.anchor.article }}
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    intro: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style lang="scss" scoped>
.intro {
  height: 100vh;
  background: #1b1b1b;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 30px;
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
