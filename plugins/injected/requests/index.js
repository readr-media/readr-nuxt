const { fetchLatestPosts, fetchPost, fetchPostsByTag } = require('./posts.js')

module.exports = injectRequestMethods

function injectRequestMethods(ctx, inject) {
  inject('fetchLatestPosts', fetchLatestPosts)
  inject('fetchPost', fetchPost.bind(ctx))
  inject('fetchPostsByTag', fetchPostsByTag)
}
