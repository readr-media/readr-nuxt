<template>
  <div class="citation">
    <div class="citation__title">
      <span>引用數據</span>
    </div>
    <div class="citation__content">
      <div v-if="doesHaveInfoList" class="citation__content__title">
        <p v-for="item in infoList" :key="item.id">{{ item.text }}</p>
      </div>
      <ul v-if="doesHavelinkList">
        <li v-for="item in linkList" :key="item.title">
          <a :href="item.href" target="_blank" rel="noreferrer noopener">
            <span>{{ item.title }}</span>
            <div class="icon">
              <SvgDownload />
            </div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import SvgDownload from '~/assets/imgs/citation-download.svg?inline'

export default {
  name: 'RdArticleCitation',

  components: {
    SvgDownload,
  },
  props: {
    infoList: {
      type: Array,
      default: () => [],
    },
    linkList: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    doesHaveInfoList() {
      return this.infoList?.length > 0
    },
    doesHavelinkList() {
      return this.linkList?.length > 0
    },
  },
}
</script>

<style lang="scss" scoped>
.citation {
  width: 100%;
  border-radius: 2px;
  &__title {
    text-align: center;
    background-color: #04295e;
    padding: 8px 0;
    span {
      font-size: 18px;
      font-weight: 700;
      line-height: 27px;
      letter-spacing: 0.03em;
      color: #ebf02c;
      @include media-breakpoint-up(md) {
        font-size: 20px;
        line-height: 30px;
      }
    }
  }
  &__content {
    background-color: rgba(245, 235, 255, 0.5);
    padding: 12px 24px;
    @include media-breakpoint-up(md) {
      padding: 16px 32px;
    }
    &__title {
      margin: 0 0 12px;
      @include media-breakpoint-up(md) {
        margin: 0 0 20px;
      }
      p {
        font-size: 16px;
        line-height: 1.6;
        color: rgba(0, 9, 40, 0.87);
      }
      p + p {
        margin: 12px 0 0;
        @include media-breakpoint-up(md) {
          margin: 16px 0 0;
        }
      }
    }
    ul {
      li {
        width: 100%;
        padding: 12px 0;
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
      li + li {
        border-top: 1px solid rgba(0, 9, 40, 0.1);
      }
    }
  }
}
</style>
