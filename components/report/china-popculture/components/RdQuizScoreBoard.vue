<template>
  <section class="score-board">
    <div class="wrapper">
      <div class="score-board__card card">
        <div class="card__card-top card-top">
          <p class="card-text card-text--bold">你的總成績</p>
          <p class="card-text card-text--red">90 分</p>
        </div>
        <div class="card__card-bottom card-bottom">
          <p class="card-text card-text--bold">你的成績是目前所有挑戰者中的</p>
          <p class="card-text card-text--red">前 10％</p>
        </div>
      </div>
      <div class="score-board__card card">
        <div class="card__card-top card-top">
          <p class="card-text card-text--bold">你總共找出了</p>
          <p class="card-text card-text--red">18/20 個</p>
          <p class="card-text card-text--bold">中國流行語</p>
        </div>
        <div
          class="card__card-bottom card-bottom card__card-bottom--less-margin-top"
        >
          <div class="quiz-global-record-list-wrapper">
            <h1 class="quiz-global-record-list-title">目前玩家圈選正確率</h1>
            <div class="quiz-global-record-list-column-wrapper">
              <ol class="quiz-global-record-list">
                <li class="quiz-global-record-list-item">
                  <span class="quiz-global-record-list-item-answer">
                    <span>1. 閨蜜</span>
                    <span class="miss">miss</span>
                  </span>
                  <span class="quiz-global-record-list-item-ratio">95%</span>
                </li>
                <li class="quiz-global-record-list-item">
                  <span
                    class="quiz-global-record-list-item-answer quiz-global-record-list-item-answer--bold"
                    >2. 閨蜜</span
                  >
                  <span class="quiz-global-record-list-item-ratio">95%</span>
                </li>
                <li class="quiz-global-record-list-item">
                  <span
                    class="quiz-global-record-list-item-answer quiz-global-record-list-item-answer--bold"
                    >3. 閨蜜</span
                  >
                  <span class="quiz-global-record-list-item-ratio">95%</span>
                </li>
              </ol>
              <ol class="quiz-global-record-list">
                <li class="quiz-global-record-list-item">
                  <span class="quiz-global-record-list-item-answer">
                    <span>1. 閨蜜</span>
                    <span class="miss">miss</span>
                  </span>
                  <span class="quiz-global-record-list-item-ratio">95%</span>
                </li>
                <li class="quiz-global-record-list-item">
                  <span
                    class="quiz-global-record-list-item-answer quiz-global-record-list-item-answer--bold"
                    >2. 閨蜜</span
                  >
                  <span class="quiz-global-record-list-item-ratio">95%</span>
                </li>
                <li class="quiz-global-record-list-item">
                  <span
                    class="quiz-global-record-list-item-answer quiz-global-record-list-item-answer--bold"
                    >3. 閨蜜</span
                  >
                  <span class="quiz-global-record-list-item-ratio">95%</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div class="score-board__navs navs">
        <button
          class="navs__go-to-article-button go-to-article-button"
          @click="handleGoToArticle"
        >
          <div v-text="textGoToArticle" />
        </button>
        <button
          class="navs__quiz-again-button quiz-again-button"
          @click="$emit('quizAgain')"
          v-text="textQuizAgain"
        />
      </div>
    </div>
    <div class="methodology-wrapper">
      <div class="wrapper">
        <RdCollapsible :textButton="textMethodology">
          <div class="methodology">
            <article
              v-for="(methodology, i) in methodologies"
              :key="i"
              class="methodology-article"
            >
              <h1
                class="methodology-article-title"
                v-text="methodology.title"
              />
              <!-- eslint-disable vue/no-v-html -->
              <p
                class="methodology-article-paragraph"
                v-html="processDescriptionDot(methodology.description)"
              />
            </article>
          </div>
        </RdCollapsible>
      </div>
    </div>
    <div class="article-in-score-board">
      <RdArticle :cmsData="cmsData" />
    </div>
  </section>
</template>

<script>
import scrollIntoView from 'scroll-into-view'
import RdCollapsible from './RdCollapsible.vue'
import RdArticle from './RdArticle.vue'

export default {
  components: {
    RdCollapsible,
    RdArticle,
  },
  props: {
    cmsData: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    textGoToArticle: {
      type: String,
      default: '',
    },
    textQuizAgain: {
      type: String,
      default: '',
    },
    textMethodology: {
      type: String,
      default: '',
    },
    methodologies: {
      type: Array,
      default: () => [{ title: '', description: '' }],
    },
  },
  methods: {
    processDescriptionDot(description) {
      return description.replaceAll('・', '<span class="dot">・</span>')
    },
    handleGoToArticle() {
      scrollIntoView(document.querySelector('.article-in-score-board'))
    },
  },
}
</script>

