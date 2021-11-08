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
    // 由於需要對 svg 做 hover 效果，暫時在此直接寫死而非自 assets 載入
    const SvgDownload = `<svg width="12" height="15" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.179688 13H11.8203V14.6797H0.179688V13ZM11.8203 5.5L6 11.3203L0.179688 5.5H3.5V0.5H8.5V5.5H11.8203Z" fill="#04295E"/></svg>`

    switch (type) {
      case 'unstyled':
        return <p class="citation-paragraph" domPropsInnerHTML={content} />
      case 'blockquote':
        return (
          <p class="citation-paragraph quote" domPropsInnerHTML={content} />
        )
      case 'unordered-list-item': {
        if (typeof content === 'string') {
          if (isValidString(content)) {
            const str = formatList(content)
            return (
              <ul class="citation-list">
                <li domPropsInnerHTML={str} />
              </ul>
            )
          } else {
            return undefined
          }
        } else {
          const formatedContent = content?.filter((item) => isValidString(item))
          if (formatedContent.length) {
            return (
              <ul class="citation-list">
                {content.map((item) => {
                  const str = formatList(item)
                  return <li domPropsInnerHTML={str} />
                })}
              </ul>
            )
          } else {
            return undefined
          }
        }
      }
      default:
        return undefined
    }

    function isValidString(rawStr = '') {
      return rawStr.includes('<a') && rawStr.includes('</a>')
    }

    function formatList(rawStr = '') {
      const [str1, str2] = rawStr?.split('">')
      const str3 = str2?.split('</')[0]
      return `${str1}"><span>${str3}</span><div class="icon">${SvgDownload}</div></a>`
    }
  },
}
</script>
<style lang="scss" scoped>
.citation {
  &-list {
    margin: 12px 0 0;
    border-top: 1px solid rgba(0, 9, 40, 0.1);
    @include media-breakpoint-up(md) {
      margin: 20px 0 0;
    }
    &:nth-of-type(1) {
      border: none;
    }
    li {
      width: 100%;
      padding: 12px 0 8px;
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
  &-paragraph {
    font-size: 16px;
    line-height: 1.6;
    color: rgba(0, 9, 40, 0.87);
    @include media-breakpoint-up(md) {
      font-size: 18px;
      line-height: 1.5;
    }
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
    &.quote {
      color: rgba(0, 9, 40, 0.5);
    }
  }
}
</style>
