Object.assign(module.exports, {
  getCookieValue,
})

function getCookieValue(name) {
  const decodedCookies = decodeURIComponent(document.cookie)
  const cookie = decodedCookies.split(';').map(trim).find(doesNameMatch)

  return cookie !== undefined ? cookie.replace(`${name}=`, '') : undefined

  function doesNameMatch(cookie) {
    return cookie.startsWith(`${name}=`)
  }
}

function trim(str) {
  return str.trim()
}
