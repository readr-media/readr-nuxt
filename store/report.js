function state() {
  return {
    shouldMountLatestCoverages: true,
    shouldShowLatestCoverages: true,
  }
}

const mutations = {
  unmountLatestCoverages(state) {
    state.shouldMountLatestCoverages = false
  },
  hideLatestCoverages(state) {
    state.shouldShowLatestCoverages = false
  },
  showLatestCoverages(state) {
    state.shouldMountLatestCoverages = true
    state.shouldShowLatestCoverages = true
  },
}

export { state, mutations }
