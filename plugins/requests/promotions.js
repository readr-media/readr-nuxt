import { camelizeKeys, decamelizeKeys } from 'humps'
import { stringify as qsStringify } from 'qs'

import { apiAxios } from './util.js'

export { fetchPromotions }

async function fetchPromotions(params = {}) {
  try {
    const { data } = await apiAxios.get(`/promotions${buildParams(params)}`)
    return camelizeKeys(data)
  } catch (err) {
    console.error(err)
  }
}

function buildParams(params = {}) {
  if (Object.keys(params).length === 0) {
    return ''
  }

  return `?${qsStringify(decamelizeKeys(params))}`
}
