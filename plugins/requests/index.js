import { fetchPosts, fetchPostsByTag } from './posts.js'
import { fetchPromotions } from './promotions.js'

export default injectRequestMethods

function injectRequestMethods(ctx, inject) {
  inject('fetchPosts', fetchPosts)
  inject('fetchPostsByTag', fetchPostsByTag)

  inject('fetchPromotions', fetchPromotions)
}
