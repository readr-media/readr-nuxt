const { isProdEnv } = require('../../helpers/index.js')

module.exports = setHeader

function setHeader(_, res, next) {
  if (isProdEnv) {
    res.setHeader('Cache-Control', 'private, max-age=300')
  } else {
    res.setHeader('Cache-Control', 'no-store')
  }

  next()
}
