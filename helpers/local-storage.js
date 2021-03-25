const PREFIX = 'readr3'

function setLocalStorage(key, value) {
  window.localStorage.setItem(getKey(key), JSON.stringify(value))
}

function getLocalStorage(key, defaultValue) {
  const value = window.localStorage.getItem(getKey(key))
  return value !== null ? JSON.parse(value) : defaultValue
}

function getKey(key) {
  return `${PREFIX}.${key}`
}

export { setLocalStorage, getLocalStorage }
