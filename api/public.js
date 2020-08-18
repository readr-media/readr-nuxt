import Koa from 'koa'
import Router from 'koa-router'
import { create as createAxios } from 'axios'

import { CMS_ENDPOINT_DEPRECATED } from '../configs/config.js'

const app = new Koa()

export default {
  handler: app.callback(),
}

const router = new Router()

app.use(router.routes())

const cmsDeprecatedApi = createAxios({
  baseURL: CMS_ENDPOINT_DEPRECATED,
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
    const { data, status = 200 } = await cmsDeprecatedApi.get(ctx.url)

    ctx.status = status
    ctx.body = data
  } catch ({ response = {} }) {
    ctx.status = response.status || 500
  }
})

router.get('/post/:id', async function getPost(ctx) {
  try {
    const { data, status = 200 } = await cmsDeprecatedApi.get(ctx.url)

    ctx.status = status
    ctx.body = data
  } catch ({ response = {} }) {
    ctx.status = response.status || 404
  }
})

async function checkQueryFields(notAllowedFields, ctx, next) {
  if (hasAllValidQueryFields(notAllowedFields, ctx.query)) {
    await next()
  } else {
    ctx.status = 403
    ctx.body = `Not allowed query fields: [${notAllowedFields.join(', ')}]`
  }
}

const NOT_ALLOWED_QUERY_FIELDS_POSTS = ['publish_status']

function checkPostsQueryFields(ctx, next) {
  return checkQueryFields(NOT_ALLOWED_QUERY_FIELDS_POSTS, ctx, next)
}

function hasAllValidQueryFields(notAllowedFields = [], query = {}) {
  return !Object.keys(query).some((field) => notAllowedFields.includes(field))
}
