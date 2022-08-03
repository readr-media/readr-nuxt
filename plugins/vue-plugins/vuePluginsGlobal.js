import Vue from 'vue'
import VueLazyRenderer from 'vue-lazy-renderer'
import VueLazyload from 'vue-lazyload'
import VueYoutube from 'vue-youtube'

Vue.use(VueLazyRenderer, {
  preload: 2,
})

Vue.use(VueLazyload, {
  lazyComponent: true,
})

Vue.use(VueYoutube)
