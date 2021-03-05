function state() {
  return {
    shouldMountArticle: true,
    shouldShowArticle: true,
    shouldMountExtras: true,
    shouldMountCredit: true,
  }
}

const mutations = {
  unmountArticle(state) {
    state.shouldMountArticle = false
    state.shouldShowArticle = false
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
}

export { state, mutations }
