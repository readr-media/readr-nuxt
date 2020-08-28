const Vue = require('vue').default
const VueLazyload = require('vue-lazyload').default
const imgLoading = require('~/assets/loading.gif')

Vue.use(VueLazyload, {
  loading: imgLoading,
})
