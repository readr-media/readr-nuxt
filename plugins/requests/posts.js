const { camelizeKeys, decamelizeKeys } = require('humps')
const { stringify: qsStringify } = require('qs')
const { create: createAxios, get: axiosGet } = require('axios')

const { REQUEST_TIMEOUT } = require('../../configs/config.js')

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

Object.assign(module.exports, {
  fetchPosts,
  fetchPostsByTag,
})
