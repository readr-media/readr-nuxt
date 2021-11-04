<template>
  <header class="header">
    <section class="header-top-wrapper">
      <div class="left">
        <NuxtLink
          to="/"
          class="left__readr-icon"
          @click.native="$ga.event('header', 'click', 'logo')"
        >
          <SvgReadrLogo />
        </NuxtLink>
      </div>
      <div v-if="!isUnderDesktopSize" class="middle">
        <ul>
          <li
            v-for="item in categories"
            :id="item.slug"
            :key="item.slug"
            @click="handleCategoryClicked(item)"
            @mouseover="openRelatedList"
            @mouseleave="closeRelatedList"
          >
            <span>{{ item.name }}</span>
          </li>
        </ul>
      </div>
      <div class="right">
        <div class="right__progress-percent">
          閱讀進度<span>{{ percent }}%</span>
        </div>
        <div v-if="!isPostpage" class="right__donate">
          <button type="button">贊助我們</button>
        </div>
        <div v-if="isUnderDesktopSize" class="right__ham" @click="openHam">
          <SvgHamLogo class="right__ham-icon" />
        </div>
      </div>
    </section>
    <section class="header-bottom-wrapper">
      <div class="progress-bar">
        <div :style="{ width: `${percent}%` }" class="progress-bar__fill" />
      </div>
    </section>
    <RdHeaderRelatedList
      v-show="shouldShowRelatedList"
      id="related-list"
      :list="transformedLatestPosts"
      class="related-list"
      @mouseover.native="openRelatedList"
      @mouseleave.native="closeRelatedList"
    />
    <RdHeaderHamList
      v-if="shouldShowHamList && isUnderDesktopSize"
      :categories="mockCategories"
      class="ham-list"
      @close-ham="closeHam"
    />
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
import rafThrottle from 'raf-throttle'
import { getHref, isReport } from '~/helpers/index.js'

import RdHeaderHamList from '~/components/shared/RdHeaderHamList.vue'
import RdHeaderRelatedList from '~/components/shared/RdHeaderRelatedList.vue'
import SvgReadrLogo from '~/assets/imgs/readr-logo.svg?inline'
import SvgHamLogo from '~/assets/imgs/hamburger.svg?inline'

import { latestListByCategorySlug } from '~/apollo/queries/posts.js'
import { categories } from '~/apollo/queries/categories.js'

