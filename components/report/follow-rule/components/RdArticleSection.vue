<script>
import RdReportArticle from '~/components/app/Report/RdReportArticle.vue'
import RdFullSlides from '~/components/report/follow-rule/components/RdFullSlides.vue'
import RdSlideCard from '~/components/report/follow-rule/components/RdSlideCard.vue'

export default {
  components: {
    RdReportArticle,
  },
  props: {
    sectionArticle: {
      type: Object,
      default: () => {},
    },
    loadScrollMagicScriptTimes: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      contentGroup: [],
    }
  },

  computed: {
    viewportHeight() {
      return this.$store.getters['viewport/viewportHeight']
    },
  },

  mounted() {
    this.groupContent(this.splitUnderline(this.sectionArticle))
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
    sendGaEvent({ action, label }) {
      this.$ga.event('projects', action, label)
    },
    groupContent(contents) {
      let contentStore = []
      contents.forEach((content) => {
        if (content.type === 'fullSlides' || content.type === 'cards') {
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
    buildContent(content) {
      if (content.type === 'normal') {
        return (
          <RdReportArticle
            contents={content.content}
            slug="follow-rule"
            processBarHeight="processBarHeight"
            loadScrollMagicScriptTimes="loadScrollMagicScriptTimes"
            isPart={true}
            sendGaEvent={() => this.sendGaEvent}
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

        default: {
          return (
            <RdSlideCard
              cards={contentValue.value}
              processBarHeight={this.processBarHeight}
              loadScrollMagicScriptTimes={this.loadScrollMagicScriptTimes}
            />
          )
        }
      }
    },
  },

  render() {
    return (
      <article>
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
