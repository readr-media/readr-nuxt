const { reactive, watchEffect, toRefs } = require('nuxt-composition-api')
const { v4: createUuid } = require('uuid')

const { getCookieValue } = require('../../utils/index.js')

const readr2UserUuId = getCookieValue('readrid')
const isReadr2User = readr2UserUuId !== undefined
const userUuid = isReadr2User ? readr2UserUuId : createUuid()

const savedState = JSON.parse(window.localStorage.getItem('readr3')) || {}

const state = reactive({
  userUuid,
  isReadr2User,
  shouldActivateRecordWord: true,

  shouldOpenFeedbackRedesign: true,
  shouldOpenGdpr: true,

  ...savedState,
})

watchEffect(() => {
  window.localStorage.setItem('readr3', JSON.stringify(state))
})

function deactivateRecordWord() {
  state.shouldActivateRecordWord = false
}

function closeFeedbackRedesign() {
  state.shouldOpenFeedbackRedesign = false
}

function closeGdpr() {
  state.shouldOpenGdpr = false
}

const stateAsRef = toRefs(state)

Object.assign(module.exports, {
  state: stateAsRef,
  deactivateRecordWord,

  closeFeedbackRedesign,
  closeGdpr,
})