export default {
  name: 'RdNavbar',

  components: {
    RdHeaderHamList,
    RdHeaderRelatedList,
    SvgReadrLogo,
    SvgHamLogo,
  },

  data() {
    return {
      categories: [],
      latestList: [],
      currentCategory: {
        slug: 'culture',
      },
      target: undefined,
      percent: 0,
      hasFinishedReading: false,
      shouldShowHamList: false,
      shouldShowRelatedList: false,
      openId: '',
      closeId: '',
    }
  },

  apollo: {
    categories: {
      query: categories,
    },
    latestList: {
      query: latestListByCategorySlug,
      variables() {
        return {
          first: 5,
          categorySlug: this.currentCategory.slug,
          shouldQueryMeta: false,
        }
      },
      update(result) {
        const { items } = result
        return items
      },
    },
  },

  computed: {
    ...mapGetters('viewport', ['viewportWidth', 'viewportHeight']),
    isUnderTabletSize() {
      return this.viewportWidth < 768
    },
    isUnderDesktopSize() {
      return this.viewportWidth < 960
    },
    isPostpage() {
      return this.$route.fullPath?.includes('post/')
    },
    transformedLatestPosts() {
      return this.latestList.map((post) => {
        const {
          id = '',
          title = '',
          heroImage = {},
          ogImage = {},
          style = '',
        } = post || {}
        return {
          id,
          title,
          href: getHref(post),
          img: {
            src:
              heroImage?.urlTabletSized ||
              ogImage?.urlTabletSized ||
              require('~/assets/imgs/default/post.svg'),
          },
          isReport: isReport(style),
        }
      })
    },
  },

  watch: {
    hasFinishedReading(hasFinished) {
      if (hasFinished === true) {
        this.$emit('sendGaEvent')
      }
    },
  },

  mounted() {
    console.log('nn', this.transformedLatestPosts)
    this.initProgress()
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.calculateProgress)
  },

  methods: {
    initProgress() {
      this.calculateProgress()
      window.addEventListener('scroll', this.calculateProgress)
    },
    calculateProgress() {
      rafThrottle(() => {
        if (!this.target) {
          this.target = document.getElementById('post')
        }

        const { bottom } = this.target.getBoundingClientRect()
        if (bottom - this.viewportHeight < 0) {
          this.percent = 100

          if (this.hasFinishedReading === false) {
            this.hasFinishedReading = true
          }
          return
        }

        const { pageYOffset } = window
        this.percent = Math.round(
          (pageYOffset / (bottom + pageYOffset - this.viewportHeight)) * 100
        )
      })()
    },
    openHam() {
      this.shouldShowHamList = true
    },
    closeHam() {
      this.shouldShowHamList = false
    },
    handleCategoryClicked({ name = '', slug = '' }) {
      if (!slug || !name) return
      this.$router.push({
        name: 'category',
        params: { name, slug },
      })
    },
    openRelatedList(e) {
      console.log('open', e.srcElement?.id)
      if (window && e.srcElement?.id && e.srcElement?.id !== 'related-list') {
        this.openId = e.srcElement?.id
        document.getElementById(this.openId).classList.add('deco')
      }
      this.shouldShowRelatedList = true
    },
    closeRelatedList(e) {
      console.log('close', e.srcElement?.id)
      if (window && e.srcElement?.id) {
        this.closeId = e.srcElement?.id
        if (this.closeId === 'related-list') {
          this.shouldShowRelatedList = false
          document.getElementById(this.openId).classList.remove('deco')
          this.openId = ''
          this.closeId = ''
        } else if (this.openId !== this.closeId) {
          document.getElementById(this.closeId).classList.remove('deco')
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  z-index: 100;
  width: 100%;
  top: 0;
  left: 0;
  background-color: #fff;
  transition: transform 0.3s;
  z-index: 499;
  .related-list {
    display: block;
    position: absolute;
    bottom: -316px;
    left: 0;
    right: 0;
  }
  .ham-list {
    position: absolute;
    z-index: 550;
    top: 0;
    left: 0;
    right: 0;
  }
  &-top-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.1);
    padding: 12px 20px;
    @include media-breakpoint-up(sm) {
      padding: 16px 24px;
    }
    @include media-breakpoint-up(lg) {
      padding: 16px 24px 0;
    }
    .left {
      @include media-breakpoint-up(lg) {
        padding-bottom: 16px;
      }
      &__readr-icon {
        display: block;
        width: 42px;
        height: 42px;
        @include media-breakpoint-up(sm) {
          width: 48px;
          height: 48px;
        }
      }
    }
    .middle {
      ul {
        display: flex;
        align-items: center;
        li {
          position: relative;
          cursor: pointer;
          padding: 12px 24px 28px;
          span {
            font-size: 16px;
            font-weight: 700;
            line-height: 24px;
            letter-spacing: 2.5px;
            color: #000928;
            z-index: 100;
          }
          &.deco {
            span {
              &:before {
                content: '';
                position: absolute;
                top: 21px;
                left: 20px;
                right: 22px;
                height: 8px;
                background-color: #ebf02c;
                z-index: -1;
              }
              &:after {
                content: '';
                position: absolute;
                border: solid transparent;
                width: 0;
                height: 0;
                left: 40%;
                bottom: 2px;
                border-width: 0 10px 8px 10px;
                border-color: transparent transparent #ebf02c transparent;
                z-index: -1;
              }
            }
          }
        }
      }
    }
    .right {
      display: flex;
      @include media-breakpoint-up(lg) {
        padding-bottom: 16px;
      }
      &__progress-percent {
        color: rgba(#000, 0.87);
        font-size: 13px;
        display: flex;
        align-items: center;
        span {
          font-size: 18px;
          font-weight: 700;
          margin-left: 6px;
        }
        @include media-breakpoint-up(lg) {
          min-width: 116px;
        }
      }
      &__donate {
        font-size: 16px;
        font-weight: 700;
        line-height: 24px;
        letter-spacing: 2.5px;
        color: #000928;
        background-color: #fff;
        border: 1px solid #000928;
        border-radius: 2px;
        padding: 8px 16px;
      }
      &__ham {
        width: 40px;
        height: 40px;
        margin: 0 0 0 20px;
        &-icon {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  &-bottom-wrapper {
    .progress-bar {
      background-color: rgba(#d8d8d8, 0.5);
      &__fill {
        transition: width 0.15s linear;
        height: 6px;
        background-image: linear-gradient(180deg, #ebf02c 0%, #cef3ee 497.8%);
      }
    }
  }
}
</style>
