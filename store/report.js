function state() {
  return {
    shouldMountArticle: true,
    shouldShowArticle: true,

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
  unmountArticle(state) {
    state.shouldMountArticle = false
  },
  hideArticle(state) {
    state.shouldShowArticle = false
  },
  showArticle(state) {
    state.shouldMountArticle = true
    state.shouldShowArticle = true
  },

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
