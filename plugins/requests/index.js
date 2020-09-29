const { fetchPostsByTag } = require('./posts.js')

module.exports = injectRequestMethods

function injectRequestMethods(ctx, inject) {
  inject('fetchPostsByTag', fetchPostsByTag)
}
