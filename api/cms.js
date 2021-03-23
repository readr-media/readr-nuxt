const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const Router = require('koa-router')
const { post: axiosPost } = require('axios')

const { CMS_ENDPOINT, KEYSTONE_DEV_ENDPOINT } = require('../configs/config.js')
const { reportApiErrorFromKoa } = require('../helpers/index.js')

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
  } catch (err) {
    reportCmsApiError(err, ctx)
  }
})

function reportCmsApiError(err, koaCtx) {
  reportApiErrorFromKoa(err, koaCtx, { scope: 'CMS' })
}

Object.assign(module.exports, {
  handler: app.callback(),
})
