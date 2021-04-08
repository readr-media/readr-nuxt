<template>
  <section class="cover">
    <div class="wrapper">
      <picture>
        <source
          :media="`(min-width: ${styleVariables['breakpoint-sm']})`"
          :srcset="coverImgs.large"
        />
        <img
          class="cover__cover-img cover-img"
          :src="coverImgs.small"
          alt="cover-img"
        />
      </picture>
      <h1 class="cover__title title">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <span v-html="titleHtml" />
      </h1>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <p class="cover__description description" v-html="descriptionHtml"></p>
      <div class="cover__navs navs">
        <button
          class="navs__to-to-quiz-button go-to-quiz-button"
          @click="$emit('goToQuiz'), $ga.event('projects', 'click', '我要挑戰')"
        >
          <div v-text="textGoToQuiz" />
        </button>
        <button
          class="navs__go-to-article-button go-to-article-button"
          @click="
            $emit('goToArticle'),
              $ga.event('projects', 'click', '跳過遊戲看報導')
          "
          v-text="textGoToArticle"
        />
      </div>
    </div>
  </section>
</template>

<script>
import styleVariables from '~/scss/_variables.module.scss'
import { newline2br } from '~/components/helpers/index.js'

export default {
  props: {
    coverImgs: {
      type: Object,
      default: () => ({}),
    },
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    textGoToArticle: {
      type: String,
      default: '',
    },
    textGoToQuiz: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      styleVariables,
    }
  },
  computed: {
    titleHtml() {
      return newline2br(this.title)
    },
    descriptionHtml() {
      return newline2br(this.description)
    },
  },
}
</script>

<style lang="scss" scoped>
.cp {
  .cover {
    padding: 166px 20px 48px 20px;
    background-color: #f1f1f1;
    &__title {
      margin: 12px 0 0 0;
      @include media-breakpoint-up(md) {
        margin: 48px 0 0 0;
      }
      @include media-breakpoint-up(xl) {
        margin: 60px 0 0 0;
      }
    }
    &__description {
      margin: 24px 0 0 0;
    }
    @include media-breakpoint-up(md) {
      padding: 195px 0 60px 0;
    }
    &__navs {
      margin: 6px 0 0;
      @include media-breakpoint-up(md) {
        margin: 38px 0 0 0;
      }
      @include media-breakpoint-up(xl) {
        margin: 50px 0 0 0;
      }
    }
  }

  .wrapper {
    @include media-breakpoint-up(md) {
      max-width: 568px;
      margin: 0 auto;
    }
    @include media-breakpoint-up(xl) {
      max-width: 600px;
    }
  }

  .cover-img {
    width: 100%;
  }

  .title {
    font-weight: 500;
    font-size: 28px;
    line-height: 36px;
    text-align: center;
    letter-spacing: 0.04em;
    color: #161616;
    @include media-breakpoint-up(md) {
      font-size: 32px;
      line-height: 44px;
    }
    span {
      box-shadow: inset 0 -0.175em #f1f1f1,
        inset 0 -0.55em rgba(255, 63, 63, 0.8);
    }
  }

  .description {
    font-weight: 300;
    font-size: 18px;
    line-height: 36px;
    text-align: center;
    letter-spacing: 0.01em;
    color: #161616;
    ::v-deep br {
      display: block;
      content: '';
      margin: 26px 0 0 0;
    }
    @include media-breakpoint-up(md) {
      text-align: left;
    }
  }

  .navs {
    display: flex;
    flex-direction: column;
    align-items: center;
    &__go-to-article-button {
      margin: 20px 0 0 0;
    }
  }

  .go-to-quiz-button {
    width: 100%;
    display: block;
    text-decoration: none;
    letter-spacing: 2.5px;
    font-size: 15px;
    font-weight: 700;
    text-align: center;
    position: relative;

    div {
      padding: 12px 0 12px 2.5px;
      transition: background-color 0.3s, color 0.3s;
      z-index: 1;
      position: relative;
      border-radius: 2px;
      background-color: #ff3f3f;
      color: white;
      border-color: white;

      &:active {
        background-color: #000928;
        transition: none;
        color: white;
      }
      &:hover {
        background-color: #111111;
        color: white;
      }
    }

    &::before {
      content: '';
      display: block;
      position: absolute;
      top: 4px;
      left: 4px;
      width: 100%;
      height: 100%;
      border-radius: 2px;
      background-color: #111111;
    }

    @include media-breakpoint-up(md) {
      width: 276px;
    }
  }
  .go-to-article-button {
    font-size: 16px;
    font-weight: bold;
    line-height: 24px;
    text-align: center;
    letter-spacing: 2.5px;
    text-decoration-line: underline;
    color: #2b2b2b;
  }
}
</style>
