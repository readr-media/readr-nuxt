<template>
  <div class="multiple-choice">
    <!-- eslint-disable-next-line vue/no-v-html -->
    <h2 class="htcak-h2" v-html="title"></h2>

    <div class="container">
      <div v-for="issue in cmsData.issues" :key="issue.title" class="choices">
        <h3 class="htcak-body">{{ issue.title }}</h3>
        <div class="wrapper">
          <template v-for="category in issue.categories">
            <label
              v-for="keyword in category.keywords"
              :id="keyword"
              :key="keyword"
              class="htcak-small"
              :class="getKeywordClassList(keyword)"
            >
              <input
                v-model="checkedChoicesByCategory[category.name]"
                type="checkbox"
                :disabled="shouldDisable(keyword)"
                :value="keyword"
              />
              <div>{{ keyword }}</div>
            </label>
          </template>
        </div>
      </div>
    </div>

    <div class="bag-wrapper">
      <img
        ref="bag"
        :class="{ shown: bagState === 'open' }"
        src="~/assets/report/how-to-choose-a-kindergarten/bag-open.png"
        alt=""
        @animationend="handleAnimationend"
      />
      <img
        :class="{ shown: bagState === 'mid' }"
        src="~/assets/report/how-to-choose-a-kindergarten/bag-mid.png"
        alt=""
      />
      <img
        :class="{ shown: bagState === 'close' }"
        src="~/assets/report/how-to-choose-a-kindergarten/bag-close.png"
        alt=""
      />
    </div>

    <RdButton
      text="確認送出"
      class="multiple-choice__btn"
      :shouldDisable="!canSubmit"
      @click.native="submit"
    />
    <RdButtonUnderline text="跳過遊戲看報導" @click.native="handleSkip" />
  </div>
</template>

<script>
import RdButton from './RdButton.vue'
import RdButtonUnderline from './RdButtonUnderline.vue'

export default {
  name: 'RdMultipleChoice',

  components: {
    RdButton,
    RdButtonUnderline,
  },

  props: {
    cmsData: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    playTimes: {
      type: Number,
      required: true,
      default: undefined,
    },
  },

  data() {
    return {
      checkedChoicesByCategory: {},
      bagState: 'open',
      isSubmitting: false,
    }
  },

  computed: {
    checkedChoices() {
      return Object.values(this.checkedChoicesByCategory).flat()
    },
    canSubmit() {
      return this.checkedChoices.length >= Number(this.cmsData.minChoices)
    },
    title() {
      return this.cmsData.title.replace(/\n/g, '<br />')
    },
  },

  beforeMount() {
    this.initCheckedChoicesByCategory()
  },

  methods: {
    initCheckedChoicesByCategory() {
      this.checkedChoicesByCategory = this.cmsData.issues
        .flatMap(function (subject) {
          return subject.categories.map(function (category) {
            return category.name
          })
        })
        .reduce(function (obj, name) {
          obj[name] = []
          return obj
        }, {})
    },
    getKeywordClassList(keyword) {
      return {
        checked: this.isChecked(keyword),
        disabled: this.shouldDisable(keyword),
      }
    },
    isChecked(keyword) {
      return this.checkedChoices.includes(keyword)
    },
    shouldDisable(keyword) {
      return (
        !this.isChecked(keyword) &&
        this.checkedChoices.length >= Number(this.cmsData.maxChoices)
      )
    },

    submit() {
      if (this.isSubmitting) {
        return
      }
      this.isSubmitting = true

      const { bag } = this.$refs
      const { x: bagX, y: bagY } = getCentre(bag)
      const keywords = this.checkedChoices.map(function (keyword) {
        const dom = document.getElementById(keyword)
        return { pos: getCentre(dom), dom }
      })
      keywords.forEach(function ({ pos: { x: keywordX, y: keywordY }, dom }) {
        const directionX = keywordX > bagX ? -1 : 1
        const distance = {
          x: getDistance(bagX, keywordX),
          y: getDistance(bagY, keywordY),
        }
        const translate = { x: 0, y: 0 }
        const initialRotate = getRandomBetween(70, 90) * directionX
        const initialScale = 1

        animate({
          duration: 1350,
          timing: function easeOutQuad(t) {
            return t * (2 - t)
          },
          draw(progress) {
            const rotate = initialRotate * progress
            const scale = initialScale - progress

            if (distance.x !== 0) {
              translate.x = distance.x * directionX * progress
              translate.y =
                (distance.y / Math.pow(distance.x, 2)) *
                Math.pow(translate.x, 2)
            } else {
              translate.y = distance.y * progress
            }

            dom.style.transform = `translate(${translate.x}px, ${translate.y}px) rotate(${rotate}deg) scale(${scale})`
          },
          onComplete() {
            bag.classList.add('shake')
          },
        })
      })

      this.emitSendGaEvent({ label: 'send game result', value: this.playTimes })
    },
    async handleAnimationend() {
      this.bagState = 'mid'
      await delay(600)
      this.bagState = 'close'
      await delay(600)
      this.$emit('submitChoices', this.checkedChoicesByCategory)
      this.isSubmitting = false
    },
    handleSkip() {
      this.$emit('skip')
      this.emitSendGaEvent({ label: 'skip game' })
    },
    emitSendGaEvent({ action = 'click', label, value }) {
      this.$emit('sendGaEvent', { action, label, value })
    },
  },
}

