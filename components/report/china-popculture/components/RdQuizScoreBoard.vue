<template>
  <section class="score-board">
    <div
      v-observe-visibility="
        (isVisible) => {
          $emit(!isVisible ? 'articleVisible' : 'scoreboardVisible')
        }
      "
      class="score-board-wrapper"
    >
      <div class="wrapper">
        <div class="score-board__card card">
          <div class="card__card-top card-top">
            <p class="card-text card-text--bold">你的總成績</p>
            <p class="card-text card-text--red">{{ answerScore }} 分</p>
          </div>
          <div class="card__card-bottom card-bottom">
            <p class="card-text card-text--bold">你的成績目前</p>
            <template v-if="!isFetchGlobalScoreError">
              <p class="card-text card-text--red">
                贏過 {{ currentScorePercentileRank }}％ 的人
              </p>
              <p
                v-if="currentScoreBadge"
                class="card-text card-text--bold"
                v-text="currentScoreBadge"
              />
            </template>
            <button
              v-else
              class="card-bottom__fetch-global-score-again-button fetch-global-score-again-button"
              @click="fetchGlobalScore"
            >
              <span>按我揭曉</span>
              <img
                src="~/assets/report/china-popculture/cp-refresh-icon.svg"
                alt="refresh-icon"
              />
            </button>
          </div>
        </div>
        <div class="score-board__card card">
          <div class="card__card-top card-top">
            <p class="card-text card-text--bold">你總共找出了</p>
            <p class="card-text card-text--red">{{ answerScore / 5 }}/20 個</p>
            <p class="card-text card-text--bold">中國流行語</p>
          </div>
          <div
            class="card__card-bottom card-bottom card__card-bottom--less-margin-top"
          >
            <div class="quiz-global-record-list-wrapper">
              <h1 class="quiz-global-record-list-title">
                <span>
                  目前玩家圈選正確率
                </span>
                <button
                  v-if="isFetchGlobalScoreError"
                  class="quiz-global-record-list-title__fetch-global-score-again-button fetch-global-score-again-button"
                  @click="fetchGlobalScore"
                >
                  <span>按我揭曉</span>
                  <img
                    src="~/assets/report/china-popculture/cp-refresh-icon.svg"
                    alt="refresh-icon"
                  />
                </button>
              </h1>
              <div class="quiz-global-record-list-column-wrapper">
                <ol
                  v-for="(globalRecordDataHalf,
                  i) in globalRecordDataHalfDivide"
                  :key="i"
                  class="quiz-global-record-list"
                >
                  <li
                    v-for="(record, j) in globalRecordDataHalf"
                    :key="`${i}-${j}`"
                    class="quiz-global-record-list-item"
                  >
                    <span class="quiz-global-record-list-item-answer">
                      <span>
                        {{ i * globalRecordDataHalf.length + (j + 1) }}.
                        {{
                          (
                            cmsDataAnswerCorrects[
                              i * globalRecordDataHalf.length + j
                            ] || {}
                          ).value
                        }}</span
                      >
                      <span
                        v-if="
                          isGlobalRecordMiss(
                            (
                              cmsDataAnswerCorrects[
                                i * globalRecordDataHalf.length + j
                              ] || {}
                            ).value
                          )
                        "
                        class="miss"
                        v-text="'miss'"
                      />
                    </span>
                    <span
                      class="quiz-global-record-list-item-ratio"
                      v-text="
                        !isFetchGlobalScoreError
                          ? record.correctPercentage
                          : '?%'
                      "
                    />
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
    </div>
    <div class="article-in-score-board">
      <RdArticle :cmsData="cmsData" />
    </div>
  </section>
</template>

<script>
import { get as axiosGet } from 'axios'
import scrollIntoView from 'scroll-into-view'
import { ObserveVisibility } from 'vue-observe-visibility'
import RdCollapsible from './RdCollapsible.vue'
import RdArticle from './RdArticle.vue'

