const koaCors = require('@koa/cors')
const expressCors = require('cors')

const allowedOrigins = [
  /https?:\/\/(localhost|127\.0\.0\.1):(\d+)/,
  /\.mirrormedia\.mg$/,
  /\.readr\.tw$/,
]
const options = {
  koa: {
    origin(ctx) {
      const { origin: requestOrigin } = ctx.request.header
      const isAllowedOrigin = allowedOrigins.some((allowedOrigin) =>
        allowedOrigin.test(requestOrigin)
      )
      if (isAllowedOrigin) {
        return requestOrigin
      }

      return false
    },
  },
  express: {
    origin: allowedOrigins,
  },
}

module.exports = {
  handleKoaCors: koaCors(options.koa),
  handleExpressCors: expressCors(options.express),
}
