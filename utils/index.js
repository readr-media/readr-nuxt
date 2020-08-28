const { ENV } = require('../configs/config.js')

const inProdEnv = ENV === 'production'

Object.assign(module.exports, {
  inProdEnv,

  ...require('./animation.js'),
  ...require('./cookie.js'),
})
