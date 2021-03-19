const { camelizeKeys } = require('humps')
const { create: createAxios, get: axiosGet } = require('axios')

const { REQUEST_TIMEOUT } = require('~/configs/config.js')
const { logApiError } = require('~/helpers/index.js')

const baseUrl = process.browser ? `//${location.host}` : process.env.BASE_URL

const publicApi = createAxios({
  baseURL: `${baseUrl}/api/public`,
  timeout: REQUEST_TIMEOUT,
})

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

function logPostsApiError(err) {
  logApiError(err, 'Posts')
}

Object.assign(module.exports, {
  fetchPostsByTag,
  fetchPost,
})
