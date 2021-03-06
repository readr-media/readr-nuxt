<template>
  <div class="htcak">
    <div ref="header" class="header" :class="{ hidden: shouldHideHeader }">
      <div class="wrapper" :class="{ yellow: !shouldOpenGame }">
        <RdReportHeader />
      </div>
      <RdNavbar
        :navItems="navItems"
        :activeId="activeNavItemId"
        @clickNavItem="handleClickNavItem"
        @sendGaEvent="sendGaEvent"
      />
    </div>

    <div v-if="shouldOpenGame">
      <div class="cover-wrapper">
        <RdCover :cmsData="contentApiData.cover" />
      </div>
      <RdMultipleChoice
        :id="NAV_ITEMS_IDS[0]"
        :cmsData="contentApiData.game.multipleChoice"
        :playTimes="playTimes"
        class="htcak__multiple-choice"
        @submitChoices="handleSubmitChoices"
        @skip="skipGame"
        @sendGaEvent="sendGaEvent"
      />
    </div>

    <main>
      <div v-show="!shouldOpenGame" class="result">
        <div :id="NAV_ITEMS_IDS[0]" v-intersect="indexesObserver" />
        <transition name="fade-in">
          <RdChoiceResult
            v-if="shouldOpenGameResult"
            v-intersect="indexesObserver"
            :results="gameResults"
            @seeProfileStory="handleSeeProfileStory"
            @replayGame="replayGame"
            @sendGaEvent="sendGaEvent"
          />
        </transition>

        <div :id="NAV_ITEMS_IDS[1]" v-intersect="indexesObserver" />
        <RdProfileStory
          v-intersect="indexesObserver"
          :cmsData="contentApiData.profile"
          @sendGaEvent="sendGaEvent"
        />

        <div :id="NAV_ITEMS_IDS[2]" v-intersect="indexesObserver" />
        <RdReportArticle
          :contents="contentApiData.article.contents"
          :slug="cmsData.slug"
          @sendGaEvent="sendGaEvent"
        />
        <RdReportExtras
          :contents="contentApiData.extras.contents"
          @sendGaEvent="sendGaEvent"
        />
      </div>

      <RdReportCredit
        :authors="contentApiData.credit"
        :publishedAt="contentApiData.publishedAt"
        :canSendGaEvent="canSendCreditGaEvent"
      />
    </main>

    <div v-if="!shouldOpenGame" class="donate-button">
      <readr-donate-button
        @clickButton="sendGaClickEvent({ label: 'donate' })"
      />
    </div>

    <LazyRenderer v-show="!shouldOpenGame" class="latest-coverages">
      <readr-latest-coverages />
    </LazyRenderer>
  </div>
</template>

<script>
import scrollIntoView from 'scroll-into-view'
import LazyRenderer from 'vue-lazy-renderer'

import RdNavbar from './components/RdNavbar.vue'
import RdCover from './components/RdCover.vue'
import RdMultipleChoice from './components/RdMultipleChoice.vue'
import RdChoiceResult from './components/RdChoiceResult.vue'
import RdProfileStory from './components/RdProfileStory.vue'
import RdReportHeader from '~/components/app/Report/RdReportHeader.vue'
import RdReportArticle from '~/components/app/Report/RdReportArticle.vue'
import RdReportExtras from '~/components/app/Report/RdReportExtras.vue'
import RdReportCredit from '~/components/app/Report/RdReportCredit.vue'

import { intersect } from '~/helpers/vue/directives/index.js'
import { scrollDirection } from '~/components/helpers/vue/mixins/index.js'

import {
  setupIntersectionObserver,
  cleanupIntersectionObserver,
} from '~/helpers/index.js'

const NAV_ITEMS_IDS = ['game', 'profile-story', 'report-article']
const HEADER_HEIGHT_MD = 141

