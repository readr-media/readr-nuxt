const { reactive, watchEffect, toRefs } = require('@nuxtjs/composition-api')
const { v4: createUuid } = require('uuid')

const readr2UserUuId = getCookieValue('readrid')
const isReadr2User = readr2UserUuId !== undefined
const userUuid = isReadr2User ? readr2UserUuId : createUuid()

const savedState = JSON.parse(window.localStorage.getItem('readr3')) || {}

const state = reactive({
  userUuid,
  isReadr2User,

  shouldOpenGdpr: true,

  ...savedState,
})

watchEffect(() => {
  window.localStorage.setItem('readr3', JSON.stringify(state))
})

function closeGdpr() {
  state.shouldOpenGdpr = false
}

function getCookieValue(name) {
  const cookie = decodeURIComponent(document.cookie)
    .split(';')
    .map(function trim(str) {
      return str.trim()
    })
    .find(function byName(cookie) {
      return cookie.startsWith(`${name}=`)
    })

  return cookie !== undefined ? cookie.replace(`${name}=`, '') : undefined
}

const stateAsRef = toRefs(state)

Object.assign(module.exports, {
  state: stateAsRef,

  closeGdpr,
})