export default {
  components: {
    RdCollapsible,
    RdArticle,
  },
  directives: {
    'observe-visibility': ObserveVisibility,
  },
  props: {
    cmsData: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    answerScore: {
      type: Number,
      default: 0,
    },
    answerCollectionCorrects: {
      type: Array,
      default: () => [],
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
  data() {
    return {
      globalAnswersData: [],
      isFetchGlobalScoreError: false,
    }
  },
  computed: {
    globalScoresData() {
      return this.globalAnswersData.map(function mapAnswersToScore(record) {
        return record.answers.split(',').length * 5
      })
    },
    currentScorePercentileRank() {
      const winCount = this.globalScoresData.filter(
        (score) => score < this.answerScore
      ).length
      const result = Math.round(
        (winCount / this.globalAnswersData.length) * 100
      )
      return isNaN(result) ? '讀取中' : result
    },
    currentScoreBadge() {
      if (this.currentScorePercentileRank >= 99) {
        return '辨識兩岸流行用語「真強者」'
      } else if (this.currentScorePercentileRank >= 90) {
        return '瞞不過你法眼的「敏銳者」　'
      } else if (this.currentScorePercentileRank >= 80) {
        return '只差一點點就全對的「能力者」'
      } else if (this.currentScorePercentileRank >= 60) {
        return '你需要被開發的「潛力者」'
      } else if (this.currentScorePercentileRank >= 50) {
        return '差一哩路就會辨識的「初階者」'
      } else if (this.currentScorePercentileRank >= 30) {
        return '中國流行語已快成為你的日常'
      } else if (this.currentScorePercentileRank >= 20) {
        return '中國流行語早已深入你生活'
      } else if (this.currentScorePercentileRank >= 10) {
        return '你是會行走的「中國流行語字典」'
      } else if (this.currentScorePercentileRank >= 5) {
        return '中國流行語快成為你母語了'
      } else {
        return ''
      }
    },
    globalRecordData() {
      const result = new Array(20).fill(undefined).map(() => ({
        correctCount: 0,
        correctPercentage: '0%',
      }))
      this.globalAnswersData.forEach((record) => {
        const answers = record.answers.split(',')
        answers.forEach((answer) => {
          result[Number(answer)].correctCount += 1
          // result[Number(answer)].correctPercentage =
          //   Math.round(
          //     (result[Number(answer)].correctCount /
          //       this.globalAnswersData.length) *
          //       100
          //   ) + '%'
        })
      })
      result.forEach((category) => {
        category.correctPercentage =
          Math.round(
            (category.correctCount / this.globalAnswersData.length) * 100
          ) + '%'
      })
      return result
    },
    globalRecordDataHalfDivide() {
      return [
        this.globalRecordData.slice(0, 10),
        this.globalRecordData.slice(10, 20),
      ]
    },
    cmsDataAnswerCorrects() {
      return this.cmsData.contentApiData.quiz
        .map((quiz) =>
          quiz.contents.map((content) =>
            content.texts.filter((text) => text.type === 'answerCorrect')
          )
        )
        .flat(Infinity)
    },
  },
  beforeMount() {
    this.fetchGlobalScore()
  },
  methods: {
    processDescriptionDot(description = '') {
      return description.replaceAll('・', '<span class="dot">・</span>')
    },
    handleGoToArticle() {
      scrollIntoView(document.querySelector('.article-in-score-board'))

      this.$ga.event('projects', 'click', '看專題報導')
    },

    async fetchGlobalScore() {
      try {
        this.isFetchGlobalScoreError = false
        const { data = [] } = await axiosGet(
          'https://storage.googleapis.com/projects.readr.tw/china_popculture.json'
        )
        this.globalAnswersData = []
        this.globalAnswersData.push(...data)
      } catch (e) {
        this.isFetchGlobalScoreError = true
        console.error(e)
      }
    },

    isGlobalRecordMiss(value) {
      return (
        this.answerCollectionCorrects.findIndex(function compareValue(answer) {
          return answer.value === value
        }) === -1
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.score-board {
  padding: 118px 0 0 0;
  background-color: #f1f1f1;
  @include media-breakpoint-up(md) {
    padding: 135px 0 0 0;
  }

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
.card-bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__fetch-global-score-again-button {
    margin: 4px 0 0 0;
  }
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

.quiz-global-record-list-wrapper {
  width: 100%;
}
.quiz-global-record-list-title {
  border-bottom: 2px solid #111111;
  padding: 0 0 8px 0;
  font-weight: 300;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: #111111;
  display: flex;
  flex-direction: column;
  align-items: center;
  @include media-breakpoint-up(md) {
    font-size: 18px;
    line-height: 27px;
  }

  &__fetch-global-score-again-button {
    margin: 4px 0 0 0;
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

.fetch-global-score-again-button {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 24px;
  line-height: 36px;
  text-align: center;
  letter-spacing: 0.032em;
  color: #f50e0e;
  img {
    margin: 0 0 0 4px;
  }
}
</style>
