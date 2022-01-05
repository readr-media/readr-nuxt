<template>
  <section>
    <section v-if="$route.query.dashboard">
      <Dashboard
        id="dashboard"
        v-observe-visibility="{
          callback: handleDashboardVisibilityChange,
          intersection,
        }"
      />
    </section>
    <section v-else>
      <Header
        :anchors="cmsData.contentApiData.tag[0]"
        :isNavVisible="isNavVisible"
        :nowSection="nowSection"
      />
      <Intro
        v-observe-visibility="{
          callback: handleIntroVisibilityChange,
          intersection,
        }"
        :intro="cmsData.contentApiData.intro"
      />
      <!-- <DashboardStory
        id="story"
        v-observe-visibility="{
          callback: handleDashboardStoryVisibilityChange,
          intersection,
        }"
      /> -->
      <Article
        id="article"
        :cmsData="cmsData"
        :handleArticle1VisibilityChange="handleArticle1VisibilityChange"
        :handleArticle2VisibilityChange="handleArticle2VisibilityChange"
        :handleArticle3VisibilityChange="handleArticle3VisibilityChange"
        :intersection="intersection"
      />
      <Dashboard
        id="dashboard"
        v-observe-visibility="{
          callback: handleDashboardVisibilityChange,
          intersection,
        }"
      />
      <OtherInfo :cmsData="cmsData" />
    </section>
  </section>
</template>

<script>
import Vue from 'vue'
import { scrollDirection } from '../../../components/helpers/vue/mixins/index.js'
import * as storeData from './store/data'
import Intro from './components/Intro.vue'
// import DashboardStory from './components/DashboardStory.vue'
import Dashboard from './components/Dashboard.vue'
import Article from './components/Article.vue'
import OtherInfo from './components/OtherInfo.vue'
import Header from './components/Header.vue'

export default {
  components: {
    Intro,
    // DashboardStory,
    Article,
    Dashboard,
    OtherInfo,
    Header,
  },
  mixins: [scrollDirection],
  props: {
    cmsData: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  data() {
    return {
      nowSection: '',
      intersection: { rootMargin: '-200px 0px 200px 0px' },
      isNavVisible: false,
      sectionList: [
        'story',
        'article1',
        'article2',
        'article3',
        'dashboard',
        '',
      ],
    }
  },
  created() {
    this.$store.registerModule('data', {
      namespaced: true,
      state: storeData.state,
      mutations: storeData.mutations,
      actions: storeData.actions,
      getters: storeData.getters,
    })
  },
  beforeMount() {
    Vue.directive('click-outside', {
      bind(el, binding, vnode) {
        el.clickOutsideEvent = function (event) {
          // here I check that click was outside the el and his childrens
          if (!(el === event.target || el.contains(event.target))) {
            // and if it did, call method provided in attribute value
            vnode.context[binding.expression](event)
          }
        }
        document.body.addEventListener('click', el.clickOutsideEvent)
      },
      unbind(el) {
        document.body.removeEventListener('click', el.clickOutsideEvent)
      },
    })

    // eslint-disable-next-line no-undef
    Vue.use(VueObserveVisibility)
  },
  mounted() {
    if (this.$route.query.dashboard) {
      document.querySelector('#default-footer').remove()
    }
  },
  destroyed() {
    this.$store.unregisterModule('data')
  },
  methods: {
    handleIntroVisibilityChange(isVisible) {
      this.isNavVisible = !isVisible
    },
    intoNextSection(section) {
      const index = this.sectionList.indexOf(section) + 1
      this.nowSection = this.sectionList[index]
      console.log(this.nowSection)
    },
    sencerSection(isVisible, section) {
      if (this.isScrollingDown && !isVisible) {
        this.intoNextSection(section)
      }
      if (!this.isScrollingDown && isVisible) {
        this.nowSection = section
        console.log(this.nowSection)
      }
    },
    handleDashboardStoryVisibilityChange(isVisible, entries) {
      this.sencerSection(isVisible, 'story')
    },
    handleDashboardVisibilityChange(isVisible, entries) {
      this.sencerSection(isVisible, 'dashboard')
    },
    handleArticle1VisibilityChange(isVisible, entries) {
      this.sencerSection(isVisible, `article1`)
    },
    handleArticle2VisibilityChange(isVisible, entries) {
      this.sencerSection(isVisible, `article2`)
    },
    handleArticle3VisibilityChange(isVisible, entries) {
      this.sencerSection(isVisible, `article3`)
    },
  },
  head() {
    return {
      script: [
        {
          src: 'https://cdnjs.cloudflare.com/ajax/libs/d3/6.7.0/d3.min.js',
        },
        {
          src: 'https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js',
        },
        {
          src: 'https://cdn.jsdelivr.net/npm/fuse.js@6.4.6',
        },
        {
          src:
            'https://unpkg.com/vue-observe-visibility/dist/vue-observe-visibility.min.js',
        },
        {
          src:
            'https://cdn.jsdelivr.net/gh/dixonandmoe/rellax@master/rellax.min.js',
        },
      ],
    }
  },
}
</script>
