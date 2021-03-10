const { ENV } = require('../configs/config.js')

const isProdEnv = ENV === 'prod'

Object.assign(module.exports, {
  isProdEnv,

  ...require('./error.js'),
})
