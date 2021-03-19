const { fetchPost, fetchPostsByTag } = require('./posts.js')
const { postDonate, postSubscribe } = require('./donate.js')

module.exports = injectRequestMethods

function injectRequestMethods(ctx, inject) {
  inject('fetchPost', fetchPost.bind(ctx))
  inject('fetchPostsByTag', fetchPostsByTag)

  inject('postDonate', postDonate)
  inject('postSubscribe', postSubscribe)
}
