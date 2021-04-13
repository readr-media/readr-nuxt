<script>
import LazyRenderer from 'vue-lazy-renderer'
import RdTitle from '~/components/shared/RdTitle.vue'
import RdParagraphWithAnnotation from '~/components/shared/RdParagraphWithAnnotation.vue'
import RdInfogram from '~/components/shared/RdInfogram.vue'
import RdFlourish from '~/components/shared/RdFlourish.vue'
import RdReportQuiz from '~/components/shared/RdReportQuiz.vue'

import intersect from '~/components/helpers/directives/intersect.js'

import {
  setupIntersectionObserver,
  cleanupIntersectionObserver,
} from '~/components/helpers/index.js'
import styleVariables from '~/scss/_variables.module.scss'

export default {
  name: 'RdReportArticle',

  directives: {
    intersect,
  },

  props: {
    contents: {
      type: Array,
      required: true,
      default: () => [],
    },
    slug: {
      type: String,
      required: true,
      default: undefined,
    },
  },

  data() {
    return {
      scrollDepthObserver: undefined,
    }
  },

  mounted() {
    this.setupScrollDepthObserver()
  },

  beforeDestroy() {
    cleanupIntersectionObserver(this, 'scrollDepthObserver')
  },

  methods: {
    buildContent(content) {
      switch (content.type) {
        case 'title':
          return (
            <RdTitle
              vIntersect={this.scrollDepthObserver}
              class="report-article__title"
              text={content.value}
            />
          )

        case 'subtitle':
          return (
            <h3
              vIntersect={this.scrollDepthObserver}
              class="report-article__subtitle"
            >
              {content.value}
            </h3>
          )

        case 'picture': {
          const { id } = content.value

          return (
            <LazyRenderer tagName="picture" class="report-article__picture">
              <div
                style="visibility: hidden; height: 0"
                vIntersect={this.scrollDepthObserver}
              >
                靜態圖 {id}
              </div>
              <source
                media={`(min-width: ${styleVariables['breakpoint-sm']})`}
                srcset={require(`~/assets/report/${this.slug}/report-article-picture-${id}-sm.png`)}
              />
              <img
                src={require(`~/assets/report/${this.slug}/report-article-picture-${id}.png`)}
                alt=""
              />
            </LazyRenderer>
          )
        }

        case 'annot':
          return (
            <RdParagraphWithAnnotation
              class="report-article__paragraph"
              content={content.value}
            />
          )

        case 'infogram': {
          const { id, title } = content.value

          return (
            <LazyRenderer class="report-article__infogram" preLoad={2}>
              <RdInfogram chartId={id} title={title} />
            </LazyRenderer>
          )
        }

        case 'flourish': {
          const { id = '', title = '', info = '' } = content.value
          return (
            <LazyRenderer class="report-article__flourish" preLoad={2}>
              <div
                style="visibility: hidden; height: 0"
                vIntersect={this.scrollDepthObserver}
              >
                flourish {title}
              </div>
              <RdFlourish chartId={id} title={title} info={info} />
            </LazyRenderer>
          )
        }

        case 'articleQuiz': {
          const {
            title = '',
            description = '',
            options = [
              { text: '', type: 'optionWrong' },
              { text: '', type: 'optionCorrect' },
            ],
            answerDetailTitleCorrect = '',
            answerDetailTitleWrong = '',
            answerDetailDescription = '',
          } = content.value

          return (
            <LazyRenderer class="report-article__article-quiz" preLoad={2}>
              <div
                style="visibility: hidden; height: 0"
                vIntersect={this.scrollDepthObserver}
              >
                article quiz {title}
              </div>
              <RdReportQuiz
                quizTitle={title}
                quizDescription={description}
                quizOptions={options}
                quizDetailTitleCorrect={answerDetailTitleCorrect}
                quizDetailTitleWrong={answerDetailTitleWrong}
                quizDetailDescription={answerDetailDescription}
              />
            </LazyRenderer>
          )
        }

        default:
          return (
            <p
              class="report-article__paragraph"
              domPropsInnerHTML={content.value}
            ></p>
          )
      }
    },

    async setupScrollDepthObserver() {
      this.scrollDepthObserver = await setupIntersectionObserver((entries) => {
        entries.forEach(({ isIntersecting, target }) => {
          if (isIntersecting) {
            const title = target.textContent
            this.$emit('sendGaEvent', {
              action: 'scroll',
              label: `scroll to ${title}`,
            })
            this.scrollDepthObserver.unobserve(target)
          }
        })
      })
    },
  },

  render() {
    return (
      <article class="report-article">
        <div class="container">{this.contents.map(this.buildContent)}</div>
      </article>
    )
  },
}
</script>

<style lang="scss" scoped>
.report-article {
  padding: 48px 20px;
  color: #2b2b2b;
  background-color: #fffcf5;
  @include media-breakpoint-up(md) {
    padding: 48px 100px;
  }
  @include media-breakpoint-up(xl) {
    padding: 60px 100px;
  }

  &__title {
    margin: 48px 0 24px 0;
    @include media-breakpoint-up(md) {
      margin: 48px 0 32px 0;
    }
    @include media-breakpoint-up(xl) {
      margin: 60px 0 40px 0;
    }

    + * {
      margin-top: 0 !important;
    }
  }

  &__subtitle {
    font-size: 24px;
    font-weight: 500;
    text-align: center;
    line-height: 36px;
    margin: 48px 0 16px 0;
    letter-spacing: 0.032em;
    @include media-breakpoint-up(md) {
      font-size: 28px;
      line-height: 40px;
      margin: 60px 0 20px 0;
    }

    + * {
      margin-top: 0 !important;
    }
  }

  &__picture img {
    width: 100%;
  }

  &__picture,
  &__infogram {
    margin: 32px -20px;
  }

  &__paragraph {
    font-size: 18px;
    line-height: 36px;
    margin: 32px 0;
    letter-spacing: 0.01em;
    font-weight: 300;
    text-align: justify;

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

.container {
  max-width: 600px;
  margin: 0 auto;

  > :first-child {
    margin-top: 0 !important;
  }

  > :last-child {
    margin-bottom: 0 !important;
  }
}
</style>
