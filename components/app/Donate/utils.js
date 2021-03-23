import { camelizeKeys } from 'humps'
import { create as axiosCreate } from 'axios'

import { logApiError } from '~/helpers/index.js'

const baseUrl = process.browser ? `//${location.host}` : process.env.BASE_URL
const apiAxios = axiosCreate({
  baseURL: `${baseUrl}/api`,
  timeout: 20000,
})

function createPost(requestUrl) {
  return async function (params = {}) {
    try {
      const { data } = await apiAxios.post(requestUrl, params)
      return camelizeKeys(data).items
    } catch (err) {
      logApiError(err, 'Donate')
      throw new Error(err.message)
    }
  }
}

async function postDonate(params = {}) {
  return await createPost('/donate')(params)
}
async function postSubscribe(params = {}) {
  return await createPost('/subscriptions')(params)
}

export { postDonate, postSubscribe }
