<template>
  <div class="header">
    <readr-header
      @readrLogoLinkClick="sendGaClickEvent('立院 - back to home')"
      @shareFacebookLinkClick="sendGaClickEvent('立院 - share to fb')"
      @shareLineLinkClick="sendGaClickEvent('立院 - share to line')"
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
      const sectionList = [
        'story',
        'dashboard',
        'article1',
        'article2',
        'article3',
      ]
      const sectionName = [
        '我們發現了什麼',
        '法案時光機',
        '消防',
        '集會',
        '土地',
      ]
      const index = sectionList.indexOf(section)
      this.$ga.event('projects', 'click', `索引標籤-${sectionName[index]}`)
      scrollIntoView(document.querySelector(`#${section}`), {
        align: {
          topOffset: 100,
        },
      })
    },
    sendGaClickEvent(label) {
      this.$ga.event('projects', 'click', label)
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
