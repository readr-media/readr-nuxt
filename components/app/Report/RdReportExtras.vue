<script>
import RdTitle from '~/components/shared/RdTitle.vue'
import RdUnorderedList from '~/components/shared/RdUnorderedList.vue'
import RdQandA from '~/components/shared/RdQandA.vue'

import intersect from '~/components/helpers/directives/intersect.js'

import {
  setupIntersectionObserver,
  cleanupIntersectionObserver,
} from '~/components/helpers/index.js'

export default {
  name: 'RdReportExtras',

  directives: {
    intersect,
  },

  props: {
    contents: {
      type: Array,
      required: true,
      default: () => [],
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
              class="report-extras__title"
              text={content.value}
            />
          )

        case 'unordered-list':
          return (
            <RdUnorderedList
              class="report-extras__unordered-list"
              items={content.value}
            />
          )

        case 'qAndA':
          return (
            <RdQandA
              contents={content.value}
              onSendGaEvent={(fields) => {
                this.$emit('sendGaEvent', fields)
              }}
            />
          )

        default:
          return (
            <p
              class="report-extras__paragraph"
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
      <div class="report-extras">
        <div class="container">{this.contents.map(this.buildContent)}</div>
      </div>
    )
  },
}
</script>

<style lang="scss" scoped>
.report-extras {
  color: #161616;
  background-color: #fffcf5;
  padding: 48px 20px;
  @include media-breakpoint-up(md) {
    padding: 48px 100px;
  }
  @include media-breakpoint-up(md) {
    padding: 60px 100px;
  }

  &__title {
    margin: 96px 0 24px 0;
    @include media-breakpoint-up(md) {
      margin: 96px 0 32px 0;
    }
    @include media-breakpoint-up(xl) {
      margin: 120px 0 40px 0;
    }

    + * {
      margin-top: 0 !important;
    }
  }

  &__unordered-list {
    margin: 32px 0;
  }

  &__paragraph {
    font-size: 18px;
    line-height: 36px;
    text-align: justify;
    letter-spacing: 0.01em;
    font-weight: 300;
    margin: 32px 0;

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
