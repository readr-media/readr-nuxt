<template>
  <section>
    <Intro />
    <DashboardStory />
    <Article :cmsData="cmsData" />
    <Dashboard />
    <OtherInfo />
  </section>
</template>

<script>
import * as storeData from './store/data'
import Intro from './components/Intro.vue'
import DashboardStory from './components/DashboardStory.vue'
import Dashboard from './components/Dashboard.vue'
import Article from './components/Article.vue'
import OtherInfo from './components/OtherInfo.vue'

export default {
  components: {
    Intro,
    DashboardStory,
    Article,
    Dashboard,
    OtherInfo,
  },
  props: {
    cmsData: {
      type: Object,
      required: true,
      default: () => ({}),
    },
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
  destroyed() {
    this.$store.unregisterModule('data')
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
      ],
    }
  },
}
</script>
