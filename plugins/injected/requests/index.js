const { fetchLatestPosts, fetchPost, fetchPostsByTag } = require('./posts.js')
const { postDonate } = require('./donate.js')

module.exports = injectRequestMethods

function injectRequestMethods(ctx, inject) {
  inject('fetchLatestPosts', fetchLatestPosts)
  inject('fetchPost', fetchPost.bind(ctx))
  inject('fetchPostsByTag', fetchPostsByTag)

  inject('postDonate', postDonate)
}
