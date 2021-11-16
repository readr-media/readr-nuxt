import { ENV } from '../configs/config.js'
const { isProdEnv } = require('../helpers/index.js')

function setHeader(_, res, next) {
  if (isProdEnv || ENV === 'staging') {
    res.setHeader('Cache-Control', 'private, max-age=300')
  } else {
    res.setHeader('Cache-Control', 'no-store')
  }

  next()
}

module.exports = setHeader