export default {
  name: 'HowToChooseAKindergarten',

  components: {
    LazyRenderer,

    RdNavbar,
    RdCover,
    RdMultipleChoice,
    RdChoiceResult,
    RdProfileStory,
    RdReportHeader,
    RdReportArticle,
    RdReportExtras,
    RdReportCredit,
  },

  directives: {
    intersect,
  },

  mixins: [scrollDirection],

  props: {
    cmsData: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },

  data() {
    return {
      shouldOpenGame: true,
      shouldOpenGameResult: false,
      gameResults: [],
      playTimes: 1,

      NAV_ITEMS_IDS: Object.freeze(NAV_ITEMS_IDS),
      navItems: Object.freeze([
        Object.freeze({
          id: NAV_ITEMS_IDS[0],
          name: '玩遊戲',
        }),
        Object.freeze({
          id: NAV_ITEMS_IDS[1],
          name: '讀秘笈',
        }),
        Object.freeze({
          id: NAV_ITEMS_IDS[2],
          name: '看報導',
        }),
      ]),
      activeNavItemId: NAV_ITEMS_IDS[0],
      isAutoScrolling: false,

      indexesObserver: undefined,

      canSendCreditGaEvent: false,
    }
  },

  computed: {
    contentApiData() {
      return this.cmsData.contentApiData
    },
    shouldHideHeader() {
      return !this.isAutoScrolling && this.isScrollingDown
    },
  },

  mounted() {
    this.setupIndexesObserver()
  },

  beforeDestroy() {
    cleanupIntersectionObserver(this, 'indexesObserver')
  },

  methods: {
    handleSubmitChoices(choicesByCategory) {
      this.setGameResults(choicesByCategory)
      this.openResult()
      this.sendGaEventsOfChoices(choicesByCategory)
      this.playTimes += 1
    },
    setGameResults(choicesByCategory = {}) {
      const sortedChoices = Object.entries(
        Object.assign({}, choicesByCategory)
      ).sort(function descendByChoicesCount(
        [, choicesA = []],
        [, choicesB = []]
      ) {
        return choicesB.length - choicesA.length
      })
      const [, maxChoices] = sortedChoices[0]
      const categories = sortedChoices
        .filter(function isEqualToMaxChoices([, choices]) {
          return choices.length === maxChoices.length
        })
        .map(function getCategory([category]) {
          return category
        })

      this.gameResults = categories.map(this.getResultBy)
    },
    openResult() {
      this.openGameResult()
      this.showMainBody()
    },
    sendGaEventsOfChoices(choicesByCategory) {
      Object.values(choicesByCategory)
        .flat()
        .forEach((choice, idx) => {
          // ...thereafter processing is rate-limited to two event hits per second.
          setTimeout(() => {
            this.sendGaClickEvent({ label: choice })
          }, 1000 * idx)
        })
    },
    getResultBy(category) {
      return (
        this.contentApiData.game.result.possibleResults.find(
          function byCategory(result) {
            return result.category === category
          }
        ) || {}
      )
    },

    skipGame() {
      this.showMainBody()
      this.activateNavItem(NAV_ITEMS_IDS[1])
    },
    async replayGame() {
      this.openGame()
      await this.$nextTick()
      this.jumpToTop()
      this.scrollTo(NAV_ITEMS_IDS[0])
      this.canSendCreditGaEvent = false
    },
    handleSeeProfileStory() {
      this.scrollTo(NAV_ITEMS_IDS[1])
    },
    showMainBody() {
      this.closeGame()
      this.jumpToTop()
      this.canSendCreditGaEvent = true
    },
    openGame() {
      this.shouldOpenGame = true
      this.shouldOpenGameResult = false
    },
    closeGame() {
      this.shouldOpenGame = false
    },
    openGameResult() {
      this.shouldOpenGameResult = true
    },

    activateNavItem(id) {
      this.activeNavItemId = id
    },
    async handleClickNavItem(id) {
      switch (id) {
        case NAV_ITEMS_IDS[0]:
          if (!this.shouldOpenGame && !this.shouldOpenGameResult) {
            this.replayGame()
          } else {
            this.scrollTo(id)
          }
          break
        case NAV_ITEMS_IDS[1]:
          if (this.shouldOpenGame) {
            this.skipGame()
          } else {
            this.scrollTo(id)
          }
          break
        case NAV_ITEMS_IDS[2]:
          if (this.shouldOpenGame) {
            this.showMainBody()
            this.activateNavItem(NAV_ITEMS_IDS[1])
            await this.$nextTick()
          }
          this.scrollTo(id)
          break
      }
    },
    scrollTo(id) {
      this.activateNavItem(id)

      this.isAutoScrolling = true
      scrollIntoView(
        document.getElementById(id),
        {
          time: 450,
          align: {
            top: 0,
            topOffset: this.$refs.header.offsetHeight,
          },
          ease: function easeInQuad(t) {
            return t * t
          },
        },
        function onFinished() {
          setTimeout(() => {
            this.isAutoScrolling = false
            this.$data.$_scrollDirection_direction = 'up'
          }, 100)
        }.bind(this)
      )
    },
    jumpToTop() {
      window.scrollTo(0, 0)
    },

    async setupIndexesObserver() {
      this.indexesObserver = await setupIntersectionObserver(
        (entries) => {
          if (this.isAutoScrolling) {
            return
          }

          entries.forEach(({ isIntersecting, target }) => {
            if (isIntersecting) {
              if (!this.isScrollingDown) {
                this.activateNavItem(
                  NAV_ITEMS_IDS[NAV_ITEMS_IDS.indexOf(target.id) - 1]
                )
              }
            } else if (this.isScrollingDown) {
              this.activateNavItem(target.id)
            }
          })
        },
        {
          threshold: 1,
          rootMargin: `-${HEADER_HEIGHT_MD + 8}px 0px 0px 0px`,
        }
      )
    },

    sendGaEvent({ action, label, value }) {
      this.$ga.event('projects', action, label, value)
    },
    sendGaClickEvent({ label, value }) {
      this.sendGaEvent({ action: 'click', label, value })
    },
  },
}
</script>

