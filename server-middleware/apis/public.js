/**
 * 向外暴露的 API，讓其它專案可以使用，比如專題底下的「更多專題」區塊：https://github.com/readr-media/readr-ui/blob/web-components/src/components/readr-latest-coverages/readr-latest-coverages.tsx#L13
 * 應限制使用者能查詢的資料
 */

const Koa = require('koa')
const Router = require('koa-router')
const { create: axiosCreate } = require('axios')

const { KEYSTONE_DEV_ENDPOINT } = require('../../configs/config.js')
const { getErrorName } = require('../../helpers/index.js')
const { handleKoaCors: handleCors } = require('./helpers/cors.js')

const app = new Koa()
const router = new Router()

app.use(handleCors)
app.use(router.routes())

const cmsAxios = axiosCreate({
  baseURL: KEYSTONE_DEV_ENDPOINT,
})

const PUBLISH_STATUS_POST = {
  published: 2,
}

router.get('/posts', checkPostsQueryFields, async function getPosts(ctx) {
  ctx.query = {
    ...ctx.query,
    publish_status: `{"$in":[${PUBLISH_STATUS_POST.published}]}`,
  }

  try {
    const { data, status = 200 } = await cmsAxios.get(ctx.url)

    ctx.status = status
    ctx.body = data
  } catch ({ response = {} }) {
    ctx.status = response.status || 500
  }
})

async function checkQueryFields(notAllowedFields, ctx, next) {
  if (hasAllValidQueryFields(notAllowedFields, ctx.query)) {
    await next()
  } else {
    ctx.status = 403
    ctx.body = `${getErrorName()}: Not allowed query fields: [${notAllowedFields.join(
      ', '
    )}]`
  }
}

const NOT_ALLOWED_QUERY_FIELDS_POSTS = ['publish_status']

function checkPostsQueryFields(ctx, next) {
  return checkQueryFields(NOT_ALLOWED_QUERY_FIELDS_POSTS, ctx, next)
}

function hasAllValidQueryFields(notAllowedFields = [], query = {}) {
  return !Object.keys(query).some((field) => notAllowedFields.includes(field))
}

Object.assign(module.exports, {
  handler: app.callback(),
})
