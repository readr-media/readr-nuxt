function state() {
  return {
    shouldMountDonateButton: true,

    shouldMountLatestCoverages: true,
    shouldShowLatestCoverages: true,
  }
}

const mutations = {
  unmountDonateButton(state) {
    state.shouldMountDonateButton = false
  },
  showDonateButton(state) {
    state.shouldMountDonateButton = true
  },

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
