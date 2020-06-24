import { camelizeKeys, decamelizeKeys } from 'humps'
import { stringify as qsStringify } from 'qs'

import { apiAxios } from './utils.js'

export { fetchPosts, fetchPostsByTag }

async function fetchPosts(params = {}) {
  try {
    const { data } = await apiAxios.get(`/posts${buildParams(params)}`)
    return camelizeKeys(data)
  } catch (err) {
    console.error(err)
  }
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
