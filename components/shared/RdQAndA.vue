<script>
import RdParagraphWithAnnotation from '~/components/shared/RdParagraphWithAnnotation.vue'
import SvgOpen from '~/assets/open.svg?inline'
import SvgClose from '~/assets/close.svg?inline'

export default {
  name: 'RdQAndA',

  props: {
    contents: {
      type: Array,
      required: true,
      default: () => [],
    },
  },

  data() {
    return {
      shouldOpenAnswers: [],
      wereGaEventsSent: [],
    }
  },

  beforeMount() {
    this.initData()
  },

  methods: {
    initData() {
      const { length } = this.contents
      this.shouldOpenAnswers = Array(length).fill(false)
      this.wereGaEventsSent = Array(length).fill(false)
    },

    buildContent(content, idx) {
      const shouldOpenAnswer = this.shouldOpenAnswers[idx]

      return (
        <article>
          <div
            class="q-and-a__question"
            vOn:click={() => {
              this.handleClick(idx)
            }}
          >
            <h1>{content.question}</h1>
            {shouldOpenAnswer ? <SvgClose /> : <SvgOpen />}
          </div>
          {shouldOpenAnswer && content.answer.map(this.buildAnswer)}
        </article>
      )
    },
    buildAnswer(content) {
      switch (content.type) {
        case 'title':
          return <h2 class="q-and-a__title">{content.value}</h2>

        case 'annot':
          return (
            <RdParagraphWithAnnotation
              class="q-and-a__paragraph"
              content={content.value}
            />
          )

        default:
          return (
            <p class="q-and-a__paragraph" domPropsInnerHTML={content.value}></p>
          )
      }
    },
    handleClick(idx) {
      this.$set(this.shouldOpenAnswers, idx, !this.shouldOpenAnswers[idx])

      if (!this.wereGaEventsSent[idx]) {
        this.$emit('sendGaEvent', { action: 'click', label: `提問${idx + 1}` })
        this.$set(this.wereGaEventsSent, idx, true)
      }
    },
  },

  render() {
    return <div class="q-and-a">{this.contents.map(this.buildContent)}</div>
  },
}
</script>

<style lang="scss" scoped>
.q-and-a {
  color: #161616;

  &__question {
    font-size: 18px;
    line-height: 27px;
    letter-spacing: 0.01em;
    padding: 16px 0;
    border-bottom: 1px solid #2b2b2b;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    cursor: pointer;
    user-select: none;

    svg {
      width: 18px;
      height: auto;
      margin-left: 20px;
      flex-shrink: 0;
    }
  }

  &__title {
    margin: 16px 0 8px 0;
    font-size: 16px;
    line-height: 24px;

    + * {
      margin-bottom: 0 !important;
    }
  }

  &__paragraph {
    font-size: 18px;
    line-height: 36px;
    text-align: justify;
    letter-spacing: 0.01em;
    font-weight: 300;

    + .q-and-a__paragraph {
      margin-top: 36px;
    }

    &::v-deep {
      a {
        border-bottom: 1px solid currentColor;

        &:hover {
          font-weight: 500;
        }
      }

      strong {
        font-weight: 500;
      }
    }
  }
}

::v-deep {
  readr-annotation {
    .toggle,
    .annotation {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
}

article + article {
  margin-top: 24px;
}

h1,
h2 {
  font-weight: 500;
}
</style>
