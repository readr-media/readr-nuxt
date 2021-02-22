const cors = require('cors')

const whitelist = [
  /http:\/\/localhost:(\d*)/,
  /\.mirrormedia\.mg$/,
  /\.readr\.tw$/,
]
const corsOptions = {
  origin(origin, callback) {
    if (
      whitelist.filter((whitelistUrl) => whitelistUrl.test(origin)).length !==
        0 ||
      !origin
    ) {
      console.log(`[CORS] origin: ${origin} is allowed in CORS`)
      callback(null, true)
    } else {
      console.error(`[CORS] origin: ${origin} is not allowed in CORS`)
      callback(new Error('Not allowed by CORS'))
    }
  },
}

module.exports = cors(corsOptions)
