import { camelizeKeys, decamelizeKeys } from 'humps'
import { stringify as qsStringify } from 'qs'

import { apiAxios } from './utils.js'

export { fetchPosts, fetchPostsByTag, fetchPost }

async function fetchPosts(params = {}) {
  try {
    const { data } = await apiAxios.get(`/posts${buildParams(params)}`)
    return camelizeKeys(data)
  } catch (error) {
    console.error(error)
  }
}

async function fetchPost(postId) {
  const { data } = await apiAxios.get(`/post/${postId}`)
  return camelizeKeys(data)
}

async function fetchPostsByTag(tagId) {
  const { data } = await apiAxios.get(`/tags/pnr/${tagId}`)
  return camelizeKeys(data)
}

function buildParams(params = {}) {
  if (Object.keys(params).length === 0) {
    return ''
  }

  return `?${qsStringify(decamelizeKeys(params))}`
}
