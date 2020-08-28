const { reactive, computed } = require('nuxt-composition-api')

const state = reactive({
  viewport: {
    width: 0,
    height: 0,
  },
})

const viewportWidth = computed(() => state.viewport.width)
const viewportHeight = computed(() => state.viewport.height)

function setViewport(width, height) {
  state.viewport.width = width
  state.viewport.height = height
}

Object.assign(module.exports, {
  viewportWidth,
  viewportHeight,
  setViewport,
})
