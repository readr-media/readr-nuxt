import { inProdEnv } from '../../utils/index.js'

export default setHeader

function setHeader(req, res, next) {
  if (inProdEnv(req.headers.host)) {
    res.setHeader('Cache-Control', 'private, max-age=300')
  } else {
    res.setHeader('Cache-Control', 'no-store')
  }

  next()
}
