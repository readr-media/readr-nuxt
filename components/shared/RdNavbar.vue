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
      <div class="middle">
        <ul>
          <li
            v-for="item in categoryList"
            :id="item.slug"
            :key="item.slug"
            @click="navbarItemsClicked({ slug: item.slug, name: item.name })"
            @mouseover="openRelatedList"
            @mouseleave="closeRelatedList"
          >
            <span>{{ item.name }}</span>
            <RdHeaderRelatedList
              v-show="currentId === item.slug"
              :list="item.relatedList"
              class="related-list"
            />
          </li>
        </ul>
      </div>
      <div class="right">
        <div v-if="isPostpage" class="right__progress-percent">
          閱讀進度<span>{{ percent }}%</span>
        </div>
        <div v-if="!isPostpage" class="right__donate">
          <a
            href="https://www.readr.tw/donate"
            target="_blank"
            rel="noopener noreferrer"
          >
            贊助我們
          </a>
        </div>
        <div class="right__ham" @click="openHam">
          <SvgHamLogo class="right__ham-icon" />
        </div>
      </div>
    </section>
    <section class="header-bottom-wrapper">
      <div v-if="isPostpage" class="progress-bar">
        <div :style="{ width: `${percent}%` }" class="progress-bar__fill" />
      </div>
    </section>
    <RdHeaderHamList
      v-if="shouldShowHamList"
      :categories="hamCategoryList"
      class="ham-list"
      @close-ham="closeHam"
      @clicked-category="closeHamWithRedirect"
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
      currentId: '',
    }
  },

  apollo: {
    categories: {
      query: categories,
      variables() {
        return {
          first: 6,
          shouldQueryRelatedPost: true,
        }
      },
    },
  },

  computed: {
    ...mapGetters('viewport', ['viewportHeight']),
    isPostpage() {
      return this.$route.fullPath?.includes('post/')
    },
    isCategoryPage() {
      return this.$route.fullPath?.includes('/category')
    },
    categoryList() {
      return this.categories?.map((item) => {
        const relatedList =
          item.relatedPost?.map((post) => this.transformedRelatedPosts(post)) ??
          []
        return {
          name: item?.name ?? '',
          slug: item?.slug ?? '',
          relatedList,
        }
      })
    },
    hamCategoryList() {
      return this.categoryList?.map((item) => {
        return {
          name: item?.name ?? '',
          slug: item?.slug ?? '',
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
    if (this.isPostpage) {
      this.initProgress()
    }
  },

  beforeDestroy() {
    if (this.isPostpage) {
      window.removeEventListener('scroll', this.calculateProgress)
    }
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
    transformedRelatedPosts(post = {}) {
      const {
        id = '',
        title = '',
        heroImage = {},
        ogImage = {},
        style = '',
      } = post
      return {
        id,
        title,
        href: getHref(post),
        isReport: isReport(style),
        img: {
          src:
            heroImage?.urlMobileSized ||
            ogImage?.urlMobileSized ||
            require('~/assets/imgs/default/post.svg'),
        },
      }
    },
    navbarItemsClicked(item) {
      this.handleCategoryClicked(item)
    },
    openHam() {
      this.shouldShowHamList = true
      this.setBodyNotScroll()
    },
    closeHam() {
      this.shouldShowHamList = false
    },
    openRelatedList(e) {
      if (e.srcElement.id) {
        this.currentId = e.srcElement.id
      }
      this.shouldShowRelatedList = true
    },
    closeRelatedList() {
      this.currentId = ''
      this.shouldShowRelatedList = false
    },
    closeHamWithRedirect(item) {
      this.shouldShowHamList = false
      this.handleCategoryClicked(item)
    },
    setBodyNotScroll() {
      const scrollY = window.scrollY
      document.body.style.overflow = 'hidden'
      document.body.style.top = `-${scrollY}px`
    },
    handleCategoryClicked({ name = '', slug = '' }) {
      if (!slug || !name) return
      if (this.isCategoryPage) {
        this.$emit('category-change', { name, slug })
      } else {
        this.$router.push({
          name: 'category',
          params: { name, slug },
        })
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
  &-top-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.1);
    padding: 12px 12px 12px 20px;
    @include media-breakpoint-up(sm) {
      padding: 16px 36px 16px 24px;
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
        display: none;
        @include media-breakpoint-up(lg) {
          display: flex;
          align-items: center;
        }
        li {
          cursor: pointer;
          padding: 12px 24px 28px;
          span {
            position: relative;
            font-size: 16px;
            font-weight: 700;
            line-height: 24px;
            letter-spacing: 2.5px;
            color: #000928;
            z-index: 100;
          }
          .related-list {
            display: block;
            position: absolute;
            left: 0;
            right: 0;
            top: 78px;
            box-shadow: 0 0 32px rgba(0, 0, 0, 0.1),
              0 8px 24px -2px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          &:hover {
            span {
              &:before {
                content: '';
                position: absolute;
                top: 9px;
                left: 0;
                right: 0;
                height: 8px;
                background-color: #ebf02c;
                z-index: -1;
              }
              // triangle
              &:after {
                content: '';
                position: absolute;
                border: solid transparent;
                width: 0;
                height: 0;
                left: 50%;
                transform: translateX(-50%);
                bottom: -26px;
                border-width: 0 12px 10px 12px;
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
        background-color: #fff;
        border: 1px solid #000928;
        border-radius: 2px;
        a {
          display: block;
          font-size: 16px;
          font-weight: 700;
          line-height: 24px;
          letter-spacing: 2.5px;
          color: #000928;
          padding: 8px 16px;
        }
        &:hover,
        &:active,
        &:focus {
          background-color: #ebf02c;
        }
      }
      &__ham {
        display: block;
        width: 40px;
        height: 40px;
        margin: 0 0 0 20px;
        padding: 4px;
        @include media-breakpoint-up(lg) {
          display: none;
        }
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
  .ham-list {
    display: block;
    position: fixed;
    min-height: 100vh;
    max-height: 100vh;
    overflow-y: auto;
    z-index: 550;
    top: 0;
    left: 0;
    right: 0;
    @include media-breakpoint-up(lg) {
      display: none;
    }
  }
}
</style>
