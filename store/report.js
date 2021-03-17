function state() {
  return {
    shouldMountCredit: true,
    shouldObserveCredit: true,

    shouldMountDonateButton: true,

    shouldMountLatestCoverages: true,
    shouldShowLatestCoverages: true,
  }
}

const mutations = {
  unobserveCredit(state) {
    state.shouldObserveCredit = false
  },
  observeCredit(state) {
    state.shouldObserveCredit = true
  },

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
