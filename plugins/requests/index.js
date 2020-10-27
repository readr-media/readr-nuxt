const { fetchPosts, fetchPost, fetchPostsByTag } = require('./posts.js')

module.exports = injectRequestMethods

function injectRequestMethods(ctx, inject) {
  inject('fetchPosts', fetchPosts)
  inject('fetchPost', fetchPost.bind(ctx))
  inject('fetchPostsByTag', fetchPostsByTag)
}
