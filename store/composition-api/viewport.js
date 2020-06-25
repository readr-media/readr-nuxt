import { reactive, computed } from 'nuxt-composition-api'

const state = reactive({
  viewport: {
    width: 0,
    height: 0,
  },
})

const viewportWidth = computed(() => state.viewport.width)

function setViewport({ width = 0, height = 0 } = {}) {
  state.viewport.width = width
  state.viewport.height = height
}

export { viewportWidth, setViewport }
