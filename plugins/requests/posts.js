const { camelizeKeys } = require('humps')
const { get: axiosGet } = require('axios')

const { REQUEST_TIMEOUT } = require('../../configs/config.js')

const baseUrl = process.browser ? `//${location.host}` : process.env.BASE_URL

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

Object.assign(module.exports, {
  fetchPostsByTag,
})
