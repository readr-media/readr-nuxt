// How to integrate stencil web component in Vue: https://stenciljs.com/docs/vue
// @readr-media/web-components: https://github.com/readr-media/readr-ui
import Vue from 'vue'
import { defineCustomElements } from '@readr-media/web-components/loader'

// Tell Vue to ignore the components. We can provide regex here
Vue.config.ignoredElements = [
  'readr-header',
  'readr-annotation',
  'readr-donate-button',
  'readr-latest-coverages',
]

// Bind the custom elements to the window object
defineCustomElements()
