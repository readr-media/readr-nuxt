import { reactive, watchEffect } from 'nuxt-composition-api'

const savedState = JSON.parse(window.localStorage.getItem('readr3')) || {}

const state = reactive({
  shouldActivateRecordWord: true,
  ...savedState,
})

watchEffect(() => {
  window.localStorage.setItem('readr3', JSON.stringify(state))
})

function deactivateRecordWord() {
  state.shouldActivateRecordWord = false
}

export { state, deactivateRecordWord }
