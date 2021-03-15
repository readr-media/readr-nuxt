function state() {
  return {
    width: 0,
    height: 0,
  }
}

const getters = {
  viewportWidth(state) {
    return state.width
  },
  viewportHeight(state) {
    return state.height
  },
}

const mutations = {
  setViewport(state, { width, height }) {
    state.width = width ?? state.width
    state.height = height ?? state.height
  },
}

export { state, getters, mutations }
