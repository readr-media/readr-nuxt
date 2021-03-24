const { reactive, watchEffect, toRefs } = require('@nuxtjs/composition-api')
const { get: jscookieGet } = require('js-cookie')
const { v4: createUuid } = require('uuid')

const readr2UserUuId = jscookieGet('readrid')
const isReadr2User = readr2UserUuId !== undefined
const userUuid = isReadr2User ? readr2UserUuId : createUuid()

const savedState = JSON.parse(window.localStorage.getItem('readr3')) || {}

const state = reactive({
  userUuid,
  isReadr2User,

  ...savedState,
})

watchEffect(() => {
  window.localStorage.setItem('readr3', JSON.stringify(state))
})

const stateAsRef = toRefs(state)

Object.assign(module.exports, {
  state: stateAsRef,
})
