import { create as createAxios } from 'axios'

const baseURL = process.browser
  ? `//${location.host}/`
  : process.env._AXIOS_BASE_URL_

const apiAxios = createAxios({
  baseURL: `${baseURL}api/`,
})

export { apiAxios }
