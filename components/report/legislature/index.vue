<template>
  <section>
    <Header
      :anchors="cmsData.contentApiData.tag[0]"
      :isNavVisible="isNavVisible"
    />
    <Intro
      v-observe-visibility="handleIntroVisibilityChange"
      :intro="cmsData.contentApiData.intro"
    />
    <DashboardStory id="story" />
    <Article id="article" :cmsData="cmsData" />
    <Dashboard id="dashboard" />
    <OtherInfo :cmsData="cmsData" />
  </section>
</template>

<script>
import Vue from 'vue'
import * as storeData from './store/data'
import Intro from './components/Intro.vue'
import DashboardStory from './components/DashboardStory.vue'
import Dashboard from './components/Dashboard.vue'
import Article from './components/Article.vue'
import OtherInfo from './components/OtherInfo.vue'
import Header from './components/Header.vue'

export default {
  components: {
    Intro,
    DashboardStory,
    Article,
    Dashboard,
    OtherInfo,
    Header,
  },
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
      intersection: { rootMargin: '80px 0px 0px 0px' },
      isNavVisible: false,
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
  destroyed() {
    this.$store.unregisterModule('data')
  },
  methods: {
    handleIntroVisibilityChange(isVisible) {
      this.isNavVisible = !isVisible
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
