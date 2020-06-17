import { fetchPosts, fetchPostsByTag } from './posts.js'
import { fetchEditorsChoice } from './promotions.js'

export default injectRequestMethods

function injectRequestMethods(context, inject) {
  inject('fetchPosts', fetchPosts)
  inject('fetchPostsByTag', fetchPostsByTag)

  inject('fetchEditorsChoice', fetchEditorsChoice)
}
