Object.assign(module.exports, {
  inProdEnv,

  ...require('./animation.js'),
  ...require('./cookie.js'),
  ...require('./error.js'),
})

function inProdEnv(hostname) {
  return /^www\.readr\.tw/i.test(hostname)
}
