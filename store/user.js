const state = () => ({
  hasUserFinishedReading: false,
})

const mutations = {
  setUserFinishedReading(state, hasFinished = true) {
    state.hasUserFinishedReading = hasFinished
  },
}

export { state, mutations }
