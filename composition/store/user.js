import { reactive, toRefs } from 'nuxt-composition-api'

const state = reactive({
  hasUserFinishedReading: false,
})
const stateAsRef = toRefs(state)

export { stateAsRef as state, setUserFinishedReading }

function setUserFinishedReading(hasFinished) {
  state.hasUserFinishedReading = hasFinished
}
