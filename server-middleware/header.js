import { ENV } from '../configs/config.js'

function setHeader(_, res, next) {
  if (ENV === 'prod' || ENV === 'staging') {
    res.setHeader('Cache-Control', 'private, max-age=300')
  } else {
    res.setHeader('Cache-Control', 'no-store')
  }

  next()
}

module.exports = setHeader
