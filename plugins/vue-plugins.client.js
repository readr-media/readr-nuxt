import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import imgLoading from '~/assets/loading.gif'

Vue.use(VueLazyload, {
  loading: imgLoading,
})
