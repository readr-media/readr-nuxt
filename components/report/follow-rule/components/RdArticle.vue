<script>
import RdReportArticle from '~/components/app/Report/RdReportArticle.vue'
import RdFullSlides from '~/components/report/follow-rule/components/RdFullSlides.vue'
import RdSlideCard from '~/components/report/follow-rule/components/RdSlideCard.vue'
import { intersect } from '~/helpers/vue/directives/index.js'
import {
  setupIntersectionObserver,
  cleanupIntersectionObserver,
} from '~/helpers/index.js'

export default {
  directives: {
    intersect,
  },
  components: {
    RdReportArticle,
  },
  data() {
    return {
      contentGroup: [],
      customObserver: undefined,
    }
  },
  props: {
    cmsData: {
      type: Object,
      default: () => {},
    },
    processBarHeight: {
      type: Number,
      default: 0,
    },
    loadScrollMagicScriptTimes: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    viewportHeight() {
      return this.$store.getters['viewport/viewportHeight']
    },
  },

  mounted() {
    this.groupContent(this.splitUnderline(this.cmsData.contentApiData.article))
    this.setupCustomObserver()
  },

  beforeDestroy() {
    cleanupIntersectionObserver(this, 'customObserver')
  },

  methods: {
    splitUnderline(contents) {
      contents = contents.map((content) => {
        if (typeof content.value !== 'string') return content
        const underlineContent = content.value.match(/<u*.*>*.*<\/u>/)
        if (underlineContent) {
          const newContent =
            '<u>' +
            underlineContent[0]
              .split('')
              .slice(3, underlineContent.length - 5)
              .join('</u><u>') +
            '</u>'
          content.value = content.value.replace(/<u*.*>*.*<\/u>/, newContent)
        }
        return content
      })
      return contents
    },
    handleEnterLeave(e) {
      console.log(123)
      console.log(e)
    },
    groupContent(contents) {
      let contentStore = []
      contents.forEach((content) => {
        if (
          content.type === 'fullSlides' ||
          content.type === 'cards' ||
          content.type === 'observer'
        ) {
          if (contentStore[0]) {
            this.contentGroup.push({ type: 'normal', content: contentStore })
            contentStore = []
          }
          this.contentGroup.push({ type: 'custom', content: [content] })
        } else {
          contentStore.push(content)
        }
      })
      if (contentStore[0])
        this.contentGroup.push({ type: 'normal', content: contentStore })
    },
    async setupCustomObserver() {
      const rootMove = this.viewportHeight - 350
      this.customObserver = await setupIntersectionObserver(
        (entries) => {
          entries.forEach(({ isIntersecting, target }) => {
            if (isIntersecting) {
              console.log(target)
              this.$emit('chaneParagraph', target.id)
            }
          })
        },
        {
          rootMargin: `${this.viewportHeight - 300}px 0px -${rootMove}px 0px`,
        }
      )
    },
    buildContent(content) {
      if (content.type === 'normal') {
        return (
          <RdReportArticle
            contents={content.content}
            slug="follow-rule"
            processBarHeight="processBarHeight"
            loadScrollMagicScriptTimes="loadScrollMagicScriptTimes"
            isPart="true"
            // sendGaEvent={() => this.sendGaEvent}
          />
        )
      }

      const contentValue = content.content[0]
      switch (contentValue.type) {
        case 'fullSlides': {
          return (
            <RdFullSlides
              slides={contentValue.value}
              loadScrollMagicScriptTimes={this.loadScrollMagicScriptTimes}
            />
          )
        }

        case 'cards': {
          return (
            <RdSlideCard
              cards={contentValue.value}
              processBarHeight={this.processBarHeight}
              loadScrollMagicScriptTimes={this.loadScrollMagicScriptTimes}
            />
          )
        }

        default: {
          const id = contentValue.value
          return <p vIntersect={this.customObserver} id={id}></p>
        }
      }
    },
  },

  render() {
    return (
      <article class="article">
        <div>{this.contentGroup.map(this.buildContent)}</div>
      </article>
    )
  },
}
</script>

<style lang="scss" scoped>
.article {
  padding: 48px 20px;
  color: #000000;
  background-color: rgba(254, 234, 223, 1);
  @include media-breakpoint-up(md) {
    padding: 48px 100px;
  }
  @include media-breakpoint-up(xl) {
    padding: 60px 100px;
  }
}
.report-article::v-deep {
  padding: 0;
  a {
    color: rgba(40, 221, 177, 1);
  }

  .paragraph-with-annotation {
    .toggle {
      background: #ffffff;
      border: 1px solid rgba(40, 221, 177, 1);

      path {
        fill: #28ddb1;
      }
    }

    .annotation {
      background: rgba(17, 17, 17, 1);
      background: rgba(40, 221, 177, 1);
      border: 1px solid rgba(0, 0, 0, 1);
    }
  }

  .container {
    > :first-child {
      margin-top: 48px !important;
    }

    > :last-child {
      margin-bottom: 0 !important;
    }
  }
}
</style>
