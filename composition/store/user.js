import { reactive } from 'nuxt-composition-api'

const state = reactive({
  hasUserFinishedReading: false,
})

function setUserFinishedReading(hasFinished) {
  state.hasUserFinishedReading = hasFinished
}

export { state, setUserFinishedReading }
