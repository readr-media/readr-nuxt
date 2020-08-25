import { reactive, watchEffect, toRefs } from 'nuxt-composition-api'
import { v4 as createUuid } from 'uuid'

import { getCookieValue } from '~/utils/index.js'

const readr2UserUuId = getCookieValue('readrid')
const isReadr2User = readr2UserUuId !== undefined
const userUuid = isReadr2User ? readr2UserUuId : createUuid()

const savedState = JSON.parse(window.localStorage.getItem('readr3')) || {}

const state = reactive({
  userUuid,
  isReadr2User,
  shouldActivateRecordWord: true,
  shouldOpenGdpr: true,
  ...savedState,
})
const stateAsRef = toRefs(state)

export { stateAsRef as state, deactivateRecordWord, closeGdpr }

watchEffect(() => {
  window.localStorage.setItem('readr3', JSON.stringify(state))
})

function deactivateRecordWord() {
  state.shouldActivateRecordWord = false
}

function closeGdpr() {
  state.shouldOpenGdpr = false
}
