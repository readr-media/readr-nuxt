const { inProdEnv } = require('../../utils/index.js')

module.exports = setHeader

function setHeader(req, res, next) {
  if (inProdEnv) {
    res.setHeader('Cache-Control', 'private, max-age=300')
  } else {
    res.setHeader('Cache-Control', 'no-store')
  }

  next()
}
