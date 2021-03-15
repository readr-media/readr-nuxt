<template>
  <div class="choice-result">
    <RdMainTitle text="選擇結果" class="choice-result__main-title" />

    <div v-for="(result, idx) in results" :key="result.category" class="result">
      <img
        width="96"
        height="96"
        :src="
          require(`~/assets/report/how-to-choose-a-kindergarten/${result.imgName}.png`)
        "
        alt=""
      />

      <div
        :id="`summary${idx}`"
        v-intersect="summariesObserver"
        class="summary"
      >
        <p>
          <span class="htcak-h3">你很在意</span
          ><span><strong class="htcak-h1 topic"></strong></span>
        </p>
        <p>
          <span><strong class="htcak-h1 percents"></strong></span
          ><span class="htcak-h3">和你一樣在乎這件事</span>
        </p>
      </div>

      <p class="htcak-body description">
        {{ result.description }}
      </p>
    </div>

    <RdButton
      v-intersect="buttonObserver"
      text="看專題報導"
      class="choice-result__btn"
      @click.native="handleSeeProfileStory"
    />
    <RdButtonUnderline text="重玩一次" @click.native="handleReplay" />
  </div>
</template>

<script>
import { init } from 'ityped'

import RdMainTitle from './RdMainTitle.vue'
import RdButton from './RdButton.vue'
import RdButtonUnderline from './RdButtonUnderline.vue'

import intersect from '~/components/helpers/directives/intersect.js'

import {
  setupIntersectionObserver,
  cleanupIntersectionObserver,
} from '~/components/helpers/index.js'

export default {
  name: 'RdChoiceResult',

  components: {
    RdMainTitle,
    RdButton,
    RdButtonUnderline,
  },

  directives: {
    intersect,
  },

  props: {
    results: {
      type: Array,
      required: true,
      default: () => [],
    },
  },

  data() {
    return {
      summariesObserver: undefined,
      buttonObserver: undefined,
    }
  },

  mounted() {
    this.setupSummariesObserver()
    this.setupButtonObserver()
  },

  beforeDestroy() {
    cleanupIntersectionObserver(this, 'summariesObserver')
    cleanupIntersectionObserver(this, 'buttonObserver')
  },

  methods: {
    async setupSummariesObserver() {
      this.summariesObserver = await setupIntersectionObserver((entries) => {
        entries.forEach(({ isIntersecting, target }) => {
          if (isIntersecting) {
            this.typeTopicAndPercents(target.id.slice(-1))
            this.summariesObserver.unobserve(target)
          }
        })
      })
    },
    typeTopicAndPercents(idx) {
      const summarySelector = `#summary${idx}`
      const result = this.results[idx]
      const options = {
        typeSpeed: 90,
        disableBackTyping: true,
        showCursor: false,
        startDelay: 300,
      }

      init(document.querySelector(`${summarySelector} .topic`), {
        ...options,
        strings: [result.topic],
        onFinished: function typePercents() {
          init(document.querySelector(`${summarySelector} .percents`), {
            ...options,
            strings: [`有 ${result.percents}% 的家長`],
          })
        },
      })
    },
    handleSeeProfileStory() {
      this.$emit('seeProfileStory')
      this.emitSendGaEvent('看專題報導')
    },
    handleReplay() {
      this.$emit('replayGame')
      this.emitSendGaEvent('play again')
    },
    emitSendGaEvent(label, action = 'click') {
      this.$emit('sendGaEvent', { label, action })
    },
    async setupButtonObserver() {
      this.buttonObserver = await setupIntersectionObserver((entries) => {
        entries.forEach(({ isIntersecting, target }) => {
          if (isIntersecting) {
            this.emitSendGaEvent('scroll to 遊戲結果「專題報導」', 'scroll')
            this.buttonObserver.unobserve(target)
          }
        })
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.choice-result {
  padding: 48px 20px;
  text-align: center;
  @include media-breakpoint-up(xl) {
    padding: 60px 20px;
  }

  &__main-title {
    margin-bottom: 24px;
    @include media-breakpoint-up(md) {
      margin-bottom: 36px;
    }
    @include media-breakpoint-up(xl) {
      margin-bottom: 48px;
    }
  }

  &__btn {
    max-width: 276px;
    display: block;
    margin: 0 auto 20px auto;
  }
}

img {
  width: 96px;
  margin: 0 auto 24px auto;
  @include media-breakpoint-up(md) {
    width: 120px;
  }
}

.result {
  margin-bottom: 48px;
}

.summary {
  margin-bottom: 24px;
  @include media-breakpoint-up(md) {
    margin-bottom: 48px;
  }

  p {
    margin-bottom: 20px;
    @include media-breakpoint-up(md) {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  span {
    display: block;

    + span {
      margin: 12px 0 0 0;
      @include media-breakpoint-up(md) {
        margin: 0 0 0 8px;
      }
    }
  }

  strong {
    color: var(--primary-color);
    background-color: #2b2b2b;
    padding: 2px 4px;
  }
}

.htcak-body {
  text-align: left;
}

.description {
  max-width: 600px;
  margin: 0 auto;
}
</style>
