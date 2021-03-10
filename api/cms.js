const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const Router = require('koa-router')
const { post: axiosPost, get: axiosGet } = require('axios')

const {
  CMS_ENDPOINT,
  KEYSTONE_DEV_ENDPOINT,
  CMS_ENDPOINT_DEPRECATED,
} = require('../configs/config.js')

const app = new Koa()
const router = new Router()

app.use(bodyParser()).use(router.routes())

router.post('/', async function requestGraphqlApi(ctx) {
  const requestBody = ctx.request.body
  const cmsEndpoint =
    ctx.request.query.keystoneDev === 'true'
      ? KEYSTONE_DEV_ENDPOINT
      : CMS_ENDPOINT

  try {
    const { data, status = 200 } = await axiosPost(cmsEndpoint, requestBody)

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

Object.assign(module.exports, {
  handler: app.callback(),
})
