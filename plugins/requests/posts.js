import { camelizeKeys, decamelizeKeys } from 'humps'
import { stringify as qsStringify } from 'qs'
import { create as createAxios, get as axiosGet } from 'axios'

import { REQUEST_TIMEOUT } from '~/configs/config.js'

export { fetchPosts, fetchPostsByTag, fetchPost }

const baseUrl = process.browser ? `//${location.host}` : process.env.BASE_URL

const publicApi = createAxios({
  baseURL: `${baseUrl}/api/public`,
  timeout: REQUEST_TIMEOUT,
})

async function fetchPosts(params = {}) {
  const requestUrl = `/posts${buildParams(params)}`

  try {
    const { data } = await publicApi.get(requestUrl)

    return camelizeKeys(data).items
  } catch ({ response = {}, message }) {
    console.error(`
      ApiError:
        url: ${requestUrl}
        message: ${message}
        data: ${response.data ?? ''}
    `)

    return []
  }
}

async function fetchPost(postId) {
  const requestUrl = `/post/${postId}`

  try {
    const { data } = await publicApi.get(requestUrl)

    return camelizeKeys(data)
  } catch ({ response = {}, message }) {
    console.error(`
      ApiError:
        url: ${requestUrl}
        message: ${message}
        data: ${response.data ?? ''}
    `)

    const statusCode = response.status || 404
    this.error({ statusCode, message })
  }
}

async function fetchPostsByTag(tagId) {
  const requestUrl = `${baseUrl}/api/cms/deprecated/tags/pnr/${tagId}`

  try {
    const { data } = await axiosGet(requestUrl, {
      params: {
        max_result: 3,
        sort: '-published_at',
      },
      timeout: REQUEST_TIMEOUT,
    })

    return camelizeKeys(data).items
  } catch ({ response = {}, message }) {
    console.error(`
      ApiError:
        url: ${requestUrl}
        message: ${message}
        data: ${response.data ?? ''}
    `)

    return []
  }
}

function buildParams(params = {}) {
  if (Object.keys(params).length === 0) {
    return ''
  }

  return `?${qsStringify(decamelizeKeys(params))}`
}
