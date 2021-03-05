<script>
import RdTitle from '~/components/shared/RdTitle.vue'
import RdUnorderedList from '~/components/shared/RdUnorderedList.vue'

export default {
  name: 'RdReportExtras',

  props: {
    sections: {
      type: Array,
      required: true,
      default: () => [],
    },
  },

  methods: {
    buildSection(section) {
      return (
        <section>
          <RdTitle class="report-extras__title" text={section.title} />
          {section.contents.map(this.buildContent)}
        </section>
      )
    },
    buildContent(content) {
      switch (content.type) {
        case 'unordered-list':
          return (
            <RdUnorderedList
              class="report-extras__unordered-list"
              items={content.value}
            />
          )

        default:
          return <p domPropsInnerHTML={content.value}></p>
      }
    },
  },

  render() {
    return (
      <div class="report-extras">{this.sections.map(this.buildSection)}</div>
    )
  },
}
</script>

<style lang="scss" scoped>
.report-extras {
  color: #161616;
  background-color: #fffcf5;

  &__title {
    margin: 48px 0 24px 0;
    @include media-breakpoint-up(md) {
      margin: 48px 0 32px 0;
    }
    @include media-breakpoint-up(xl) {
      margin: 60px 0 24px 0;
    }

    + * {
      margin-top: 0 !important;
    }
  }

  &__unordered-list {
    margin: 32px 0;
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

section {
  padding: 48px 20px;
  max-width: 600px;
  box-sizing: content-box;
  margin: 0 auto;
  @include media-breakpoint-up(md) {
    padding: 48px 100px;
  }
  @include media-breakpoint-up(md) {
    padding: 60px 100px;
  }

  > :first-child {
    margin-top: 0 !important;
  }

  > :last-child {
    margin-bottom: 0 !important;
  }
}

p {
  font-size: 18px;
  line-height: 36px;
  text-align: justify;
  letter-spacing: 0.01em;
  font-weight: 300;
  margin: 32px 0;
}
</style>