function getCentre(dom) {
  const { left, right, top, bottom } = dom.getBoundingClientRect()
  const x = (left + right) / 2
  const y = (top + bottom) / 2
  return { x, y }
}

function getDistance(pos1, pos2) {
  return Math.abs(pos1 - pos2)
}

function getRandomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function animate({
  duration = 600,
  delay = 0,
  timing = function linear(timeFraction) {
    return timeFraction
  },
  draw,
  onComplete,
}) {
  const start = performance.now()

  requestAnimationFrame(function animate(time) {
    if (time - start <= delay) {
      requestAnimationFrame(animate)
      return
    }

    // timeFraction goes from 0 to 1
    let timeFraction = (time - start) / duration
    if (timeFraction > 1) {
      timeFraction = 1
    }

    // calculate the current animation state
    const progress = timing(timeFraction)

    // draw it
    draw(progress)

    if (timeFraction < 1) {
      requestAnimationFrame(animate)
    } else {
      onComplete()
    }
  })
}

function delay(timeout = 0) {
  return new Promise(function (resolve) {
    setTimeout(() => {
      resolve(undefined)
    }, timeout)
  })
}
</script>

<style lang="scss" scoped>
.multiple-choice {
  text-align: center;
  padding: 48px 20px;
  background-color: #fffcf5;
  @include media-breakpoint-up(md) {
    padding: 48px 120px;
  }
  @include media-breakpoint-up(xl) {
    padding: 60px 120px;
  }

  &__btn {
    max-width: 276px;
    display: block;
    margin: 0 auto 20px auto;
  }
}

h2 {
  margin-bottom: 24px;
  @include media-breakpoint-up(md) {
    margin-bottom: 48px;
  }
  @include media-breakpoint-up(xl) {
    margin-bottom: 60px;
  }

  &::v-deep {
    strong {
      font-weight: 500;
      color: #161616;
      background-color: var(--primary-color);
      padding: 0 4px;
      margin: 0 4px;
    }
    @include media-breakpoint-up(md) {
      br {
        display: none;
      }
    }
  }
}

.container {
  @include media-breakpoint-up(xl) {
    display: flex;
    justify-content: space-between;
    max-width: 1184px;
    margin: 0 auto 48px auto;
  }
}

h3 {
  margin-bottom: 8px;
}

.choices {
  margin-bottom: 40px;
  @include media-breakpoint-up(md) {
    margin-bottom: 60px;
  }
  @include media-breakpoint-up(xl) {
    width: calc(50% - 32px);
    margin-bottom: 0;
  }

  &:last-of-type {
    margin-bottom: 24px;
    @include media-breakpoint-up(md) {
      margin-bottom: 60px;
    }
    @include media-breakpoint-up(xl) {
      margin-bottom: 0;
    }
  }
}

.wrapper {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 -8px;
  @include media-breakpoint-up(md) {
    margin: 0 -7px;
    padding-top: 4px;
  }
}

label {
  background-color: var(--secondary-color);
  border: 1px solid rgba(255, 212, 29, 0.2);
  box-shadow: 0px 0px 8px -2px rgba(255, 212, 29, 0.5);
  padding: 8px 12px;
  margin: 16px 8px 0 8px;
  cursor: pointer;
  user-select: none;
  z-index: 9;
  @include media-breakpoint-up(md) {
    font-size: 18px;
    line-height: 34px;
    padding: 8px 24px;
    margin: 20px 7px 0 7px;
  }

  &.checked {
    z-index: 19;
  }

  &.checked,
  &:hover:not(.disabled) {
    border-color: #2b2b2b;
    box-shadow: none;
    background-color: var(--primary-color);
    color: #161616;
    font-weight: 500;
    transition: border-color 0.3s, background-color 0.3s, color 0.3s;
  }

  &.disabled {
    background-color: #e0e0e0;
    border-color: rgba(43, 43, 43, 0.2);
    color: rgba(#2b2b2b, 0.2);
    box-shadow: none;
    cursor: not-allowed;
  }
}

input {
  display: none;
}

.bag-wrapper {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto 24px auto;
  @include media-breakpoint-up(md) {
    width: 150px;
    height: 150px;
  }
}

img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.45s linear;

  &.shake {
    animation: shake 0.3s ease-out;
    @keyframes shake {
      0% {
        transform: translateY(8px);
      }
      50% {
        transform: translateY(-4px);
      }
      100% {
        transform: translateY(0);
      }
    }
  }

  &.shown {
    opacity: 1;
  }
}
</style>
