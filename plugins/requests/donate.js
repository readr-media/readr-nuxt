const { camelizeKeys } = require('humps')
const { create: createAxios } = require('axios')

const { REQUEST_TIMEOUT } = require('../../configs/config.js')

const baseUrl = process.browser ? `//${location.host}` : process.env.BASE_URL

const publicApi = createAxios({
  baseURL: `${baseUrl}/api/public`,
  timeout: REQUEST_TIMEOUT,
})

async function postDonate(params = {}) {
  const requestUrl = `${baseUrl}/api/donate`
  try {
    const { data } = await publicApi.post(requestUrl, params)
    return camelizeKeys(data).items
  } catch ({ response = {}, message }) {
    // eslint-disable-next-line no-console
    console.error(`
      ApiError:
        url: ${requestUrl}
        message: ${message}
        data: ${response.data ?? ''}
    `)
  }
}

Object.assign(module.exports, {
  postDonate,
})
