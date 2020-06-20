import { create as createAxios } from 'axios'

const baseURL = process.browser ? `//${location.host}` : process.env.BASE_URL
// const baseURL = 'https://www.readr.tw/api/public/'

const apiAxios = createAxios({
  baseURL: `${baseURL}/api/`,
  // baseURL,
})

export { apiAxios }
