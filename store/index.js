const state = () => ({
  viewport: {
    width: 0,
    height: 0,
  },
})

const getters = {
  viewportWidth({ viewport }) {
    return viewport.width
  },
}

const mutations = {
  setViewport({ viewport }, { width = 0, height = 0 } = {}) {
    viewport.width = width
    viewport.height = height
  },
}

export { state, getters, mutations }
