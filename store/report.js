function state() {
  return {
    shouldMountExtras: true,
    shouldShowExtras: true,

    shouldMountCredit: true,
    shouldObserveCredit: true,

    shouldMountDonateButton: true,

    shouldMountLatestCoverages: true,
    shouldShowLatestCoverages: true,
  }
}

const mutations = {
  unmountExtras(state) {
    state.shouldMountExtras = false
  },
  hideExtras(state) {
    state.shouldShowExtras = false
  },
  showExtras(state) {
    state.shouldMountExtras = true
    state.shouldShowExtras = true
  },

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
