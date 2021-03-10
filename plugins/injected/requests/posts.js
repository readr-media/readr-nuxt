const { camelizeKeys, decamelizeKeys } = require('humps')
const { stringify: qsStringify } = require('qs')
const { create: createAxios, get: axiosGet } = require('axios')

const { REQUEST_TIMEOUT } = require('~/configs/config.js')
const { logApiError } = require('~/utils/index.js')

const baseUrl = process.browser ? `//${location.host}` : process.env.BASE_URL

const publicApi = createAxios({
  baseURL: `${baseUrl}/api/public`,
  timeout: REQUEST_TIMEOUT,
})

async function fetchPosts(params = {}) {
  const requestUrl = `/posts${buildParams(params)}`

  try {
    const { data } = await publicApi.get(requestUrl)

    return camelizeKeys(data).items || []
  } catch (err) {
    logPostsApiError(err)
    return []
  }
}

async function fetchLatestPosts(params = {}) {
  return await fetchPosts({
    type: '{"$in":[1,4]}',
    maxResult: 5,
    page: 1,
    sort: '-published_at',
    showAuthor: false,
    showUpdater: false,
    showTag: false,
    showComment: false,
    showProject: false,
    ...params,
  })
}

async function fetchPost(postId) {
  const requestUrl = `/post/${postId}`

  try {
    const { data } = await publicApi.get(requestUrl)

    return camelizeKeys(data)
  } catch (err) {
    logPostsApiError(err)

    const { response = {}, message } = err
    this.error({ statusCode: response.status || 404, message })
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
  } catch (err) {
    logPostsApiError(err)
    return []
  }
}

function buildParams(params = {}) {
  if (Object.keys(params).length === 0) {
    return ''
  }

  return `?${qsStringify(decamelizeKeys(params))}`
}

function logPostsApiError(err) {
  logApiError(err, 'Posts')
}

Object.assign(module.exports, {
  fetchLatestPosts,
  fetchPostsByTag,
  fetchPost,
})
