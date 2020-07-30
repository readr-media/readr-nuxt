import { fetchPosts, fetchPost, fetchPostsByTag } from './posts.js'

export default injectRequestMethods

function injectRequestMethods(ctx, inject) {
  inject('fetchPosts', fetchPosts)
  inject('fetchPost', fetchPost)
  inject('fetchPostsByTag', fetchPostsByTag)
}
