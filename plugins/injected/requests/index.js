const { postDonate, postSubscribe } = require('./donate.js')

module.exports = injectRequestMethods

function injectRequestMethods(ctx, inject) {
  inject('postDonate', postDonate)
  inject('postSubscribe', postSubscribe)
}
