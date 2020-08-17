import { camelizeKeys, decamelizeKeys } from 'humps'
import { stringify as qsStringify } from 'qs'
import { get as axiosGet } from 'axios'

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
  const baseUrl = process.browser ? `//${location.host}` : process.env.BASE_URL

  try {
    const { data } = await axiosGet(
      `${baseUrl}/api/tags/pnr/${tagId}?max_result=3&sort=-published_at`
    )

    return camelizeKeys(data).items
  } catch (error) {
    console.error(error)
  }
}

function buildParams(params = {}) {
  if (Object.keys(params).length === 0) {
    return ''
  }

  return `?${qsStringify(decamelizeKeys(params))}`
}