<style lang="scss" scoped>
.score-board {
  background-color: #f1f1f1;
  &__card {
    & + & {
      margin: 16px 0 0 0;
    }
  }
  &__navs {
    margin: 24px 0 0 0;
    @include media-breakpoint-up(md) {
      margin: 48px 0 0 0;
    }
  }
}

.wrapper {
  padding: 24px 20px;
  @include media-breakpoint-up(md) {
    padding: 48px 0;
    max-width: 568px;
    margin: 0 auto;
  }
  @include media-breakpoint-up(xl) {
    padding: 60px 0;
    max-width: 600px;
  }
}

.card {
  width: 100%;
  background: #ffffff;
  border: 2px solid #111111;
  box-shadow: 0 2px 12px -4px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  padding: 16px 12px;
  text-align: center;
  &__card-bottom {
    margin: 16px 0 0 0;
    &--less-margin-top {
      margin: 8px 0 0 0;
    }
  }

  @include media-breakpoint-up(md) {
    padding: 32px;
  }
}
.card-top {
  border-bottom: 2px solid #111111;
  padding: 0 0 16px 0;
}
.card-text {
  & + & {
    margin: 4px 0 0 0;
  }
  &--bold {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: #111111;
    @include media-breakpoint-up(md) {
      font-size: 18px;
      line-height: 27px;
    }
  }
  &--red {
    font-weight: 500;
    font-size: 24px;
    line-height: 36px;
    letter-spacing: 0.032em;
    color: #f50e0e;
    @include media-breakpoint-up(md) {
      font-size: 28px;
      line-height: 40px;
    }
  }
}

.quiz-global-record-list-title {
  border-bottom: 2px solid #111111;
  padding: 0 0 8px 0;
  font-weight: 300;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: #111111;
  @include media-breakpoint-up(md) {
    font-size: 18px;
    line-height: 27px;
  }
}
.quiz-global-record-list-column-wrapper {
  margin: 16px 0 0 0;
  display: flex;
  flex-direction: column;
  @include media-breakpoint-up(md) {
    flex-direction: row;
    justify-content: space-between;
  }
}
.quiz-global-record-list {
  &:nth-child(2) {
    border-top: 0.5px solid #d0cfcf;
    @include media-breakpoint-up(md) {
      border-top: none;
    }
  }
  @include media-breakpoint-up(md) {
    width: calc((100% - 40px) / 2);
  }
}
.quiz-global-record-list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
  & + & {
    border-top: 0.5px solid #d0cfcf;
  }
}
.quiz-global-record-list-item-answer {
  font-weight: 300;
  line-height: 24px;
  &--bold {
    font-weight: 500;
  }
  @include media-breakpoint-up(md) {
    font-size: 18px;
    line-height: 27px;
  }
}
.quiz-global-record-list-item-ratio {
  font-weight: 300;
  font-size: 14px;
  line-height: 20px;
  color: #6a6a6a;
  @include media-breakpoint-up(md) {
    font-size: 16px;
    line-height: 24px;
  }
}
.miss {
  font-style: italic;
  font-weight: 300;
  font-size: 16px;
  line-height: 19px;
  color: #f50e0e;
  margin: 0 0 0 8px;
}

.navs {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__quiz-again-button {
    margin: 20px 0 0 0;
  }
}
.go-to-article-button {
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
.quiz-again-button {
  font-size: 16px;
  font-weight: bold;
  line-height: 24px;
  text-align: center;
  letter-spacing: 2.5px;
  text-decoration-line: underline;
  color: #2b2b2b;
}

.methodology-wrapper {
  background-color: white;
}
.methodology {
  margin: 16px 0 0 0;
}
.methodology-article {
  & + & {
    margin: 24px 0 0 0;
  }
}
.methodology-article-title {
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #111111;
}
.methodology-article-paragraph {
  margin: 8px 0 0 0;
  font-weight: 300;
  font-size: 18px;
  line-height: 36px;
  letter-spacing: 0.01em;
  color: #111111;
  ::v-deep .dot {
    color: #d0cfcf;
  }
}

.article-in-score-board {
  .article {
    // force to show the article
    display: block !important;
  }
}
</style>
