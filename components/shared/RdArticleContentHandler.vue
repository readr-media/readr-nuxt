<script>
import RdParagraphWithAnnotation from '~/components/shared/RdParagraphWithAnnotation.vue'
import RdArticleImage from '~/components/shared/RdArticleImage.vue'
import RdArticleVideo from '~/components/shared/RdArticleVideo.vue'
import RdArticleBlockQuote from '~/components/shared/RdArticleBlockQuote.vue'
import RdArticleRecommend from '~/components/shared/RdArticleRecommend.vue'
import RdEmbeddedCode from '~/components/shared/RdEmbeddedCode.vue'

export default {
  name: 'RdArticleContentHandler',

  functional: true,
  components: {
    RdParagraphWithAnnotation,
    RdArticleImage,
    RdArticleVideo,
    RdArticleBlockQuote,
    RdArticleRecommend,
    RdEmbeddedCode,
  },
  props: {
    paragraph: {
      type: Object,
      reqired: true,
      default: undefined,
    },
    isSummary: {
      type: Boolean,
      default: false,
    },
  },
  render(h, { props }) {
    const content = props.paragraph?.content?.[0]
    const type = props.paragraph?.type
    switch (type) {
      case 'header-one':
      case 'header-two': {
        const tag = type === 'header-one' ? 'h1' : 'h2'
        return <tag class="g-article-heading" domPropsInnerHTML={content} />
      }
      case 'ordered-list-item': {
        // 由於 summary 的 ordered-list 資料結構有誤，暫時先以此寫法
        const data = props.isSummary ? props.paragraph.content : content
        if (typeof data === 'string') {
          return (
            <ol class="g-article-list order-list">
              <li domPropsInnerHTML={data} />
            </ol>
          )
        } else {
          return (
            <ol class="g-article-list order-list">
              {data.map((item) => {
                return <li domPropsInnerHTML={item} />
              })}
            </ol>
          )
        }
      }
      case 'unordered-list-item':
        if (typeof content === 'string') {
          return (
            <ul class="g-article-list unorder-list">
              <li domPropsInnerHTML={content} />
            </ul>
          )
        } else {
          return (
            <ul class="g-article-list unorder-list">
              {content.map((item) => {
                return <li domPropsInnerHTML={item} />
              })}
            </ul>
          )
        }
      case 'embeddedcode':
        return (
          <RdEmbeddedCode class="g-article-embedded-code" content={content} />
        )
      case 'annotation':
        return (
          <div class="g-article-annotation">
            <RdParagraphWithAnnotation content={content} />
          </div>
        )
      case 'quoteby':
        return <RdArticleBlockQuote class="g-quote-by" content={content} />
      case 'video': {
        const poster = content?.coverPhote?.urlMobileSized ?? ''
        return (
          <RdArticleVideo
            class="g-article-video"
            videoSrc={content.url}
            poster={poster}
          />
        )
      }
      case 'image':
        return <RdArticleImage class="g-article-image" image={content} />
      case 'recommend':
        return (
          <RdArticleRecommend class="g-article-recommend" content={content} />
        )
      case 'unstyled':
        return <p class="g-article-paragraph" domPropsInnerHTML={content} />
      default:
        return undefined
    }
  },
}
</script>
<style lang="scss" scoped>
.g-article {
  &-heading {
    font-size: 24px;
    font-weight: 700;
    line-height: 1.5;
    letter-spacing: 0.032em;
    color: #000928;
    @include media-breakpoint-up(md) {
      font-size: 28px;
    }
  }
  &-paragraph {
    font-size: 18px;
    line-height: 2;
    letter-spacing: 0.01em;
    text-align: justify;
    color: rgba(0, 9, 40, 0.87);
    > * {
      max-width: 100%;
    }
  }
  &-annotation {
    text-align: justify;
    line-height: 1.75;
    letter-spacing: 0.01em;
    color: rgba(0, 9, 40, 0.87);
    &::v-deep {
      .paragraph-with-annotation {
        font-size: 18px;
        line-height: 2;
      }
      .toggle {
        background-color: #f6f6fb;
      }
      .annotation {
        border-radius: 2px;
        background-color: #f6f6fb;
        padding: 12px 24px;
        @include media-breakpoint-up(md) {
          padding: 16px 32px;
        }
      }
    }
  }
  &-embedded-code {
    max-width: 100%;
  }
  &-paragraph,
  &-quote-by,
  &-annotation {
    &::v-deep {
      a {
        display: inline;
        border-bottom: 2px solid #ebf02c;
        &:hover {
          color: #000928;
          border-bottom: 2px solid #04295e;
        }
      }
    }
  }
  &-list {
    margin-top: 0;
    padding-left: 1.2rem;
    &.order-list {
      list-style-type: decimal;
    }
    &.unorder-list {
      list-style-type: disc;
    }
    li {
      color: #000;
      font-size: 18px;
      line-height: 2;
      letter-spacing: 0.01em;
      text-align: justify;
      color: rgba(0, 9, 40, 0.87);
      &::v-deep {
        a {
          display: inline;
          border-bottom: 2px solid #ebf02c;
          &:hover {
            color: #000928;
            border-bottom: 2px solid #04295e;
          }
        }
      }
    }
    li + li {
      margin: 4px 0 0;
    }
  }
}
</style>
