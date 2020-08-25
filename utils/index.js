export { rafWithDebounce } from './animation.js'
export { getCookieValue } from './cookie.js'
export { inProdEnv }

function inProdEnv(hostname) {
  return /^www\.readr\.tw/i.test(hostname)
}
