export { rAFWithDebounce } from './animation.js'
export { inProdEnv }

function inProdEnv(hostname) {
  return /^www\.readr\.tw/i.test(hostname)
}
