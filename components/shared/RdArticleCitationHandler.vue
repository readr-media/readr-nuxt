<script>
export default {
  name: 'RdArticleCitationHandler',

  functional: true,
  props: {
    paragraph: {
      type: Object,
      reqired: true,
      default: undefined,
    },
  },
  render(h, { props }) {
    const content = props.paragraph?.content?.[0]
    const type = props.paragraph?.type
    switch (type) {
      case 'unstyled':
        return <p class="citation-paragraph" domPropsInnerHTML={content} />
      case 'unordered-list-item': {
        if (typeof content === 'string') {
          const [str1, str2] = content?.split('">')
          const str3 = str2?.split('</')[0]
          const str = `${str1}"><span>${str3}</span><div class="icon"><img src="/citation-download.svg" alt="download"/></div></a>`
          return (
            <ul class="citation-list">
              <li domPropsInnerHTML={str} />
            </ul>
          )
        } else {
          return (
            <ul class="citation-list">
              {content.map((item) => {
                const [str1, str2] = item?.split('">')
                const str3 = str2?.split('</')[0]
                const str = `${str1}"><span>${str3}</span><div class="icon"><img src="/citation-download.svg" alt="download"/></div></a>`
                return <li domPropsInnerHTML={str} />
              })}
            </ul>
          )
        }
      }
      default:
        return undefined
    }
  },
}
</script>
<style lang="scss" scoped>
.citation {
  &-list {
    margin: 12px 0 0;
    @include media-breakpoint-up(md) {
      margin: 20px 0 0;
    }
    li {
      width: 100%;
      padding: 12px 0;
      &::v-deep {
        a {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          text-align: justify;
          span {
            width: calc(100% - 24px - 36px);
            font-size: 16px;
            font-weight: 700;
            line-height: 1.5;
            letter-spacing: 0.03em;
            color: #04295e;
            @include media-breakpoint-up(md) {
              width: 464px;
              font-size: 18px;
            }
          }
          .icon {
            width: 24px;
            height: 24px;
            display: flex;
            justify-content: center;
            align-items: center;
            @include media-breakpoint-up(md) {
              width: 27px;
              height: 27px;
            }
          }
          &:hover,
          &:active {
            span {
              color: #000928;
            }
            .icon {
              ::v-deep {
                svg {
                  path {
                    fill: #000928;
                  }
                }
              }
            }
          }
        }
      }
    }
    li + li {
      border-top: 1px solid rgba(0, 9, 40, 0.1);
    }
  }
  &-paragraph {
    font-size: 16px;
    line-height: 1.6;
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
}
</style>
