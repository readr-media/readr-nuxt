import { fetchPosts, fetchPost, fetchPostsByTag } from './posts.js'
import { fetchPromotions } from './promotions.js'

export default injectRequestMethods

function injectRequestMethods(ctx, inject) {
  inject('fetchPosts', fetchPosts)
  inject('fetchPost', fetchPost)
  inject('fetchPostsByTag', fetchPostsByTag)

  inject('fetchPromotions', fetchPromotions)
}
