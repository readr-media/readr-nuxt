import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import Router from 'koa-router'
import { post as axiosPost, get as axiosGet } from 'axios'

import { CMS_ENDPOINT, CMS_ENDPOINT_DEPRECATED } from '../configs/config.js'

const app = new Koa()

export default {
  handler: app.callback(),
}

const router = new Router()

app.use(bodyParser()).use(router.routes())

router.post('/', async function requestGraphqlApi(ctx) {
  const requestBody = ctx.request.body

  try {
    const { data, status = 200 } = await axiosPost(CMS_ENDPOINT, requestBody)

    ctx.status = status
    ctx.body = data
  } catch ({ response = {}, message }) {
    ctx.status = response.status || 500
    ctx.body = `
      ApiError:
        message: ${message}
        requestBody: ${requestBody}
    `
  }
})

router.get(
  '/deprecated/(.*)',
  checkApiPath,
  async function getFromDeprecatedApi(ctx) {
    const [, apiPath] = ctx.url.split('/deprecated')
    const requestUrl = `${CMS_ENDPOINT_DEPRECATED}${apiPath}`

    try {
      const { data, status = 200 } = await axiosGet(requestUrl)

      ctx.status = status
      ctx.body = data
    } catch ({ response = {} }) {
      ctx.status = response.status || 500
    }
  }
)

async function checkApiPath(ctx, next) {
  const apiUrl = ctx.url
  const [, apiPath] = apiUrl.split('/deprecated')

  if (isAllowedApiPath(apiPath)) {
    await next()
  } else {
    ctx.status = 403
    ctx.body = 'Not allowed api path'
  }
}

const allowedApiPaths = ['/tags/pnr']

function isAllowedApiPath(apiPath) {
  return allowedApiPaths.some((allowedApiPath) =>
    apiPath.startsWith(allowedApiPath)
  )
}
