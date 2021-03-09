function state() {
  return {
    shouldMountArticle: true,
    shouldShowArticle: true,
    shouldMountExtras: true,
    shouldMountCredit: true,
    shouldMountDonateButton: true,
    shouldMountLatestCoverages: true,
    shouldShowLatestCoverages: true,
    shouldObserveCredit: true,
  }
}

const mutations = {
  unmountArticle(state) {
    state.shouldMountArticle = false
  },
  showArticle(state) {
    state.shouldMountArticle = true
    state.shouldShowArticle = true
  },
  hideArticle(state) {
    state.shouldShowArticle = false
  },
  unmountExtras(state) {
    state.shouldMountExtras = false
  },
  showExtras(state) {
    state.shouldMountExtras = true
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
  unobserveCredit(state) {
    state.shouldObserveCredit = false
  },
  observeCredit(state) {
    state.shouldObserveCredit = true
  },
}

export { state, mutations }
