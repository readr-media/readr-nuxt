Object.assign(module.exports, {
  inProdEnv,

  ...require('./error.js'),
})

function inProdEnv(hostname) {
  return /^www\.readr\.tw/i.test(hostname)
}
