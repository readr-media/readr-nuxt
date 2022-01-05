<template>
  <div class="header">
    <readr-header
      @readrLogoLinkClick="sendGaClickEvent('back to home')"
      @shareFacebookLinkClick="sendGaClickEvent('share to fb')"
      @shareLineLinkClick="sendGaClickEvent('share to line')"
    />
    <section v-show="isNavVisible">
      <div v-show="!isScrollingDown" class="header__anchors_mobile">
        <a
          v-for="anchor in mobileAnchors"
          :key="anchor.name"
          :class="{ active: nowSection === anchor.name }"
          @click="handleAnchorClick(anchor.name)"
          >{{ anchor.title }}</a
        >
      </div>
      <div class="header__anchors_desktop">
        <img src="../../../../assets/imgs/report/legislature/arrow.svg" />
        <Anchor
          :title="anchors.story"
          :isActive="nowSection === 'story'"
          @click.native="handleAnchorClick('story')"
        />
        <Anchor
          :title="anchors.dashboard"
          :isActive="nowSection === 'dashboard'"
          @click.native="handleAnchorClick('dashboard')"
        />
        <Anchor
          v-for="(anchor, i) in anchors.article"
          :key="anchor.title"
          :isActive="nowSection === `article${i + 1}`"
          :title="anchor.title"
          @click.native="handleAnchorClick(`article${i + 1}`)"
        />
      </div>
    </section>
  </div>
</template>

<script>
import scrollIntoView from 'scroll-into-view'
import { scrollDirection } from '../../../../components/helpers/vue/mixins/index.js'
import Anchor from './HeaderAnchor.vue'
export default {
  components: {
    Anchor,
  },
  mixins: [scrollDirection],
  props: {
    anchors: {
      type: Object,
      default: () => {},
    },
    nowSection: {
      type: String,
      default: '',
    },
    isNavVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isMounted: false,
    }
  },
  computed: {
    mobileAnchors() {
      console.log('anchors', this.anchors)
      const anchors = [
        { name: 'story', title: this.anchors.story },
        { name: 'dashboard', title: this.anchors.dashboard },
      ]
      this.anchors.article.map((article, i) => {
        anchors.push({ name: `article${i + 1}`, title: article.title })
      })
      return anchors
    },
    shouldShowAnchors() {
      return this.isMounted && this.nowSection !== 'intro'
    },
  },
  methods: {
    handleAnchorClick(section) {
      scrollIntoView(document.querySelector(`#${section}`), {
        align: {
          topOffset: 200,
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  z-index: 2;
  background: #1b1b1b;
  width: 100vw;

  readr-header::v-deep {
    path {
      fill: #fff;
    }

    share-nav {
      a {
        circle {
          fill: #fff;
        }
        path {
          fill: #33aba4;
        }
      }
    }
  }

  &__anchors {
    &_mobile {
      border-bottom: 0.5px solid #ffffff;
      padding: 15px 0 24px 0;
      margin: 0 20px;
      font-weight: 900;
      font-size: 14px;
      line-height: 32px;
      color: #33aba4;
      text-decoration: underline;
      @include media-breakpoint-up(lg) {
        display: none;
      }
      a + a {
        margin-left: 3px;
      }

      a {
        &:before {
          content: '';
          display: inline-block;
          transform: translate(0, -4px);
          margin: 0 5px;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: #33aba4;
        }
      }

      .active {
        color: #c9c9c9;
        &:before {
          background: #c9c9c9;
        }
      }
    }
    &_desktop {
      display: none;
      padding: 15px 0 24px 0;
      margin: 0 20px;
      flex-flow: wrap;
      gap: 8px;
      position: absolute;
      top: 12px;
      right: 90px;
      margin-left: 90px;
      @include media-breakpoint-up(lg) {
        display: flex;
      }
      img {
        margin-right: 8px;
        display: none;
        @include media-breakpoint-up(lg) {
          display: inherit;
        }
      }
    }
  }
}
</style>
