const { fetchPosts, fetchPostsByTag } = require('./posts.js')

module.exports = injectRequestMethods

function injectRequestMethods(ctx, inject) {
  inject('fetchPosts', fetchPosts)
  inject('fetchPostsByTag', fetchPostsByTag)
}
