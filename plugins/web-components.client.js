// How to integrate stencil web component in Vue:  https://stenciljs.com/docs/vue
// @readr-media/web-components: https://github.com/readr-media/readr-coverages/tree/master/web-components

import Vue from 'vue'
import {
  applyPolyfills,
  defineCustomElements,
} from '@readr-media/web-components/loader'

// Tell Vue to ignore the components. We can provide regex here
Vue.config.ignoredElements = ['readr-header']

// Bind the custom elements to the window object
applyPolyfills().then(() => {
  defineCustomElements()
})