<style lang="scss">
:root {
  --primary-color: #ffd41d;
  --secondary-color: #fff8db;
}

body {
  color: #2b2b2b;
}

.htcak {
  &-h1 {
    font-weight: 500;
    font-size: 28px;
    line-height: 36px;
    letter-spacing: 0.04em;
    @include media-breakpoint-up(md) {
      font-size: 32px;
      line-height: 44px;
    }
  }

  &-h2 {
    font-size: 24px;
    line-height: 36px;
    letter-spacing: 0.032em;
    font-weight: 500;

    @include media-breakpoint-up(md) {
      font-size: 28px;
      line-height: 40px;
    }
  }

  &-h3 {
    font-size: 20px;
    line-height: 30px;
    letter-spacing: 0.02em;
    font-weight: 500;
    @include media-breakpoint-up(md) {
      font-size: 22px;
    }
  }

  &-body {
    font-size: 18px;
    line-height: 36px;
    letter-spacing: 0.01em;
    font-weight: 300;
  }

  &-small {
    font-size: 16px;
    line-height: 24px;
    font-weight: 300;
  }
}

.report-article {
  &__title {
    &::after {
      content: '';
      display: block;
      background-color: #2b2b2b;
      width: 80px;
      height: 3px;
      margin: 12px auto 0 auto;
    }
  }
}

.report-extras {
  background-color: var(--secondary-color) !important;
}

a.sc-readr-donate-button {
  &::before {
    background-color: #2b2b2b;
  }

  div.sc-readr-donate-button {
    background-color: var(--primary-color);
    color: #161616;
    border-color: #fffcf5;

    &:hover {
      background-color: #161616;
      color: var(--primary-color);
    }

    &:active {
      color: #fffcf5;
    }
  }
}

readr-latest-coverages {
  h2.sc-readr-latest-coverages {
    background-color: var(--primary-color);
    color: #161616;
  }
}
</style>

<style lang="scss" scoped>
$header-height: 117px;
$header-height--md: 141px;

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  transition: transform 0.3s ease-out;

  &.hidden {
    transform: translateY(-100%);
  }

  .wrapper {
    min-height: 68.63px;
    background-color: #fff;
    @include media-breakpoint-up(md) {
      min-height: 84.63px;
    }

    &.yellow {
      background-color: var(--primary-color);
    }
  }
}

readr-header {
  &::v-deep {
    h1 svg * {
      fill: #2b2b2b;
    }
  }
}

.cover-wrapper {
  padding-top: $header-height;
  background-color: var(--primary-color);
  @include media-breakpoint-up(md) {
    padding-top: $header-height--md;
  }
}

.result {
  background-color: #fffcf5;
  padding-top: $header-height;
  @include media-breakpoint-up(md) {
    padding-top: $header-height--md;
  }
}

.donate-button {
  padding: 24px 24px 28px 20px;
  @include media-breakpoint-up(md) {
    padding: 48px 24px 52px 20px;
  }
  @include media-breakpoint-up(xl) {
    padding: 60px 24px 64px 20px;
  }
}

readr-donate-button {
  max-width: 476px;
  margin: 0 auto;
}

.latest-coverages {
  padding: 24px 8px;
  @include media-breakpoint-up(md) {
    padding: 48px 8px;
  }
  @include media-breakpoint-up(xl) {
    padding: 60px 8px;
  }
}

readr-latest-coverages {
  margin: 0 auto;
  max-width: 600px;
}

.fade-in {
  &-enter-active {
    transition: opacity 0.15s ease-in;
  }

  &-enter {
    opacity: 0;
  }
}
</style>
