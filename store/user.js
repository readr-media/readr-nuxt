import { get as jscookieGet } from 'js-cookie'
import { v4 as createUuid } from 'uuid'

import { getLocalStorage, setLocalStorage } from '~/helpers/index.js'

const readr2UserUuId = jscookieGet('readrid')
const isReadr2User = readr2UserUuId !== undefined
const userUuid = isReadr2User ? readr2UserUuId : createUuid()

const LOCAL_STORAGE_KEY = 'user'
let storedState = {}
if (process.browser) {
  storedState = getLocalStorage(LOCAL_STORAGE_KEY, {})
  setLocalStorage(LOCAL_STORAGE_KEY, state())
}

function state() {
  return {
    uuid: userUuid,
    isReadr2: isReadr2User,
    ...storedState,
  }
}

export { state }
